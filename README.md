<div align="center">

<img src="https://s3.login.no/beehive/img/logo/logo-white-small.svg" alt="Login logo" width="80" height="80" />

<h1>Uibee</h1>

<p>
  <img src="https://img.shields.io/badge/TypeScript-fd8738?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Bun-fd8738?style=flat-square&logo=bun&logoColor=white" alt="Bun" />
  <img src="https://img.shields.io/badge/React-fd8738?style=flat-square&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-fd8738?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
</p>

</div>

---

Uibee is the shared UI library for Login projects. It provides reusable components, hooks, types, and utilities used across Beehive, QueenBee, and other frontends.

## Getting Started

```bash
bun install
bun run build
```

## Project Structure

- `src/components/` - Reusable React components
- `src/hooks/` - Custom React hooks
- `src/utils/` - Utility functions
- `src/types/` - Shared TypeScript type definitions
- `src/styles/` - Global styles
- `src/scripts/` - Build and utility scripts

## Styles in a Tailwind app

Import `uibee/styles` once, and let the app's Tailwind scan uibee so its classes are generated in the app's own
`utilities` layer, sorted together with the app's classes:

```css
/* app globals.css */
@import 'tailwindcss';
@source '../../node_modules/uibee/dist';
```

uibee's prebuilt utilities ship in the lower `components` layer, so app classes (`lg:flex-row`, `md:block`) always win
without `!`. Without the `@source` line those prebuilt copies are the fallback, and a class the app also uses (e.g.
`p-3`) can then beat a uibee class it should lose to (e.g. `pr-10`).
