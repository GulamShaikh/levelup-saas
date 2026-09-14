<p align="center">
  <img src="src/assets/logo.jpg" alt="LevelUp" width="220" />
</p>

<h1 align="center">LevelUp</h1>
<p align="center">The all-in-one workspace for student communities — events, learning, projects, achievements and recognition.</p>

## Screenshots

### Homepage
![Homepage](docs/screenshots/1-homepage.png)

### Community
![Community](docs/screenshots/2-community.png)

### Sign in
![Sign in](docs/screenshots/3-login.png)

### Student dashboard
![Student dashboard](docs/screenshots/4-student-dashboard.png)

### My Journey — light & dark
Same page, synced theme toggle — one click, every page follows instantly.

<table>
  <tr>
    <td><img src="docs/screenshots/5-my-journey-light.png" alt="My Journey — light mode" /></td>
    <td><img src="docs/screenshots/5.1-my-journey-dark.png" alt="My Journey — dark mode" /></td>
  </tr>
</table>

### Admin dashboard
![Admin dashboard](docs/screenshots/6-admin-dashboard.png)

## Tech stack

- [TanStack Start](https://tanstack.com/start) — React 19, server-rendered
- [TanStack Router](https://tanstack.com/router) + [TanStack Query](https://tanstack.com/query)
- Tailwind CSS v4 + [shadcn/ui](https://ui.shadcn.com) (Radix UI primitives)
- react-hook-form + zod for forms and validation
- Recharts for analytics, Sonner for toasts, Lucide for icons

## Status

The frontend is complete — marketing site, auth flows, student workspace, admin dashboard, and a light/dark theme that stays in sync across tabs. It currently runs on local mock data (see `src/lib/mock-data.ts`) rather than a live backend, so nothing persists yet — that's the next step.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL printed in the terminal.

```bash
npm run build     # production build
npm run preview   # serve the production build locally
```
