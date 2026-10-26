-- Adds a column recording which school level (SS1/SS2/SS3) a roadmap's task
-- list was generated for, so this survives page refreshes and new sessions
-- instead of living only in client-side React state.
--
-- Backward-compatible by design:
--   - The column is nullable. Existing roadmaps created before this
--     migration have no way to know what level they were generated for
--     (that information was never stored), so they are left NULL rather
--     than guessed at. The app treats NULL as "level unknown" and simply
--     omits the badge, instead of fabricating a level that may be wrong.
--   - No existing row's `notes`, `started_at` or any `roadmap_tasks` row
--     (including `done` state) is touched by this migration.
--   - Safe to re-run: `add column if not exists`.
-- Requires 0001_init.sql (which creates public.roadmaps) to have run first.

alter table public.roadmaps
  add column if not exists generated_for_level text;

alter table public.roadmaps
  drop constraint if exists roadmaps_generated_for_level_check;

alter table public.roadmaps
  add constraint roadmaps_generated_for_level_check
  check (generated_for_level is null or generated_for_level in ('SS1', 'SS2', 'SS3'));
