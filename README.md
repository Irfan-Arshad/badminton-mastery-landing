# Badminton Mastery: Core Foundations

Modern, responsive landing page for a paid video course. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn-style UI, framer-motion, Prisma (SQLite in dev), and Vitest tests.

## Quick Start

1. Install dependencies

   ```bash
   npm i
   ```

2. Configure env

   - Copy `.env.example` to `.env` and adjust if needed. SQLite default is fine.

3. Setup database

   ```bash
   npx prisma migrate dev --name init
   ```

4. Run the app

   ```bash
   npm run dev
   ```

Open http://localhost:3000

## Scripts

- `dev` – Run Next dev server
- `build` – Build production bundle
- `start` – Start production server
- `lint` – ESLint
- `format` – Prettier format
- `test` – Vitest unit tests

## Stack

- Next.js 14 App Router + TypeScript
- Tailwind CSS (custom theme via CSS variables)
- shadcn-style UI primitives (in `components/ui`)
- framer-motion for animations
- react-hook-form + zod for validation
- Prisma + SQLite (dev)
- Nodemailer prepared (optional)
- Vitest for unit tests

## Database & Prisma

SQLite is used in dev. The Prisma schema is in `prisma/schema.prisma` with model:

```
model Waitlist {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  phone     String
  consent   Boolean
  createdAt DateTime @default(now())
}
```

Generate client (runs on postinstall as well):

```bash
npx prisma generate
```

Migrate dev DB:

```bash
npx prisma migrate dev --name init
```

View entries in Prisma Studio:

```bash
npx prisma studio
```

## API

- `POST /api/waitlist` – Adds signup (name, email, phone, consent). Validated by zod, rate limited per IP (5/min). Returns `{ success: true, count }`.
  - 400 validation error, 409 duplicate email, 429 rate limit
- `GET /api/waitlist/count` – Returns `{ count }`.

Rate limiting is in-memory and resets on server restart.

## Emails

Nodemailer transport is prepared in `lib/email.ts`. Set `SMTP_*` env vars to enable. No emails are sent by default.

## Tests

Run unit tests:

```bash
npm run test
```

Tests cover validation and API handler basics (with mocked DB) plus rate-limit behavior.

## Accessibility & SEO

- Semantic HTML, keyboard navigable controls, focus-visible rings
- Respects `prefers-reduced-motion`
- Open Graph + Twitter meta
- JSON-LD Organization + WebSite schema in layout

## Theming

Tailwind uses CSS variables for background, foreground, muted, accent (emerald/teal accent with slate neutrals). See `styles/globals.css` and `tailwind.config.ts`.

## Switching to Postgres Later

1. Update datasource in `prisma/schema.prisma`:

```
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

2. Set `DATABASE_URL` to a Postgres connection string

3. Run `npx prisma migrate dev`

## GDPR Note

The waitlist form collects name, email, and phone solely to notify users about the course. Consent is required and stored. Users can request deletion at any time.

