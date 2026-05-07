#!/usr/bin/env node
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = resolve(__dirname, '../src/data/github-contributions.json');

const USERNAME = process.env.GH_USERNAME || 'NazzarenoGiannelli';
const TOKEN = process.env.GH_CONTRIBUTIONS_TOKEN || process.env.GITHUB_TOKEN;

const QUERY = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

const LEVEL_MAP = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

function ensureDir(filePath) {
  const dir = dirname(filePath);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

function writePlaceholder(reason) {
  ensureDir(OUT_PATH);
  const placeholder = {
    totalContributions: 0,
    weeks: [],
    fetchedAt: new Date().toISOString(),
    placeholder: true,
    reason,
  };
  writeFileSync(OUT_PATH, JSON.stringify(placeholder, null, 2));
  console.warn(`[contributions] wrote placeholder: ${reason}`);
}

async function main() {
  if (!TOKEN) {
    writePlaceholder('No GH_CONTRIBUTIONS_TOKEN or GITHUB_TOKEN in env');
    return;
  }

  let res;
  try {
    res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
        'User-Agent': 'nazzfolio-build',
      },
      body: JSON.stringify({ query: QUERY, variables: { login: USERNAME } }),
    });
  } catch (err) {
    writePlaceholder(`Network error: ${err.message}`);
    return;
  }

  if (!res.ok) {
    writePlaceholder(`HTTP ${res.status} ${res.statusText}`);
    return;
  }

  const json = await res.json();
  if (json.errors) {
    writePlaceholder(`GraphQL error: ${JSON.stringify(json.errors)}`);
    return;
  }

  const calendar = json?.data?.user?.contributionsCollection?.contributionCalendar;
  if (!calendar) {
    writePlaceholder('Missing calendar in response');
    return;
  }

  const weeks = calendar.weeks.map((w) =>
    w.contributionDays.map((d) => ({
      d: d.date,
      c: d.contributionCount,
      l: LEVEL_MAP[d.contributionLevel] ?? 0,
    })),
  );

  const out = {
    totalContributions: calendar.totalContributions,
    weeks,
    fetchedAt: new Date().toISOString(),
  };

  ensureDir(OUT_PATH);
  writeFileSync(OUT_PATH, JSON.stringify(out));
  console.log(
    `[contributions] wrote ${weeks.length} weeks, ${out.totalContributions} total contributions`,
  );
}

main().catch((err) => {
  console.error('[contributions] unexpected error', err);
  writePlaceholder(`Unexpected: ${err.message}`);
});
