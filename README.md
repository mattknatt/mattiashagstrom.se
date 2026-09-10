# mattiashagstrom-website

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## Landing page

The hero is a drag-to-reveal slider: pull right for the musician photo, left for
the developer photo. It supports pointer drag, keyboard (arrows, shift+arrows,
Home/End), and the three snap buttons underneath.

### Swapping in your own photos

1. Drop two landscape images into `public/images/` — 1600×1100 or larger.
2. Point `musician.image` and `developer.image` in `src/views/HomeView.vue` at them.
3. Delete the `note:` lines from those two objects (they render the dashed
   "swap for …" badges, which only ever show during `npm run dev`).

Everything else on the page — the copy, the craft cards, the work grid — is
placeholder text in `src/views/HomeView.vue`.
