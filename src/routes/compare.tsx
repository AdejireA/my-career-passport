import type { ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { PageKicker } from "@/components/page-kicker";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CAREERS, getCareer } from "@/data/careers";
import { usePassport } from "@/hooks/use-passport";
import { useRequireAuthAction } from "@/hooks/use-require-auth-action";
import { TAG_LABEL } from "@/lib/types";

export const Route = createFileRoute("/compare")({
  component: Compare,
});

const ROWS: { label: string; render: (career: ReturnType<typeof getCareer>) => ReactNode }[] = [
  { label: "Sector", render: (c) => c?.sector },
  { label: "In short", render: (c) => c?.tagline },
  {
    label: "Connects to",
    render: (c) => c?.tags.map((t) => TAG_LABEL[t]).join(", "),
  },
  {
    label: "Key responsibilities",
    render: (c) => (
      <ul className="list-inside list-disc space-y-1">
        {c?.responsibilities.slice(0, 3).map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>
    ),
  },
  { label: "Subjects to investigate", render: (c) => c?.subjects.join(", ") },
  { label: "Specialisations", render: (c) => `${c?.specialisations.length ?? 0} listed` },
  { label: "Try this", render: (c) => c?.tryThis },
];

function Compare() {
  const { state, toggleCompareCareer, removeCompareCareer } = usePassport();
  const requireAuthAction = useRequireAuthAction();
  const selected = state.comparisonCareers.map((slug) => getCareer(slug)).filter(Boolean);
  const available = CAREERS.filter((c) => !state.comparisonCareers.includes(c.slug));

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <PageKicker
        eyebrow="Compare"
        title="Put up to three careers side by side."
        description="Add careers below, then look at the differences that actually matter to you."
      />

      <div className="mt-8 flex flex-wrap items-center gap-3">
        {selected.length < 3 ? (
          <Select onValueChange={(slug) => requireAuthAction(() => toggleCompareCareer(slug))}>
            <SelectTrigger className="w-64" aria-label="Add a career to compare">
              <SelectValue placeholder="Add a career to compare" />
            </SelectTrigger>
            <SelectContent>
              {available.map((c) => (
                <SelectItem key={c.slug} value={c.slug}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <p className="text-sm text-ink-soft">
            You have three careers selected. Remove one to add another.
          </p>
        )}
      </div>

      {selected.length === 0 ? (
        <p className="mt-10 text-sm text-ink-soft">
          Nothing to compare yet.{" "}
          <Link to="/careers" className="link-underline text-forest">
            Browse careers
          </Link>{" "}
          and add a few.
        </p>
      ) : (
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr>
                <th className="w-40 border-b border-border" />
                {selected.map((c) => (
                  <th
                    key={c!.slug}
                    className="border-b border-border px-4 pb-4 text-left align-top"
                  >
                    <p className="kicker mb-1 text-terracotta">{c!.sector}</p>
                    <Link
                      to="/careers/$slug"
                      params={{ slug: c!.slug }}
                      className="focus-ring font-display text-lg font-semibold text-charcoal hover:text-forest"
                    >
                      {c!.name}
                    </Link>
                    <div className="mt-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeCompareCareer(c!.slug)}
                      >
                        Remove
                      </Button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.label} className="align-top">
                  <th className="border-b border-border py-4 pr-4 text-left text-xs font-semibold uppercase tracking-wide text-ink-soft">
                    {row.label}
                  </th>
                  {selected.map((c) => (
                    <td
                      key={c!.slug}
                      className="border-b border-border px-4 py-4 text-sm text-charcoal"
                    >
                      {row.render(c)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
