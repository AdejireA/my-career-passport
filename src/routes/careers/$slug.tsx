import { useEffect } from "react";
import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { getCareer } from "@/data/careers";
import { usePassport } from "@/hooks/use-passport";
import { useRequireAuthAction } from "@/hooks/use-require-auth-action";
import { buildRoadmapTasks } from "@/lib/roadmap";
import { TAG_LABEL } from "@/lib/types";

export const Route = createFileRoute("/careers/$slug")({
  loader: ({ params }) => {
    const career = getCareer(params.slug);
    if (!career) throw notFound();
    return { career };
  },
  component: CareerDetail,
});

function CareerDetail() {
  const { career } = Route.useLoaderData();
  const navigate = useNavigate();
  const { state, toggleSavedCareer, markExplored, toggleCompareCareer, ensureRoadmap } =
    usePassport();
  const requireAuthAction = useRequireAuthAction();

  useEffect(() => {
    markExplored(career.slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [career.slug]);

  const saved = state.savedCareers.includes(career.slug);
  const inComparison = state.comparisonCareers.includes(career.slug);
  const compareFull = state.comparisonCareers.length >= 3 && !inComparison;

  const startRoadmap = () =>
    requireAuthAction(() => {
      const level = state.profile?.level ?? "SS1";
      ensureRoadmap(career.slug, buildRoadmapTasks(career, level), level);
      navigate({ to: "/roadmap" });
    });

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <Link to="/careers" className="focus-ring kicker rounded-sm text-ink-soft hover:text-forest">
        ← All careers
      </Link>

      <div className="mt-6 space-y-3">
        <p className="kicker text-terracotta">{career.sector}</p>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-charcoal sm:text-5xl">
          {career.name}
        </h1>
        <p className="max-w-xl text-lg text-ink-soft">{career.tagline}</p>
        <div className="flex flex-wrap gap-x-3 gap-y-1 pt-1">
          {career.tags.map((t) => (
            <span key={t} className="text-xs text-sage-deep">
              {TAG_LABEL[t]}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button
          variant={saved ? "default" : "outline"}
          onClick={() => requireAuthAction(() => toggleSavedCareer(career.slug))}
        >
          {saved ? "Saved to your passport" : "Save this career"}
        </Button>
        <Button
          variant={inComparison ? "default" : "outline"}
          onClick={() => requireAuthAction(() => toggleCompareCareer(career.slug))}
          disabled={compareFull}
          title={compareFull ? "You can compare up to three careers at a time" : undefined}
        >
          {inComparison ? "Added to compare" : "Add to compare"}
        </Button>
        <Button variant="ghost" onClick={startRoadmap}>
          Build a roadmap for this
        </Button>
      </div>

      <div className="mt-12 space-y-10">
        <section>
          <p className="kicker mb-2 text-ink-soft">What the work involves</p>
          <p className="text-base leading-relaxed text-charcoal">{career.overview}</p>
        </section>

        <section>
          <p className="kicker mb-3 text-ink-soft">Typical responsibilities</p>
          <ul className="space-y-2">
            {career.responsibilities.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm text-charcoal">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <p className="kicker mb-3 text-ink-soft">Relevant interests and skills</p>
          <ul className="space-y-2">
            {career.interestsSkills.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm text-charcoal">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-forest" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <p className="kicker mb-3 text-ink-soft">Educational pathways</p>
          <ul className="space-y-3">
            {career.educationPathways.map((item, i) => (
              <li key={i} className="text-sm leading-relaxed text-charcoal">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <p className="kicker mb-3 text-ink-soft">Secondary school subjects worth investigating</p>
          <div className="flex flex-wrap gap-2">
            {career.subjects.map((s) => (
              <span
                key={s}
                className="rounded-full border border-border px-3 py-1 text-xs text-charcoal"
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        <section>
          <p className="kicker mb-3 text-ink-soft">Possible specialisations</p>
          <div className="flex flex-wrap gap-2">
            {career.specialisations.map((s) => (
              <span
                key={s}
                className="rounded-full border border-border px-3 py-1 text-xs text-charcoal"
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-terracotta-soft bg-terracotta-soft/50 p-6">
          <p className="kicker mb-2 text-terracotta">Try this</p>
          <p className="text-sm leading-relaxed text-charcoal">{career.tryThis}</p>
        </section>

        <section className="rounded-xl border border-mustard-soft bg-mustard-soft/50 p-6">
          <p className="kicker mb-2 text-charcoal">Needs verification</p>
          <p className="text-sm leading-relaxed text-charcoal">{career.verifyNote}</p>
        </section>
      </div>
    </div>
  );
}
