# Gaurang Bhogle — Portfolio

A responsive React portfolio for electrical engineering, applied AI, FPV, and creative technology. Deployed to GitHub Pages from `soulofswords-build-personal-portfolio`.

## Development

```sh
npm ci
npm run dev
npm test
npm run build
```

Vite serves the site at `/gaurang-bhogle-portfolio/`. The existing Pages workflow builds and publishes pushes to the deployment branch.

## Design and implementation

- A lazy-loaded Three.js chrome sculpture responds to the pointer. Rendering pauses outside the viewport, in hidden tabs, or when motion is disabled. Pixel ratio is capped, resources are disposed on unmount, and a CSS sculpture remains available when WebGL cannot initialize.
- Original CSS illustrations introduce the projects. They are labeled as concept visuals, not product screenshots.
- Project filters and native dialog details preserve the original project descriptions and external destinations. Dialog dismissal restores focus.
- Dark and light themes, keyboard navigation, a skip link, responsive layouts, and system reduced-motion preferences are supported. The hero motion control pauses continuous effects.
- Project, experience, education, and capability content lives in `src/data.ts`.

## Verification

`npm test` covers project filtering, expansion, dialog lifecycle and destinations, motion controls, theme persistence, and navigation dismissal. `npm run build` checks TypeScript and creates the production bundle. Visual QA should additionally check narrow screens and WebGL fallback in the target browsers.
