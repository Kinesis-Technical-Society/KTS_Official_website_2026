export function ProjectsHero() {
  return (
    <section className="hero-rise mt-2 flex flex-col gap-6">
      <div className="inline-flex items-center gap-2 self-start rounded-lg border-2 border-[#121212] bg-white px-3 py-1 text-xs font-bold shadow-[2px_2px_0px_0px_#121212] dark:border-zinc-200/40 dark:bg-[#151515] dark:text-zinc-100">
        <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--accent-lavender)]" />
        SHOWCASE & LABS
      </div>

      <h1 className="font-display text-4xl font-bold uppercase leading-[0.95] text-[#121212] sm:text-5xl md:text-6xl lg:text-7xl dark:text-[#f3f2eb]">
        PROJECTS BUILT BY <br />
        <span className="bg-[var(--accent-lavender)] px-2 text-[#121212]">THE COMMUNITY.</span>
      </h1>

      <p className="max-w-xl font-sans text-base leading-relaxed text-zinc-700 md:text-lg dark:text-zinc-300">
        From open-source developer tools to award-winning hackathon entries — explore what our members have engineered.
      </p>
    </section>
  );
}
