import { createFileRoute, Link } from "@tanstack/react-router";

import heroJourney from "@/assets/hero-journey.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const JOURNEY_STEPS = [
  {
    number: "01",
    title: "Discover what interests you",
    body: "Answer nine short reflection questions. There are no wrong answers, only honest ones.",
  },
  {
    number: "02",
    title: "Explore real careers",
    body: "See which careers connect to your answers, and browse freely beyond the suggestions.",
  },
  {
    number: "03",
    title: "Compare and take notes",
    body: "Put up to three careers side by side, and save the ones worth a second look.",
  },
  {
    number: "04",
    title: "Build your own roadmap",
    body: "Turn a career you like into a practical list of things to explore, verify and try.",
  },
  {
    number: "05",
    title: "Keep your passport",
    body: "Everything you discover is saved in one place you can return to, any time you change your mind.",
  },
];

function Index() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="space-y-6">
            <p className="kicker text-terracotta">My Journey starts here</p>
            <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-charcoal sm:text-6xl">
              There&apos;s a whole world of possibilities ahead.
            </h1>
            <p className="max-w-md text-lg text-ink-soft">
              Discover what interests you, explore different careers, and figure out the steps you
              can take toward your future.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/onboarding"
                className="focus-ring inline-flex items-center justify-center rounded-md bg-forest px-6 py-3 text-sm font-medium text-ivory transition-colors hover:bg-forest/90"
              >
                Begin exploring
              </Link>
              <Link
                to="/careers"
                className="focus-ring link-underline rounded-sm text-sm font-medium text-forest"
              >
                Browse careers first
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border">
            <img
              src={heroJourney}
              alt="Illustrated field guide of six Nigerian professionals: a doctor, a farmer, a construction engineer, a fashion designer, a lawyer and a chef."
              className="w-full"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-sage/30 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="kicker mb-2 text-terracotta">The discovery process</p>
          <h2 className="font-display text-3xl font-semibold text-charcoal sm:text-4xl">
            A personal journey, not a test.
          </h2>
          <div className="mt-10 space-y-0">
            {JOURNEY_STEPS.map((step, i) => (
              <div
                key={step.number}
                className="grid grid-cols-[auto_1fr] gap-6 border-t border-border py-6 first:border-t-0 sm:grid-cols-[6rem_1fr]"
              >
                <span className="font-display text-3xl text-sage-deep">{step.number}</span>
                <div className="space-y-1">
                  <h3 className="font-display text-xl font-semibold text-charcoal">{step.title}</h3>
                  <p className="max-w-xl text-sm text-ink-soft">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-2xl border border-border bg-mustard-soft/60 p-8 sm:p-12">
          <p className="kicker text-terracotta">Before you begin</p>
          <h2 className="mt-2 max-w-xl font-display text-2xl font-semibold text-charcoal sm:text-3xl">
            This is a starting point for exploring, not a verdict on who you should become.
          </h2>
          <p className="mt-3 max-w-xl text-sm text-ink-soft">
            You can change your mind as many times as you like. Every suggestion here points back to
            something you actually chose, and nothing here is a guarantee.
          </p>
        </div>
      </section>
    </div>
  );
}
