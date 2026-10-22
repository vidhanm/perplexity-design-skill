# Components

Anatomy and numbers for each component. The CSS lives in `assets/components.css` (class names in brackets). In React, Vue or Svelte, port the same values into your components; keep the token names.

Contents
- Buttons
- Composer
- Segmented control
- Navigation rows and tabs
- Query bubble, status row
- Citation chip and source popover
- Sources pill, favicon stack, sources panel
- Follow-ups
- Cards
- Chips and badges
- Inputs, switches, list rows
- Menus, popovers, dialogs
- Icons
- Feedback (saved, errors, toasts)

## Buttons

| Variant | Class | Fill | Edge | Text | Use |
|---|---|---|---|---|---|
| Primary | `.btn-primary` | `--bg-inverse` | none | `--fg-inverse` | the one main action per view: Share, Sign in, Save, Get started |
| Outline | `.btn-outline` | none → subtle on hover | `--border-base` | primary | the second action ("Compare plans") |
| Tonal | `.btn-tonal` | `--bg-soft` | none | primary | secondary filled action, nav CTA pills |
| Ghost | `.btn-ghost` | none → subtle | none | secondary → primary | toolbar text buttons ("Model ⌄") |
| Icon | `.btn-icon` | none → subtle | none | secondary → primary | 32×32 round, 16px icon |

Sizes: default h32 / 14px medium / radius 8 / padding 12. `.btn-lg` h40 / 16px. `.btn-xl` (marketing) h56 / 18px / radius 12 / padding 24. `.btn-pill` makes any size fully round. `.pill-xs` is h24, 12px medium, hairline, round.

Disabled buttons keep their colour at 50% opacity. Loading keeps the width and cross-fades the label to a spinner or "Saving…" over 150ms. Transitions are 300ms ease-out on background, border, colour and opacity.

There is **no accent button**. If a layout seems to need one, it needs a clearer primary.

## Composer

[`.composer`] The most important component. Raised surface, radius 16, **no CSS border**: the edge is `--shadow-composer`, which firms to `--shadow-composer-focus` in 75ms on focus. Textarea 16/24, placeholder tertiary, caret accent. Toolbar row (32 tall) inside 12px padding: `+` icon button, optional segmented mode control, flexible space, ghost "Model ⌄", mic icon button, and the submit circle [`.composer-submit`]: 32×32, inverse, arrow-up icon, 50% opacity while empty, a stop square while streaming. Enter submits, Shift+Enter adds a line.

Sizes: 640 wide on home (two-line textarea), 720 on threads (one line), phone docked with 10px inset and radius 26. Placeholders are short questions: "Ask anything…", "Ask a follow-up".

## Segmented control

[`.segmented`] Round track on `--bg-subtle`, 32 tall. Segments: icon 16 + 14px label, padding 8 left / 12 right. The selected segment is raised (`--bg-raised` + `--border-base` edge); others are secondary text. Use for 2–3 modes or settings (Light / Dark / System).

## Navigation rows and tabs

[`.nav-row`] 40 tall, radius 8, 8px padding, 18px icon, 10px gap, 14/20 primary label. Hover and current page share `--bg-subtle`. Rows sit 1px apart. Truncate long labels with an ellipsis; reveal a `⋯` icon button on hover for row actions.

[`.tabs`, `.tab`, `.tab-indicator`] 14px medium, 18px icon, 6px gap, 20px between tabs, the bar 56 tall. Inactive tabs at 80% opacity. A 2px inverse indicator slides under the active tab (300ms). Tabs are for switching views of the same thing (Answer / Links / Images), not for primary navigation.

## Query bubble, status row

[`.query-bubble`] The user's question, right-aligned, max 85% wide, `--bg-subtle`, radius 16, padding 12/16, sans 16/24. Hover reveals a timestamp and edit/copy icon buttons.

[`.status-row`] One line, 14px secondary, 28px below the bubble: "Researched 8 sources", "Reading 3 files". While working, add `.is-working` for the shimmer. Expandable into steps, collapsed by default.

## Citation chip and source popover

[`.cite`] Inline, after the sentence it supports, 4px from the last character. Mono 10/13.75, tabular, h20, padding 3/5, radius 6, `--bg-soft`; hover `--bg-subtle`. Content: optional 12px icon (a landmark for official sources), a short domain label ("nesdis.noaa", "britannica", "billing.export"), and "+N" at 50% opacity when several sources back the claim. Never numbered superscripts, never coloured.

Hover/focus opens a [`.popover`] 336 wide, radius 12, `--shadow-md`, padding 12, gap 8: favicon 16 + domain (12 secondary) → title (14 medium, 1 line, accent on hover) → snippet (14/20 secondary, 3 lines) → hairline → trust note (12 semibold label + 12/18 secondary text) → optional accent meta link ("Learn more"). Enters with a 5px rise and fade (150ms expo-out).

## Sources pill, favicon stack, sources panel

[`.sources-pill`] h32 round, 14px secondary: overlapping 14px favicon circles [`.favicons`] (each with a faint inner ring and a ground-coloured outline, overlapping 4px) + "8 sources". Opens the sources panel or a sheet.

[`.sources-panel`] Raised, radius 12, `--shadow-sm`. Collapsed: one 44px row ("Sources", favicons, count, chevron). Expanded: [`.source-item`]s divided by hairlines, each with padding 8, radius 12 hover fill: domain line (12 secondary), title (14 primary, 2 lines), snippet (14 secondary, 3–4 lines).

## Follow-ups

[`.followups`, `.followup`] A hairline above, 20px padding, no heading. Each row: `↳` icon in secondary + question in sans 16/24 primary; padding 12, radius 16, 48 tall; hover fill bleeds 12px outside the text column (negative margin). Three or four questions, phrased as the user would ask them.

## Cards

[`.card`] Raised, hairline (`--border-soft`), radius 12, **no shadow at rest**. Clickable cards add `.card-link`: hover gives `--shadow-sm-hover` (75ms) and turns `.card-title` accent (150ms). Content padding 16; image on top with top corners 12. Feed titles are serif 16/24; dashboard card titles are sans 14 medium.

Don't nest cards, don't put an icon-in-a-circle at the top of every card, and don't give a row of cards different colours.

## Chips and badges

[`.chip`] Topic/filter chip: h32, padding 8 left / 12 right, radius 6, `--bg-subtle` + `--border-soft`, 14px, optional 14–16px icon. Hover `--bg-soft`. Selected (`aria-pressed="true"`) turns inverse.

[`.badge`] 11px medium uppercase, round, `--accent-soft` fill and accent text: "New", "Popular", "Beta". One per view at most.

## Inputs, switches, list rows

[`.input`] h40, radius 8, padding 12, `--border-base` edge on `--bg-raised`, 14px text, tertiary placeholder; focus firms the edge to secondary ink (no glow). Labels above in 14 medium, hints below in 12 secondary, errors below in 12 `--negative`.

[`.switch`] 32×18 round. Off: `--bg-soft` track with a hairline. On: inverse track. Thumb 14, raised with `--shadow-sm`, slides 300ms.

[`.list`, `.list-row`, `.list-row-link`] Rows of at least 56, padding 12/8, hairlines between, hover fill for clickable rows. Left: title (14 medium) + secondary line; right: meta (12 secondary) or a control.

## Menus, popovers, dialogs

[`.menu`, `.menu-item`] Raised, radius 12, padding 4, `--shadow-md`, min 212 wide. Items 36 tall, radius 8, 16px icon, 8px gap, 14px; trailing chevrons or shortcuts in secondary. Separators are hairlines with 4px margin.

Dialogs: raised, radius 16, `--shadow-md`, max 420–560 wide, padding 24; title sans 16 medium, body 14 secondary; actions right-aligned (outline then primary). Backdrop `--bg-backdrop`. Enter with the same fade-and-rise as popovers.

## Icons

Line icons only (Lucide or Tabler), **stroke 1.75**, `currentColor`, round caps and joins. 16px in buttons, chips and menus; 18px in nav rows and tabs; 12px inside citation chips. Icons take their colour from the text role: never a coloured icon, never filled or duotone, never an emoji.

## Feedback (saved, errors, toasts)

- Prefer inline confirmation next to what changed ("Saved" in 12 secondary, fading after 2s).
- Errors sit next to their cause in `--negative`, with a retry.
- If a toast is unavoidable (an action with Undo), use a raised `--shadow-md` pill at the bottom centre, 14px, one action as a ghost button, 4–6 seconds.
