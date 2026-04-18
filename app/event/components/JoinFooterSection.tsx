import Image from "next/image";

import { LinkedInIcon } from "./icons";

export function JoinFooterSection() {
  return (
    <section
      className="full-bleed border-y-2 border-[var(--section-border)] bg-[var(--background)]"
      style={{ backgroundImage: "radial-gradient(var(--contact-dot) 1px,transparent 1px)", backgroundSize: "16px 16px" }}
    >
      <div className="mx-auto w-full max-w-7xl px-6 pb-12 pt-10 text-center">
        <h2 className="mb-4 font-display text-[36px] font-bold text-[#121212] md:text-[60px] dark:text-[#f3f2eb]">
          Don&apos;t watch from
          <br className="hidden sm:block" /> the sidelines.
        </h2>
        <p className="mb-8 text-[18px] font-medium text-[#4b5563] dark:text-zinc-300">
          Join KTS - and be part of building what comes next.
        </p>
        <a
          href="#join"
          className="mx-auto flex w-fit items-center justify-center gap-2 rounded-xl bg-[#121212] px-8 py-4 text-lg font-bold text-white shadow-[4px_4px_0px_0px_#bcf954] transition-transform hover:-translate-y-0.5 dark:bg-[#f3f2eb] dark:text-[#121212]"
        >
          <span>Join KTS</span>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h12" />
            <path d="M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>

      <footer className="border-t-2 border-[var(--section-border)] bg-[var(--background)]">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 text-sm text-zinc-600 sm:px-6 dark:text-zinc-400">
          <div className="grid w-full gap-6 text-center lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:text-left">
            <div className="flex items-center justify-center gap-3 lg:justify-start">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border-2 border-zinc-900 bg-white shadow-[0_3px_0_#111] dark:border-zinc-200/40 dark:bg-[#151515]">
                <Image src="/kts-logo.webp" alt="KTS" width={28} height={28} />
              </div>
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Kinesis Technical Society</span>
            </div>

            <p className="text-xs text-zinc-500 dark:text-zinc-400">Built with love by KTS</p>

            <div className="flex items-center justify-center gap-4 text-zinc-700 dark:text-zinc-300 lg:justify-end">
              <a href="#" aria-label="Instagram" className="icon-link icon-instagram">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="4" y="4" width="16" height="16" rx="4" />
                  <circle cx="12" cy="12" r="3" />
                  <circle cx="17" cy="7" r="1" />
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="icon-link icon-linkedin">
                <LinkedInIcon className="h-5 w-5" />
              </a>
              <a href="mailto:hello@kts.edu" aria-label="Email" className="icon-link icon-email">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 6h16v12H4z" />
                  <path d="M4 6l8 6 8-6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
