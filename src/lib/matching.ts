import type { Career, QuizQuestion, Tag } from "@/lib/types";
import { TAG_LABEL } from "@/lib/types";

export type TagScore = { tag: Tag; score: number; evidence: string[] };

export type Suggestion = {
  career: Career;
  score: number;
  reasons: string[];
  topTags: Tag[];
  secondary?: boolean;
};

export type MatchResult = {
  tagScores: TagScore[];
  suggestions: Suggestion[];
};

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function shorten(label: string) {
  const trimmed = label.trim();
  return trimmed.length > 70 ? trimmed.slice(0, 67).trimEnd() + "..." : trimmed;
}

function sentence(labels: string[], tag: Tag) {
  const quoted = labels.map((l) => `"${shorten(l)}"`);
  const list =
    quoted.length > 1 ? quoted.slice(0, -1).join(", ") + " and " + quoted.at(-1) : quoted[0];
  return `You chose ${list}, which connects to ${TAG_LABEL[tag].toLowerCase()}.`;
}

/**
 * Explainable, rule-based matching: every quiz option carries interest tags.
 * Careers share those tags, so a suggestion can always point back to the
 * student's own answers. This is a starting point, not a prediction.
 */
export function scoreQuiz(
  answers: Record<string, string[]>,
  questions: QuizQuestion[],
  careers: Career[],
): MatchResult {
  const scores = new Map<Tag, number>();
  const evidence = new Map<Tag, string[]>();

  const questionById = new Map(questions.map((q) => [q.id, q]));
  for (const [questionId, optionIds] of Object.entries(answers)) {
    const question = questionById.get(questionId);
    if (!question) continue;
    const weight = question.weight ?? 1;
    for (const optionId of optionIds) {
      const option = question.options.find((o) => o.id === optionId);
      if (!option) continue;
      for (const tag of option.tags) {
        scores.set(tag, (scores.get(tag) ?? 0) + weight);
        const list = evidence.get(tag) ?? [];
        if (!list.includes(option.label)) list.push(option.label);
        evidence.set(tag, list);
      }
    }
  }

  const tagScores: TagScore[] = (Object.keys(TAG_LABEL) as Tag[])
    .map((tag) => ({ tag, score: scores.get(tag) ?? 0, evidence: evidence.get(tag) ?? [] }))
    .sort((a, b) => b.score - a.score);

  const suggestions: Suggestion[] = [];
  for (const career of careers) {
    let score = 0;
    const reasons: string[] = [];
    const topTags: Tag[] = [];
    for (const tag of career.tags) {
      const tagScore = scores.get(tag) ?? 0;
      if (tagScore > 0) {
        score += tagScore;
        topTags.push(tag);
        const labels = (evidence.get(tag) ?? []).slice(0, 2);
        if (labels.length > 0) reasons.push(sentence(labels, tag));
      }
    }
    suggestions.push({ career, score, reasons, topTags });
  }

  suggestions.sort((a, b) => b.score - a.score || a.career.name.localeCompare(b.career.name));

  // If few careers connect to the answers, add a couple of varied starting points.
  const matched = suggestions.filter((s) => s.score > 0);
  if (matched.length < 4) {
    const filler = suggestions
      .filter((s) => s.score === 0)
      .slice(0, 4 - matched.length)
      .map((s) => ({
        ...s,
        reasons: ["None of your answers connect to this one yet, but it is worth a look."],
        secondary: true,
      }));
    return { tagScores, suggestions: [...matched, ...filler] };
  }

  return { tagScores, suggestions: matched };
}
