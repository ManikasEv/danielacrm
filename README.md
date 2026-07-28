# Daniela Studio CRM

Login-only team app (Clerk). Same visual language as the marketing site.

## Setup

1. Copy `.env.example` → `.env`
2. Set `VITE_CLERK_PUBLISHABLE_KEY` and `VITE_API_URL`
3. In Clerk Dashboard: **disable Sign-up** (Restrictions → Allowlist / Disable sign-ups)
4. Add CRM URL to Clerk allowed origins
5. `npm install && npm run dev` → http://localhost:5174

## Deploy (Netlify)

- Base directory: `crm`
- Build: `npm run build`
- Publish: `dist`
- Env: `VITE_CLERK_PUBLISHABLE_KEY`, `VITE_API_URL` (your Vercel API URL)
# danielacrm
