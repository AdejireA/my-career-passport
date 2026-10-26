import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { TAG_LABEL, type Career } from "@/lib/types";

type CareerEntryProps = {
  career: Career;
  index: number;
  saved: boolean;
  onToggleSave: () => void;
  reasons?: string[];
};

export function CareerEntry({ career, index, saved, onToggleSave, reasons }: CareerEntryProps) {
  return (
    <article className="group grid grid-cols-[auto_1fr_auto] items-start gap-4 border-b border-border py-6 sm:gap-6">
      <span className="font-display text-2xl text-sage-deep">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="min-w-0 space-y-2">
        <p className="kicker text-ink-soft">{career.sector}</p>
        <h3 className="font-display text-xl font-semibold text-charcoal">
          <Link
            to="/careers/$slug"
            params={{ slug: career.slug }}
            className="focus-ring rounded-sm hover:text-forest"
          >
            {career.name}
          </Link>
        </h3>
        <p className="text-sm text-ink-soft">{career.tagline}</p>
        <div className="flex flex-wrap gap-x-3 gap-y-1 pt-1">
          {career.tags.map((tag) => (
            <span key={tag} className="text-xs text-sage-deep">
              {TAG_LABEL[tag]}
            </span>
          ))}
        </div>
        {reasons && reasons.length > 0 ? (
          <p className="pt-1 text-xs italic text-terracotta">{reasons[0]}</p>
        ) : null}
      </div>
      <div className="flex flex-col items-end gap-2">
        <Button variant={saved ? "default" : "outline"} size="sm" onClick={onToggleSave}>
          {saved ? "Saved" : "Save"}
        </Button>
        <Link
          to="/careers/$slug"
          params={{ slug: career.slug }}
          className="focus-ring link-underline rounded-sm text-xs font-medium text-forest"
        >
          View details
        </Link>
      </div>
    </article>
  );
}
