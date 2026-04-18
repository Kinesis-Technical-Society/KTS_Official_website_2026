export function SectionLabel({
  label,
  light = false,
}: {
  label: string;
  light?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] ${
        light ? "text-zinc-500" : "text-zinc-500 dark:text-zinc-400"
      }`}
    >
      <span className={`h-px w-10 ${light ? "bg-zinc-700" : "bg-zinc-300 dark:bg-zinc-600"}`} />
      <span>{label}</span>
    </div>
  );
}
