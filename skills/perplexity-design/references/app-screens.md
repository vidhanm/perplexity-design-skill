# App screens (Operate mode)

Recipes for product UI: anything someone uses repeatedly to get work done. Each recipe gives the layout, the components (classes in `assets/components.css`), and what makes it read as Perplexity. `assets/templates/app-shell.html` implements the shell, home and answer screens; start from it.

Contents
- The shell
- Home (empty state with the composer)
- Answer thread
- Library / list of past items
- Settings
- Feed / Discover
- Data-heavy screens (tables, dashboards)
- Phone
- States: loading, streaming, empty, error

## The shell

```
┌──────────┬──────────────────────────────────────────────┐
│ ◎ acme ▢ │ header 56 (tabs or title · actions)          │
│ + New    ├──────────────────────────────────────────────┤
│ ◎ Disc.. │                                              │
│ ▥ Library│            content, centred column           │
│          │                                              │
│ Recents ⌄│                                              │
│  thread  │                                              │
│  thread  │                                              │
│ ──────── │                                              │
│ (plans)  │                                              │
│ ◉ Account│                                              │
└──────────┴──────────────────────────────────────────────┘
  240, bg-subtle, no border
```

- Sidebar 240, filled with `--bg-subtle`, no right border: the fill alone separates it. Rows `.nav-row` 40 tall, radius 8, 18px icon, 14/20 ink label. The current page and hover share one fill.
- Section labels ("Recents", "Projects") are 14/20 secondary with a chevron, not uppercase.
- Empty sections say so flatly in tertiary ("No projects").
- Footer: an xs pill ("View plans") over a hairline, then the account row.
- Header 56, `--bg-base`, hairline bottom on content pages. Primary action on the right is `.btn-primary` (inverse); everything else is ghost or icon buttons.
- Keep the chrome quiet: no coloured icons, no badges with counts unless they matter, no logo bigger than 20–22px.

## Home (empty state with the composer)

```
                What do you want to know?          serif 28/42, centred
        ┌──────────────────────────────────────┐
        │ Ask anything…                        │   composer, 640 wide,
        │ ＋ (Search|Research)     Model ⌄ mic ●│   radius 16, shadow ring
        └──────────────────────────────────────┘
          (chip) (chip) (chip)                     optional suggestions
```

- The composer is the hero. It sits a little above centre (top around 40% of the viewport; `padding-bottom: 10vh` on a centred grid does it).
- One heading above it, a question, serif. No marketing copy, no feature grid, no illustration.
- Toolbar: attach (+), an optional segmented mode control, then right-aligned Model (ghost), mic (icon), and the inverse submit circle, half-opacity until there's text.
- Optional: 2–4 suggestion chips below, or two quiet cards (`.card`, 12 radius, 88 tall) for features. Never a grid of six.

## Answer thread

```
 header: Answer | Links | Images                    ⋯  [Share]
 ┌──────────── 720 ────────────┐   ┌──── 336 ────┐
 │              ┌────────────┐ │   │ Sources   8 │
 │              │ the question│ │   │ ○ domain    │
 │              └────────────┘ │   │ Title       │
 │ Researched 8 sources        │   │ snippet…    │
 │                             │   └─────────────┘
 │ Serif answer paragraph with │
 │ a claim. [domain +1]        │
 │ ## Serif 18 semibold        │
 │ • list item [domain]        │
 │ ┌ table (sans 14) ────────┐ │
 │ (○○○ 8 sources)  copy ↑ ↓ ⋯ │
 │ ─────────────────────────── │
 │ ↳ Follow-up question        │
 │ ↳ Follow-up question        │
 └─────────────────────────────┘
      [ Ask a follow-up            ● ]   docked composer
```

- **Order is fixed:** question bubble → status row → answer → action row → follow-ups. The composer docks at the bottom with a fade behind it.
- **The question** is a right-aligned `.query-bubble` (sans 16/24 on `--bg-subtle`, radius 16), not a heading.
- **Status** ("Researched 8 sources", "Searching…") is one line of 14px secondary text. While working, the text shimmers (`.status-row.is-working`). Steps can expand, but collapsed is the default.
- **The answer** is `.prose`: serif 16/26 in a 720 column, h2 at 18/28 semibold, lists with secondary markers, tables in sans inside a raised, hairlined wrapper. Links are ink with an underline.
- **Citations** are `.cite` chips placed *after* the sentence they support: mono 10px domain label ("nesdis.noaa", "+1" at half opacity) on `--bg-soft`, radius 6. Not numbered superscripts, not coloured. Hover opens a 336-wide popover (`.popover`) with favicon + domain, title, snippet, then a hairline and a trust note.
- **Action row:** a sources pill (overlapping favicons + "8 sources") on the left; copy, rate, more as 32px icon buttons on the right.
- **Follow-ups:** hairline above, no heading, rows of `↳ question` in sans 16/24, full-width click targets whose hover fill bleeds 12px past the column.
- **Sources rail** (desktop ≥1024): a raised panel with `--shadow-sm`, items with domain (12 secondary), title (14, 2 lines), snippet (14 secondary, 3–4 lines). It collapses into the sources pill on smaller screens.

## Library / list of past items

```
 header: Library                         [search…]  (filter ⌄)
 ┌──────────── 720–880 ─────────────┐
 │ Thread title (14/20 medium)       │
 │ First line of the answer, 2 lines │  secondary 14/20
 │ ◷ 2 hours ago · 8 sources         │  12/16 secondary
 │ ───────────────────────────────── │
 │ Thread title …                    │
```

- One centred column (720–880), not a card grid. Rows are `.list-row-link` separated by `--border-soft` hairlines with a hover fill. Title in sans 14/20 medium, a 1–2 line preview in secondary, meta in 12/16.
- Search is an `.input` with a 16px search icon; filters are `.chip`s or a ghost button with a chevron. A selected filter chip goes inverse.
- Group by time ("Today", "Last 7 days") with 14px secondary labels, sentence case.
- Empty state: one sentence in tertiary and, if useful, one action ("No threads yet. Ask a question to start one.").

## Settings

```
 header: Settings
 ┌──── 640–720 ─────┐
 │ Account (serif 20 or sans 16 medium)
 │ ┌ card ─────────────────────────┐
 │ │ Name            [input       ] │
 │ │ ───────────────────────────── │
 │ │ Email           vidhan@…  Edit │
 │ └───────────────────────────────┘
 │ Appearance
 │ ┌ card ─────────────────────────┐
 │ │ Theme      (Light|Dark|System) │ segmented
 │ │ Answer font   (Serif|Sans)     │
 │ └───────────────────────────────┘
```

- A single 640–720 column. Sections are a heading (sans 16 medium or serif 20) plus a `.card` holding rows divided by hairlines. A row is label + description on the left, the control on the right.
- Controls: `.segmented` for 2–3 options, `.switch` for on/off (inverse when on, not accent), `.input` for text, ghost "Edit" buttons for values that open a dialog.
- Destructive actions live at the bottom in their own card, as an outlined button with `--negative` text, and confirm in a dialog.
- Save automatically where possible and confirm inline ("Saved") in secondary text, rather than a toast.

## Feed / Discover

- A 1080 grid: 720 main + 24 gap + 336 rail. The main column alternates a hero row (serif 28/35 headline, meta, serif 16/24 dek, image 344×225 radius 8) with rows of three story cards.
- Story card: `.card` with no border at rest, image on top (top corners 12), serif 16/24 title, meta row (favicons + "32 sources" 12 medium secondary, icon buttons). Hover: `--shadow-sm-hover` and the title turns accent.
- Rail: widget cards (`.card`, p16) stacked with 32px gaps: topic chips, weather, market tiles (status colours for deltas).
- Images are the colour on these pages; the chrome stays monochrome.

## Data-heavy screens (tables, dashboards)

Perplexity's language extends to dashboards if you keep its restraint:

- Numbers in sans with tabular figures; labels 12/16 secondary; values 14–16 medium, or 28 serif for one headline number per card.
- Tables use the answer-table style: raised wrapper, hairline rules, `--bg-subtle` header, no zebra stripes.
- Stat tiles are `.card`s with a hairline, no shadow. Deltas use status colours with an arrow, never the accent.
- Charts: single ink line or the status colours; gridlines at `--border-soft`; no gradients except a faint area fill under one series.
- Filters as chips, period as a segmented control, export as an outlined button.

## Phone

- No sidebar: a 56 top bar (menu icon, 20px mark + name, one action) with a hairline.
- Content gutter 16. Answer type is unchanged (serif 16/26), headings 18/22.
- The composer docks at the bottom, inset 10px, radius 26. The segmented control collapses to icons.
- Tabs can drop their labels and keep icons. Sources move into the sources pill. Touch targets 44.

## States: loading, streaming, empty, error

- **Loading a page:** skeleton blocks in `--bg-subtle` with a slow shimmer, shaped like the content. No spinners in the middle of the page.
- **Streaming an answer:** status row shimmers ("Searching", "Reading 6 sources"), then paragraphs fade in (150ms). The submit button becomes a stop square.
- **Empty:** one flat sentence in tertiary, optionally one action. No illustrations, no "Oops!", no emoji.
- **Error:** inline, near what failed, in plain words with a retry ("Couldn't load sources. Try again."). Use `--negative` for the text or a small icon only, not a red panel.
