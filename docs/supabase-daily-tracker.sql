-- OurSpace OS Daily Tracker setup
-- Run this in the Supabase SQL editor for the project connected to the app.
-- Replace the example emails at the bottom with Hannah and Ian's real emails.

create extension if not exists pgcrypto;

create table if not exists public.app_members (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  display_name text not null,
  role text not null check (role in ('hannah', 'ian')),
  created_at timestamptz not null default now()
);

create table if not exists public.daily_entries (
  id uuid primary key default gen_random_uuid(),
  entry_date date not null unique,
  mood smallint not null check (mood between 1 and 10),
  note text not null default '',
  reply text not null default '',
  created_by uuid references auth.users(id) default auth.uid(),
  updated_by uuid references auth.users(id) default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.is_ourspace_member()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.app_members
    where lower(email) = lower(auth.email())
  );
$$;

create or replace function public.set_daily_entry_update_fields()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = now();
  new.updated_by = auth.uid();
  return new;
end;
$$;

drop trigger if exists set_daily_entries_updated_at on public.daily_entries;

create trigger set_daily_entries_updated_at
before update on public.daily_entries
for each row
execute function public.set_daily_entry_update_fields();

alter table public.app_members enable row level security;
alter table public.daily_entries enable row level security;

drop policy if exists "Members can read member list" on public.app_members;
drop policy if exists "Members can read daily entries" on public.daily_entries;
drop policy if exists "Members can create daily entries" on public.daily_entries;
drop policy if exists "Members can update daily entries" on public.daily_entries;
drop policy if exists "Members can delete daily entries" on public.daily_entries;

create policy "Members can read member list"
on public.app_members
for select
to authenticated
using (public.is_ourspace_member());

create policy "Members can read daily entries"
on public.daily_entries
for select
to authenticated
using (public.is_ourspace_member());

create policy "Members can create daily entries"
on public.daily_entries
for insert
to authenticated
with check (public.is_ourspace_member());

create policy "Members can update daily entries"
on public.daily_entries
for update
to authenticated
using (public.is_ourspace_member())
with check (public.is_ourspace_member());

create policy "Members can delete daily entries"
on public.daily_entries
for delete
to authenticated
using (public.is_ourspace_member());

revoke all on function public.is_ourspace_member() from public;
revoke all on function public.set_daily_entry_update_fields() from public;

grant execute on function public.is_ourspace_member() to authenticated;
grant usage on schema public to authenticated;
grant select on public.app_members to authenticated;
grant select, insert, update, delete on public.daily_entries to authenticated;

-- Add only the two approved sign-in emails here.
-- These rows are what keep the anon key from allowing unrestricted public writes.
insert into public.app_members (email, display_name, role)
values
  ('hannah@example.com', 'Hannah', 'hannah'),
  ('ian@example.com', 'Ian', 'ian')
on conflict (email) do update
set
  display_name = excluded.display_name,
  role = excluded.role;

-- Auth setup reminder:
-- 1. Supabase Dashboard > Authentication > Providers: enable Email.
-- 2. Authentication > URL Configuration: set Site URL to your deployed OurSpace URL.
-- 3. Add your deployed OurSpace URL and local http://localhost:5173 to Redirect URLs.
