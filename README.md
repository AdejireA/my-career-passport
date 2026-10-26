# My Career Passport

**Discover your interests. Explore possibilities. Plan your future.**

My Career Passport is a career discovery and planning web application developed for the **Pathway Clarity Ideathon**, designed to help Nigerian secondary school students (SS1–SS3) make more informed career decisions.

The application combines interest discovery, explainable career suggestions, accessible career information, career comparison, and personalised educational and career roadmaps.

## Table of contents

- [Project background](#project-background)
- [Design-thinking process](#design-thinking-process)
- [The solution](#the-solution)
- [Student experience](#student-experience)
- [Technology stack](#technology-stack)
- [Local setup](#local-setup)
- [Development commands](#development-commands)
- [Testing](#testing)
- [Deployment](#deployment-netlify)
- [Project status and limitations](#project-status-and-limitations)

## Project background

Many secondary school students in Nigeria struggle to make informed career decisions. This is rarely because they lack ambition — it is because they face **inadequate career guidance**, **limited exposure to real professionals and workplaces**, **insufficient knowledge of the actual pathways into different careers**, and **social or parental pressure** that can crowd out a student's own interests and abilities from the decision.

**Problem statement:**

> Students need a clear and accessible way to understand their interests, abilities, career options, and the steps required to achieve their career goals because many students lack adequate career guidance and practical exposure when making important career decisions.

**How Might We:**

> How might we help students better understand their interests, abilities, and career options so they can make informed career choices and develop realistic plans for achieving their career goals?

## Design-thinking process

My Career Passport came out of a structured design-thinking process:

1. **Unpacking the problem** and identifying its underlying causes.
2. **Applying the 5 Whys** to investigate the root issue behind poor career decision-making among students.
3. **Developing the problem statement** above.
4. **Creating the How Might We question** above.
5. **Generating eight solution ideas** using a Crazy 8s exercise.
6. **Shortlisting two ideas**: My Career Passport and Career Day Without Borders.
7. **Selecting My Career Passport** as the concept to take forward into an initial digital prototype.

Elements of the Career Day Without Borders concept directly inspired the **Career Stories** feature in the app — the idea of bringing a professional's day-to-day experience to students who may never otherwise meet someone in that field.

This README does not claim that student interviews or formal user-validation exercises were conducted as part of this process; none are documented, so none are claimed here.

## The solution

What's actually implemented in this repository today:

- **Authentication** — Supabase email/password accounts: sign up, sign in, sign out, forgot/reset password, and persistent sessions. No custom authentication system.
- **Student onboarding and profile management** — name, school level (SS1–SS3), subjects, interests, and whether the student already has a career in mind; editable later from a profile page.
- **A nine-question interest discovery quiz** — explainable and rule-based, not a psychometric assessment. Every suggestion traces back to the specific answers that produced it.
- **Explainable career matching** — a deterministic scoring engine (`src/lib/matching.ts`) that matches a student's answers to careers sharing the same underlying interest tags, with per-question weighting so a direct "who sounds interesting" pick doesn't outweigh several independent trait-based answers.
- **Career Explorer** — a searchable, filterable library of 24 career profiles across 9 sectors, independent of quiz results and always browsable.
- **Vocational and technical career pathways** — 7 of the 24 profiles (Electrician, Automotive Technician, ICT Support Technician, Caterer/Culinary Professional, Renewable Energy Technician, Agricultural Technician, Hospitality Professional) explicitly document non-degree routes: technical college, apprenticeship, trade test, and polytechnic ND/HND, alongside the university-track careers.
- **Career comparison** — up to three careers side by side.
- **Career Stories** — short first-person accounts connected to specific careers, **clearly labelled as fictional placeholders** written for the prototype, not real testimonials (see [Project status and limitations](#project-status-and-limitations)).
- **School-level-aware roadmaps** — SS1, SS2, and SS3 students generate different, level-appropriate next steps for the same career. A roadmap's task list is generated once and never silently regenerated, so a student's saved progress is always preserved even if the generator or their profile changes later.
- **Saved careers and exploration history** — tracked per student.
- **My Passport dashboard** — brings profile, quiz results, saved careers, and roadmap progress together in one place.
- **Student account deletion** — self-service, via a Postgres function the student calls directly; no admin or service-role access is used or required.
- **Responsive design and custom branding** — a purpose-built logo, favicon, and layout that adapts across mobile, tablet, and desktop, including an accessible mobile navigation menu.

## Student experience

1. A student lands on the homepage and creates an account (email + password).
2. After confirming their email, they complete a short **onboarding** flow: name, school level, subjects, and interests.
3. They take the **nine-question discovery quiz**, answering honestly rather than "correctly" — there are no right answers.
4. They see their **results**: the interests their answers point toward, and a list of careers connected to those interests, each with a plain-language explanation of *why* it was suggested.
5. From there, they can **explore the full career library**, **compare up to three careers**, and **save** the ones worth a closer look.
6. For any career, they can generate a **roadmap** — a level-appropriate checklist of skills to explore, requirements to verify, practical activities, questions to ask a professional, and short-term milestones.
7. Everything — profile, quiz answers, saved careers, exploration history, and roadmap progress — is saved to their account and is waiting for them the next time they sign in.

## Technology stack

| Layer | Technology |
|---|---|
| Framework | [TanStack Start](https://tanstack.com/start) (file-based routing, SSR) + [TanStack Router](https://tanstack.com/router) |
| UI | React 19, TypeScript |
| Build tool | [Vite](https://vite.dev/) 8 |
| Package manager / runtime | [Bun](https://bun.sh) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Database & Auth | [Supabase](https://supabase.com/) (PostgreSQL + email/password authentication), with Row Level Security enabled on every table |
| Deployment | [Netlify](https://www.netlify.com/), via the official [`@netlify/vite-plugin-tanstack-start`](https://docs.netlify.com/build/frameworks/framework-setup-guides/tanstack-start/) |
| Testing | [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) |

## Local setup

You need [Bun](https://bun.sh) installed.

```sh
git clone <this-repository-url>
cd my-career-passport
bun install
```

### Environment variables

Copy `.env.example` to `.env` and fill in your own Supabase project's
values (from **Project Settings > API** in the Supabase dashboard):

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Your Supabase anon/publishable key — safe to expose in client code. Never put a `service_role`/secret key here or anywhere in client code. |

### Database setup

Run every file in `supabase/migrations/` **in numeric order** once, in your
Supabase project's **SQL Editor** (each is written to be safe to re-run).
See [`supabase/README.md`](supabase/README.md) for what each migration does
and what else to configure in the Supabase dashboard (email confirmation,
redirect URLs, etc.) before accepting real sign-ups.

## Development commands

| Command | Description |
|---|---|
| `bun run dev` | Start the dev server |
| `bun run build` | Production build (outputs to `dist/`) |
| `bun run preview` | Serve the production build locally |
| `bun run test` | Run the test suite once |
| `bun run test:watch` | Run tests in watch mode |
| `bun run lint` | Run ESLint |
| `bun run format` | Run Prettier |

## Testing

The repository includes an automated test suite (`bun run test`, Vitest):
as of this writing, **21 tests across 4 files**, all passing, covering:

- Routing (the app matches a real page for `/` rather than falling back to a 404).
- The quiz-matching engine: that answers correctly influence suggestions, that every matched suggestion carries a reason traceable to a real answer, per-question weighting, and matching behaviour across varied interest patterns (agriculture, creative, technical trades, healthcare, business).
- Career library integrity: no duplicate slugs or names, every career has non-empty required fields and a valid sector, the vocational/technical careers document real non-degree routes, and every career story is explicitly marked fictional or verified.
- Roadmap generation and persistence: that `buildRoadmapTasks` produces a genuinely different task set per school level, and that re-opening an existing roadmap never regenerates or resets a student's already-completed tasks.

TypeScript (`tsc --noEmit`), ESLint, and a production build are also run as part of verifying changes to this project; see [Project status and limitations](#project-status-and-limitations) for what automated testing does *not* yet cover.

## Deployment (Netlify)

This is a server-rendered TanStack Start app, not a static site — it's
deployed via the official [`@netlify/vite-plugin-tanstack-start`](https://docs.netlify.com/build/frameworks/framework-setup-guides/tanstack-start/)
plugin, already wired into `vite.config.ts`, with build settings in
`netlify.toml` (`vite build`, publishing `dist/client`).

To deploy:

1. Connect this repository to a new Netlify site (via the Netlify dashboard
   or `netlify init`/`netlify deploy` with the Netlify CLI, v17.31+).
2. In the Netlify site's **Environment variables**, set `VITE_SUPABASE_URL`
   and `VITE_SUPABASE_PUBLISHABLE_KEY` to the same values as your `.env`.
3. In Supabase's **Authentication > URL Configuration**, add the Netlify
   site's URL (and every preview-deploy URL you'll use) to **Redirect
   URLs**, and update **Site URL** once you have a stable production domain.
4. Deploy. Netlify builds with `vite build` and serves the SSR output as a
   Netlify Function automatically — no separate server process to manage.

## Project status and limitations

This section is kept intentionally honest about what has and hasn't been verified, since this is a student-facing prototype, not a finished production product.

**Implemented and working:**
- All features listed in [The solution](#the-solution) above are built and present in the codebase.
- Authentication, database reads/writes, and Row Level Security policies have been verified directly against a live Supabase project (not just read from code) — including that one student cannot read or write another student's data.

**Automated tests:** 21/21 passing (`bun run test`); typecheck, lint, and production build all pass. These confirm the code behaves as written — they do not confirm real students find the product usable or clear.

**Authentication and integration testing still requiring confirmation:** the backend (sign-up, email confirmation, sign-in, password reset request, profile updates, account deletion) has been exercised end-to-end using disposable test accounts against the live database. A full, manual click-through of every authenticated page in an actual browser session has not been completed in every verification pass — treat this as recommended before a public launch, not as done.

**Deployment preparation vs. live deployment:** Netlify deployment is *configured and build-verified* (the production build succeeds locally with the Netlify plugin active). There is no confirmed, currently-live public URL referenced in this repository — deployment has not been executed from within this environment, and any live URL should be added here once one actually exists.

**Student usability testing:** has not been conducted. No real students have used this application, and no usability findings are reflected in the current design.

**Career Stories:** every story currently in the app is an explicitly labelled **fictional placeholder**, written for the prototype — not a real professional's account. The data model (`src/data/stories.ts`) distinguishes `"fictional"` from `"verified"` stories so real, consented interviews can be added later without a structural change, but none exist yet.

**Privacy, consent, and production-readiness:** secondary school students are minors. The application currently has **no age verification, no consent step, and no privacy policy or terms of use** anywhere in the sign-up flow. Nigeria's Data Protection Act (NDPA) 2023 gives children added protection and requires age verification "where feasible," with parental-consent handling for younger children consistent with the Child Rights Act 2003. This is a real, unresolved requirement — not yet addressed — before any real (non-test) student should be invited to register. See [`supabase/README.md`](supabase/README.md) for further detail.
