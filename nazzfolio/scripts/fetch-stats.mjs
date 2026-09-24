#!/usr/bin/env node
// Pulls the live numbers shown next to projects and tools (GitHub stars,
// npm downloads and version, Gumroad ratings) so the page never shows
// stale proof.
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
const GUMROAD_PROFILE = 'https://nazzareno.gumroad.com/';

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

const decodeEntities = (str) =>
  str
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

// Gumroad has no public API for ratings, but the profile page ships its
// product list as JSON in a `data-page` attribute. Read it from there and
// key each product by its permalink (the part after /l/ in its URL).
// Any change on Gumroad's side just yields {} and the ratings disappear.
const fetchGumroadRatings = async () => {
  try {
    const res = await fetch(GUMROAD_PROFILE, {
      headers: { 'User-Agent': 'Mozilla/5.0 (nazzfolio-build)' },
    });
    if (!res.ok) {
      console.warn(`[stats] ${GUMROAD_PROFILE} -> HTTP ${res.status}`);
      return {};
    }
    const html = await res.text();
    const attr = html.match(/data-page="([^"]*)"/);
    if (!attr) {
      console.warn('[stats] gumroad: no data-page attribute found');
      return {};
    }
    const page = JSON.parse(decodeEntities(attr[1]));

    const ratings = {};
    const walk = (node) => {
      if (Array.isArray(node)) return node.forEach(walk);
      if (!node || typeof node !== 'object') return;
      const permalink =
        typeof node.url === 'string' && node.url.match(/\/l\/([^?/#]+)/)?.[1];
      if (permalink && node.ratings && typeof node.ratings.count === 'number') {
        ratings[permalink] = {
          name: node.name,
          count: node.ratings.count,
          average: node.ratings.average,
        };
      }
      Object.values(node).forEach(walk);
    };
    walk(page.props);
    return ratings;
  } catch (err) {
    console.warn(`[stats] gumroad -> ${err.message}`);
    return {};
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

  const gumroad = await fetchGumroadRatings();

  const out = {
    stars,
    gumroad,
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
