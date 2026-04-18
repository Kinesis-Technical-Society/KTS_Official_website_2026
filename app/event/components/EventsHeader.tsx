import Link from "next/link";
import Image from "next/image";

import ThemeToggle from "../../components/ThemeToggle";

export function EventsHeader() {
  return (
    <header className="hero-rise sticky top-4 z-40 flex flex-wrap items-center justify-between gap-4 rounded-2xl border-2 border-zinc-900 bg-white/90 px-5 py-3 shadow-[0_4px_0_#111] backdrop-blur dark:border-zinc-200/30 dark:bg-[#151515]/90">
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-zinc-900 bg-white shadow-[0_3px_0_#111] dark:border-zinc-200/40 dark:bg-[#151515]">
          <Image src="/kts-logo.webp" alt="KTS" width={40} height={40} priority />
        </div>
        <span className="text-base font-semibold leading-tight tracking-tight text-zinc-900 sm:text-lg dark:text-zinc-100">
          Kinesis Technical Society
        </span>
      </div>

      <nav className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-700 md:flex dark:text-zinc-300">
        <Link className="nav-link nav-underline-lime transition hover:text-zinc-900 dark:hover:text-white" href="/">
          About
        </Link>
        <a className="nav-link nav-underline-sky transition hover:text-zinc-900 dark:hover:text-white" href="/team">
          Team
        </a>
        <a className="nav-link nav-underline-lavender transition hover:text-zinc-900 dark:hover:text-white" href="/events">
          Events
        </a>
        <a className="nav-link nav-underline-amber transition hover:text-zinc-900 dark:hover:text-white" href="#projects">
          Projects
        </a>
      </nav>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <button
          className="rounded-xl border-2 border-zinc-900 bg-[var(--accent-lime)] px-4 py-2 text-xs font-bold uppercase tracking-widest text-zinc-900 shadow-[0_3px_0_#111] transition hover:-translate-y-0.5 dark:border-zinc-200/40"
          type="button"
        >
          Contact
        </button>
      </div>
    </header>
  );
}
