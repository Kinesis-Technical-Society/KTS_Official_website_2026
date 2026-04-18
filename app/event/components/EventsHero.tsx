import Link from "next/link";

export function EventsHero() {
  return (
    <section className="mt-10 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
      <div className="hero-rise hero-rise-delay-1 flex flex-col gap-8">
        <div className="inline-flex items-center gap-2 self-start rounded-lg border-2 border-[#121212] bg-white px-3 py-1 text-xs font-bold shadow-[2px_2px_0px_0px_#121212] dark:border-zinc-200/40 dark:bg-[#151515] dark:text-zinc-100">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#bcf954]" />
          Something&apos;s Brewing....
        </div>

        <h1 className="font-display text-5xl font-bold uppercase leading-[0.9] text-[#121212] md:text-7xl lg:text-8xl dark:text-[#f3f2eb]">
          WHERE IDEAS
          <br />
          <span className="bg-[#bcf954] px-2">GO LIVE.</span>
        </h1>

        <p className="max-w-lg font-sans text-lg leading-relaxed text-gray-700 dark:text-zinc-300">
          Hackathons that don&apos;t sleep. Workshops that actually teach. Talks from people building in the real world.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            href="#past"
            className="flex items-center justify-center gap-2 rounded-xl bg-[#121212] px-8 py-4 text-lg font-bold text-white shadow-[4px_4px_0px_0px_#bcf954] transition-transform hover:-translate-y-0.5 dark:bg-[#f3f2eb] dark:text-[#121212]"
          >
            <span>Explore</span>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h12" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </a>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-xl border-2 border-[#121212] bg-white px-8 py-4 text-lg font-bold shadow-[4px_4px_0px_0px_#121212] transition-all hover:-translate-y-0.5 hover:bg-[#cbb6ff] dark:border-zinc-200/40 dark:bg-[#151515] dark:text-zinc-100 dark:shadow-[4px_4px_0px_0px_#f3f2eb] dark:hover:bg-[#7c3aed]"
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      <div className="hero-rise hero-rise-delay-2 relative hidden lg:block">
        <div className="hero-float-slow relative rounded-3xl border-2 border-zinc-900 bg-white shadow-[0_10px_0_#111] dark:border-zinc-200/30 dark:bg-[#151515]">
          <div className="flex items-center justify-between rounded-t-3xl border-b-2 border-zinc-900 bg-zinc-900 px-4 py-3 dark:border-zinc-200/20 dark:bg-[#0b0b0b]">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full border-2 border-zinc-900 bg-rose-400" />
              <span className="h-3 w-3 rounded-full border-2 border-zinc-900 bg-amber-300" />
              <span className="h-3 w-3 rounded-full border-2 border-zinc-900 bg-emerald-400" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-200">events.exe</span>
          </div>

          <div className="space-y-3 px-5 py-6 font-mono text-xs text-zinc-600 dark:text-zinc-300">
            <p className="text-zinc-500 dark:text-zinc-400">$ kts run events</p>
            <p>
              <span className="text-emerald-600">&gt;</span> Loading experiences...
            </p>
            <p>
              <span className="text-[#bcf954]">✓</span>{" "}
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">DataVerse - National Hackathon</span>
            </p>
            <p>
              <span className="text-[#bcf954]">✓</span>{" "}
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">Kode Kombat - Coding Contest</span>
            </p>
            <p>
              <span className="text-[#bcf954]">✓</span>{" "}
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">Git &amp; GitHub Bootcamp</span>
            </p>
            <div className="h-2 rounded-full border-2 border-zinc-900 bg-zinc-100 dark:border-zinc-200/30 dark:bg-zinc-800">
              <div className="h-full w-full rounded-full bg-[var(--accent-lime)]" />
            </div>
            <p className="text-emerald-600">All events ready.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
