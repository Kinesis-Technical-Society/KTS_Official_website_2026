const CULTURE_TAGS = [
  { label: "24hr sprints", color: "bg-[var(--accent-lime)]" },
  { label: "Real mentors", color: "bg-[var(--accent-lavender)]" },
  { label: "Exciting rewards", color: "bg-[var(--accent-amber)]" },
  { label: "Build & ship", color: "bg-[var(--accent-sky)]" },
];

export function CultureCallout() {
  return (
    <section className="full-bleed relative overflow-hidden border-b-2 border-zinc-900 bg-[var(--background)] dark:border-zinc-200/15">
      <div
        className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-20"
        style={{ backgroundImage: "radial-gradient(#bcf954 1px,transparent 1px)", backgroundSize: "20px 20px" }}
      />
      <div className="absolute bottom-0 left-0 top-0 w-2 bg-[var(--accent-lime)]" />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-14 sm:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 dark:text-zinc-500">Our Philosophy</span>
            <p className="font-serif text-3xl leading-snug text-zinc-900 sm:text-4xl lg:text-5xl dark:text-zinc-100">
              &quot;Not just events.
              <br />
              <span className="italic text-zinc-500 dark:text-zinc-400">Experiences that push you</span>
              <br />
              <span className="bg-[var(--accent-lime)] px-2 font-bold not-italic text-zinc-900">past your comfort zone.</span>&quot;
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap gap-3 lg:flex-col lg:items-end">
            {CULTURE_TAGS.map((tag) => (
              <span
                key={tag.label}
                className={`w-fit rounded-xl border-2 border-zinc-900 px-4 py-2 text-xs font-bold uppercase tracking-widest text-zinc-900 shadow-[3px_3px_0_#111] transition-transform hover:-translate-y-0.5 dark:border-zinc-200/30 ${tag.color}`}
              >
                {tag.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
