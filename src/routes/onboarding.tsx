import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChipPicker, INTEREST_SUGGESTIONS, SUBJECT_SUGGESTIONS } from "@/components/chip-picker";
import { JournalProgress } from "@/components/journal-progress";
import { usePassport } from "@/hooks/use-passport";
import { requireAuth } from "@/lib/require-auth";
import type { SchoolLevel } from "@/lib/types";

export const Route = createFileRoute("/onboarding")({
  beforeLoad: requireAuth,
  component: Onboarding,
});

const LEVELS: SchoolLevel[] = ["SS1", "SS2", "SS3"];

const STEPS = [
  "Your name",
  "School level",
  "Favourite subjects",
  "Your interests",
  "Career in mind",
];

function Onboarding() {
  const navigate = useNavigate();
  const { setProfile } = usePassport();

  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [level, setLevel] = useState<SchoolLevel | null>(null);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [hasCareerInMind, setHasCareerInMind] = useState<boolean | null>(null);
  const [careerInMind, setCareerInMind] = useState("");

  const toggle = (list: string[], setList: (v: string[]) => void, value: string) => {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const canContinue =
    (step === 0 && name.trim().length > 0) ||
    (step === 1 && level !== null) ||
    (step === 2 && subjects.length > 0) ||
    (step === 3 && interests.length > 0) ||
    (step === 4 && hasCareerInMind !== null);

  const finish = () => {
    setProfile({
      name: name.trim(),
      level: level ?? "SS1",
      subjects,
      interests,
      hasCareerInMind: hasCareerInMind ?? false,
      careerInMind: careerInMind.trim(),
    });
    navigate({ to: "/discover" });
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <JournalProgress current={step + 1} total={STEPS.length} label={STEPS[step] ?? ""} />

      <div className="mt-10 min-h-[22rem]">
        {step === 0 ? (
          <div className="space-y-4">
            <h1 className="font-display text-3xl font-semibold text-charcoal">
              What should we call you?
            </h1>
            <p className="text-sm text-ink-soft">Your first name or a nickname is perfect.</p>
            <Input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Tomiwa"
              className="max-w-sm"
            />
          </div>
        ) : null}

        {step === 1 ? (
          <div className="space-y-4">
            <h1 className="font-display text-3xl font-semibold text-charcoal">
              Which class are you in?
            </h1>
            <div className="flex gap-3">
              {LEVELS.map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setLevel(lvl)}
                  className="focus-ring rounded-md border px-6 py-3 text-sm font-medium transition-colors"
                  style={{
                    borderColor: level === lvl ? "var(--color-forest)" : "var(--color-border)",
                    backgroundColor: level === lvl ? "var(--color-forest)" : "transparent",
                    color: level === lvl ? "var(--color-ivory)" : "var(--color-charcoal)",
                  }}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-4">
            <h1 className="font-display text-3xl font-semibold text-charcoal">
              Which subjects do you enjoy most?
            </h1>
            <p className="text-sm text-ink-soft">Pick as many as you like.</p>
            <ChipPicker
              suggestions={SUBJECT_SUGGESTIONS}
              selected={subjects}
              onToggle={(v) => toggle(subjects, setSubjects, v)}
              onAddCustom={(v) => setSubjects([...subjects, v])}
            />
          </div>
        ) : null}

        {step === 3 ? (
          <div className="space-y-4">
            <h1 className="font-display text-3xl font-semibold text-charcoal">
              What kinds of things interest you?
            </h1>
            <p className="text-sm text-ink-soft">This helps us understand you, not grade you.</p>
            <ChipPicker
              suggestions={INTEREST_SUGGESTIONS}
              selected={interests}
              onToggle={(v) => toggle(interests, setInterests, v)}
              onAddCustom={(v) => setInterests([...interests, v])}
            />
          </div>
        ) : null}

        {step === 4 ? (
          <div className="space-y-4">
            <h1 className="font-display text-3xl font-semibold text-charcoal">
              Do you already have a career in mind?
            </h1>
            <div className="flex gap-3">
              {[true, false].map((val) => (
                <button
                  key={String(val)}
                  type="button"
                  onClick={() => setHasCareerInMind(val)}
                  className="focus-ring rounded-md border px-6 py-3 text-sm font-medium transition-colors"
                  style={{
                    borderColor:
                      hasCareerInMind === val ? "var(--color-forest)" : "var(--color-border)",
                    backgroundColor:
                      hasCareerInMind === val ? "var(--color-forest)" : "transparent",
                    color: hasCareerInMind === val ? "var(--color-ivory)" : "var(--color-charcoal)",
                  }}
                >
                  {val ? "Yes" : "Not yet"}
                </button>
              ))}
            </div>
            {hasCareerInMind ? (
              <Input
                value={careerInMind}
                onChange={(e) => setCareerInMind(e.target.value)}
                placeholder="What is it?"
                className="max-w-sm"
              />
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
        <Button
          variant="ghost"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
        >
          Back
        </Button>
        {step < STEPS.length - 1 ? (
          <Button onClick={() => setStep((s) => s + 1)} disabled={!canContinue}>
            Continue
          </Button>
        ) : (
          <Button onClick={finish} disabled={!canContinue}>
            Start discovering
          </Button>
        )}
      </div>
    </div>
  );
}
