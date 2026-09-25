# Production Checklist

Use this before deploying OurSpace OS.

## Environment

- Set `VITE_SUPABASE_URL` in the production host.
- Set `VITE_SUPABASE_ANON_KEY` in the production host.
- Never add a Supabase service-role key to Vite environment variables.
- Keep `.env.local` local only; it is ignored by Git.

## Supabase

- Run `docs/supabase-daily-tracker.sql` in the Supabase SQL editor.
- Replace `hannah@example.com` and `ian@example.com` with the real sign-in emails before running the member insert.
- Confirm Email auth is enabled.
- Add the deployed site URL in Authentication > URL Configuration.
- Add both local and production redirect URLs.
- Confirm Row Level Security is enabled on `app_members` and `daily_entries`.

## Pre-Deploy Checks

- Run `npm run lint`.
- Run `npm run build`.
- Open the production preview locally and check desktop and mobile widths.
- Test Daily Tracker sign-in, save note, save reply, delete note, and calendar selection.
- Check the home Live Recap after saving a tracker entry.

## Privacy Note

The Daily Tracker uses Supabase Auth and RLS for real database protection. The
Anniversary Vault is a sentimental frontend lock only; do not place truly
sensitive secrets there unless the whole site is protected by hosting-level auth.
