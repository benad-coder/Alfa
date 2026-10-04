# AlfaVogue

A premium men's fashion brand website showcasing shirt collections with a full product API, gallery, and contact form.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/alfavogue run dev` — run the frontend (port 18860)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string
- Commerce env: `PAYSTACK_SECRET_KEY`, `PAYSTACK_CALLBACK_URL` (or `APP_URL`), `ORDER_CURRENCY=GHS`, `DELIVERY_FEE_GHS`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `PRODUCER_FALLBACK_EMAIL`, and optional `PRODUCER_FALLBACK_NAME`

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS, wouter, TanStack Query, shadcn/ui
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- **OpenAPI spec**: `lib/api-spec/openapi.yaml` — source of truth for all API contracts
- **DB schema**: `lib/db/src/schema/` — products, gallery, contact, producers, orders, payments, and notifications
- **API routes**: `artifacts/api-server/src/routes/` — products, gallery, contact, health, checkout, orders, and Paystack webhook
- **Frontend**: `artifacts/alfavogue/src/` — pages, components, hooks
- **Generated hooks**: `lib/api-client-react/src/generated/api.ts`
- **Generated Zod schemas**: `lib/api-zod/src/generated/api.ts`

## Architecture decisions

- Contract-first OpenAPI approach: spec gates codegen which gates the frontend
- All API routes validate inputs and outputs using Orval-generated Zod schemas
- PostgreSQL via Drizzle ORM (not SQLite as originally proposed — Replit provides managed Postgres)
- `numeric` type for product prices in DB, cast to `Number` in API responses
- Frontend served at `/` root path, API at `/api`

## Product

- **Home**: Hero, featured products grid, brand intro, CTA
- **About**: Brand story, mission, craftsmanship values
- **Services**: Short Sleeve, Long Sleeve, Styling Consultation
- **Gallery**: Visual grid of product/lifestyle imagery
- **Contact**: Inquiry form (name, email, phone, subject, message)
- **Product detail**: Individual product pages

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- After any OpenAPI spec change, always re-run `pnpm --filter @workspace/api-spec run codegen`
- `numeric` fields from Drizzle come back as strings — cast to `Number()` before sending in API responses
- `/products/featured` must be registered before `/products/:id` in the router to avoid param matching
- Paystack webhook URL is `/api/payments/paystack/webhook`; it must use the raw request body for HMAC-SHA512 validation.
- Existing order/admin endpoints follow the current app's convention and do not introduce a new authentication system. Protect the admin surface before exposing it publicly.
- Products with no producer association use `PRODUCER_FALLBACK_EMAIL` for producer notifications. Checkout fails explicitly when that fallback is not configured.

## Paid orders handoff

Checkout accepts product IDs and quantities only. Prices, delivery fees, totals, payment status, and order status are calculated or changed server-side. The API creates a pending order and Paystack transaction in GHS, then verifies the provider transaction before marking the payment `Paid` and order `Confirmed`.

Configure the Paystack dashboard webhook to the exact URL above. Paystack callback pages should call `POST /api/orders/{orderNumber}/confirm`; duplicate callbacks and webhooks are safe. Failed Resend deliveries remain in `notifications` with `status=Failed` and can be retried with `POST /api/orders/{orderNumber}/notifications/retry`.

Manual test flow:

1. Set development environment values without committing credentials.
2. Add products with prices and optional producer records, then associate products to producers.
3. `POST /api/orders/checkout` with customer details, product IDs/quantities, and a stable `Idempotency-Key`.
4. Complete a Paystack test payment, call the confirmation endpoint, and verify the order is `Paid`/`Confirmed`.
5. Replay the callback and signed webhook; verify no second payment or notification is created.
6. Temporarily make Resend reject requests, confirm the order remains paid and notification rows become retryable.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
