import { describe, expect, it } from "vitest";

import { CAREERS } from "@/data/careers";
import { QUIZ_QUESTIONS } from "@/data/quiz";
import { scoreQuiz } from "@/lib/matching";

describe("scoreQuiz", () => {
  it("ranks careers higher when the student's answers share more tags with them", () => {
    // "sat-help" and "asm-care" both carry the "helping" tag.
    const answers = { saturday: ["sat-help"], assembly: ["asm-care"] };
    const { suggestions } = scoreQuiz(answers, QUIZ_QUESTIONS, CAREERS);

    const helpingCareers = CAREERS.filter((c) => c.tags.includes("helping"));
    expect(helpingCareers.length).toBeGreaterThan(0);

    const topSlug = suggestions[0]?.career.slug;
    expect(helpingCareers.some((c) => c.slug === topSlug)).toBe(true);
  });

  it("gives every matched suggestion a reason that traces back to a chosen option's label", () => {
    const answers = { saturday: ["sat-tech"] };
    const { suggestions } = scoreQuiz(answers, QUIZ_QUESTIONS, CAREERS);

    const techOption = QUIZ_QUESTIONS.flatMap((q) => q.options).find((o) => o.id === "sat-tech")!;

    for (const suggestion of suggestions.filter((s) => s.score > 0 && !s.secondary)) {
      expect(suggestion.reasons.length).toBeGreaterThan(0);
      expect(suggestion.reasons.some((r) => r.includes(techOption.label))).toBe(true);
    }
  });

  it("produces no suggestions at all when there are no answers", () => {
    const { suggestions, tagScores } = scoreQuiz({}, QUIZ_QUESTIONS, CAREERS);
    expect(tagScores.every((t) => t.score === 0)).toBe(true);
    // Every career falls back to the "secondary, worth a look" filler state.
    expect(suggestions.every((s) => s.secondary)).toBe(true);
  });

  it("weights the 'shadow a professional' question at half of a trait question", () => {
    const shadowOnly = { shadow: ["sh-dev"] };
    const traitOnly = { saturday: ["sat-tech"] };

    const shadowResult = scoreQuiz(shadowOnly, QUIZ_QUESTIONS, CAREERS);
    const traitResult = scoreQuiz(traitOnly, QUIZ_QUESTIONS, CAREERS);

    const shadowTechScore = shadowResult.tagScores.find((t) => t.tag === "tech")?.score ?? 0;
    const traitTechScore = traitResult.tagScores.find((t) => t.tag === "tech")?.score ?? 0;

    expect(shadowTechScore).toBe(0.5);
    expect(traitTechScore).toBe(1);
  });

  const scenarios: { label: string; answers: Record<string, string[]>; expectSector: string }[] = [
    {
      label: "agriculture-leaning answers",
      answers: {
        saturday: ["sat-farm"],
        worlds: ["w-farm"],
        problem: ["pb-food"],
        lesson: ["ls-field"],
        allowance: ["al-grow"],
      },
      expectSector: "Agriculture",
    },
    {
      label: "creative-leaning answers",
      answers: {
        saturday: ["sat-design"],
        "cultural-day": ["cd-design"],
        worlds: ["w-art"],
        lesson: ["ls-visual"],
      },
      expectSector: "Creative",
    },
    {
      label: "technical-trade-leaning answers",
      answers: {
        saturday: ["sat-build"],
        "cultural-day": ["cd-build"],
        worlds: ["w-build"],
        lesson: ["ls-real"],
      },
      expectSector: "Vocational & Technical",
    },
    {
      label: "healthcare-leaning answers",
      answers: {
        saturday: ["sat-help"],
        assembly: ["asm-care"],
        worlds: ["w-medicine"],
        allowance: ["al-share"],
      },
      expectSector: "Healthcare",
    },
    {
      label: "business-leaning answers",
      answers: {
        saturday: ["sat-records"],
        "cultural-day": ["cd-money"],
        worlds: ["w-money"],
        allowance: ["al-track"],
      },
      expectSector: "Business",
    },
  ];

  for (const { label, answers, expectSector } of scenarios) {
    // Matches results.tsx:44's actual display window, not an arbitrary
    // smaller slice — several careers can legitimately tie on score and
    // break ties alphabetically, so a thematically central career can sit
    // anywhere in that window, not necessarily first.
    it(`surfaces a plausible match within the top 6 for ${label}`, () => {
      const { suggestions } = scoreQuiz(answers, QUIZ_QUESTIONS, CAREERS);
      const top = suggestions.filter((s) => !s.secondary).slice(0, 6);
      expect(top.length).toBeGreaterThan(0);
      expect(top.some((s) => s.career.sector === expectSector)).toBe(true);
    });
  }
});
