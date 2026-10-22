# Platform mapping

How to use the tokens in common stacks. In every case, `assets/tokens.css` stays the source of truth: import it once, then map names.

Contents
- Plain HTML / single file
- Tailwind CSS v4
- Tailwind CSS v3
- shadcn/ui
- Next.js fonts
- React Native and SwiftUI

## Plain HTML / single file

Link or inline, in order: fonts, `tokens.css`, `base.css`, `components.css`, then a small page `<style>` for layout only. For a deliverable that must be one file, paste the three CSS files into `<style>` blocks in that order. Keep the BRAND block at the top so the user can rebrand later.

Fonts:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300..700&family=Geist+Mono:wght@400..500&family=Source+Serif+4:opsz,wght@8..60,300..700&display=swap" rel="stylesheet" />
```
Add `&family=Instrument+Serif` only if the page uses `--font-display`.

Theme: tokens follow the OS. To add a toggle, set `document.documentElement.dataset.theme = "light" | "dark"`, and remove it to follow the OS again.

## Tailwind CSS v4

Import `tokens.css`, then `assets/tailwind-theme.css`, which maps the tokens into Tailwind's theme. It replaces Tailwind's colour palette entirely, so only token colours exist:

```css
@import "tailwindcss";
@import "./tokens.css";
@import "./tailwind-theme.css";
```

| Need | Utility |
|---|---|
| Surfaces | `bg-base`, `bg-raised`, `bg-subtle`, `bg-soft`, `bg-inverse` |
| Text | `text-primary`, `text-secondary`, `text-tertiary`, `text-on-inverse`, `text-accent` |
| Hairlines | `border-hairline` (soft, 7%), `border-edge` (base, 15%) |
| Radius | `rounded-chip` 6, `rounded-control` 8, `rounded-card` 12, `rounded-input` 16, `rounded-section` 24, `rounded-full` |
| Fonts | `font-sans`, `font-serif`, `font-mono` (resolve to the brand faces), `font-display`, `font-answer` |
| Weights (theme-aware) | `font-ui-regular`, `font-ui-medium`, `font-ui-semibold`, `font-ui-bold`, `font-serif-regular` |
| Elevation | `shadow-panel`, `shadow-panel-hover`, `shadow-float` (popovers, menus), `shadow-composer`, `shadow-composer-focus` |
| Type sizes | Tailwind's `text-xs/sm/base/lg` already match (12/16, 14/20, 16/24, 18/28); plus `text-3xs` (10, citation chips), `text-2xs` (11), `leading-answer` (26) |
| Dark variant | `dark:` follows `data-theme="dark"`; tokens already switch, so you rarely need it |

Example: `<form class="bg-raised rounded-input shadow-composer focus-within:shadow-composer-focus">`, `<p class="font-answer text-base leading-answer">`.

Don't use Tailwind's numeric font weights (`font-medium`, `font-semibold`): they don't thin in dark mode. Arbitrary colours (`bg-[#fff]`) bypass the themes, and the linter flags them.

## Tailwind CSS v3

```js
// tailwind.config.js
module.exports = {
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        base: "var(--bg-base)", raised: "var(--bg-raised)", subtle: "var(--bg-subtle)",
        soft: "var(--bg-soft)", inverse: "var(--bg-inverse)",
        primary: "var(--fg-primary)", secondary: "var(--fg-secondary)", tertiary: "var(--fg-tertiary)",
        "on-inverse": "var(--fg-inverse)", accent: "var(--accent)",
        positive: "var(--positive)", negative: "var(--negative)", warning: "var(--warning)",
      },
      borderColor: { soft: "var(--border-soft)", base: "var(--border-base)" },
      borderRadius: { chip: "6px", control: "8px", card: "12px", input: "16px", section: "24px" },
      boxShadow: { sm: "var(--shadow-sm)", md: "var(--shadow-md)", composer: "var(--shadow-composer)" },
      fontFamily: { sans: "var(--font-sans)", serif: "var(--font-serif)", mono: "var(--font-mono)", display: "var(--font-display)" },
    },
  },
};
```

## shadcn/ui

shadcn components read their own variable names. Point them at these tokens after importing `tokens.css`:

```css
:root, [data-theme] {
  --background: var(--bg-base);
  --foreground: var(--fg-primary);
  --card: var(--bg-raised);
  --card-foreground: var(--fg-primary);
  --popover: var(--bg-raised);
  --popover-foreground: var(--fg-primary);
  --primary: var(--bg-inverse);              /* primary buttons are inverse, not accent */
  --primary-foreground: var(--fg-inverse);
  --secondary: var(--bg-soft);
  --secondary-foreground: var(--fg-primary);
  --muted: var(--bg-subtle);
  --muted-foreground: var(--fg-secondary);
  --accent: var(--bg-subtle);                /* shadcn's "accent" is the hover fill */
  --accent-foreground: var(--fg-primary);
  --destructive: var(--negative);
  --border: var(--border-soft);
  --input: var(--border-base);
  --ring: var(--border-focus);
  --radius: 8px;
}
```

Note the name clash: shadcn's `--accent` is a hover surface, not a brand colour. Set it to `--bg-subtle` as above, and use this skill's accent as `var(--accent-base)` or a utility you define.

Then adjust the defaults that fight the system: `Button` default variant h-8 (32), text-sm medium; `Card` without shadow and with `border-soft`; `Input` h-10; popovers with `shadow-md`, rounded-xl (12).

## Next.js fonts

```ts
// app/fonts.ts
import { Geist, Geist_Mono, Source_Serif_4 } from "next/font/google";
export const sans = Geist({ subsets: ["latin"], variable: "--font-sans-next" });
export const serif = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif-next", axes: ["opsz"] });
export const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono-next" });
```
Put the three `.variable` classes on `<html>`, then in the BRAND block set `--font-sans: var(--font-sans-next), ui-sans-serif, system-ui, sans-serif;` (and the same for serif and mono).

## React Native and SwiftUI

There's no CSS cascade, so resolve the tokens per theme into constants. Copy the light and dark values from `references/tokens.md`, pre-composited where you can't use alpha. Keep the same names (`bgBase`, `fgSecondary`, `borderSoft`…), the type roles (sans 14/20 UI, serif 16/26 answers), the radius scale, and the weight change in dark mode (use `.regular` vs `.light`-adjacent weights where the platform font only has fixed steps). Use the system's native navigation and sheets; carry the system through colour, type, spacing and restraint rather than imitating web components.
