# Rebrand: apply this system to another brand

The point of this skill is Perplexity's *discipline*, and that transfers to any brand. Swap the brand's colours and fonts into the BRAND block of `assets/tokens.css`; keep the structure.

## What changes, what stays

| Change (BRAND block) | Keep (the system) |
|---|---|
| Ink for light and dark (`--brand-ink-*`) | one ink at fixed alphas for all text, hairlines and fills |
| Grounds (`--brand-ground-*`, `--brand-raised-*`) | two near-identical grounds, raised 1–2% lighter |
| Accent (`--brand-accent-*`, hover, active) | the accent's narrow job (caret, badges, featured plan, hover titles, meta links) |
| Inverse button colour (`--brand-inverse-light`) | primary actions are inverse, not accent |
| Fonts (`--font-sans`, `--font-serif`, `--font-display`, `--font-mono`) | the sans/serif split, the type roles and sizes, theme-tuned weights |
| Status colours if the brand has them | flat at rest, hairlines, radius scale, motion timings, copy rules |

## Steps

1. **Ink.** Give the light ink a trace of the brand hue: take the brand colour, drop its lightness to about 15–18% and its chroma to 15–25% of the original. (Perplexity's teal became `#0b2833`.) For dark ink, use a pale grey with a hint of the same hue around 88% lightness. If the brand is black-and-white, use a neutral near-black and near-white.
2. **Grounds.** Keep them nearly neutral: light `#fbfbfb`/`#ffffff`; dark around 9–11% lightness, nudged toward the brand hue (Perplexity's dark ground leans cool, `#15191d`). Warm brands can use a warm off-white (`#faf8f5`).
3. **Accent.** Put the brand colour here. In light mode it must reach 4.5:1 on the ground as text; if the brand colour is too light, use a darker step of it (Perplexity uses its 600 shade). In dark mode use a lighter, slightly desaturated step. Set hover one step darker (light) or lighter-but-deeper (dark).
4. **Inverse.** Usually leave it charcoal. Use a very dark version of the brand colour only if the brand insists. Never the accent itself.
5. **Fonts.** Map the brand's faces to the four roles. If the brand only has a sans, keep `--font-serif` for answers and headlines (Source Serif 4 pairs with most grotesks), or set `--font-answer` to the sans if they reject a serif. Load the weights the theme tokens use (including 360/470 for dark, which needs a variable font; otherwise round to 400/500).
6. **Check.** Run `node scripts/lint.mjs path/to/tokens.css`. It prints the contrast of primary, secondary and tertiary text and the accent against both grounds, and fails anything too low.

Keep the user's brand assets (logo, mandated colours, required fonts) even where they break a rule here, and say so in your report.

## Worked example: forest green + Inter

Brand: "Atlas", accent `#1F6F4A`, typeface Inter.

```css
:root {
  --brand-ground-light: #fbfbfa;
  --brand-raised-light: #ffffff;
  --brand-ink-light: #0e2a1f;      /* the green at ~16% lightness, low chroma */
  --brand-fill-light: #1c1c1c;
  --brand-inverse-light: #232624;
  --brand-ground-dark: #141917;
  --brand-raised-dark: #19201d;
  --brand-underlay-dark: #0f1312;
  --brand-ink-dark: #dbe2de;
  --brand-accent-light: #1f6f4a;   /* 5.9:1 on the ground: fine as text */
  --brand-accent-hover-light: #175538;
  --brand-accent-active-light: #103d28;
  --brand-accent-dark: #5aa982;
  --brand-accent-hover-dark: #3f8f68;
  --brand-accent-active-dark: #2f7353;
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-serif: "Source Serif 4", ui-serif, Georgia, serif;  /* keeps answers editorial */
}
```

Everything else (alphas, weights, radii, shadows, motion) stays as it is. Atlas now has Perplexity's calm, with its own colour showing up in the same few places Perplexity's teal does.
