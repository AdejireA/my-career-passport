import type { ReactNode } from "react";

type PageKickerProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
};

export function PageKicker({ eyebrow, title, description }: PageKickerProps) {
  return (
    <div className="space-y-3">
      <p className="kicker text-terracotta">{eyebrow}</p>
      <h1 className="font-display text-4xl font-semibold tracking-tight text-charcoal sm:text-5xl">
        {title}
      </h1>
      {description ? <p className="max-w-2xl text-base text-ink-soft">{description}</p> : null}
      <div className="rule-marks max-w-24" />
    </div>
  );
}
