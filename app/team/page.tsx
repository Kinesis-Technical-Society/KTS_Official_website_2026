"use client";

import { useState } from "react";
import Image from "next/image";
import ThemeToggle from "../components/ThemeToggle";
import CoreTeamSection from "./components/CoreTeamSection";
import FounderSection from "./components/FounderSection";
import MentorSection from "./components/MentorSection";

function LinkedInIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
    </svg>
  );
}

function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500 dark:text-zinc-400">
      <span>{number}</span>
      <span className="h-px w-10 bg-zinc-300 dark:bg-zinc-600" />
      <span>{label}</span>
    </div>
  );
}

export default function TeamPage() {
  return (
    <main className="hero-grid flex-1">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-0 px-4 pb-0 pt-6 sm:px-6">

      
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
            <a className="nav-link nav-underline-lime transition hover:text-zinc-900 dark:hover:text-white" href="/">About</a>
            <a className="nav-link nav-underline-sky transition hover:text-zinc-900 dark:hover:text-white" href="/team">Team</a>
            <a className="nav-link nav-underline-lavender transition hover:text-zinc-900 dark:hover:text-white" href="/projects">Projects</a>
            <a className="nav-link nav-underline-amber transition hover:text-zinc-900 dark:hover:text-white" href="/event">Events</a>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button className="rounded-xl border-2 border-zinc-900 bg-(--accent-lime) px-4 py-2 text-xs font-bold uppercase tracking-widest text-zinc-900 shadow-[0_3px_0_#111] transition hover:-translate-y-0.5 dark:border-zinc-200/40" type="button">
              Contact
            </button>
          </div>
        </header>

    
        <section className="mt-10 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="hero-rise hero-rise-delay-1 flex flex-col gap-8">
            <div className="inline-flex items-center gap-2 self-start rounded-lg border-2 border-[#121212] bg-white px-3 py-1 text-xs font-bold shadow-[2px_2px_0px_0px_#121212] dark:border-zinc-200/40 dark:bg-[#151515] dark:text-zinc-100">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#bcf954]" />
              MEET THE TEAM
            </div>
            <h1 className="font-display text-5xl font-bold uppercase leading-[0.9] text-[#121212] md:text-7xl lg:text-8xl dark:text-[#f3f2eb]">
              PEOPLE WHO
              <br />
              <span className="bg-[#bcf954] px-2">SHIP RAW.</span>
            </h1>
            <p className="max-w-lg font-sans text-lg leading-relaxed text-gray-700 dark:text-zinc-300">
              The humans behind KTS — mentors who guide, a core team that executes,
              and founders who started it all with nothing but a wild idea.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a href="#mentors" className="flex items-center justify-center gap-2 rounded-xl bg-[#121212] px-8 py-4 text-lg font-bold text-white shadow-[4px_4px_0px_0px_#bcf954] transition-transform hover:-translate-y-0.5 dark:bg-[#f3f2eb] dark:text-[#121212]">
                <span>Meet the Team</span>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h12" /><path d="M13 6l6 6-6 6" />
                </svg>
              </a>
              <a href="/" className="flex items-center justify-center gap-2 rounded-xl border-2 border-[#121212] bg-white px-8 py-4 text-lg font-bold shadow-[4px_4px_0px_0px_#121212] transition-all hover:-translate-y-0.5 hover:bg-[#cbb6ff] dark:border-zinc-200/40 dark:bg-[#151515] dark:text-zinc-100 dark:shadow-[4px_4px_0px_0px_#f3f2eb] dark:hover:bg-[#7c3aed]">
                ← Back to Home
              </a>
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
                <span className="text-xs font-semibold uppercase tracking-widest text-zinc-200">team.exe</span>
              </div>
              <div className="space-y-3 px-5 py-6 font-mono text-xs text-zinc-600 dark:text-zinc-300">
                <p className="text-zinc-500 dark:text-zinc-400">$ kts --list-members</p>
                <p><span className="text-emerald-600">&gt;</span> Scanning org...</p>
                <p><span className="text-emerald-600">&gt;</span> mentors found</p>
                <p><span className="text-emerald-600">&gt;</span> core members loaded</p>
                <p><span className="text-emerald-600">&gt;</span> OG founders detected</p>
                <div className="h-2 rounded-full border-2 border-zinc-900 bg-zinc-100 dark:border-zinc-200/30 dark:bg-zinc-800">
                  <div className="h-full w-full rounded-full bg-(--accent-lime)" />
                </div>
                <p className="text-emerald-600">All humans ready.</p>
              </div>
            </div>
          </div>
        </section>

    
        <div className="full-bleed mt-10 border-y border-zinc-900/30 bg-white/80 dark:border-zinc-200/20 dark:bg-[#151515]/80">
          <div className="flex items-center gap-4 px-2 py-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-zinc-500 sm:px-4 sm:text-xs dark:text-zinc-400">
            <span className="shrink-0 text-zinc-900 dark:text-zinc-100">The Crew</span>
            <span aria-hidden className="h-4 w-px bg-zinc-900/30 dark:bg-zinc-200/20" />
            <div className="strip-marquee relative flex-1 overflow-hidden">
              <div className="strip-track flex items-center gap-4 whitespace-nowrap pr-8">
                {["Mentors", "Core Team", "Founders", "Developers", "Designers", "Hackers", "Builders", "Open Source", "Mentors", "Core Team", "Founders", "Developers", "Designers", "Hackers", "Builders", "Open Source"].map((t, i) => (
                  <span key={i} className="flex items-center gap-4">
                    {t}<span aria-hidden className="h-4 w-px bg-zinc-900/30 dark:bg-zinc-200/20" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <MentorSection />

        <CoreTeamSection />

        <section className="full-bleed border-b border-zinc-900/20 bg-zinc-900 dark:border-zinc-200/15">
          <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
              <p className="font-serif text-2xl italic text-white sm:text-3xl lg:text-4xl">
                “What began as an idea is now a community {" "}
                <span className="not-italic text-(--accent-lime)">— built by those who dared to start."</span>
              </p>
              <div className="flex shrink-0 flex-col gap-2 lg:items-end">
                {["Ship it", "After hours", "Open source", "Real projects"].map((tag) => (
                  <span key={tag} className="w-fit rounded-lg border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/60">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

    
        <section className="full-bleed border-b border-zinc-900/20 bg-background dark:border-zinc-200/15">
          <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6">
            <div className="mb-10 flex flex-col gap-4">
              <SectionLabel number="03" label="The OGs" />
              <h2 className="font-serif text-4xl leading-tight text-zinc-900 sm:text-5xl dark:text-zinc-100">
                Where it all <span className="italic">started.</span>
              </h2>
              <p className="max-w-md text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                The founders who turned an idea into a movement — everything that followed exists because they chose to start.
              </p>
            </div>
            <FounderSection />  
          </div>
        </section>

       
        <section
          className="full-bleed border-y-2 border-(--section-border) bg-background"
          style={{
            backgroundImage: "radial-gradient(var(--contact-dot) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        >
          <div className="mx-auto w-full max-w-7xl px-6 pb-12 pt-10 text-center">
            <h2 className="mb-4 font-display text-[36px] font-bold text-[#121212] md:text-[60px] dark:text-[#f3f2eb]">
              Your name belongs<br className="hidden sm:block" /> on this page.
            </h2>
            <p className="mb-8 text-[18px] font-medium text-[#4b5563] dark:text-zinc-300">
             We’re always looking for builders — if you build, we want you.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#join"
                className="flex items-center gap-2 rounded-xl bg-[#121212] px-8 py-4 text-lg font-bold text-white shadow-[4px_4px_0px_0px_#bcf954] transition-transform hover:-translate-y-0.5 dark:bg-[#f3f2eb] dark:text-[#121212]"
              >
                <span>Join KTS</span>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h12" /><path d="M13 6l6 6-6 6" />
                </svg>
              </a>
             
            </div>
          </div>

          <footer className="border-t-2 border-(--section-border) bg-background">
            <div className="mx-auto w-full max-w-7xl px-4 py-6 text-sm text-zinc-600 sm:px-6 dark:text-zinc-400">
              <div className="grid w-full gap-6 text-center lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:text-left">
                <div className="flex items-center justify-center gap-3 lg:justify-start">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border-2 border-zinc-900 bg-white shadow-[0_3px_0_#111] dark:border-zinc-200/40 dark:bg-[#151515]">
                    <Image src="/kts-logo.webp" alt="KTS" width={28} height={28} />
                  </div>
                  <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Kinesis Technical Society</span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Built with ❤️ by KTS</p>
                <div className="flex items-center justify-center gap-4 text-zinc-700 dark:text-zinc-300 lg:justify-end">
                  <a href="#" aria-label="Instagram" className="icon-link icon-instagram">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="4" y="4" width="16" height="16" rx="4" /><circle cx="12" cy="12" r="3" /><circle cx="17" cy="7" r="1" />
                    </svg>
                  </a>
                  <a href="#" aria-label="LinkedIn" className="icon-link icon-linkedin">
                    <LinkedInIcon className="h-5 w-5" />
                  </a>
                  <a href="mailto:hello@kts.edu" aria-label="Email" className="icon-link icon-email">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M4 6h16v12H4z" /><path d="M4 6l8 6 8-6" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </section>

      </div>
    </main>
  );
}