---
version: alpha
name: Perplexity-inspired
description: Answer-first, restrained interface language measured from perplexity.ai (Oct 2026). One ink, serif answers, sans chrome, inline source citations, a rare teal accent.
colors:
  primary: "#0b2833"
  secondary: "#475d65"
  tertiary: "#839297"
  background: "#fbfbfb"
  surface: "#ffffff"
  surface-subtle: "#f3f3f3"
  surface-soft: "#ebebeb"
  inverse: "#252525"
  on-inverse: "#fbfbfb"
  border-soft: "#eaeced"
  border-base: "#d7dbdd"
  accent: "#016a71"
  accent-hover: "#0c4f54"
  accent-soft: "#e4eeef"
  positive: "#016b1d"
  negative: "#a23544"
  warning: "#97431a"
  dark-background: "#15191d"
  dark-surface: "#1a1e21"
  dark-primary: "#dadfe3"
  dark-secondary: "#959a9e"
  dark-accent: "#4e99a3"
typography:
  ui:
    fontFamily: Geist
    fontSize: 14px
    lineHeight: 20px
    fontWeight: 400
  body:
    fontFamily: Geist
    fontSize: 16px
    lineHeight: 24px
    fontWeight: 400
  answer:
    fontFamily: Source Serif 4
    fontSize: 16px
    lineHeight: 26px
    fontWeight: 400
  answer-heading:
    fontFamily: Source Serif 4
    fontSize: 18px
    lineHeight: 28px
    fontWeight: 600
  caption:
    fontFamily: Geist
    fontSize: 12px
    lineHeight: 16px
    fontWeight: 400
  citation:
    fontFamily: Geist Mono
    fontSize: 10px
    lineHeight: 13.75px
    fontWeight: 400
  home-heading:
    fontFamily: Source Serif 4
    fontSize: 28px
    lineHeight: 42px
    fontWeight: 400
    letterSpacing: -0.02em
  marketing-h1:
    fontFamily: Source Serif 4
    fontSize: 48px
    lineHeight: 52px
    fontWeight: 400
rounded:
  chip: 6px
  control: 8px
  card: 12px
  input: 16px
  section: 24px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  section: 128px
components:
  button-primary:
    backgroundColor: "{colors.inverse}"
    textColor: "{colors.on-inverse}"
    rounded: "{rounded.control}"
    height: 32px
  button-outline:
    backgroundColor: "{colors.background}"
    textColor: "{colors.primary}"
    rounded: "{rounded.control}"
    height: 32px
  composer:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.input}"
  citation-chip:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.primary}"
    rounded: "{rounded.chip}"
    typography: "{typography.citation}"
  badge:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.accent}"
    rounded: "{rounded.full}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.card}"
---

# Perplexity-inspired design language

> For agents without Agent Skills support. The full system (tokens.css with light/dark, components, templates, linter) is in `skills/perplexity-design/`. Independent project, not affiliated with Perplexity AI.

## Overview

Quiet chrome, content first, every claim traceable to a source. The ask box (composer) is the hero of every app screen. What the product says is set in a serif; everything you operate is a compact sans. Colour comes from content (images, favicons, charts), not from the interface.

## Colors

One ink at several strengths instead of a ladder of greys: text at 100 / 75 / 50%, hairlines at 7% and 15%, fills at 3.5% and 7%. Light ink is a teal-black (`#0b2833`); fills are neutral. The page is `#fbfbfb`; raised surfaces are `#ffffff`. Dark mode: page `#15191d`, raised `#1a1e21`, ink `#dadfe3` (secondary 65%).

The teal accent (`#016a71` light, `#4e99a3` dark) is a signature used only for the composer caret, small "New"/"Popular" badges, the featured pricing card, card titles on hover and small meta links. **Primary buttons are inverse (charcoal), never accent.** Links inside answers are ink with an underline.

## Typography

Geist (substitute for pplxSans) at 14/20 for all UI chrome and 16/24 for body and the composer. Source Serif 4 (substitute for pplxSerif) at 16/26 for answers, 18/28 semibold for answer headings, 28/42 for the home question, 48/52 for marketing headlines. Geist Mono at 10px only for citation chips and code. Only display serifs are tracked (-0.02em). In dark mode every weight drops about 10% (400 → 360, 500 → 470, 700 → 690).

## Layout

Sidebar 240 (filled 3.5% ink, no border), header 56 with a hairline, home composer column 640, answer column 720, sources rail 336, phone gutter 16. 4px spacing scale: 4–8 within components, 12–16 between siblings, 24–32 between groups, 96–128 between marketing sections.

## Elevation & Depth

Flat at rest. Cards, tables and rows use a 7% hairline or nothing. Only floating layers (composer, popovers, menus, the sources panel) get a soft stacked shadow whose first layer is a 0.5px ring tinted with the ink. The composer has no CSS border; its edge is that ring.

## Shapes

Radius follows input: 16 for the composer, query bubble and follow-up rows; 12 for cards, popovers and menus; 8 for buttons, rows and inputs; 6 for chips; full for pills, icon buttons and toggles. Icons are 1.75-stroke line icons (Lucide/Tabler), 16px in controls, 18px in navigation.

## Components

- **Composer:** raised, radius 16, shadow ring; textarea 16/24 with accent caret; toolbar with +, optional segmented mode, ghost "Model", mic, and a 32px inverse submit circle at 50% until there's text.
- **Answer thread:** right-aligned question bubble (3.5% fill, radius 16) → one-line status ("Researched 8 sources") → serif answer in 720 → action row (sources pill + icon buttons) → follow-ups (hairline above, rows of "↳ question", 48 tall, radius 16 hover).
- **Citation chip:** after the claim; mono 10px domain label ("nesdis.noaa +1") on a 7% fill, radius 6. Hover opens a 336px popover with domain, title, snippet and a trust note.
- **Buttons:** primary inverse h32 radius 8 14px medium; outline with 15% hairline; tonal 7% fill; ghost; 32px round icon buttons. Marketing CTA h56 radius 12 18px.
- **Motion:** 75ms focus, 150ms colour and entrances (fade + 5px rise, expo-out), 300ms buttons. Nothing bounces.

## Do's and Don'ts

- Do keep one primary action per view, in inverse.
- Do set answers in a serif and keep them within 720px.
- Do write plain, short, sentence-case copy: questions as prompts, status in two words, empty states as facts.
- Don't fill buttons with the accent, colour links in answers, or use numbered superscript citations.
- Don't add shadows to resting cards, gradients, glass, glows, emoji, or feature grids of icon + title + blurb.
- Don't reproduce Perplexity's logo or font files.
