# devsillabus-entrylevel
# DevSyllabus Auth App (Next.js 14)

Next.js 14 + Auth.js (Credentials) + Prisma + Tailwind.  
Protects private cohort content under `/dashboard` and `/admin`.

## Requirements

- Node.js 18+
- PostgreSQL (Neon, Vercel Postgres).  
  For local dev without Postgres, use SQLite:
  - Set `DATABASE_PROVIDER=sqlite`
  - `DATABASE_URL="file:./dev.db"`

## Setup

1. Install deps:

   ```bash
   npm install
   ```

   
cp .env.example .env.local
# Fill values: DATABASE_URL, NEXTAUTH_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
npm run prisma:migrate
npm run prisma:generate
npm run seed
npm run dev

