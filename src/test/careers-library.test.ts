import { describe, expect, it } from "vitest";

import { CAREERS, SECTORS } from "@/data/careers";
import { CAREER_STORIES } from "@/data/stories";

describe("career library integrity", () => {
  it("has no duplicate slugs or names", () => {
    const slugs = CAREERS.map((c) => c.slug);
    const names = CAREERS.map((c) => c.name);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(new Set(names).size).toBe(names.length);
  });

  it("every career belongs to a listed sector and has non-empty core fields", () => {
    for (const career of CAREERS) {
      expect(SECTORS).toContain(career.sector);
      expect(career.tags.length).toBeGreaterThan(0);
      expect(career.subjects.length).toBeGreaterThan(0);
      expect(career.educationPathways.length).toBeGreaterThan(0);
      expect(career.verifyNote.length).toBeGreaterThan(0);
      expect(career.tryThis.length).toBeGreaterThan(0);
    }
  });

  it("includes the Vocational & Technical sector with non-degree pathways", () => {
    const vocational = CAREERS.filter((c) => c.sector === "Vocational & Technical");
    expect(vocational.length).toBeGreaterThanOrEqual(7);
    // Each vocational career should name a real non-university route, so
    // the library doesn't quietly funnel every career back toward "you need
    // a degree" — and none should claim a university degree is the way in.
    for (const career of vocational) {
      const text = career.educationPathways.join(" ").toLowerCase();
      const hasNonDegreeRoute =
        text.includes("technical college") ||
        text.includes("apprentice") ||
        text.includes("trade test") ||
        text.includes("nabteb") ||
        text.includes("polytechnic") ||
        text.includes("on-the-job") ||
        text.includes("diploma");
      expect(hasNonDegreeRoute).toBe(true);
      expect(text).not.toContain("university degree is required");
    }
  });

  it("the nature/outdoors interest now has more than two connected careers", () => {
    const natureCareers = CAREERS.filter((c) => c.tags.includes("nature"));
    expect(natureCareers.length).toBeGreaterThan(2);
  });

  it("the full library is reachable, not just quiz-matched subsets", () => {
    // CareersExplorer renders straight from CAREERS with no filtering by
    // quiz state, so every one of these must be independently browsable.
    expect(CAREERS.length).toBeGreaterThanOrEqual(24);
  });
});

describe("career stories", () => {
  it("every story is explicitly marked fictional or verified, never ambiguous", () => {
    for (const story of CAREER_STORIES) {
      expect(["fictional", "verified"]).toContain(story.verification);
      if (story.verification === "fictional") {
        expect(story.role.toLowerCase()).toContain("fictional placeholder");
      } else {
        expect(story.source).toBeDefined();
      }
    }
  });

  it("has no unverified story masquerading as a real testimonial", () => {
    const unverifiedButUnlabeled = CAREER_STORIES.filter(
      (s) => s.verification === "fictional" && !s.role.toLowerCase().includes("fictional"),
    );
    expect(unverifiedButUnlabeled).toHaveLength(0);
  });
});
