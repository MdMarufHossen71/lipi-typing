-- Lipi initial schema: profiles, typing_results, lesson_progress.
-- Apply via `supabase db push` (Supabase CLI) or paste into the Supabase
-- dashboard SQL editor. Safe to run once; idempotent-ish via CREATE IF NOT
-- EXISTS where supported.

-- ============================================================
-- profiles (one row per auth.users entry, auto-created by trigger)
-- ============================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null default '',
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is 'Public profile data for Lipi accounts. Row owned by the matching auth.users entry.';

-- Keep updated_at fresh on every profile update.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Auto-create a profile whenever a new auth user appears.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1), 'User'),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- typing_results (mirrors the app's TestResult shape)
-- ============================================================
create table if not exists public.typing_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  legacy_id text,
  language text not null check (language in ('bn', 'en')),
  typing_method text not null check (typing_method in ('avro', 'bijoy', 'english')),
  typing_mode text not null check (typing_mode in ('timed', 'fixed', 'word', 'sentence', 'beginner', 'advanced')),
  duration_seconds integer not null default 0 check (duration_seconds >= 0),
  elapsed_seconds integer not null default 0 check (elapsed_seconds >= 0),
  total_typed integer not null default 0 check (total_typed >= 0),
  correct integer not null default 0 check (correct >= 0),
  incorrect integer not null default 0 check (incorrect >= 0),
  accuracy numeric(5, 2) not null default 0 check (accuracy >= 0 and accuracy <= 100),
  cpm integer not null default 0 check (cpm >= 0),
  wpm integer not null default 0 check (wpm >= 0),
  target text,
  created_at timestamptz not null default now()
);

comment on column public.typing_results.legacy_id is 'The client-side uid from localStorage (lipi:test-history) used to deduplicate migration uploads.';
comment on column public.typing_results.created_at is 'Set from the client test date during migration; defaults to insert time for fresh results.';

create index if not exists typing_results_user_created_idx
  on public.typing_results (user_id, created_at desc);

-- Deduplication of localStorage migration: one server row per legacy id.
create unique index if not exists typing_results_user_legacy_unique
  on public.typing_results (user_id, legacy_id)
  where legacy_id is not null;

-- ============================================================
-- lesson_progress (unique per user+lesson: no duplicate completions)
-- ============================================================
create table if not exists public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  lesson_id text not null,
  language text not null check (language in ('bn', 'en')),
  completed_at timestamptz not null,
  created_at timestamptz not null default now()
);

comment on column public.lesson_progress.lesson_id is 'Track-prefixed lesson id, e.g. "avro:avro-1", matching the app''s completion ids.';

create unique index if not exists lesson_progress_user_lesson_unique
  on public.lesson_progress (user_id, lesson_id);
create index if not exists lesson_progress_lesson_idx
  on public.lesson_progress (lesson_id);

-- ============================================================
-- Row Level Security — every user-owned table, all operations.
-- Users may only ever see or manipulate their own rows; auth.uid() is
-- evaluated server-side, so a spoofed user_id in the payload is rejected.
-- ============================================================
alter table public.profiles enable row level security;
alter table public.typing_results enable row level security;
alter table public.lesson_progress enable row level security;

-- profiles: read own; insert own (trigger upsert from client fallback);
-- update own (display_name / avatar_url only — no ownership escape).
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "profiles_delete_own" on public.profiles;
create policy "profiles_delete_own"
  on public.profiles for delete
  using (auth.uid() = id);

-- typing_results: full CRUD strictly on own rows.
drop policy if exists "typing_results_select_own" on public.typing_results;
create policy "typing_results_select_own"
  on public.typing_results for select
  using (auth.uid() = user_id);

drop policy if exists "typing_results_insert_own" on public.typing_results;
create policy "typing_results_insert_own"
  on public.typing_results for insert
  with check (auth.uid() = user_id);

drop policy if exists "typing_results_update_own" on public.typing_results;
create policy "typing_results_update_own"
  on public.typing_results for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "typing_results_delete_own" on public.typing_results;
create policy "typing_results_delete_own"
  on public.typing_results for delete
  using (auth.uid() = user_id);

-- lesson_progress: full CRUD strictly on own rows.
drop policy if exists "lesson_progress_select_own" on public.lesson_progress;
create policy "lesson_progress_select_own"
  on public.lesson_progress for select
  using (auth.uid() = user_id);

drop policy if exists "lesson_progress_insert_own" on public.lesson_progress;
create policy "lesson_progress_insert_own"
  on public.lesson_progress for insert
  with check (auth.uid() = user_id);

drop policy if exists "lesson_progress_update_own" on public.lesson_progress;
create policy "lesson_progress_update_own"
  on public.lesson_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "lesson_progress_delete_own" on public.lesson_progress;
create policy "lesson_progress_delete_own"
  on public.lesson_progress for delete
  using (auth.uid() = user_id);
