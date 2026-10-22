#!/usr/bin/env node
/**
 * perplexity-design lint — Node 18+, no dependencies.
 *
 *   node scripts/lint.mjs <file-or-dir> [...more] [--allow rule,rule] [--quiet]
 *
 * Scans HTML, CSS and component files for the mistakes that make a screen stop
 * reading as this design language: colours outside the tokens, accent used as a
 * CTA fill, heavy weights, off-scale radii, decorative effects, emoji, filler
 * copy, missing dark mode or reduced motion. If it finds a tokens file (one
 * that defines --brand-ink-light), it also checks the brand's contrast.
 *
 * FAIL = fix it. WARN = wrong unless you can say why it's right here.
 * Exit code 1 when anything FAILs. Silence one line with a trailing
 * comment containing "lint-allow" (use sparingly, and say why).
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname, basename, relative } from "node:path";

const EXT = new Set([".html", ".htm", ".css", ".scss", ".jsx", ".tsx", ".js", ".ts", ".vue", ".svelte", ".astro", ".mdx"]);
const SKIP_DIRS = new Set(["node_modules", ".git", ".next", "dist", "build", "out", ".turbo", "coverage"]);

const args = process.argv.slice(2);
const allow = new Set();
const targets = [];
let quiet = false;
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--allow") (args[++i] ?? "").split(",").forEach((r) => allow.add(r.trim()));
  else if (args[i] === "--quiet") quiet = true;
  else if (args[i] === "-h" || args[i] === "--help") {
    console.log("usage: node lint.mjs <file-or-dir> [...] [--allow rule,rule] [--quiet]");
    process.exit(0);
  } else targets.push(args[i]);
}
if (!targets.length) {
  console.error("lint: pass the files or folders to check, e.g. node scripts/lint.mjs src/ index.html");
  process.exit(2);
}

function walk(p, out) {
  let st;
  try {
    st = statSync(p);
  } catch {
    console.error(`lint: can't read ${p}`);
    return out;
  }
  if (st.isDirectory()) {
    for (const name of readdirSync(p)) if (!SKIP_DIRS.has(name)) walk(join(p, name), out);
  } else if (EXT.has(extname(p).toLowerCase())) out.push(p);
  return out;
}
const files = targets.flatMap((t) => walk(t, []));

/** Blank out spans but keep newlines, so line numbers survive. */
const blank = (s) => s.replace(/[^\n]/g, " ");
function mask(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, blank) // CSS/JS block comments
    .replace(/<!--[\s\S]*?-->/g, blank) // HTML comments
    .replace(/--[\w-]+\s*:[^;{}]*;/g, blank) // custom-property declarations: where literals belong
    .replace(/<svg[\s\S]*?<\/svg>/gi, (m) => m.replace(/(?:fill|stroke)="[^"]*"/g, blank)); // svg paint attrs checked separately
}

const COLOR = /(?<=[\s:(,\['"=])(#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})|(?:rgba?|hsla?|oklch|oklab|lab|lch)\([^)]*\))(?![\w-])/g;
const RADII = new Set([0, 2, 4, 6, 8, 10, 12, 16, 20, 24, 26, 32, 40, 9999]);

const findings = [];
const add = (level, file, line, rule, msg) => {
  if (allow.has(rule)) return;
  findings.push({ level, file, line, rule, msg });
};

function lineOf(text, index) {
  let n = 1;
  for (let i = 0; i < index; i++) if (text.charCodeAt(i) === 10) n++;
  return n;
}

for (const file of files) {
  const raw = readFileSync(file, "utf8");
  const isTokens = /--brand-ink-light\s*:/.test(raw);
  const src = mask(raw);
  const rawLines = raw.split("\n");
  const allowed = (line) => /lint-allow/.test(rawLines[line - 1] ?? "");
  const hit = (level, idx, rule, msg) => {
    const line = lineOf(src, idx);
    if (!allowed(line)) add(level, file, line, rule, msg);
  };
  const each = (re, fn) => {
    for (const m of src.matchAll(re)) fn(m);
  };

  if (!isTokens) {
    each(COLOR, (m) => {
      const before = src.slice(Math.max(0, m.index - 6), m.index);
      if (/href=["']?$|url\($|id=["']?$/.test(before)) return;
      hit("FAIL", m.index, "off-token-color", `colour literal ${m[1]} — use a token (var(--fg-secondary), var(--bg-subtle), var(--border-soft)…). Literals belong only in tokens.css.`);
    });
  }

  each(/transition\s*:\s*all\b|transition-all\b|transition-property\s*:\s*all\b/g, (m) =>
    hit("FAIL", m.index, "transition-all", "transition: all — name the properties (background-color, color, box-shadow…) with var(--dur-color) var(--ease-standard)."),
  );

  each(/font-weight\s*:\s*(800|900)|\bfont-(?:extrabold|black)\b/g, (m) =>
    hit("FAIL", m.index, "heavy-weight", "weight 800/900 — the heaviest weight in this system is var(--weight-bold) (700 light / 690 dark)."),
  );

  each(/lorem ipsum|dolor sit amet/gi, (m) =>
    hit("FAIL", m.index, "filler-copy", "lorem ipsum — write real, plausible copy; this language is content-first."),
  );

  // Emoji in markup text (not in comments)
  const textOnly = src.replace(/<script[\s\S]*?<\/script>/gi, blank).replace(/<style[\s\S]*?<\/style>/gi, blank);
  for (const m of textOnly.matchAll(/\p{Extended_Pictographic}/gu)) {
    if (m[0] === "©" || m[0] === "®" || m[0] === "™") continue; // © ® ™ are fine
    hit("FAIL", m.index, "emoji", `emoji "${m[0]}" as UI — use a 1.75-stroke line icon or plain words.`);
  }

  each(/(?:background(?:-color)?\s*:\s*var\(--accent\)|\bbg-accent\b(?!-))/g, (m) =>
    hit("WARN", m.index, "accent-fill", "accent used as a fill — primary actions are var(--bg-inverse); the accent is for the caret, badges, small links and rare highlights."),
  );

  each(/font-family\s*:(?!\s*(?:var\(|inherit|initial|unset))[^;}"']+/g, (m) =>
    hit("WARN", m.index, "font-literal", "font-family literal — use var(--font-sans | --font-serif | --font-display | --font-mono) so a rebrand is one edit."),
  );

  each(/font-weight\s*:\s*(\d{3})/g, (m) =>
    hit("WARN", m.index, "weight-literal", `font-weight ${m[1]} — use var(--weight-regular | --weight-medium | --weight-semibold | --weight-bold) so dark mode thins it.`),
  );

  // A hand-made blurred shadow (hairline rings built from tokens are fine)
  each(/box-shadow\s*:(?!\s*var\(--(?:shadow|focus))([^;}"']+)/g, (m) => {
    if (/-?\d+(?:\.\d+)?px\s+-?\d+(?:\.\d+)?px\s+[1-9]\d*(?:\.\d+)?px/.test(m[1])) {
      hit("WARN", m.index, "shadow-literal", "custom blurred shadow — use var(--shadow-sm | --shadow-md | --shadow-composer); cards at rest are flat.");
    }
  });

  each(/border-radius\s*:\s*([^;}"']+)/g, (m) => {
    for (const v of m[1].matchAll(/(\d+(?:\.\d+)?)px/g)) {
      if (!RADII.has(Number(v[1]))) {
        hit("WARN", m.index, "off-scale-radius", `radius ${v[1]}px — use var(--radius-chip 6 | -control 8 | -card 12 | -input 16 | -full).`);
        break;
      }
    }
  });

  each(/backdrop-filter\s*:\s*blur|\bbackdrop-blur\b/g, (m) =>
    hit("WARN", m.index, "glass", "backdrop blur (glass) — surfaces here are opaque: var(--bg-raised) plus a hairline or shadow."),
  );

  each(/(?:linear|radial|conic)-gradient\(/g, (m) =>
    hit("WARN", m.index, "gradient", "gradient — the app is flat. Allowed for the thinking-text shimmer, image scrims and rare marketing media only."),
  );

  each(/:hover[^{]*\{[^}]*transform\s*:\s*(?:translateY\(-|scale\(1\.(?:0[3-9]|[1-9]))/g, (m) =>
    hit("WARN", m.index, "hover-lift", "hover lift/zoom — cards don't jump; hover adds a fill or var(--shadow-sm-hover). A 1.01 scale is the most this system uses."),
  );

  each(/stroke-width=["']?(2(?:\.\d+)?|[3-9])["']?/g, (m) =>
    hit("WARN", m.index, "icon-stroke", `icon stroke ${m[1]} — icons here use 1.75 (lucide/tabler default is 2).`),
  );

  const upper = [...src.matchAll(/text-transform\s*:\s*uppercase|\buppercase\b/g)];
  if (upper.length > 4) {
    hit("WARN", upper[4].index, "eyebrow-overuse", `${upper.length} uppercase styles — uppercase is only for 11px eyebrows and tiny badges; headings and labels are sentence case.`);
  }

  // Whole-document checks (pages, not partials)
  if (/<html[\s>]/i.test(src)) {
    if (!/prefers-color-scheme|data-theme|tokens\.css/.test(raw)) {
      add("WARN", file, 1, "no-dark-mode", "no dark theme — include tokens.css (light + dark) and let the OS or data-theme pick.");
    }
    if (/transition|animation/.test(src) && !/prefers-reduced-motion|base\.css/.test(raw)) {
      add("WARN", file, 1, "no-reduced-motion", "motion without a prefers-reduced-motion guard — base.css includes one.");
    }
    if (!/name=["']viewport["']/.test(raw)) {
      add("FAIL", file, 1, "no-viewport", 'missing <meta name="viewport" content="width=device-width, initial-scale=1"> — the layout must work at 390px.');
    }
  }

  if (isTokens) contrast(raw, file);
}

/* ---------------- Brand contrast (only for a tokens file) ---------------- */
function hex(raw, name) {
  const m = raw.match(new RegExp(`--${name}\\s*:\\s*(#[0-9a-fA-F]{6})`));
  return m ? m[1] : null;
}
function rgb(h) {
  return [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
}
function mix(fg, bg, a) {
  return fg.map((c, i) => Math.round(c * a + bg[i] * (1 - a)));
}
function lum(c) {
  const [r, g, b] = c.map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function ratio(a, b) {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}
function contrast(raw, file) {
  for (const t of ["light", "dark"]) {
    const ground = hex(raw, `brand-ground-${t}`);
    const ink = hex(raw, `brand-ink-${t}`);
    const accent = hex(raw, `brand-accent-${t}`);
    if (!ground || !ink) continue;
    const g = rgb(ground);
    const checks = [
      ["text", rgb(ink), 7, "FAIL", "primary text"],
      ["secondary", mix(rgb(ink), g, t === "light" ? 0.75 : 0.65), 4.5, "FAIL", "secondary text"],
      ["tertiary", mix(rgb(ink), g, 0.5), 3, "WARN", "tertiary text (placeholders, timestamps)"],
    ];
    if (accent) checks.push(["accent", rgb(accent), 4.5, "WARN", "accent as text (links, badges)"]);
    for (const [, c, min, level, label] of checks) {
      const r = ratio(c, g);
      if (r < min) add(level, file, 1, "contrast", `${t}: ${label} is ${r.toFixed(2)}:1 on the ground — needs ${min}:1. Adjust --brand-ink-${t} / --brand-accent-${t}.`);
      else if (!quiet) add("INFO", file, 1, "contrast", `${t}: ${label} ${r.toFixed(2)}:1 ✓`);
    }
  }
}

/* ---------------- Report ---------------- */
const order = { FAIL: 0, WARN: 1, INFO: 2 };
findings.sort((a, b) => order[a.level] - order[b.level] || a.file.localeCompare(b.file) || a.line - b.line);
const fails = findings.filter((f) => f.level === "FAIL").length;
const warns = findings.filter((f) => f.level === "WARN").length;
for (const f of findings) {
  if (quiet && f.level === "INFO") continue;
  console.log(`${f.level.padEnd(4)}  ${relative(process.cwd(), f.file) || basename(f.file)}:${f.line}  [${f.rule}] ${f.msg}`);
}
console.log(`\n${files.length} file(s): ${fails} FAIL, ${warns} WARN.${fails ? " Fix every FAIL, then re-run." : warns ? " Review each WARN." : " Clean."}`);
process.exit(fails ? 1 : 0);
