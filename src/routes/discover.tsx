import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { JournalProgress } from "@/components/journal-progress";
import { QUIZ_QUESTIONS } from "@/data/quiz";
import { usePassport } from "@/hooks/use-passport";
import { requireAuth } from "@/lib/require-auth";

export const Route = createFileRoute("/discover")({
  beforeLoad: requireAuth,
  component: Discover,
});

function Discover() {
  const navigate = useNavigate();
  const { setQuizAnswers } = usePassport();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});

  const question = QUIZ_QUESTIONS[step] ?? QUIZ_QUESTIONS[0]!;
  const current = answers[question.id] ?? [];

  const selectOption = (optionId: string) => {
    if (question.kind === "single") {
      setAnswers((a) => ({ ...a, [question.id]: [optionId] }));
      return;
    }
    const max = question.max ?? question.options.length;
    setAnswers((a) => {
      const existing = a[question.id] ?? [];
      if (existing.includes(optionId)) {
        return { ...a, [question.id]: existing.filter((id) => id !== optionId) };
      }
      if (existing.length >= max) return a;
      return { ...a, [question.id]: [...existing, optionId] };
    });
  };

  const canContinue = current.length > 0;
  const isLast = step === QUIZ_QUESTIONS.length - 1;

  const finish = () => {
    setQuizAnswers(answers);
    navigate({ to: "/results" });
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <JournalProgress current={step + 1} total={QUIZ_QUESTIONS.length} label="Discoveries" />

      <div className="mt-10 min-h-[24rem] space-y-6">
        <div className="space-y-2">
          <h1 className="font-display text-3xl font-semibold leading-snug text-charcoal">
            {question.prompt}
          </h1>
          {question.helper ? <p className="text-sm text-ink-soft">{question.helper}</p> : null}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {question.options.map((option) => {
            const active = current.includes(option.id);
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => selectOption(option.id)}
                className="focus-ring rounded-lg border px-4 py-3.5 text-left text-sm transition-colors"
                style={{
                  borderColor: active ? "var(--color-forest)" : "var(--color-border)",
                  backgroundColor: active ? "var(--color-forest-soft)" : "transparent",
                  color: "var(--color-charcoal)",
                }}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
        <Button
          variant="ghost"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
        >
          Back
        </Button>
        {!isLast ? (
          <Button onClick={() => setStep((s) => s + 1)} disabled={!canContinue}>
            Next
          </Button>
        ) : (
          <Button onClick={finish} disabled={!canContinue}>
            See my discoveries
          </Button>
        )}
      </div>
    </div>
  );
}
