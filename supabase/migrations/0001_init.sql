-- My Career Passport: student accounts and data
-- Run this once in the Supabase SQL Editor (Project > SQL Editor > New query).
-- Safe to re-run: every statement is idempotent (create ... if not exists /
-- drop ... if exists before create).

-- ============================================================================
-- profiles
-- ============================================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  preferred_name text not null default '',
  school_level text,
  subjects text[] not null default '{}',
  interests text[] not null default '{}',
  has_career_in_mind boolean not null default false,
  career_in_mind text not null default '',
  active_roadmap_slug text,
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "profiles_delete_own" on public.profiles;
create policy "profiles_delete_own" on public.profiles
  for delete using (auth.uid() = id);

-- Auto-create a profile row whenever a new auth user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, preferred_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'preferred_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================================
-- quiz_responses (one row per student)
-- ============================================================================
create table if not exists public.quiz_responses (
  user_id uuid primary key references auth.users (id) on delete cascade,
  answers jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.quiz_responses enable row level security;

drop policy if exists "quiz_responses_all_own" on public.quiz_responses;
create policy "quiz_responses_all_own" on public.quiz_responses
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ============================================================================
-- saved_careers
-- ============================================================================
create table if not exists public.saved_careers (
  user_id uuid references auth.users (id) on delete cascade,
  career_slug text not null,
  saved_at timestamptz not null default now(),
  primary key (user_id, career_slug)
);

alter table public.saved_careers enable row level security;

drop policy if exists "saved_careers_all_own" on public.saved_careers;
create policy "saved_careers_all_own" on public.saved_careers
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ============================================================================
-- explored_careers
-- ============================================================================
create table if not exists public.explored_careers (
  user_id uuid references auth.users (id) on delete cascade,
  career_slug text not null,
  explored_at timestamptz not null default now(),
  primary key (user_id, career_slug)
);

alter table public.explored_careers enable row level security;

drop policy if exists "explored_careers_all_own" on public.explored_careers;
create policy "explored_careers_all_own" on public.explored_careers
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ============================================================================
-- comparison_careers
-- ============================================================================
create table if not exists public.comparison_careers (
  user_id uuid references auth.users (id) on delete cascade,
  career_slug text not null,
  added_at timestamptz not null default now(),
  primary key (user_id, career_slug)
);

alter table public.comparison_careers enable row level security;

drop policy if exists "comparison_careers_all_own" on public.comparison_careers;
create policy "comparison_careers_all_own" on public.comparison_careers
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ============================================================================
-- roadmaps + roadmap_tasks
-- ============================================================================
create table if not exists public.roadmaps (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  career_slug text not null,
  notes text not null default '',
  started_at timestamptz not null default now(),
  unique (user_id, career_slug)
);

alter table public.roadmaps enable row level security;

drop policy if exists "roadmaps_all_own" on public.roadmaps;
create policy "roadmaps_all_own" on public.roadmaps
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table if not exists public.roadmap_tasks (
  roadmap_id uuid not null references public.roadmaps (id) on delete cascade,
  task_id text not null,
  category text not null,
  label text not null,
  done boolean not null default false,
  primary key (roadmap_id, task_id)
);

alter table public.roadmap_tasks enable row level security;

drop policy if exists "roadmap_tasks_all_own" on public.roadmap_tasks;
create policy "roadmap_tasks_all_own" on public.roadmap_tasks
  for all using (
    exists (
      select 1 from public.roadmaps r
      where r.id = roadmap_tasks.roadmap_id and r.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.roadmaps r
      where r.id = roadmap_tasks.roadmap_id and r.user_id = auth.uid()
    )
  );

-- ============================================================================
-- Self-service account deletion
-- Lets a signed-in student delete their own auth user (and, via the
-- on-delete-cascade foreign keys above, every row of their data) in one
-- call: supabase.rpc('delete_own_account').
-- ============================================================================
create or replace function public.delete_own_account()
returns void
language plpgsql
security definer set search_path = public
as $$
begin
  delete from auth.users where id = auth.uid();
end;
$$;

grant execute on function public.delete_own_account() to authenticated;
