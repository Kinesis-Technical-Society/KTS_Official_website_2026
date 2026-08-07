import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch overflow-hidden lg:overflow-visible">
      <div className="hero-rise hero-rise-delay-1 flex flex-col gap-6 text-center lg:text-left sm:gap-8">
        <div className="inline-flex items-center gap-2 self-center rounded-lg border-2 border-[#121212] bg-white px-3 py-1 text-xs font-bold shadow-[2px_2px_0px_0px_#121212] lg:self-start dark:border-zinc-200/40 dark:bg-[#151515] dark:text-zinc-100">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#bcf954]" />
          KINESIS TECHNICAL SOCIETY
        </div>

        <h1 className="relative mb-2 font-display text-3xl font-bold uppercase leading-[1.05] text-[#121212] sm:text-4xl sm:leading-[0.95] md:text-5xl lg:text-5xl dark:text-[#f3f2eb]">
          <svg
            className="absolute -left-4 -top-6 -z-10 h-10 w-10 text-[#3b82f6] opacity-50 sm:-left-6 sm:-top-8 sm:h-16 sm:w-16"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              clipRule="evenodd"
              d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
              fillRule="evenodd"
            />
          </svg>
          KNOWLEDGE IN{" "}
          <span
            className="text-transparent"
            style={{ WebkitTextStroke: "2px var(--hero-stroke)" }}
          >
            MOTION.
          </span>
          <br />
          INNOVATION IN <span className="bg-[#bcf954] px-2 text-zinc-900 inline-block">ACTION.</span>
        </h1>

        <p className="mx-auto max-w-lg font-sans text-base leading-relaxed text-gray-700 sm:text-lg md:text-xl lg:mx-0 dark:text-zinc-300">
          Kinesis Technical Society is a community of passionate developers, designers, and innovators dedicated to building impactful solutions.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
          <Link
            className="flex items-center justify-center gap-2 rounded-xl bg-[#121212] px-6 py-3.5 text-base font-bold text-white shadow-[4px_4px_0px_0px_#bcf954] transition-transform hover:-translate-y-0.5 sm:px-8 sm:py-4 sm:text-lg dark:bg-[#f3f2eb] dark:text-[#121212]"
            href="/about"
          >
            <span>Explore KTS</span>
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h12" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </Link>
          <Link
            className="flex items-center justify-center gap-2 rounded-xl border-2 border-[#121212] bg-white px-6 py-3.5 text-base font-bold shadow-[4px_4px_0px_0px_#121212] transition-all hover:-translate-y-0.5 hover:bg-[#cbb6ff] hover:text-[#121212] sm:px-8 sm:py-4 sm:text-lg dark:border-zinc-200/40 dark:bg-[#151515] dark:text-zinc-100 dark:shadow-[4px_4px_0px_0px_#f3f2eb] dark:hover:bg-[#7c3aed] dark:hover:text-white"
            href="/projects"
          >
            View Projects
          </Link>
        </div>
      </div>

      <div className="hero-rise hero-rise-delay-2 relative mt-4 lg:mt-0 lg:flex lg:flex-col lg:justify-end">
        <div className="hero-float pointer-events-none absolute -right-2 top-[45%] z-20 hidden h-14 w-14 -translate-y-1/2 rounded-2xl border-2 border-zinc-900 bg-[var(--accent-lavender)] text-zinc-900 shadow-[0_4px_0_#111] sm:block sm:h-16 sm:w-16 dark:border-zinc-200/40 dark:text-zinc-100">
          <div className="flex h-full items-center justify-center text-base font-bold sm:text-lg">
            &lt;/&gt;
          </div>
        </div>
        <div className="hero-float pointer-events-none absolute -left-4 bottom-4 z-20 hidden h-12 w-12 items-center justify-center rounded-full border-2 border-zinc-900 bg-[var(--accent-sky)] text-xl font-bold text-zinc-900 shadow-[0_4px_0_#111] sm:-left-6 sm:h-16 sm:w-16 sm:text-2xl md:flex dark:border-zinc-200/40 dark:text-zinc-100">
          *
        </div>

        <div className="relative w-full">
          <div className="hero-ring-1 pointer-events-none absolute left-1/2 top-[calc(42%-100px)] -z-10 hidden h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border sm:block" />
          <div className="hero-ring-2 pointer-events-none absolute left-1/2 top-[calc(42%-100px)] -z-10 hidden h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border sm:block" />
          <div className="hero-ring-3 pointer-events-none absolute left-1/2 top-[calc(42%-100px)] -z-10 hidden h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border sm:block" />

          <div className="hero-float-slow relative w-full rounded-3xl border-2 border-zinc-900 bg-white shadow-[0_8px_0_#111] sm:shadow-[0_10px_0_#111] dark:border-zinc-200/30 dark:bg-[#151515]">
            <div className="flex items-center justify-between rounded-t-3xl border-b-2 border-zinc-900 bg-zinc-900 px-4 py-3 dark:border-zinc-200/20 dark:bg-[#0b0b0b]">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full border-2 border-zinc-900 bg-rose-400" />
                <span className="h-3 w-3 rounded-full border-2 border-zinc-900 bg-amber-300" />
                <span className="h-3 w-3 rounded-full border-2 border-zinc-900 bg-emerald-400" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-200 dark:text-zinc-100">
                terminal.exe
              </span>
            </div>
            <div className="space-y-3 px-4 py-5 font-mono text-xs text-zinc-600 sm:px-5 sm:py-6 dark:text-zinc-300">
              <p className="text-zinc-500 dark:text-zinc-400">
                $ npm install kts-community
              </p>
              <p>
                <span className="text-emerald-600">&gt;</span> Installing
                packages...
              </p>
              <div className="h-2 rounded-full border-2 border-zinc-900 bg-zinc-100 dark:border-zinc-200/30 dark:bg-zinc-800">
                <div className="h-full w-3/4 rounded-full bg-[var(--accent-lime)]" />
              </div>
              <p className="text-emerald-600">Success! Welcome to KTS.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
