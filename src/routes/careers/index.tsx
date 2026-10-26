import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { CareerEntry } from "@/components/career-entry";
import { PageKicker } from "@/components/page-kicker";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CAREERS, SECTORS } from "@/data/careers";
import { QUIZ_QUESTIONS } from "@/data/quiz";
import { usePassport } from "@/hooks/use-passport";
import { useRequireAuthAction } from "@/hooks/use-require-auth-action";
import { scoreQuiz } from "@/lib/matching";
import { TAG_LABEL, type Tag } from "@/lib/types";

export const Route = createFileRoute("/careers/")({
  component: CareersExplorer,
});

type SortMode = "relevant" | "name" | "sector";

function CareersExplorer() {
  const { state, toggleSavedCareer } = usePassport();
  const requireAuthAction = useRequireAuthAction();
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState<string>("all");
  const [tag, setTag] = useState<string>("all");
  const hasQuiz = Object.keys(state.quizAnswers).length > 0;
  const [sort, setSort] = useState<SortMode>(hasQuiz ? "relevant" : "name");

  const scoreBySlug = useMemo(() => {
    if (!hasQuiz) return new Map<string, number>();
    const { suggestions } = scoreQuiz(state.quizAnswers, QUIZ_QUESTIONS, CAREERS);
    return new Map(suggestions.map((s) => [s.career.slug, s.score]));
  }, [state.quizAnswers, hasQuiz]);

  const filtered = useMemo(() => {
    let list = CAREERS.filter((career) => {
      const matchesQuery =
        query.trim().length === 0 ||
        career.name.toLowerCase().includes(query.toLowerCase()) ||
        career.sector.toLowerCase().includes(query.toLowerCase()) ||
        career.tagline.toLowerCase().includes(query.toLowerCase());
      const matchesSector = sector === "all" || career.sector === sector;
      const matchesTag = tag === "all" || career.tags.includes(tag as Tag);
      return matchesQuery && matchesSector && matchesTag;
    });

    list = [...list].sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "sector")
        return a.sector.localeCompare(b.sector) || a.name.localeCompare(b.name);
      return (
        (scoreBySlug.get(b.slug) ?? 0) - (scoreBySlug.get(a.slug) ?? 0) ||
        a.name.localeCompare(b.name)
      );
    });

    return list;
  }, [query, sector, tag, sort, scoreBySlug]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <PageKicker
        eyebrow="Careers I'm exploring"
        title="A library of real careers to browse."
        description="Search, filter, and save the ones worth a second look. Nothing here is fixed; explore as freely as you like."
      />

      <div className="mt-8 flex flex-wrap items-end gap-4">
        <div className="min-w-56 flex-1">
          <label htmlFor="career-search" className="kicker mb-1.5 block text-ink-soft">
            Search
          </label>
          <Input
            id="career-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, sector or keyword"
          />
        </div>
        <div>
          <label className="kicker mb-1.5 block text-ink-soft">Sector</label>
          <Select value={sector} onValueChange={setSector}>
            <SelectTrigger className="w-44" aria-label="Sector">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All sectors</SelectItem>
              {SECTORS.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="kicker mb-1.5 block text-ink-soft">Interest</label>
          <Select value={tag} onValueChange={setTag}>
            <SelectTrigger className="w-48" aria-label="Interest">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All interests</SelectItem>
              {(Object.keys(TAG_LABEL) as Tag[]).map((t) => (
                <SelectItem key={t} value={t}>
                  {TAG_LABEL[t]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="kicker mb-1.5 block text-ink-soft">Sort by</label>
          <Select value={sort} onValueChange={(v) => setSort(v as SortMode)}>
            <SelectTrigger className="w-44" aria-label="Sort by">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {hasQuiz ? <SelectItem value="relevant">Most relevant to you</SelectItem> : null}
              <SelectItem value="name">Name (A to Z)</SelectItem>
              <SelectItem value="sector">Sector</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <p className="mt-6 text-sm text-ink-soft">
        {filtered.length} career{filtered.length === 1 ? "" : "s"} found
      </p>

      <div className="mt-2">
        {filtered.map((career, i) => (
          <CareerEntry
            key={career.slug}
            career={career}
            index={i}
            saved={state.savedCareers.includes(career.slug)}
            onToggleSave={() => requireAuthAction(() => toggleSavedCareer(career.slug))}
          />
        ))}
        {filtered.length === 0 ? (
          <p className="py-10 text-center text-sm text-ink-soft">
            No careers match that search. Try clearing a filter.
          </p>
        ) : null}
      </div>
    </div>
  );
}
