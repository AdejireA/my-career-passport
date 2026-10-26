# Supabase setup

This app uses Supabase for authentication and to store each student's
profile, quiz answers, saved careers, comparisons, exploration history and
roadmaps. Row Level Security (RLS) is enabled on every table so a student can
only ever read or write their own rows.

## One-time setup

1. In the [Supabase dashboard](https://supabase.com/dashboard), open your
   project, go to **SQL Editor > New query**, and run each migration in
   `supabase/migrations/` **in order** (`0001_init.sql`, then `0002`, `0003`,
   `0004`, and any added later). Every migration is written to be safe to
   re-run.
   - `0001_init.sql` — tables, RLS policies, and the account-deletion function.
   - `0002_harden_delete_own_account.sql` — locks the account-deletion
     function down to signed-in users only (it was previously callable, as a
     harmless no-op, by anonymous requests).
   - `0003_add_roadmap_level.sql` — adds the column that remembers which
     school level (SS1/SS2/SS3) a roadmap's tasks were generated for.
   - `0004_fix_unsafe_electrical_activity.sql` — rewrites one already-saved
     roadmap task (electrical wiring) to a safer, research-only version for
     any student who generated an Electrician or Electrical/Electronics
     Engineer roadmap before that content fix shipped. Preserves every
     student's completed/done state; touches nothing else.
2. Copy `.env.example` to `.env` and fill in your project's URL and anon
   ("publishable") key from **Project Settings > API**. Never put the
   `service_role` / secret key in this file or anywhere in client code.
3. Check **Authentication > Providers > Email** is enabled, and decide
   whether "Confirm email" is on (recommended) — the sign-up page adapts to
   either setting.
4. Under **Authentication > URL Configuration**:
   - Set **Site URL** to your real deployed URL once you have one (it
     currently defaults to a placeholder, which would otherwise end up in
     emails sent before you update it).
   - Add every URL the app runs on — local dev (`http://localhost:5173`),
     each Netlify preview URL, and your production URL — to **Redirect
     URLs**. Sign-up confirmation and password-reset links are both rejected
     by Supabase if the app's origin isn't in this list, even though the app
     itself passes the correct origin as the redirect target.

## Notes on account deletion

`delete_own_account()` is a `SECURITY DEFINER` Postgres function that lets a
signed-in student delete their own `auth.users` row. Every other table
references `auth.users(id) on delete cascade`, so deleting the auth user
removes all of that student's data automatically. This project does not use
a service-role key anywhere client-side; deletion is entirely self-service
through this function.

## Before production deployment with real students

Secondary school students are minors, and this app does not currently collect
or verify age, nor does it present a privacy policy, terms, or a consent
step anywhere in the sign-up flow. Before this goes live with real students,
confirm:

- **Age verification and consent.** Nigeria's primary data protection law is
  now the **Nigeria Data Protection Act (NDPA) 2023**, not the older NDPR —
  it gives children stronger protection and specifically empowers the
  Nigeria Data Protection Commission (NDPC) to set rules for processing the
  data of a child of 13 and above who requests services directly, and
  requires age verification "where feasible." For a child under that
  threshold, or wherever your own policy sets the line, processing should go
  through parental/guardian consent, consistent with the Child Rights Act 2003. If you have users outside Nigeria, COPPA/GDPR-K may also apply. None
  of this is implemented in the app today — no age gate, no consent capture,
  no parental-contact flow.
- **A privacy policy and terms of use**, linked from the sign-up page, that
  honestly describe what's collected here (name, email, school level,
  subjects, interests, quiz answers, saved careers, roadmap notes) and how
  long it's kept. There is currently no such page.
- Your Supabase project's data residency is acceptable for the population
  you're serving.
- Email-confirmation and password-reset emails are sent from a domain you
  control (Supabase's default sending domain is rate-limited and meant for
  development only).
