---
name: perplexity-design
description: Builds web app screens and marketing pages in Perplexity's design language - answer-first layouts, a calm one-ink palette with a rare teal accent, serif answers with sans chrome, the composer as hero, inline source citations - from measured tokens that can be swapped for any brand. Use whenever the user asks for a Perplexity-style, Perplexity-like or answer-engine look; an AI search, research, chat or knowledge-product interface; a landing or pricing page "like Perplexity"; a calm, editorial, restrained or "not generic AI" UI and names Perplexity as the reference; or wants this system applied to their own brand colours and fonts. Also use when restyling an existing screen toward Perplexity, or when the project already contains this skill's tokens.css. Not for generic UI requests that name no style or reference, other brands' design systems, slide decks, or print.
license: MIT
compatibility: Works in any agent that supports Agent Skills. The optional lint script needs Node 18+.
metadata:
  version: "1.0.0"
  observed: "2026-10"
---

# Perplexity design

Build interfaces that read as Perplexity: quiet chrome, content first, every claim traceable to a source. The values here were measured from perplexity.ai's live CSS (October 2026), not guessed. Everything visual flows from `assets/tokens.css`, whose BRAND block is the only thing to edit when applying the system to another brand.

All paths are relative to this file's directory.

## What makes it read as Perplexity

Hold these ten; they matter more than any single value.

1. **The composer is the hero.** Every app screen is organised around the ask box: centred on home, docked at the bottom of threads. Raised surface, radius 16, a 0.5px shadow ring instead of a border.
2. **One ink, many strengths.** Text, hairlines and fills are one ink at 100 / 75 / 50 / 15 / 7 / 3.5%. Two near-identical grounds (`#fbfbfb` page, `#fff` raised). No ladders of unrelated greys. This is why it feels calm.
3. **The accent is a signature, not a button.** Teal (`#016a71` / `#4e99a3`) appears only on the caret, small badges, the featured pricing card, hover titles and tiny meta links. Primary buttons are inverse (charcoal on light, pale grey on dark).
4. **What it says is serif; what you operate is sans.** Answers, headlines and the home question are a text serif at 16/26; all chrome is a compact grotesk at 14/20. That split is the main typographic signature.
5. **Sources are inline evidence.** Citations are tiny mono domain chips placed after the claim, on a 7% fill, never numbered superscripts or coloured links. Favicons stack in a "8 sources" pill; details live in a hover card.
6. **Flat at rest, elevated only when floating.** Cards and tables get a hairline or nothing. Only the composer, popovers, menus and panels get a soft stacked shadow.
7. **Radius follows input.** 16 for things you type into, 12 for cards and popovers, 8 for buttons and rows, 6 for chips, full for pills and icon buttons.
8. **Dark mode is designed, not inverted.** Cool grounds (`#15191d` / `#1a1e21`), pale ink, and every font weight about 10% lighter (400 → 360, 500 → 470) so text doesn't bloom.
9. **Fast, damped motion.** 75ms focus, 150ms colour and entrances (expo-out, 5px rise), 300ms buttons. Nothing bounces.
10. **Plain, short copy.** Questions as prompts ("What do you want to know?"), status in two words ("8 sources"), empty states as facts ("No projects"), sentence case, no emoji.

## Choose the mode first

Decide from the surface being built, not the product:

- **App screen (Operate):** anything used repeatedly to get work done: home, threads, library, settings, feeds, dashboards. Read `references/app-screens.md` and start from `assets/templates/app-shell.html`.
- **Marketing page (Persuade):** landing, pricing, product, about, blog. Read `references/marketing-pages.md` and start from `assets/templates/landing.html`.

A product with both gets both, sharing the same tokens.

## Workflow

Copy this checklist and tick it off:

```
- [ ] 1. Read the brief and the project: stack, existing tokens or brand, target file(s)
- [ ] 2. Pick the mode; read its reference file and look at its template
- [ ] 3. Brand: keep Perplexity's values, or fill the BRAND block from the user's brand (references/rebrand.md)
- [ ] 4. Fonts: load them explicitly (assets/fonts.md); never assume they're installed
- [ ] 5. Bring in tokens.css (+ base.css, components.css for plain HTML; tailwind-theme.css for Tailwind)
- [ ] 6. Sketch the hierarchy in a few lines: the one primary action, what's serif, where sources show
- [ ] 7. Build, using references/components.md for every control
- [ ] 8. Lint: node scripts/lint.mjs <your files> — fix every FAIL, justify or fix each WARN
- [ ] 9. Look: screenshot at 1440 and 390 wide, light and dark, if a browser tool is available; fix the top 3 issues
- [ ] 10. Report: what you built, brand choices, anything placeholder, any check you couldn't run
```

**Step 5 detail.** For plain HTML, link or inline (in this order) the fonts, `assets/tokens.css`, `assets/base.css`, `assets/components.css`, then a short page `<style>` for layout only. For a single-file deliverable, paste them into `<style>` blocks; keep the BRAND block at the top. For frameworks, see `references/platform-mapping.md` (Tailwind v4/v3, shadcn/ui, Next.js fonts, native).

**Step 9 detail.** Check against "What makes it read as Perplexity" above. The usual misses: the accent creeping onto buttons, answers set in sans or too wide, a stray grey that isn't a token, heavy weights in dark mode, decorative shadows on cards, copy that sounds like a SaaS template. Stop after three rounds of fixes.

## Craft rules

- **Hierarchy by size, weight and ink strength, not colour.** Primary content in ink at full strength; supporting text at secondary; metadata at 12px secondary; disabled and placeholders at tertiary.
- **Type budget per screen:** two families (sans + serif; mono only in citation chips and code), at most four sizes, two weights in the chrome (regular, medium). Use `--weight-*` tokens, never numbers.
- **Spacing means grouping:** 4–8 within a component, 12–16 between siblings, 24–32 between groups, 96–128 between marketing sections. Prefer space over dividers; when a divider is needed, it's `--border-soft`.
- **Columns:** 640 for the home composer, 720 for anything read, 336 for side rails. Never let prose run wider than 720.
- **One primary action per view**, as `.btn-primary`. Everything else is outline, tonal, ghost or icon.
- **Colour comes from content.** Photos, favicons, charts and status deltas carry the colour; the chrome stays monochrome.
- **Icons:** Lucide or Tabler line icons at stroke 1.75, `currentColor`, 16px in controls and 18px in navigation.
- **Accessibility is not optional:** keyboard focus uses `--focus-ring`; touch targets are at least 44px on phones; contrast passes the lint check; motion respects `prefers-reduced-motion`.

## Never | Instead

| Never | Instead |
|---|---|
| Accent-filled primary buttons | `--bg-inverse` buttons |
| Hex, rgb or Tailwind palette colours in components | semantic tokens (`--fg-secondary`, `--bg-subtle`, `--border-soft`…) |
| Numbered or coloured citations | `.cite` mono domain chips after the claim |
| Answers in sans, full width | `.prose` serif 16/26 in a 720 column |
| Shadows on resting cards | a hairline; shadows only for floating layers |
| A 1px border on the composer | `--shadow-composer` |
| Gradients, glass, glows, gradient text | flat grounds; real UI or one real image |
| Feature grids of icon + title + blurb | 3–4 sections, one idea each, shown with real UI |
| Uppercase labels and headings | sentence case; uppercase only for 11px eyebrows and badges |
| Emoji, exclamation marks, "Oops!" | line icons; plain, specific copy |

The full list, including generic AI-generated tells, is in `references/anti-patterns.md`.

## Special cases

- **The brief wins.** If the user asks for something this system wouldn't do (an accent CTA, a gradient hero), do it, keep everything else consistent, and mention the trade-off once.
- **Their own brand.** Follow `references/rebrand.md`: their colours and fonts go in the BRAND block; Perplexity's structure, restraint and accent discipline stay. Keep mandated brand assets even when they break a rule here, and say so.
- **An existing codebase.** Map the tokens onto what's there (CSS variables, Tailwind theme, shadcn variables) instead of adding a parallel system. Restyle components in place.
- **One component only.** Use the matching entry in `references/components.md` and the tokens; skip the page-level steps.
- **Dashboards and data.** See the data section of `references/app-screens.md`: tabular figures, hairline tables, status colours for deltas, one headline number per card.
- **No Node or no browser.** Skip lint or screenshots and say which checks didn't run. Never claim a check you didn't run.
- **Logos and fonts.** Never reproduce Perplexity's logo, wordmark or font files. Use the user's mark or a neutral placeholder, and the open font substitutes.

## Files

| File | Read it when |
|---|---|
| `references/app-screens.md` | building any product screen: shell, home, thread, library, settings, feed, dashboard, phone, states |
| `references/marketing-pages.md` | building a landing, pricing, product or blog page |
| `references/components.md` | building or restyling any control: exact sizes, fills and states |
| `references/tokens.md` | you need to know what a token is for, where the accent may go, or the type roles |
| `references/rebrand.md` | the user has their own colours or fonts |
| `references/platform-mapping.md` | the project uses Tailwind, shadcn/ui, Next.js, React Native or SwiftUI |
| `references/voice.md` | writing any UI or marketing copy |
| `references/anti-patterns.md` | reviewing your output, or when something feels generic |
| `assets/tokens.css` | always: the source of every colour, font, radius, shadow and timing |
| `assets/base.css`, `assets/components.css` | plain HTML/CSS builds: element defaults, answer prose, reference components |
| `assets/tailwind-theme.css` | Tailwind v4 projects |
| `assets/fonts.md` | loading fonts or choosing substitutes |
| `assets/templates/app-shell.html` | starting an app screen: sidebar, home composer, answer thread, phone layout |
| `assets/templates/landing.html` | starting a marketing page: nav, hero, sections, pricing, FAQ, footer |
| `scripts/lint.mjs` | run it (don't read it) on your output: `node scripts/lint.mjs <files or folders>` |
