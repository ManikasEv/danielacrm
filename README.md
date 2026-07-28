# Daniela Studio CRM

Login-only team app (Clerk). Same visual language as the marketing site.

## Setup

1. Copy `.env.example` → `.env`
2. Set `VITE_CLERK_PUBLISHABLE_KEY` and `VITE_API_URL`
3. In Clerk Dashboard: **disable Sign-up**
4. Add CRM URL to Clerk allowed origins
5. `npm install && npm run dev` → http://localhost:5174

## Deploy (Netlify) — “Site not found”

That page means Netlify has **no site** at that URL (never published, deleted, or wrong link). Recreate:

1. Netlify → **Add new site** → Import this Git repo
2. Build settings:
   - **Base directory:** `crm`
   - **Build command:** `npm run build`
   - **Publish directory:** `dist` (relative to `crm`)
3. Env vars:
   - `VITE_CLERK_PUBLISHABLE_KEY`
   - `VITE_API_URL` = `https://danielastudioserver.vercel.app`
4. Deploy, then use the **new** `*.netlify.app` URL from the deploy (don’t reuse a dead one)
5. Add that URL in Clerk allowed origins
6. Add it to Vercel `CORS_ORIGINS` as well

### CLI (from this folder)

```bash
cd crm
npm run build
npx netlify deploy --prod --dir=dist
```
