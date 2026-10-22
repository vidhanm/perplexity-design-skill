# Marketing pages (Persuade mode)

Landing, product, pricing, about and blog pages. Same tokens as the app, but slower rhythm and bigger serif type. `assets/templates/landing.html` implements a full page; start from it.

Contents
- What changes from the app
- Nav
- Hero (two patterns)
- Proof
- Feature sections
- Pricing
- FAQ
- Closing call to action
- Footer
- Blog and articles
- The cream sub-brand variant

## What changes from the app

| | App | Marketing |
|---|---|---|
| Headings | sans 14–16 medium | serif 30–48 regular; display 64–80 light only for one hero |
| Rhythm | 8–32px gaps | 96–128px between sections |
| Primary CTA | h32 inverse, radius 8 | h56 inverse, radius 12, 18px |
| Surfaces | ground + raised | ground + soft panels (`--bg-subtle`, radius 24) |
| Media | none | real product UI, or one photographic/abstract image per page |

What doesn't change: one ink, the accent's narrow job, flat cards, hairlines, short copy.

## Nav

- 64 tall, sticky, `--bg-base` with a hairline bottom (or hide on scroll down, show on scroll up).
- Wordmark left (mark 20–22 + name). Links right as pills: 16px medium, secondary ink, hover fill `--bg-subtle`.
- One CTA as a tonal pill (h40, `--bg-soft`). Not two buttons, not an accent button.

## Hero (two patterns)

**A. Claim + product (default, like /pro).** Two columns. Left: serif h1 48/52 (40 on phones), a 16/24 secondary sub of one or two sentences, then a primary `.btn-xl` and an outlined `.btn-xl`. Right: the product itself, framed: a radius-32 media card, or a soft panel holding a real composer and an answer with citations. Showing the product is more convincing than any abstract art.

**B. Ask as hero (like /hub).** A centred serif headline and a single wide input (680×64, radius 16) that actually works or deep-links into the app. Use it when the product *is* the question box. A full-bleed photo or video behind it is allowed; keep text white and the input raised.

Either way: one idea, one primary action. No eyebrow pill above the headline, no gradient text, no floating badges.

## Proof

A single quiet band between hairlines: one line of 14px secondary text ("Trusted by…") and customer names or monochrome logos in tertiary. Or one strong quote set in serif. Not a carousel, not a stat grid.

## Feature sections

- One idea per section. Serif h2 (30–36, regular, -0.01em), a 16/24 secondary lede of two or three sentences, optionally three short check-mark points (14/20).
- Pair each with real UI (a sources list, a cited answer, a settings card) inside a raised card on a soft panel (`--bg-subtle`, radius 24, 96–128 vertical padding). Alternate text left/right.
- Three or four sections is plenty. Avoid the feature-card grid (icon + title + blurb ×6); if you must list many features, use a two-column list with hairlines.

## Pricing

- Two to four plans as `.card`-style blocks (radius 12, p24, hairline). Plan name 16 medium, price sans 30/36 medium with "/ month" in 12 secondary, features as 12/16 lines with a 16px check icon, a full-width CTA at the bottom.
- The featured plan gets a 1px accent border and an accent "Popular" badge, nothing else. Its CTA is still inverse.
- A comparison table, if needed, uses the answer-table style.

## FAQ

A 720 column of `<details>` rows divided by hairlines, question in 16 medium, a plus icon that rotates 45° (150ms) when open, answer in secondary. Heading in serif, light weight.

## Closing call to action

Repeat the composer: a serif h2 ("Ask your first question") and a working ask box, or a single primary button. Avoid a full-width accent band.

## Footer

Minimal by default: "© 2026 Name" and four or five links in 14 secondary on one line, hairline above. For large sites, a dark footer is allowed: pure black, 4–6 link columns, 15px headings, 11–12px links at 60% white.

## Blog and articles

- Left nav column (~212) with the blog title in serif and a vertical list whose active item gets `--bg-subtle` and a 2px ink bar on the left.
- Lead post: figure (radius 4, hairline), eyebrow (11px uppercase +0.05em secondary, e.g. "RESEARCH · 7 OCT 2026"), serif title 32, serif dek 16 secondary.
- Article body uses `.prose` at 18/30 for long reads, 680–720 wide.

## The cream sub-brand variant

Perplexity's separate product sites (Comet, Enterprise) use a warmer, more editorial variant. Use it only when the user wants that feel:

- Ground cream `#fbfaf4`, ink `#091717`, CTA a deep teal `#004241` pill (radius 40, h50).
- Display h1 in the condensed serif (`--font-display`) at 80/80, light, -0.02em; subs at 20–22 light, ink at 60–64%.
- Painterly or grainy illustration is acceptable here, used once.

To switch, override `--brand-ground-light`, `--brand-ink-light` and `--brand-inverse-light` on the page; don't fork the tokens.
