import { createFileRoute, Link } from "@tanstack/react-router";

import { PageKicker } from "@/components/page-kicker";
import { CAREER_STORIES } from "@/data/stories";
import { getCareer } from "@/data/careers";

export const Route = createFileRoute("/stories")({
  component: Stories,
});

function Stories() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <PageKicker
        eyebrow="Career notes"
        title="Notes from people a few steps ahead."
        description="These are fictional placeholders written for testing this prototype, not real interviews. The structure is built so verified stories, photos and videos can replace them later."
      />

      <div className="mt-10 space-y-0">
        {CAREER_STORIES.map((story, i) => {
          const career = getCareer(story.careerSlug);
          return (
            <article key={story.id} className="border-t border-border py-8 first:border-t-0">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="kicker text-terracotta">
                  {String(i + 1).padStart(2, "0")} ·{" "}
                  {story.kind === "student" ? "Student" : "Professional"}
                </p>
                {career ? (
                  <Link
                    to="/careers/$slug"
                    params={{ slug: career.slug }}
                    className="focus-ring link-underline rounded-sm text-xs font-medium text-forest"
                  >
                    {career.name}
                  </Link>
                ) : null}
              </div>
              <h2 className="mt-2 font-display text-2xl font-semibold text-charcoal">
                {story.name}
              </h2>
              <p className="text-xs uppercase tracking-wide text-ink-soft">{story.role}</p>
              <blockquote className="mt-3 border-l-2 border-terracotta pl-4 font-display text-lg italic text-charcoal">
                {story.quote}
              </blockquote>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-soft">{story.body}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
