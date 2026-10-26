export type Tag =
  | "helping"
  | "hands"
  | "solving"
  | "creative"
  | "numbers"
  | "nature"
  | "speaking"
  | "organising"
  | "tech";

export const TAG_LABEL: Record<Tag, string> = {
  helping: "Caring for people",
  hands: "Making and fixing things",
  solving: "Solving problems",
  creative: "Designing and creating",
  numbers: "Working with numbers",
  nature: "Outdoors and nature",
  speaking: "Explaining and communicating",
  organising: "Planning and organising",
  tech: "Computers and technology",
};

export type Career = {
  slug: string;
  name: string;
  sector: string;
  tagline: string;
  overview: string;
  responsibilities: string[];
  interestsSkills: string[];
  tags: Tag[];
  educationPathways: string[];
  subjects: string[];
  specialisations: string[];
  tryThis: string;
  verifyNote: string;
};

export type QuizOption = {
  id: string;
  label: string;
  tags: Tag[];
};

export type QuizQuestion = {
  id: string;
  kind: "single" | "multi";
  max?: number;
  prompt: string;
  helper?: string;
  options: QuizOption[];
  /**
   * Scoring weight for this question's answers, default 1. Used for
   * questions like "shadow a professional" that signal direct career
   * curiosity rather than an independent underlying trait, so they don't
   * dominate the score as heavily as trait-based questions.
   */
  weight?: number;
};

export type SchoolLevel = "SS1" | "SS2" | "SS3";

export type StudentProfile = {
  name: string;
  level: SchoolLevel;
  subjects: string[];
  interests: string[];
  hasCareerInMind: boolean;
  careerInMind: string;
};

export type RoadmapTaskCategory = "skill" | "verify" | "activity" | "question" | "milestone";

/** Roadmap task sets are generated per school level; this records which. */
export type RoadmapLevel = SchoolLevel;

export type RoadmapTask = {
  id: string;
  category: RoadmapTaskCategory;
  label: string;
  done: boolean;
};

export type CareerRoadmap = {
  id: string;
  careerSlug: string;
  tasks: RoadmapTask[];
  notes: string;
  startedAt: string;
  /**
   * The school level the task list was generated for, captured at creation
   * time. Never recomputed after the fact, so a student's saved progress is
   * never silently rewritten if they update their profile's level later or
   * if the generator itself changes.
   */
  generatedForLevel?: RoadmapLevel;
};

export type ExploredEntry = { slug: string; exploredAt: string };

export type PassportState = {
  profile: StudentProfile | null;
  quizAnswers: Record<string, string[]>;
  savedCareers: string[];
  comparisonCareers: string[];
  explored: ExploredEntry[];
  roadmaps: Record<string, CareerRoadmap>;
  activeRoadmapSlug: string | null;
};
