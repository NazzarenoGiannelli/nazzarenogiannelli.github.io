// All page copy and links live here. Edit freely: short, plain, first person,
// no em dashes (see the writing-voice notes in the vault).
import {
  GithubLogo,
  LinkedinLogo,
  YoutubeLogo,
  XLogo,
} from "@phosphor-icons/react";

export const EMAIL = "nazzareno.giannelli@gmail.com";
export const CALL_URL = "https://tidycal.com/nazzareno";
export const GITHUB_URL = "https://github.com/NazzarenoGiannelli";
export const LINKEDIN_URL = "https://www.linkedin.com/in/nazzgiannelli";

// Only channels that are actually alive go in the hero
export const socialLinks = [
  { Icon: LinkedinLogo, label: "LinkedIn", href: LINKEDIN_URL },
  { Icon: GithubLogo, label: "GitHub", href: GITHUB_URL },
  { Icon: XLogo, label: "X", href: "https://x.com/nazzgiannelli" },
  {
    Icon: YoutubeLogo,
    label: "YouTube",
    href: "https://www.youtube.com/@nazzgiannelli",
  },
];

// Quieter channels, linked from the footer
export const elsewhere = [
  { label: "Instagram", href: "https://www.instagram.com/nazzgiannelli" },
  { label: "TikTok", href: "https://www.tiktok.com/@nazzgiannelli" },
  { label: "Threads", href: "https://www.threads.net/@nazzgiannelli" },
  { label: "Gumroad", href: "https://nazzareno.gumroad.com/" },
  { label: "Art Picker", href: "https://www.instagram.com/art_picker" },
];

export const navLinks = [
  { label: "work with me", href: "#work" },
  { label: "projects", href: "#projects" },
  { label: "tools", href: "#tools" },
  { label: "how I work", href: "#how" },
];

export const marquee = [
  "UNREAL ENGINE",
  "CLAUDE CODE",
  "DIGITAL TWINS",
  "MCP SERVERS",
  "PIXEL STREAMING",
  "METAHUMAN",
  "OPENUSD",
  "AI AGENTS",
  "BLENDER",
  "REAL-TIME 3D",
];

// Places where the work is published or was written about
export const shippedOn = [
  {
    label: "Official MCP Registry",
    href: "https://www.r3plica.space/integrations/mcp",
  },
  { label: "Fab", href: null },
  { label: "SketchUp Extension Warehouse", href: null },
  { label: "npm", href: "https://www.npmjs.com/package/tuiboard" },
  {
    label: "Wired Italia",
    href: "https://www.wired.it/article/mastercard-intelligenza-artificiale-sophia-pagamenti/",
  },
];

export const lanes = [
  {
    id: "ai",
    title: "AI systems",
    audience: "for teams who want Claude doing real work",
    body: "I set up Claude Code, custom skills and MCP servers so what your team knows lives in plain files an agent can read and act on. It's the same setup I use every day at R3PLICA, where agents handle reviews, routines and a good chunk of the boring stuff.",
    items: [
      "Claude Code setups and custom skills",
      "MCP servers for your data or product catalog",
      "Team knowledge bases in plain markdown",
      "Agent routines that run on their own",
    ],
    proof: {
      text: "R3PLICA's MCP server, listed on the official MCP registry",
      href: "https://www.r3plica.space/mcp/",
    },
  },
  {
    id: "unreal",
    title: "Unreal Engine",
    audience: "for brands, showrooms and events",
    body: "Real-time 3D that runs in a browser or on a big screen. I've worked in Unreal since my archviz days, and I teach it as an Unreal Authorized Instructor.",
    items: [
      "Pixel Streaming apps",
      "MetaHumans and conversational digital humans",
      "Product configurators and digital twins",
      "Pipelines from CAD and Blender into Unreal",
    ],
    proof: {
      text: "I worked on the digital human for Sophia, Mastercard's AI assistant launched in Milan (Wired Italia)",
      href: "https://www.wired.it/article/mastercard-intelligenza-artificiale-sophia-pagamenti/",
    },
  },
];

// `stat` functions receive the build-time stats.json and return a string or
// null (null hides the line).
export const projects = [
  {
    id: "r3plica",
    role: "co-founder, CTO",
    title: "R3PLICA",
    body: "A catalog of real furniture from design brands, as digital twins you can drop into Unreal, SketchUp or your CAD. Lately it's also a catalog AI agents can browse on their own.",
    facts: [
      "The whole catalog moved to OpenUSD this summer",
      "Plugins for Unreal on Fab and for SketchUp on Extension Warehouse",
      "2D CAD, IFC and lightweight GLB exports for architects",
    ],
    links: [{ label: "r3plica.space", href: "https://www.r3plica.space/" }],
    media: {
      type: "video",
      src: "/media/r3plica-unreal.mp4",
      poster: "/media/r3plica-unreal.jpg",
      alt: "R3PLICA products placed in an Unreal Engine scene",
    },
  },
  {
    id: "mcp",
    role: "built at R3PLICA",
    title: "R3PLICA MCP",
    body: "Ask Claude for an armchair that works with your sofa, and it searches a catalog of real products and places the model straight into your Unreal or SketchUp scene.",
    facts: [
      "Listed on the official MCP registry as space.r3plica/catalog",
      "Works with Claude and any other MCP client",
    ],
    links: [
      { label: "how it works", href: "https://www.r3plica.space/mcp/" },
      {
        label: "watch the demo",
        href: "https://www.youtube.com/watch?v=4OESj0DsNDY",
      },
    ],
    media: {
      type: "image",
      src: "/media/r3plica-mcp.jpg",
      alt: "R3PLICA MCP demo: Claude placing catalog products into a 3D room",
      href: "https://www.youtube.com/watch?v=4OESj0DsNDY",
    },
  },
  {
    id: "tuiboard",
    role: "open source, MIT",
    title: "tuiboard",
    body: "A keyboard-first kanban for the terminal that reads and writes plain markdown files. It also has a day planner, an agenda synced with Google Calendar and a live view of what your coding agents are doing.",
    facts: [
      (s) =>
        s?.stars?.tuiboard ? `${s.stars.tuiboard} stars on GitHub` : null,
      (s) =>
        s?.npm?.downloadsLastMonth
          ? `${s.npm.downloadsLastMonth.toLocaleString("en-US")} npm installs last month`
          : null,
      "Works with Claude Code, Codex, OpenCode and Pi",
    ],
    links: [
      { label: "tuiboard.nazzareno.xyz", href: "https://tuiboard.nazzareno.xyz/" },
      { label: "source", href: "https://github.com/NazzarenoGiannelli/tuiboard" },
    ],
    media: {
      type: "image",
      src: "/media/tuiboard.jpg",
      alt: "tuiboard running in a terminal: kanban columns, agenda and live agents",
      href: "https://tuiboard.nazzareno.xyz/",
    },
  },
];

// Proof helpers for the tools list: each returns null when the build
// couldn't fetch the number, so the line just doesn't show.
const gumroadRating = (s, permalink) => {
  const r = s?.gumroad?.[permalink];
  if (!r?.count) return null;
  return `${r.average.toFixed(1)} from ${r.count} rating${r.count === 1 ? "" : "s"}`;
};
const githubStars = (s, repo) =>
  s?.stars?.[repo] ? `${s.stars[repo]} ★` : null;
const proofOf = (...parts) => parts.filter(Boolean).join(", ") || null;

export const tools = [
  {
    name: "CoordiKnight",
    what: "Copies object transforms from Blender to Unreal Engine",
    proof: (s) => proofOf(gumroadRating(s, "uyWlt"), githubStars(s, "coordiknight")),
    href: "https://nazzareno.gumroad.com/l/uyWlt",
    where: "Blender",
  },
  {
    name: "MatSlotCleaner",
    what: "Removes unused material slots from every selected mesh in one click",
    proof: (s) => proofOf(gumroadRating(s, "VSlNF"), githubStars(s, "matslotcleaner")),
    href: "https://github.com/NazzarenoGiannelli/matslotcleaner",
    where: "Blender",
  },
  {
    name: "Editor Utility Blueprints",
    what: "A free set of editor utilities for everyday Unreal work",
    proof: (s) => proofOf(gumroadRating(s, "HxpOt")),
    href: "https://nazzareno.gumroad.com/l/HxpOt",
    where: "Unreal",
  },
  {
    name: "Image to WebP",
    what: "Converts whole folders of images to WebP, from a GUI or the command line",
    proof: (s) => proofOf(githubStars(s, "image-to-webp-converter")),
    href: "https://github.com/NazzarenoGiannelli/image-to-webp-converter",
    where: "Python",
  },
  {
    name: "Terracotta Dark",
    what: "A warm dark theme for Obsidian, inspired by Claude Desktop",
    proof: (s) => proofOf(githubStars(s, "obsidian-claude-dark-theme")),
    href: "https://github.com/NazzarenoGiannelli/obsidian-claude-dark-theme",
    where: "Obsidian",
  },
];

// The two files printed by the terminal in "how I work"
export const howIWork = [
  ["terminal", "WezTerm, Nushell, lazygit, yazi"],
  ["keyboard", "Zed, Claude Code"],
  ["voice", "Wispr Flow"],
  ["text files", "Obsidian, plain markdown, tuiboard"],
];

export const NOW_UPDATED = "September 2026";
export const now = [
  ["building", "R3PLICA's catalog for AI agents"],
  ["shipping", (s) => `tuiboard ${s?.npm?.version ? `v${s.npm.version}` : ""}`.trim()],
  ["taking on", "small MetaHuman projects, directly"],
];
