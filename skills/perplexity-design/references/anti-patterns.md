# Anti-patterns

Two lists: things Perplexity's design never does, and the generic AI-generated tells that make a page look like every other generated page. Each row says what to do instead. `scripts/lint.mjs` catches the mechanical ones.

## What this design never does

| Never | Instead |
|---|---|
| Fill the primary button with the accent | `--bg-inverse` (charcoal in light, pale grey in dark) |
| Colour links inside answers | ink with a soft underline that firms on hover |
| Numbered superscript citations `[1]` in brand colour | mono domain chips after the claim on `--bg-soft` |
| A ladder of unrelated greys (`#666`, `#999`, `#ccc`) | one ink at 100 / 75 (65 dark) / 50 / 20%, hairlines at 7 / 15% |
| Pure black text on pure white | ink `#0b2833` on `#fbfbfb`; raised `#fff` |
| The same font weights in dark and light | `--weight-*` tokens (400 → 360 in dark) |
| Answers in the UI sans at full width | serif 16/26 in a 720 column |
| Bold (700) headings everywhere | regular serif for headlines, medium sans for UI titles; bold only inside answers |
| Shadows on resting cards | hairline or nothing; shadows only on floating layers |
| A 1px solid border around the composer | `--shadow-composer` (0.5px ring + soft stack) |
| Radius 4 everywhere, or 20 everywhere | 6 chips · 8 controls · 12 cards · 16 inputs · full pills |
| A coloured sidebar or a sidebar border | `--bg-subtle` fill, no border |
| Uppercase section labels ("RECENTS") | sentence case, 14 secondary |
| Spinners for page loads | content-shaped skeletons; shimmering status text for work in progress |
| Bouncy, springy or long animations | 75 / 150 / 300ms, expo-out entrances, nothing overshoots |
| Toasts for every save | inline "Saved" next to the change |
| Illustrated empty states | one flat sentence in tertiary, maybe one action |

## Generic AI tells

These make a page read as generated, whatever the brand.

| Tell | Instead |
|---|---|
| Purple/indigo/violet gradients, gradient text, glowing blobs | flat grounds; let the product UI or one real image carry colour |
| A pill "eyebrow" above every hero ("✨ New: AI-powered…") | start with the headline |
| Feature grid: icon-in-a-circle + title + blurb, ×6 | 3–4 sections, one idea each, each with real UI |
| Stat band ("10x faster · 99.9% uptime · 500+ teams") | one specific proof: a named customer, a quote, a real number with context |
| Emoji as icons or bullet points | 1.75-stroke line icons, or no icon |
| Glassmorphism (`backdrop-filter: blur`) panels | opaque raised surfaces |
| Cards that lift and scale on hover | a fill or `--shadow-sm-hover`; at most `scale(1.01)` |
| `01 / 02 / 03` step numbering in huge type | short headings that say what happens |
| Arrows on every link ("Learn more →") | plain link text; an arrow only on the one link that leaves the page |
| Every heading centred, every paragraph centred | left-aligned text; centre only the home question and short section headings |
| Placeholder copy (lorem ipsum, "Feature one", "Your tagline here") | plausible, specific copy for the actual product |
| Inter or system font with no character | Geist + Source Serif 4 (or the brand's own pair) |
| A testimonial carousel | one quote, set in serif, with a name and role |
| "Get Started" / "Learn More" / "Sign Up" everywhere | verbs that name the outcome: "Ask your first question", "Compare plans" |
| Dark mode as an afterthought (inverted colours, same weights) | design both themes from tokens; check both |
