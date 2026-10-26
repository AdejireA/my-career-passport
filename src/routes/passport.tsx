import { createFileRoute, Link } from "@tanstack/react-router";

import { PageKicker } from "@/components/page-kicker";
import { Button } from "@/components/ui/button";
import { CAREERS, getCareer } from "@/data/careers";
import { QUIZ_QUESTIONS } from "@/data/quiz";
import { useAuth } from "@/hooks/use-auth";
import { usePassport } from "@/hooks/use-passport";
import { requireAuth } from "@/lib/require-auth";
import { scoreQuiz } from "@/lib/matching";
import { TAG_LABEL } from "@/lib/types";

export const Route = createFileRoute("/passport")({
  beforeLoad: requireAuth,
  component: Passport,
});

function nextSuggestedAction(
  hasProfile: boolean,
  hasQuiz: boolean,
  savedCount: number,
  roadmapCount: number,
) {
  if (!hasProfile) return { label: "Tell us a little about yourself", to: "/onboarding" as const };
  if (!hasQuiz) return { label: "Answer the discovery questions", to: "/discover" as const };
  if (savedCount === 0) return { label: "Save a career you like", to: "/careers" as const };
  if (roadmapCount === 0)
    return { label: "Start a roadmap for a saved career", to: "/careers" as const };
  return { label: "Check off your next roadmap task", to: "/roadmap" as const };
}

function Passport() {
  const { state } = usePassport();
  const { signOut } = useAuth();

  const hasQuiz = Object.keys(state.quizAnswers).length > 0;
  const tagScores = hasQuiz ? scoreQuiz(state.quizAnswers, QUIZ_QUESTIONS, CAREERS).tagScores : [];
  const topTags = tagScores.filter((t) => t.score > 0).slice(0, 4);

  const savedCareers = state.savedCareers.map((slug) => getCareer(slug)).filter(Boolean);
  const exploredSorted = [...state.explored].sort((a, b) =>
    b.exploredAt.localeCompare(a.exploredAt),
  );
  const roadmapEntries = Object.values(state.roadmaps);
  const completedTasks = roadmapEntries.reduce(
    (sum, r) => sum + r.tasks.filter((t) => t.done).length,
    0,
  );

  const activeSlug =
    state.activeRoadmapSlug && state.roadmaps[state.activeRoadmapSlug]
      ? state.activeRoadmapSlug
      : roadmapEntries[0]?.careerSlug;
  const activeRoadmap = activeSlug ? state.roadmaps[activeSlug] : undefined;
  const activeCareer = activeSlug ? getCareer(activeSlug) : undefined;
  const nextTask = activeRoadmap?.tasks.find((t) => !t.done);

  const action = nextSuggestedAction(
    !!state.profile,
    hasQuiz,
    savedCareers.length,
    roadmapEntries.length,
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <PageKicker
        eyebrow="My passport"
        title={`Welcome back${state.profile?.name ? `, ${state.profile.name}` : ""}.`}
        description="A personal record of what you've discovered so far, not a scoreboard."
      />

      <div className="mt-10 rounded-xl border border-terracotta-soft bg-terracotta-soft/40 p-6">
        <p className="kicker text-terracotta">Next step</p>
        <p className="mt-1 font-display text-xl font-semibold text-charcoal">{action.label}</p>
        <Link
          to={action.to}
          className="focus-ring mt-4 inline-flex items-center justify-center rounded-md bg-forest px-5 py-2.5 text-sm font-medium text-ivory hover:bg-forest/90"
        >
          Go there
        </Link>
      </div>

      <div className="mt-12 grid gap-10 sm:grid-cols-2">
        <section>
          <p className="kicker mb-3 text-ink-soft">Current interests</p>
          {topTags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {topTags.map((t) => (
                <span
                  key={t.tag}
                  className="rounded-full border border-forest/30 bg-forest-soft px-3 py-1 text-xs text-charcoal"
                >
                  {TAG_LABEL[t.tag]}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-ink-soft">
              Not discovered yet.{" "}
              <Link to="/discover" className="link-underline text-forest">
                Take the discovery questions
              </Link>
              .
            </p>
          )}
        </section>

        <section>
          <p className="kicker mb-3 text-ink-soft">Completed actions</p>
          <p className="font-display text-3xl font-semibold text-charcoal">{completedTasks}</p>
          <p className="text-xs text-ink-soft">roadmap tasks checked off so far</p>
        </section>

        <section>
          <p className="kicker mb-3 text-ink-soft">Saved careers ({savedCareers.length})</p>
          {savedCareers.length > 0 ? (
            <ul className="space-y-1.5">
              {savedCareers.map((c) => (
                <li key={c!.slug}>
                  <Link
                    to="/careers/$slug"
                    params={{ slug: c!.slug }}
                    className="focus-ring link-underline text-sm text-forest"
                  >
                    {c!.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-ink-soft">Nothing saved yet.</p>
          )}
        </section>

        <section>
          <p className="kicker mb-3 text-ink-soft">
            Careers I&apos;ve explored ({exploredSorted.length})
          </p>
          {exploredSorted.length > 0 ? (
            <ul className="space-y-1.5">
              {exploredSorted.slice(0, 6).map((e) => {
                const c = getCareer(e.slug);
                if (!c) return null;
                return (
                  <li key={e.slug} className="text-sm text-charcoal">
                    <Link
                      to="/careers/$slug"
                      params={{ slug: c.slug }}
                      className="focus-ring link-underline text-forest"
                    >
                      {c.name}
                    </Link>
                    <span className="ml-2 text-xs text-ink-soft">
                      {new Date(e.exploredAt).toLocaleDateString()}
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-sm text-ink-soft">You haven&apos;t opened a career profile yet.</p>
          )}
        </section>
      </div>

      <section className="mt-12">
        <p className="kicker mb-3 text-ink-soft">Active roadmap</p>
        {activeRoadmap && activeCareer ? (
          <div className="rounded-xl border border-border p-6">
            <p className="font-display text-lg font-semibold text-charcoal">{activeCareer.name}</p>
            <p className="mt-1 text-sm text-ink-soft">
              {activeRoadmap.tasks.filter((t) => t.done).length}/{activeRoadmap.tasks.length} tasks
              done
            </p>
            {nextTask ? (
              <p className="mt-3 text-sm text-charcoal">
                Next: <span className="text-ink-soft">{nextTask.label}</span>
              </p>
            ) : (
              <p className="mt-3 text-sm text-charcoal">Every task is checked off. Nicely done.</p>
            )}
            <Link
              to="/roadmap"
              className="focus-ring link-underline mt-3 inline-block text-sm text-forest"
            >
              Open roadmap
            </Link>
          </div>
        ) : (
          <p className="text-sm text-ink-soft">No roadmap started yet.</p>
        )}
      </section>

      <section className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
        <div>
          <p className="kicker mb-2 text-ink-soft">Account</p>
          <p className="max-w-md text-sm text-ink-soft">
            Your progress is saved to your account, not this browser. Manage your profile or delete
            your account from{" "}
            <Link to="/profile" className="link-underline text-forest">
              My Profile
            </Link>
            .
          </p>
        </div>
        <Button variant="outline" onClick={() => signOut()}>
          Sign out
        </Button>
      </section>
    </div>
  );
}
