type JournalProgressProps = {
  current: number;
  total: number;
  label: string;
};

export function JournalProgress({ current, total, label }: JournalProgressProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-display text-sm text-terracotta">
        {String(current).padStart(2, "0")}
        <span className="text-ink-soft"> / {String(total).padStart(2, "0")}</span>
      </span>
      <div className="relative h-px flex-1 bg-border">
        <div
          className="absolute inset-y-0 left-0 bg-terracotta transition-all duration-300"
          style={{ width: `${(current / total) * 100}%`, height: "2px", top: "-0.5px" }}
        />
      </div>
      <span className="kicker text-ink-soft">{label}</span>
    </div>
  );
}
