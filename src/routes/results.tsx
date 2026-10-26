import { createFileRoute, Link } from "@tanstack/react-router";

import { CareerEntry } from "@/components/career-entry";
import { PageKicker } from "@/components/page-kicker";
import { QUIZ_QUESTIONS } from "@/data/quiz";
import { CAREERS } from "@/data/careers";
import { usePassport } from "@/hooks/use-passport";
import { requireAuth } from "@/lib/require-auth";
import { scoreQuiz } from "@/lib/matching";
import { TAG_LABEL } from "@/lib/types";

export const Route = createFileRoute("/results")({
  beforeLoad: requireAuth,
  component: Results,
});

function Results() {
  const { state, toggleSavedCareer } = usePassport();

  const hasAnswers = Object.keys(state.quizAnswers).length > 0;

  if (!hasAnswers) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <p className="kicker text-terracotta">Discoveries</p>
        <h1 className="mt-3 font-display text-3xl font-semibold text-charcoal">
          You haven&apos;t answered the discovery questions yet.
        </h1>
        <p className="mt-3 text-sm text-ink-soft">
          Answer nine short questions and we will show you which careers connect to your answers.
        </p>
        <Link
          to="/discover"
          className="focus-ring mt-6 inline-flex items-center justify-center rounded-md bg-forest px-6 py-3 text-sm font-medium text-ivory hover:bg-forest/90"
        >
          Start the discovery questions
        </Link>
      </div>
    );
  }

  const { tagScores, suggestions } = scoreQuiz(state.quizAnswers, QUIZ_QUESTIONS, CAREERS);
  const topTags = tagScores.filter((t) => t.score > 0).slice(0, 5);
  const topSuggestions = suggestions.slice(0, 6);

  // Some interests connect to only a handful of careers in our library today.
  // Say so plainly instead of letting a short list look like a weak match.
  const thinTag = topTags.find((t) => CAREERS.filter((c) => c.tags.includes(t.tag)).length <= 2);

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <PageKicker
        eyebrow="Your discoveries"
        title="Here's what your answers point toward."
        description="This is a starting point for exploring, not a diagnosis, a psychological assessment or a guarantee. You chose every one of these, and you can change your mind any time."
      />

      <section className="mt-10">
        <p className="kicker mb-4 text-ink-soft">Your interests, in your own words</p>
        <div className="flex flex-wrap gap-2">
          {topTags.map((t) => (
            <span
              key={t.tag}
              className="rounded-full border border-forest/30 bg-forest-soft px-3.5 py-1.5 text-sm text-charcoal"
              title={t.evidence.join("; ")}
            >
              {TAG_LABEL[t.tag]}
            </span>
          ))}
        </div>
        <p className="mt-4 max-w-2xl text-sm text-ink-soft">
          Every career below is suggested because it shares at least one of these interests with
          something you chose in the discovery questions &mdash; hover a tag to see which answers it
          came from, and open any career to see exactly why it's on your list.
        </p>
      </section>

      <section className="mt-12">
        <div className="flex items-baseline justify-between">
          <p className="kicker text-ink-soft">Careers worth a look, not a verdict</p>
          <Link
            to="/careers"
            className="focus-ring link-underline rounded-sm text-sm font-medium text-forest"
          >
            Explore every career
          </Link>
        </div>
        {thinTag ? (
          <p className="mt-3 rounded-md border border-mustard-soft bg-mustard-soft/40 px-4 py-3 text-sm text-charcoal">
            Our career library currently has only a few entries connected to{" "}
            <strong>{TAG_LABEL[thinTag.tag].toLowerCase()}</strong>, so this list may look short for
            that interest. That's a gap in our library, not a sign you have limited options &mdash;{" "}
            <Link to="/careers" className="link-underline font-medium text-forest">
              browse the full library
            </Link>{" "}
            for more to consider.
          </p>
        ) : null}
        <div className="mt-2">
          {topSuggestions.map((s, i) => (
            <CareerEntry
              key={s.career.slug}
              career={s.career}
              index={i}
              saved={state.savedCareers.includes(s.career.slug)}
              onToggleSave={() => toggleSavedCareer(s.career.slug)}
              reasons={s.reasons}
            />
          ))}
        </div>
        <p className="mt-8 text-sm text-ink-soft">
          Nothing here is final. Careers outside this list can still be exactly right for you
          &mdash;{" "}
          <Link to="/careers" className="link-underline text-forest">
            browse the complete list
          </Link>{" "}
          whenever you like.
        </p>
      </section>
    </div>
  );
}
