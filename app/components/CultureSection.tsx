import Image from "next/image";

export default function CultureSection() {
  return (
    <section className="full-bleed border-b border-zinc-900/20 bg-background dark:border-zinc-200/20">
      <div className="mx-auto grid w-full max-w-7xl lg:grid-cols-[1.1fr_1fr]">
        <div className="relative flex items-center justify-center bg-background px-6 py-14 text-emerald-900 dark:text-emerald-200">
          <div className="pointer-events-none absolute inset-0">
            <span className="absolute left-6 top-6 h-4 w-4 border-l border-t border-emerald-700/40 dark:border-emerald-400/60" />
            <span className="absolute right-6 top-6 h-4 w-4 border-r border-t border-emerald-700/40 dark:border-emerald-400/60" />
            <span className="absolute bottom-6 left-6 h-4 w-4 border-b border-l border-emerald-700/40 dark:border-emerald-400/60" />
            <span className="absolute bottom-6 right-6 h-4 w-4 border-b border-r border-emerald-700/40 dark:border-emerald-400/60" />
          </div>
          <div className="absolute left-1/2 top-6 flex -translate-x-1/2 items-center gap-2 rounded-md border border-emerald-700/40 bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-emerald-900 dark:border-emerald-400/50 dark:bg-black/70 dark:text-emerald-200">
            <span className="h-2 w-2 rounded-full bg-(--accent-lime) shadow-[0_0_8px_rgba(188,249,84,0.8)]" />
            Live
          </div>
          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-emerald-700/25 bg-white/85 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.18)] dark:border-emerald-400/20 dark:bg-black/80 dark:shadow-[0_18px_50px_rgba(0,0,0,0.45)]">
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top,rgba(188,249,84,0.12),transparent_55%)]" />
            <Image
              src="/kts-showcase.gif"
              alt="KTS showcase animation"
              width={500}
              height={300}
              unoptimized
              className="relative z-10 h-auto w-full rounded-xl"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 bg-background px-8 py-14 text-zinc-900 sm:px-12 dark:text-zinc-100 lg:border-l lg:border-zinc-900/10 dark:lg:border-zinc-200/10">
          <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
            <span className="h-px w-12 bg-zinc-300 dark:bg-zinc-600" />
            The culture
          </div>
          <h3 className="font-serif text-4xl leading-tight sm:text-5xl">
            This is what{" "}
            <span className="text-emerald-700 dark:text-emerald-300">
              2 AM
            </span>
            <br />
            looks like for us.
          </h3>
          <p className="text-sm leading-6 text-zinc-600 sm:text-base dark:text-zinc-300">
            Late-night debugging sessions. Tabs stacked 40 deep. A cold coffee.
            A monitor full of code that finally works. KTS is not a club you
            attend - it is a habit you develop.
          </p>
          <ul className="space-y-3 text-sm text-zinc-700 dark:text-zinc-200">
            <li className="flex items-start gap-2">
              <svg
                aria-hidden="true"
                className="mt-0.5 h-4 w-4 text-emerald-600 dark:text-emerald-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
              We ship on weekends, not just weekdays
            </li>
            <li className="flex items-start gap-2">
              <svg
                aria-hidden="true"
                className="mt-0.5 h-4 w-4 text-emerald-600 dark:text-emerald-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
              Every semester brings a new project from scratch
            </li>
            <li className="flex items-start gap-2">
              <svg
                aria-hidden="true"
                className="mt-0.5 h-4 w-4 text-emerald-600 dark:text-emerald-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
              Hackathons, open source, real internship prep
            </li>
            <li className="flex items-start gap-2">
              <svg
                aria-hidden="true"
                className="mt-0.5 h-4 w-4 text-amber-600 dark:text-amber-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14" />
                <path d="M13 6l6 6-6 6" />
              </svg>
              Your setup could be next
            </li>
          </ul>
          <a
            className="mt-4 inline-flex w-fit items-center gap-2 rounded-none border-2 border-zinc-900 bg-zinc-900 px-6 py-3 text-xs font-semibold uppercase tracking-[0.32em] text-white shadow-[0_4px_0_#111]"
            href="mailto:kts@kiet.edu"
          >
            <span>Join the late-night club</span>
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
          </a>
        </div>
      </div>
    </section>
  );
}
