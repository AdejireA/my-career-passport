-- Safety fix: the "Electrician" and "Electrical / Electronics Engineer"
-- career profiles previously included a practical activity instructing
-- students to personally study live household wiring ("switch, bulb,
-- socket"). That text is removed from src/data/careers.ts going forward,
-- but any student who already generated a roadmap for one of these two
-- careers before this fix has that unsafe instruction permanently stored
-- as a roadmap_tasks row (task_id = 'activity-try').
--
-- This targets ONLY that exact task row (by task_id AND the old label
-- text, so it can never match anything else) and replaces its label with
-- the safe, research-only activity. It does not touch `done`, so a
-- student's completion state for that task is preserved exactly as it
-- was. No other row, roadmap, or student is affected.
--
-- Safe to re-run: the WHERE clause only matches the old unsafe text, so
-- running this twice is a no-op the second time.
update public.roadmap_tasks
set label = 'Research what electricians do, identify three common tools they use, and learn how electrical safety is maintained in homes and workplaces.'
where task_id = 'activity-try'
  and label = 'With an adult''s supervision, study how the wiring of one room in your house works: switch, bulb, socket. Draw the circuit you think is behind the wall and check your idea with a teacher or electrician.'
  and exists (
    select 1 from public.roadmaps r
    where r.id = roadmap_tasks.roadmap_id and r.career_slug = 'electrician'
  );

update public.roadmap_tasks
set label = 'Research what electrical/electronics engineers do, identify three common tools or instruments they use, and learn how electrical safety is maintained in the systems they design or maintain.'
where task_id = 'activity-try'
  and label = 'With an adult''s supervision, study how the wiring of one room in your house works: switch, bulb, socket. Draw the circuit you think is behind the wall and check your idea with a teacher or electrician.'
  and exists (
    select 1 from public.roadmaps r
    where r.id = roadmap_tasks.roadmap_id and r.career_slug = 'electrical-engineer'
  );
