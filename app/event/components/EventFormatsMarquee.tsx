const EVENT_FORMATS = [
  "Hackathons",
  "Workshops",
  "Tech Talks",
  "Competitions",
  "Bootcamps",
  "Open Source Sprints",
  "Hackathons",
  "Workshops",
  "Tech Talks",
  "Competitions",
  "Bootcamps",
  "Open Source Sprints",
];

export function EventFormatsMarquee() {
  return (
    <div className="full-bleed mt-10 border-y border-zinc-900/30 bg-white/80 dark:border-zinc-200/20 dark:bg-[#151515]/80">
      <div className="flex items-center gap-4 px-2 py-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-zinc-500 sm:px-4 sm:text-xs dark:text-zinc-400">
        <span className="shrink-0 text-zinc-900 dark:text-zinc-100">Event Formats</span>
        <span aria-hidden className="h-4 w-px bg-zinc-900/30 dark:bg-zinc-200/20" />
        <div className="strip-marquee relative flex-1 overflow-hidden">
          <div className="strip-track flex items-center gap-4 whitespace-nowrap pr-8">
            {EVENT_FORMATS.map((format, index) => (
              <span key={`${format}-${index}`} className="flex items-center gap-4">
                {format}
                <span aria-hidden className="h-4 w-px bg-zinc-900/30 dark:bg-zinc-200/20" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
