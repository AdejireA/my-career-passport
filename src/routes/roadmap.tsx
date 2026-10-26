import { createFileRoute, Link } from "@tanstack/react-router";

import { PageKicker } from "@/components/page-kicker";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getCareer } from "@/data/careers";
import { usePassport } from "@/hooks/use-passport";
import { requireAuth } from "@/lib/require-auth";
import { ROADMAP_SECTIONS, buildRoadmapTasks } from "@/lib/roadmap";

export const Route = createFileRoute("/roadmap")({
  beforeLoad: requireAuth,
  component: Roadmap,
});

function Roadmap() {
  const { state, ensureRoadmap, toggleRoadmapTask, setRoadmapNotes, setActiveRoadmap } =
    usePassport();

  const roadmapSlugs = Object.keys(state.roadmaps);
  const candidateSlugs = Array.from(
    new Set([...state.savedCareers, ...state.explored.map((e) => e.slug)]),
  );
  const activeSlug =
    state.activeRoadmapSlug && state.roadmaps[state.activeRoadmapSlug]
      ? state.activeRoadmapSlug
      : roadmapSlugs[0];
  const activeRoadmap = activeSlug ? state.roadmaps[activeSlug] : undefined;
  const activeCareer = activeSlug ? getCareer(activeSlug) : undefined;

  const total = activeRoadmap?.tasks.length ?? 0;
  const done = activeRoadmap?.tasks.filter((t) => t.done).length ?? 0;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <PageKicker
        eyebrow="My next steps"
        title="Your career roadmap."
        description="Turn a career you like into a practical, checkable plan. Switch careers any time without losing what you've already built."
      />

      <div className="mt-8 flex flex-wrap items-center gap-3">
        {roadmapSlugs.length > 0 ? (
          <Select value={activeSlug ?? ""} onValueChange={setActiveRoadmap}>
            <SelectTrigger className="w-64" aria-label="Choose a roadmap">
              <SelectValue placeholder="Choose a roadmap" />
            </SelectTrigger>
            <SelectContent>
              {roadmapSlugs.map((slug) => (
                <SelectItem key={slug} value={slug}>
                  {getCareer(slug)?.name ?? slug}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : null}

        {candidateSlugs.filter((s) => !roadmapSlugs.includes(s)).length > 0 ? (
          <Select
            onValueChange={(slug) => {
              const career = getCareer(slug);
              const level = state.profile?.level ?? "SS1";
              if (career) ensureRoadmap(slug, buildRoadmapTasks(career, level), level);
            }}
          >
            <SelectTrigger className="w-64" aria-label="Start a roadmap for a career">
              <SelectValue placeholder="Start a roadmap for..." />
            </SelectTrigger>
            <SelectContent>
              {candidateSlugs
                .filter((s) => !roadmapSlugs.includes(s))
                .map((slug) => (
                  <SelectItem key={slug} value={slug}>
                    {getCareer(slug)?.name ?? slug}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        ) : null}
      </div>

      {!activeRoadmap || !activeCareer ? (
        <p className="mt-10 text-sm text-ink-soft">
          Save or explore a career first, then come back to build a roadmap for it.{" "}
          <Link to="/careers" className="link-underline text-forest">
            Browse careers
          </Link>
          .
        </p>
      ) : (
        <div className="mt-10">
          <div className="rounded-xl border border-border bg-sage/30 p-6">
            <p className="kicker text-terracotta">{activeCareer.sector}</p>
            <h2 className="mt-1 font-display text-2xl font-semibold text-charcoal">
              {activeCareer.name}
            </h2>
            <div className="mt-4 flex items-center gap-3">
              <Progress value={percent} className="flex-1" />
              <span className="text-sm text-ink-soft">
                {done}/{total} done
              </span>
            </div>
          </div>

          <div className="mt-10 space-y-10">
            {ROADMAP_SECTIONS.map((section) => {
              const tasks = activeRoadmap.tasks.filter((t) => t.category === section.category);
              if (tasks.length === 0) return null;
              return (
                <section key={section.category}>
                  <p className="kicker mb-1 text-ink-soft">{section.title}</p>
                  <p className="mb-3 text-xs text-ink-soft">{section.helper}</p>
                  <ul className="space-y-3">
                    {tasks.map((task) => (
                      <li key={task.id} className="flex items-start gap-3">
                        <Checkbox
                          id={task.id}
                          checked={task.done}
                          onCheckedChange={() => toggleRoadmapTask(activeCareer.slug, task.id)}
                          className="mt-0.5"
                        />
                        <label
                          htmlFor={task.id}
                          className="cursor-pointer text-sm leading-relaxed text-charcoal"
                          style={{
                            opacity: task.done ? 0.55 : 1,
                            textDecoration: task.done ? "line-through" : "none",
                          }}
                        >
                          {task.label}
                        </label>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}

            <section>
              <p className="kicker mb-3 text-ink-soft">Personal notes</p>
              <Textarea
                value={activeRoadmap.notes}
                onChange={(e) => setRoadmapNotes(activeCareer.slug, e.target.value)}
                placeholder="Write anything you want to remember about this career..."
                rows={5}
              />
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
