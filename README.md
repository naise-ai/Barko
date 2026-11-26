# Barko

A complete, responsive D2C storefront concept for the pet dental-care PRD. The implementation uses Next.js for the storefront and Express for the API, with MongoDB support enabled through `MONGODB_URI`.

## Important

The product catalog is intentionally synthetic. It must not be used for a real sale until product, veterinary, legal, formulation, quality, content and operations sign-offs exist.

## Run

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env` and configure optional MongoDB
3. Start both apps: `npm run dev`
4. Open `http://localhost:3000`

API: `http://localhost:4000/api/v1`

## Workspace

- `apps/web` — Next.js App Router storefront
- `apps/api` — Express REST API
- `apps/api/test` — Node test runner checks

The API has in-memory demo behavior unless `MONGODB_URI` is set. Payment, shipping, email and analytics provider integrations are deliberately not represented as live services.
