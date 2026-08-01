# Enguri Tower

A single-page restaurant website for **Enguri Tower** — cuisine of the Georgian
highlands, inspired by Svaneti. Built with plain HTML, CSS, and JavaScript.

## Pages

- `index.html` — home (hero, menu overview, contact)
- `dishes.html` — full dishes menu
- `drinks.html` — full drinks / bar menu
- `desserts.html` — desserts menu

## Features

- Icy / minimal light theme with thin horizontal rules that mirror the logo
- Hero uses the local `ushgli_Winter.webp` photo of Ushguli
- Bodoni Moda display typography paired with Inter for body text
- Snow particle effect in the hero (respects `prefers-reduced-motion`)
- Sticky navbar that subtly shifts on scroll
- Scroll-reveal animations for sections and cards
- Bilingual support: English / Georgian (`EN | KA` toggle in the navbar,
  preference saved in `localStorage`)
- Responsive layout with a mobile side-drawer nav

## Running

It's a static site. Just open `index.html` in a browser, or serve the folder
with any static server, e.g.:

```bash
python -m http.server 8080
```

Then visit <http://localhost:8080>.

## Customizing

- Colors / fonts — edit the CSS custom properties at the top of `styles.css`
- Hero image — replace `ushgli_Winter.webp` or change the path in the `.hero`
  rule inside `styles.css`
- Translations — all translatable text is wrapped in
  `<span class="lang-en">…</span><span class="lang-ka">…</span>` pairs; edit
  in place
- Menu items — edit the corresponding `dishes.html` / `drinks.html` /
  `desserts.html` files directly
