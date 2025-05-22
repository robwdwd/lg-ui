# Network Looking Glass UI

A modern front-end for the [Network Looking Glass API](https://github.com/robwdwd/lg-api), enabling BGP route lookups, ping, and traceroute operations on network devices.

Built with [Nuxt](https://nuxt.com), [Vue.js](https://vuejs.org), [NuxtUI](https://ui.nuxt.com), and [VueFlow](https://vueflow.dev).

---

## Quick Start

Install dependencies:

```bash
pnpm install      # or npm install / yarn install / bun install
```

Start the development server:

```bash
pnpm run dev      # or npm run dev / yarn dev / bun run dev
```

Build for production:

```bash
pnpm run build    # or npm run build / yarn build / bun run build
```

---

## Environment Configuration

Copy `.env.example` to `.env` and adjust as needed:

```env
NITRO_PORT=8014
NUXT_APP_BASE_URL=/
NUXT_PUBLIC_API_BASE=http://127.0.0.1:8000/
NUXT_PUBLIC_SITE_TITLE='Test Looking Glass'
NUXT_PUBLIC_MAX_LOCS_PING=3
NUXT_PUBLIC_MAX_DEST_PING=5
NUXT_PUBLIC_MAX_LOCS_BGP=3
NUXT_PUBLIC_MAX_DEST_BGP=2
NUXT_PUBLIC_OUR_ASN=64512
```

**Available variables:**

- `NITRO_PORT`: SSR server port
- `NUXT_APP_BASE_URL`: Base URL (e.g. `/lg/`)
- `NUXT_PUBLIC_API_BASE`: Looking Glass API URL (server-side only)
- `NUXT_PUBLIC_SITE_TITLE`: UI title
- `NUXT_PUBLIC_MAX_LOCS_PING` / `NUXT_PUBLIC_MAX_LOCS_BGP`: Max locations for multi-ping/BGP
- `NUXT_PUBLIC_MAX_DEST_PING` / `NUXT_PUBLIC_MAX_DEST_BGP`: Max destinations for multi-ping/BGP
- `NUXT_PUBLIC_OUR_ASN`: Your network ASN (for AS Path flow chart)

> **Note:** The API can not be publicly exposed for security purposes if desired.

---

## Test Server

Run the test server (for use behind a reverse proxy):

```bash
pnpm run test     # or npm run test / yarn test / bun run test
```

---

## Deployment

See [Nuxt Deployment Docs](https://nuxt.com/docs/getting-started/deployment) for production deployment.

- **SSR only:** Static deployment is not supported.
- The client never directly communicates with the API; all requests are server-side for security purposes if required.

---
