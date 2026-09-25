# OurSpace OS

A light pastel React/Vite desktop for shared anniversary apps, memories, and the
Daily Tracker.

## Development

```bash
npm install
npm run dev
```

## Supabase Daily Tracker Setup

The Daily Tracker uses Supabase Auth and Postgres. The frontend only uses the
public anon key, while Row Level Security limits reads, writes, and deletes to
approved authenticated member emails.

1. Create a Supabase project.
2. Open the Supabase SQL editor and run `docs/supabase-daily-tracker.sql`.
3. Replace `hannah@example.com` and `ian@example.com` in the SQL with the real
   emails Hannah and Ian will use to sign in.
4. In Supabase Dashboard > Authentication > Providers, enable Email sign-in.
5. In Authentication > URL Configuration, set the Site URL to the deployed
   OurSpace URL.
6. Add redirect URLs for local and production, for example:

```text
http://localhost:5173
https://your-ourspace-domain.vercel.app
```

7. Copy `.env.example` to `.env.local` and fill in the values from Supabase
   Dashboard > Project Settings > API:

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-public-key
```

8. Restart the Vite dev server after adding environment variables.

## RLS Notes

The SQL creates:

- `app_members`, the allowlist for Hannah and Ian's authenticated emails.
- `daily_entries`, with a unique `entry_date`, a `mood` check from 1 to 10,
  `note`, `reply`, `created_at`, and `updated_at` fields.
- Row Level Security policies that reject anonymous requests and only allow
  authenticated users whose email exists in `app_members`.

Do not put Supabase service-role keys or other secrets in Vite environment
variables. Only use the anon public key on the frontend.
