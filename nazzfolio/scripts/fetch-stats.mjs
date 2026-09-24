#!/usr/bin/env node
// Pulls the live numbers shown next to projects and tools (GitHub stars,
// npm downloads and version) so the page never shows stale proof.
// Always writes a file: any value it can't fetch is left null and the
// page falls back to hiding that number.
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = resolve(__dirname, '../src/data/stats.json');

const OWNER = process.env.GH_USERNAME || 'NazzarenoGiannelli';
const TOKEN = process.env.GH_CONTRIBUTIONS_TOKEN || process.env.GITHUB_TOKEN;

const REPOS = [
  'tuiboard',
  'coordiknight',
  'matslotcleaner',
  'image-to-webp-converter',
  'obsidian-claude-dark-theme',
];
const NPM_PACKAGE = 'tuiboard';

const getJson = async (url, headers = {}) => {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'nazzfolio-build', ...headers },
    });
    if (!res.ok) {
      console.warn(`[stats] ${url} -> HTTP ${res.status}`);
      return null;
    }
    return await res.json();
  } catch (err) {
    console.warn(`[stats] ${url} -> ${err.message}`);
    return null;
  }
};

async function main() {
  const ghHeaders = TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {};

  const stars = {};
  for (const repo of REPOS) {
    const json = await getJson(
      `https://api.github.com/repos/${OWNER}/${repo}`,
      ghHeaders,
    );
    stars[repo] = json?.stargazers_count ?? null;
  }

  const downloads = await getJson(
    `https://api.npmjs.org/downloads/point/last-month/${NPM_PACKAGE}`,
  );
  const latest = await getJson(
    `https://registry.npmjs.org/${NPM_PACKAGE}/latest`,
  );

  const out = {
    stars,
    npm: {
      downloadsLastMonth: downloads?.downloads ?? null,
      version: latest?.version ?? null,
    },
    fetchedAt: new Date().toISOString(),
  };

  const dir = dirname(OUT_PATH);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(OUT_PATH, JSON.stringify(out, null, 2));
  console.log(`[stats] wrote ${JSON.stringify(out)}`);
}

main();
