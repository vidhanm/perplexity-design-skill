# Fonts

Perplexity uses in-house typefaces that are not available to use: **pplxSans** (a neo-grotesk descended from FK Grotesk Neue), **pplxSerif** (a sturdy text serif for answers), **pplxSansMono**, and **GT Canon** (a condensed display serif) on some marketing pages. Never copy their font files.

These open (SIL OFL) substitutes are the closest available and are what `tokens.css` uses:

| Role | Substitute | Why | Google Fonts family |
|---|---|---|---|
| `--font-sans` | **Geist** | tall x-height, straight terminals, variable weight so dark mode's 360/470 render | `Geist:wght@300..700` |
| `--font-serif` | **Source Serif 4** | moderate contrast, sturdy at 16px, optical sizes | `Source+Serif+4:opsz,wght@8..60,300..700` |
| `--font-display` | **Instrument Serif** | narrow and elegant at 64–80px | `Instrument+Serif` (marketing only) |
| `--font-mono` | **Geist Mono** | matches Geist; good at 10px in citation chips | `Geist+Mono:wght@400..500` |

Alternatives: Inter Tight for the sans (plain Inter is wider and reads generic); Newsreader for the serif (Perplexity's own marketing sites load it); JetBrains Mono for the mono.

Load the variable ranges, not fixed weights: dark mode uses 350–690 weights, which fixed files would round to 400/500/700 and look heavy.

If the user's project already has a brand typeface, use it in the role it fits (usually `--font-sans`) and keep Source Serif 4 for answers unless they object. See `references/rebrand.md`.
