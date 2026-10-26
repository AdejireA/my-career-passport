import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const SUBJECT_SUGGESTIONS = [
  "Mathematics",
  "English",
  "Biology",
  "Chemistry",
  "Physics",
  "Further Mathematics",
  "Economics",
  "Government",
  "Literature-in-English",
  "Commerce",
  "Financial Accounting",
  "Computer Studies / ICT",
  "Agricultural Science",
  "Fine Art",
  "Geography",
];

export const INTEREST_SUGGESTIONS = [
  "Caring for people",
  "Making and fixing things",
  "Solving problems",
  "Designing and creating",
  "Working with numbers",
  "Outdoors and nature",
  "Explaining and communicating",
  "Planning and organising",
  "Computers and technology",
];

export function ChipPicker({
  suggestions,
  selected,
  onToggle,
  onAddCustom,
}: {
  suggestions: string[];
  selected: string[];
  onToggle: (value: string) => void;
  onAddCustom: (value: string) => void;
}) {
  const [custom, setCustom] = useState("");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {suggestions.map((item) => {
          const active = selected.includes(item);
          return (
            <button
              key={item}
              type="button"
              onClick={() => onToggle(item)}
              className="focus-ring rounded-full border px-3.5 py-1.5 text-sm transition-colors"
              style={{
                borderColor: active ? "var(--color-forest)" : "var(--color-border)",
                backgroundColor: active ? "var(--color-forest)" : "transparent",
                color: active ? "var(--color-ivory)" : "var(--color-charcoal)",
              }}
            >
              {item}
            </button>
          );
        })}
        {selected
          .filter((item) => !suggestions.includes(item))
          .map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onToggle(item)}
              className="focus-ring rounded-full border px-3.5 py-1.5 text-sm"
              style={{
                borderColor: "var(--color-forest)",
                backgroundColor: "var(--color-forest)",
                color: "var(--color-ivory)",
              }}
            >
              {item} ×
            </button>
          ))}
      </div>
      <div className="flex max-w-sm gap-2">
        <Input
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          placeholder="Add your own"
          onKeyDown={(e) => {
            if (e.key === "Enter" && custom.trim()) {
              e.preventDefault();
              onAddCustom(custom.trim());
              setCustom("");
            }
          }}
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            if (custom.trim()) {
              onAddCustom(custom.trim());
              setCustom("");
            }
          }}
        >
          Add
        </Button>
      </div>
    </div>
  );
}
