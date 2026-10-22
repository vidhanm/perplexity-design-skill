# Tokens

The values in `assets/tokens.css`, explained: what each one is for and where Perplexity uses it. They were measured on perplexity.ai (logged out) in October 2026. When code and this file disagree, `tokens.css` wins.

Contents
- Colour: the one-ink system
- Where the accent goes (and where it doesn't)
- Type: families, roles, weights per theme
- Geometry: radius, spacing, heights, layout
- Elevation
- Motion
- Known gaps

## Colour: the one-ink system

Perplexity doesn't have a ladder of greys. It has **two grounds and one ink**, and every text level, hairline and fill is that ink at a different strength. Light and dark swap by changing the ink and the ground; nothing else needs to know the theme.

| Role | Token | Light | Dark | Use |
|---|---|---|---|---|
| Page | `--bg-base` | `#fbfbfb` | `#15191d` | body, sticky headers |
| Raised | `--bg-raised` | `#ffffff` | `#1a1e21` | composer, cards, popovers, tables, panels |
| Subtle layer | `--bg-subtle` | fill 3.5% | ink 3% | hover fills, sidebar, query bubble, table header |
| Soft layer | `--bg-soft` | fill 7% | ink 6% | citation chip, tonal button, pressed states |
| Inverse | `--bg-inverse` | `#252525` | `#dadfe3` | primary buttons, submit circle, tab indicator |
| Primary text | `--fg-primary` | ink `#0b2833` | ink `#dadfe3` | all text and icons by default |
| Secondary text | `--fg-secondary` | ink 75% | ink 65% | descriptions, meta, icon buttons, list markers |
| Tertiary text | `--fg-tertiary` | ink 50% | ink 50% | placeholders, timestamps, empty states |
| Disabled | `--fg-disabled` | ink 20% | ink 20% | |
| Text on inverse | `--fg-inverse` | ground | ground | |
| Hairline | `--border-soft` | ink 7% | ink 7% | dividers, card edges, table rules, header rule |
| Control edge | `--border-base` | ink 15% | ink 14% | outlined buttons, inputs, xs pills |
| Backdrop | `--bg-backdrop` | ground 70% | ground 70% | modal scrim |

Two details carry a lot of the feel:

- **Light ink is a teal-black (`#0b2833`), not black.** The brand hue is present in every letter at near-zero chroma, so the page feels branded without a single coloured element. Light *fills* use a neutral `#1c1c1c`, so hover states stay grey rather than tinted.
- **The grounds differ by 1–2% lightness.** Raised surfaces separate from the page by that step plus a hairline or a soft shadow, never by a colour.

Status colours exist for data only (prices, deltas, validation): positive `#016b1d` / `#539e55`, negative `#a23544` / `#dc6973`, warning `#97431a` / `#d57141`, each with a 9% `-soft` background.

## Where the accent goes (and where it doesn't)

The teal accent is `#016a71` light / `#4e99a3` dark. It's a signature, not an action colour. On perplexity.ai it appears in exactly these places:

- the composer **caret** (`caret-color`)
- **"NEW" / "Popular" badges**: 11px medium on `--accent-soft`
- small **trust and meta links** inside popovers ("Rate this source · Learn more")
- **card titles on hover** (Discover headlines turn accent in 150ms)
- the **featured pricing card**: 1px accent border, accent badge
- the signed-out avatar disc
- **text selection** tint
- in dark mode only, one large promotional card on the home screen

It never fills the primary button, never colours links inside answers (those are ink with an underline), and is never the focus ring. If you find yourself reaching for the accent to make something "pop", use weight, size or the inverse button instead.

## Type: families, roles, weights per theme

| Family token | Open substitute | Perplexity's face | Used for |
|---|---|---|---|
| `--font-sans` | Geist | pplxSans | all chrome: nav, buttons, labels, tables, the composer, the user's question, follow-ups |
| `--font-serif` | Source Serif 4 | pplxSerif | answer prose, headlines on feeds, the home heading, marketing h1/h2 |
| `--font-display` | Instrument Serif | GT Canon (condensed, light) | very large marketing display only |
| `--font-mono` | Geist Mono | pplxSansMono | citation chips, code |

**The serif/sans split is the main typographic signature:** what the product *says* (answers, headlines) is set like reading matter; everything you *operate* is a compact grotesk. `--font-answer` points at the serif; setting it to the sans is a supported user preference.

| Role | Font | Size / line-height | Weight |
|---|---|---|---|
| UI text: rows, menus, chips, tabs, buttons | sans | 14/20 | regular; tabs, buttons, titles medium |
| Body, composer, query bubble, follow-up | sans | 16/24 | regular |
| Caption, meta, source domain | sans | 12/16 | regular (medium for dates on cards) |
| Micro badge, eyebrow | sans | 11/11 | medium; eyebrows uppercase +0.05em |
| Answer paragraph | serif | 16/26 | regular |
| Answer heading | serif | 18/28 | semibold |
| Citation chip | mono | 10/13.75 | regular, tabular numbers |
| Home heading | serif | 28/42 | regular, -0.02em |
| Feed headline | serif | 28/35 | regular |
| Feed card title | serif | 16/24 | regular |
| Marketing h1 | serif | 48/52 | regular |
| Marketing h2 | serif | 30–36 | regular (FAQ heading light) |
| Display (marketing only) | display | 64–80 | light, -0.02em |

Only display serifs are tracked (-0.02em). Everything at 20px and below sits at 0.

**Weights are per theme.** Dark mode thins every face about 10% so light text on dark doesn't bloom: regular 400 → 360, medium 500 → 470, semibold 600 → 580, bold 700 → 690, serif regular 400 → 350. Always use `--weight-*` tokens rather than numbers, or dark mode will look heavy. Nothing is heavier than bold; most of the UI is regular and medium.

## Geometry: radius, spacing, heights, layout

**Radius scales with how much you type into it:**

| Token | px | Use |
|---|---|---|
| `--radius-chip` | 6 | citation chips, topic chips, badges |
| `--radius-control` | 8 | buttons, nav rows, menu items, inputs, tables |
| `--radius-card` | 12 | cards, popovers, menus, the sources panel |
| `--radius-input` | 16 | composer, query bubble, follow-up rows, banners |
| (phone composer) | 26 | the docked composer on phones |
| `--radius-section` | 24 | marketing section panels |
| `--radius-media` | 32 | marketing hero media |
| `--radius-full` | 9999 | pills, icon buttons, segmented tracks, switches |

**Spacing is a 4px scale, and gaps mean something:** 4–8 inside a component, 12–16 between siblings, 24–32 between groups, 96–128 between marketing sections. If you need a divider to separate two things, the spacing is probably wrong; if you need both, use `--border-soft`.

**Control heights:** 24 (xs pill), 32 (chips, icon buttons, toolbar, submit circle), 36 (menu items), 40 (nav rows, inputs, auth buttons), 56 (tabs bar, marketing hero CTA). Touch targets on phones are at least 44.

**Layout:** sidebar 240 (filled with `--bg-subtle`, no border), header 56 with a `--border-soft` bottom rule on thread pages, home column 640, answer column 720, sources rail 336, phone gutter 16. Answers never run wider than 720; long lines are the fastest way to lose the reading feel.

## Elevation

Flat at rest; raised only when floating.

- **Cards, tables, list rows:** no shadow. A `--border-soft` hairline or nothing.
- **Floating layers** (composer, popovers, menus, the sources panel, banners): a stacked shadow whose first layer is a 0.5px ring. `--shadow-sm` for panels, `--shadow-md` for popovers and menus, `--shadow-composer` (+ `-focus`) for the ask box. Light shadows are tinted with the ink; dark shadows are black with a faint white inner top edge.
- **Hover** on a card adds `--shadow-sm-hover`. Nothing lifts or jumps.

## Motion

| What | Duration | Easing |
|---|---|---|
| Composer focus ring, card hover shadow | 75ms | `--ease-standard` |
| Colour changes: chips, citations, links, tab text, title → accent | 150ms | `--ease-standard` |
| Popover / menu enter (fade + 5px rise) | 150ms | `--ease-expo-out` |
| Popover exit | 150ms | `--ease-expo-in` |
| Buttons (background, border, colour, opacity) | 300ms | `--ease-out` |
| Tab indicator slide | 300ms | `--ease-standard` |
| New answer blocks, follow-ups, sources appearing | 150ms fade | `--ease-expo-out` |
| "Researching…" text | shimmer sweep, ~1.6s loop | linear |

Nothing bounces or springs. Motion explains a change of state; it never decorates. Always respect `prefers-reduced-motion` (base.css does).

## Known gaps

Measured logged out, so these are derived rather than observed: settings, library and account screens; the theme switcher; keyboard focus rings (Perplexity hides outlines; this system adds `--focus-ring` because accessibility matters more than fidelity); code blocks in answers. Perplexity's own typefaces are proprietary, so glyph shapes differ slightly from the substitutes.
