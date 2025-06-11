# Network Looking Glass UI

A modern front-end for the [Network Looking Glass API](https://github.com/robwdwd/lg-api), enabling BGP route lookups, ping, and traceroute operations on network devices.

Built with [Nuxt](https://nuxt.com), [Vue.js](https://vuejs.org), [NuxtUI](https://ui.nuxt.com), and [VueFlow](https://vueflow.dev).

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

## Environment Configuration

Copy `.env.example` to `.env` and adjust as needed:

```env
NITRO_PORT=8014
NUXT_APP_BASE_URL=/
NUXT_LG_API_SERVERS={"lgapi1":"http://127.0.0.1:8000/", "lgapi2":"http://127.0.0.1:8001/"}
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
- `NUXT_LG_API_SERVERS`: Looking Glass API URLs (server-side only)
- `NUXT_PUBLIC_SITE_TITLE`: UI title
- `NUXT_PUBLIC_MAX_LOCS_PING` / `NUXT_PUBLIC_MAX_LOCS_BGP`: Max locations for multi-ping/BGP
- `NUXT_PUBLIC_MAX_DEST_PING` / `NUXT_PUBLIC_MAX_DEST_BGP`: Max destinations for multi-ping/BGP
- `NUXT_PUBLIC_OUR_ASN`: Your network ASN (for AS Path flow chart)

> **Note:** The API can not be publicly exposed for security purposes if desired.

## Multiple Looking Glass API Backends

This UI can query multiple Looking Glass API backends at the same time.  
You configure these backends using the `NUXT_LG_API_SERVERS` environment variable, which should be a JSON object. Each key is a unique backend identifier (the `server_id`), and each value is the base URL for that backend.

**Example:**

```env
NUXT_LG_API_SERVERS={"lgapi1":"http://127.0.0.1:8000/", "lgapi2":"http://127.0.0.1:8001/"}
```

**How it works:**

- Each backend must run a compatible [Looking Glass API](https://github.com/robwdwd/lg-api) instance.
- When the UI fetches available locations, each backend returns its locations with its own `server_id`.
- The UI uses the `server_id` on each location to know which backend to use for each query.
- When a user selects multiple locations (possibly from different backends), the UI automatically splits and routes requests to the correct backend(s).
- Results from all backends are aggregated and displayed together in the UI.
- If some backends are unavailable or return errors, the UI will still show results from the others and display a warning about partial results.

**Notes:**

- All backend requests are made server-side for security and privacy.
- The backend key in `NUXT_LG_API_SERVERS` **must match** the `server_id` configured and returned by each Looking Glass API backend.
- The UI is designed to handle partial failures gracefully.

## Test Server

Run the test server (for use behind a reverse proxy):

```bash
pnpm run test     # or npm run test / yarn test / bun run test
```

## Deployment

See [Nuxt Deployment Docs](https://nuxt.com/docs/getting-started/deployment) for production deployment.

- **SSR only:** Static deployment is not supported.
- The client never directly communicates with the API; all requests are server-side for security purposes if required.
