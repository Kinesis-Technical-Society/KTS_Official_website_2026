"use client";

import { useState } from "react";
import Image from "next/image";
import ThemeToggle from "../components/ThemeToggle";

// ── Types ──────────────────────────────────────────────────────────────────
interface Event {
  id: number;
  title: string;
  date: string;
  type: "Hackathon" | "Workshop" | "Talk" | "Competition" | "Bootcamp";
  status: "upcoming" | "past";
  description: string;
  tags: string[];
  participants?: number;
  highlights?: string[];
  prize?: string;
  location: string;
  image?: string;
}

// ── Data ───────────────────────────────────────────────────────────────────
const events: Event[] = [
  {
    id: 1,
    title: "DataVerse 2025",
    date: "March 15, 2025",
    type: "Hackathon",
    status: "past",
    description:
      "National Level Hackathon where 200+ students from 30+ colleges competed to build data-driven solutions in 24 hours. Real problems. Real data. Real impact.",
    tags: ["ML", "Data Science", "24hrs"],
    participants: 200,
    highlights: ["30+ colleges", "24-hour sprint", "National level"],
    prize: "₹1,00,000 prize pool",
    location: "KIET Group of Institutions, Ghaziabad",
    image: "/events/dataverse.jpg",
  },
  {
    id: 2,
    title: "Open Source Saturday",
    date: "Feb 8, 2025",
    type: "Workshop",
    status: "past",
    description:
      "A full-day hands-on workshop on contributing to open source. First PRs merged live. Git, GitHub, real repos — no fluff.",
    tags: ["Git", "GitHub", "OSS"],
    participants: 80,
    highlights: ["50+ PRs merged", "Live reviews", "6 hour workshop"],
    location: "CS Lab, KIET",
  },
  {
    id: 3,
    title: "DevOps Decoded",
    date: "Jan 20, 2025",
    type: "Talk",
    status: "past",
    description:
      "Industry expert session covering CI/CD pipelines, Docker, and Kubernetes. Straight from someone who runs production at scale.",
    tags: ["Docker", "K8s", "CI/CD"],
    participants: 120,
    highlights: ["Industry speaker", "Live demos", "Q&A session"],
    location: "Seminar Hall, KIET",
  },
  {
    id: 4,
    title: "Code Blitz Season 3",
    date: "Dec 2024",
    type: "Competition",
    status: "past",
    description:
      "KTS's flagship competitive programming contest. 3 hours, 8 problems, one leaderboard. Season 3 had the hardest problems yet.",
    tags: ["CP", "Algorithms", "3hrs"],
    participants: 150,
    highlights: ["8 problems", "150 coders", "Live scoreboard"],
    prize: "₹15,000 in prizes",
    location: "Online + KIET Labs",
  },
  {
    id: 5,
    title: "Web3 Bootcamp",
    date: "April 25 – 27, 2025",
    type: "Bootcamp",
    status: "upcoming",
    description:
      "Three-day intensive on blockchain fundamentals, Solidity smart contracts, and deploying your first dApp on testnet. Beginner-friendly.",
    tags: ["Solidity", "Ethereum", "dApps"],
    location: "CS Lab, KIET",
  },
  {
    id: 6,
    title: "Build in Public Hackathon",
    date: "May 10 – 11, 2025",
    type: "Hackathon",
    status: "upcoming",
    description:
      "48-hour public hackathon. Entire build process streamed live. Mentors on-site. Ship something or stay up trying.",
    tags: ["Build", "48hrs", "Open"],
    prize: "₹50,000 prize pool",
    location: "KIET Campus + Livestream",
  },
];

const typeColors: Record<string, string> = {
  Hackathon: "bg-[var(--accent-lime)] text-zinc-900",
  Workshop: "bg-[var(--accent-lavender)] text-zinc-900",
  Talk: "bg-[var(--accent-sky)] text-zinc-900",
  Competition: "bg-[var(--accent-amber)] text-zinc-900",
  Bootcamp: "bg-rose-200 text-zinc-900",
};

const stats = [
  { n: "12+", l: "Events/Year", accent: "bg-[var(--accent-lime)]" },
  { n: "2K+", l: "Participants", accent: "bg-[var(--accent-lavender)]" },
  { n: "₹1.5L+", l: "Prize Money", accent: "bg-[var(--accent-sky)]" },
  { n: "30+", l: "Colleges", accent: "bg-[var(--accent-amber)]" },
];

// ── Icons ──────────────────────────────────────────────────────────────────
function LinkedInIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
    </svg>
  );
}

function CalendarIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function MapPinIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function UsersIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}

function TrophyIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 9H4a2 2 0 01-2-2V5h4m14 4h2a2 2 0 002-2V5h-4M12 17v4m-4 0h8" />
      <path d="M6 5h12v7a6 6 0 01-12 0V5z" />
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

// ── Upcoming Event Card ────────────────────────────────────────────────────
function UpcomingCard({ event }: { event: Event }) {
  return (
    <div className="group relative flex flex-col gap-5 rounded-3xl border-2 border-zinc-900 bg-white p-8 shadow-[0_6px_0_#111] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_10px_0_#111] dark:border-zinc-200/30 dark:bg-[#151515] dark:shadow-[0_6px_0_#000]">
      {/* Animated top bar on hover */}
      <div className="absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-[var(--accent-lime)] opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="flex items-start justify-between gap-4">
        <span className={`rounded-lg border-2 border-zinc-900 px-3 py-1 text-[10px] font-bold uppercase tracking-widest shadow-[1px_1px_0_#111] dark:border-zinc-200/30 ${typeColors[event.type]}`}>
          {event.type}
        </span>
        <span className="flex items-center gap-1.5 rounded-lg border-2 border-emerald-500 bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
          Upcoming
        </span>
      </div>

      <div>
        <h3 className="font-display text-2xl font-bold uppercase leading-tight text-zinc-900 dark:text-zinc-100">
          {event.title}
        </h3>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-500 dark:text-zinc-400">
          <span className="flex items-center gap-1.5">
            <CalendarIcon className="h-3.5 w-3.5" />
            {event.date}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPinIcon className="h-3.5 w-3.5" />
            {event.location}
          </span>
        </div>
      </div>

      <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-300">{event.description}</p>

      <div className="flex flex-wrap gap-2">
        {event.tags.map((tag) => (
          <span key={tag} className="rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            {tag}
          </span>
        ))}
      </div>

      {event.prize && (
        <div className="flex items-center gap-2 rounded-xl border-2 border-zinc-900 bg-[var(--accent-lime)] px-4 py-2.5 shadow-[2px_2px_0_#111] dark:border-zinc-200/30">
          <TrophyIcon className="h-4 w-4 text-zinc-900" />
          <span className="text-sm font-bold text-zinc-900">{event.prize}</span>
        </div>
      )}

      <a
        href="#register"
        className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-bold text-white shadow-[0_3px_0_#bcf954] transition-all hover:-translate-y-0.5 dark:bg-[#f3f2eb] dark:text-zinc-900"
      >
        <span>Register Now</span>
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M5 12h12" /><path d="M13 6l6 6-6 6" />
        </svg>
      </a>
    </div>
  );
}

// ── Past Event Card ────────────────────────────────────────────────────────
function PastCard({ event }: { event: Event }) {
  return (
    <div className="group relative flex flex-col gap-4 rounded-2xl border-2 border-zinc-900 bg-white p-6 shadow-[0_4px_0_#111] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_0_#111] dark:border-zinc-200/30 dark:bg-[#151515] dark:shadow-[0_4px_0_#000]">
      <div className="flex items-start justify-between gap-3">
        <span className={`rounded-lg border-2 border-zinc-900 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest shadow-[1px_1px_0_#111] dark:border-zinc-200/30 ${typeColors[event.type]}`}>
          {event.type}
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          {event.date}
        </span>
      </div>

      <h3 className="text-lg font-bold leading-tight text-zinc-900 dark:text-zinc-100">{event.title}</h3>

      <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">{event.description}</p>

      <div className="flex flex-wrap gap-2">
        {event.tags.map((tag) => (
          <span key={tag} className="rounded-lg border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
            {tag}
          </span>
        ))}
      </div>

      {event.highlights && (
        <div className="space-y-1.5 border-t border-zinc-100 pt-3 dark:border-zinc-800">
          {event.highlights.map((h) => (
            <div key={h} className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-lime)]" />
              {h}
            </div>
          ))}
        </div>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-zinc-100 pt-3 dark:border-zinc-800">
        {event.participants && (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
            <UsersIcon className="h-3.5 w-3.5" />
            {event.participants}+ attended
          </span>
        )}
        {event.prize && (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
            <TrophyIcon className="h-3.5 w-3.5" />
            {event.prize}
          </span>
        )}
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function EventsPage() {
  const [filter, setFilter] = useState<"all" | "Hackathon" | "Workshop" | "Talk" | "Competition" | "Bootcamp">("all");

  const upcomingEvents = events.filter((e) => e.status === "upcoming");
  const pastEvents = events.filter(
    (e) => e.status === "past" && (filter === "all" || e.type === filter)
  );

  const allTypes = Array.from(new Set(events.filter((e) => e.status === "past").map((e) => e.type)));

  return (
    <main className="hero-grid flex-1">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-0 px-4 pb-0 pt-6 sm:px-6">

        {/* ── NAV ── */}
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
            <a className="nav-link nav-underline-lavender transition hover:text-zinc-900 dark:hover:text-white" href="/events">Events</a>
            <a className="nav-link nav-underline-amber transition hover:text-zinc-900 dark:hover:text-white" href="#projects">Projects</a>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button className="rounded-xl border-2 border-zinc-900 bg-[var(--accent-lime)] px-4 py-2 text-xs font-bold uppercase tracking-widest text-zinc-900 shadow-[0_3px_0_#111] transition hover:-translate-y-0.5 dark:border-zinc-200/40" type="button">
              Contact
            </button>
          </div>
        </header>

        {/* ── HERO ── */}
        <section className="mt-10 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="hero-rise hero-rise-delay-1 flex flex-col gap-8">
            <div className="inline-flex items-center gap-2 self-start rounded-lg border-2 border-[#121212] bg-white px-3 py-1 text-xs font-bold shadow-[2px_2px_0px_0px_#121212] dark:border-zinc-200/40 dark:bg-[#151515] dark:text-zinc-100">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#bcf954]" />
              {upcomingEvents.length} EVENTS COMING UP
            </div>

            <h1 className="font-display text-5xl font-bold uppercase leading-[0.9] text-[#121212] md:text-7xl lg:text-8xl dark:text-[#f3f2eb]">
              WHERE IDEAS
              <br />
              <span className="bg-[#bcf954] px-2">GO LIVE.</span>
            </h1>

            <p className="max-w-lg font-sans text-lg leading-relaxed text-gray-700 dark:text-zinc-300">
              Hackathons that don't sleep. Workshops that actually teach. Talks from people
              shipping in production. Every semester, we build the calendar that builders want.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-4">
              {stats.map(({ n, l, accent }) => (
                <div key={l} className="flex flex-col items-center rounded-2xl border-2 border-zinc-900 bg-white px-8 py-4 shadow-[0_4px_0_#111] dark:border-zinc-200/30 dark:bg-[#151515] dark:shadow-[0_4px_0_#000]">
                  <span className={`mb-1 h-2 w-8 rounded-full ${accent}`} />
                  <span className="font-display text-3xl font-bold text-zinc-900 dark:text-zinc-100">{n}</span>
                  <span className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">{l}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a href="#upcoming" className="flex items-center justify-center gap-2 rounded-xl bg-[#121212] px-8 py-4 text-lg font-bold text-white shadow-[4px_4px_0px_0px_#bcf954] transition-transform hover:-translate-y-0.5 dark:bg-[#f3f2eb] dark:text-[#121212]">
                <span>See Upcoming</span>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h12" /><path d="M13 6l6 6-6 6" />
                </svg>
              </a>
              <a href="/" className="flex items-center justify-center gap-2 rounded-xl border-2 border-[#121212] bg-white px-8 py-4 text-lg font-bold shadow-[4px_4px_0px_0px_#121212] transition-all hover:-translate-y-0.5 hover:bg-[#cbb6ff] dark:border-zinc-200/40 dark:bg-[#151515] dark:text-zinc-100 dark:shadow-[4px_4px_0px_0px_#f3f2eb] dark:hover:bg-[#7c3aed]">
                ← Back to Home
              </a>
            </div>
          </div>

          {/* Terminal */}
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
                <p className="text-zinc-500 dark:text-zinc-400">$ kts --list-events --filter=upcoming</p>
                <p><span className="text-emerald-600">&gt;</span> Scanning calendar...</p>
                {upcomingEvents.map((e) => (
                  <p key={e.id}>
                    <span className="text-[var(--accent-lime)]">✓</span>{" "}
                    <span className="text-zinc-900 dark:text-zinc-100 font-semibold">{e.title}</span>
                    <span className="text-zinc-500"> — {e.date}</span>
                  </p>
                ))}
                <div className="h-2 rounded-full border-2 border-zinc-900 bg-zinc-100 dark:border-zinc-200/30 dark:bg-zinc-800">
                  <div className="h-full w-full rounded-full bg-[var(--accent-lime)]" />
                </div>
                <p className="text-emerald-600">{upcomingEvents.length} upcoming events ready. 🚀</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── MARQUEE ── */}
        <div className="full-bleed mt-10 border-y border-zinc-900/30 bg-white/80 dark:border-zinc-200/20 dark:bg-[#151515]/80">
          <div className="flex items-center gap-4 px-2 py-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-zinc-500 sm:px-4 sm:text-xs dark:text-zinc-400">
            <span className="shrink-0 text-zinc-900 dark:text-zinc-100">Event Formats</span>
            <span aria-hidden className="h-4 w-px bg-zinc-900/30 dark:bg-zinc-200/20" />
            <div className="strip-marquee relative flex-1 overflow-hidden">
              <div className="strip-track flex items-center gap-4 whitespace-nowrap pr-8">
                {["Hackathons", "Workshops", "Tech Talks", "Competitions", "Bootcamps", "Open Source Sprints", "Hackathons", "Workshops", "Tech Talks", "Competitions", "Bootcamps", "Open Source Sprints"].map((t, i) => (
                  <span key={i} className="flex items-center gap-4">
                    {t}<span aria-hidden className="h-4 w-px bg-zinc-900/30 dark:bg-zinc-200/20" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── UPCOMING EVENTS ── */}
        <section id="upcoming" className="full-bleed border-b border-zinc-900/20 bg-[var(--background)] dark:border-zinc-200/15">
          <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6">
            <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex flex-col gap-4">
                <SectionLabel number="01" label="What's Next" />
                <h2 className="font-serif text-4xl leading-tight text-zinc-900 sm:text-5xl dark:text-zinc-100">
                  Upcoming <span className="italic">Events.</span>
                </h2>
                <p className="max-w-md text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  Block your calendar. Tell your teammates. These don't get rescheduled.
                </p>
              </div>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center self-start rounded-xl border-2 border-zinc-900 bg-[var(--accent-lime)] text-lg font-bold text-zinc-900 shadow-[0_3px_0_#111] dark:border-zinc-200/30">
                🗓
              </span>
            </div>

            {upcomingEvents.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {upcomingEvents.map((e) => (
                  <UpcomingCard key={e.id} event={e} />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border-2 border-dashed border-zinc-300 p-12 text-center dark:border-zinc-700">
                <p className="text-sm font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  Next events being planned. Check back soon.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ── CULTURE CALLOUT ── */}
        <section className="full-bleed border-b border-zinc-900/20 bg-zinc-900 dark:border-zinc-200/15">
          <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
              <p className="font-serif text-2xl italic text-white sm:text-3xl lg:text-4xl">
                "Not just events.{" "}
                <span className="not-italic text-[var(--accent-lime)]">
                  Experiences that push you past your comfort zone.
                </span>"
              </p>
              <div className="flex shrink-0 flex-col gap-2 lg:items-end">
                {["24hr sprints", "Real mentors", "Cash prizes", "Build & ship"].map((tag) => (
                  <span key={tag} className="w-fit rounded-lg border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/60">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── PAST EVENTS ── */}
        <section className="full-bleed border-b border-zinc-900/20 bg-[var(--background)] dark:border-zinc-200/15">
          <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6">
            <div className="mb-10 grid gap-10 lg:grid-cols-[1.05fr_1.6fr]">
              <div className="flex flex-col gap-6 lg:border-r lg:pr-10 dark:border-zinc-200/15">
                <SectionLabel number="02" label="The Archives" />
                <span className="h-12 w-1 bg-emerald-600" />
                <h2 className="font-serif text-4xl leading-tight text-zinc-900 sm:text-5xl dark:text-zinc-100">
                  Past <span className="italic">Events.</span>
                </h2>
                <p className="max-w-md text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  Every event is a chapter. Here's proof we've been building
                  this community for a while.
                </p>

                {/* Filter chips */}
                <div className="flex flex-col gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                    Filter by type
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setFilter("all")}
                      className={`rounded-xl border-2 px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition hover:-translate-y-0.5 ${
                        filter === "all"
                          ? "border-zinc-900 bg-zinc-900 text-white shadow-[2px_2px_0_#bcf954] dark:border-zinc-200/40 dark:bg-zinc-100 dark:text-zinc-900"
                          : "border-zinc-900 bg-white text-zinc-900 shadow-[2px_2px_0_#111] dark:border-zinc-200/30 dark:bg-[#151515] dark:text-zinc-100"
                      }`}
                    >
                      All
                    </button>
                    {allTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => setFilter(type as typeof filter)}
                        className={`rounded-xl border-2 px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition hover:-translate-y-0.5 ${
                          filter === type
                            ? "border-zinc-900 bg-zinc-900 text-white shadow-[2px_2px_0_#bcf954] dark:border-zinc-200/40 dark:bg-zinc-100 dark:text-zinc-900"
                            : "border-zinc-900 bg-white text-zinc-900 shadow-[2px_2px_0_#111] dark:border-zinc-200/30 dark:bg-[#151515] dark:text-zinc-100"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 self-start rounded-lg border-2 border-[#121212] bg-white px-3 py-1 text-xs font-bold shadow-[2px_2px_0px_0px_#121212] dark:border-zinc-200/40 dark:bg-[#151515] dark:text-zinc-100">
                  <span className="h-2 w-2 rounded-full bg-zinc-400" />
                  {pastEvents.length} events shown
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {pastEvents.map((e) => (
                  <PastCard key={e.id} event={e} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── DATAVERSE HIGHLIGHT ── */}
        <section className="full-bleed border-b border-zinc-900/20 bg-[var(--background)] dark:border-zinc-200/20">
          <div className="mx-auto grid w-full max-w-7xl lg:grid-cols-[1.1fr_1fr]">
            <div className="relative flex items-center justify-center bg-[var(--background)] px-6 py-14">
              <div className="pointer-events-none absolute inset-0">
                <span className="absolute left-6 top-6 h-4 w-4 border-l border-t border-zinc-700/30 dark:border-zinc-400/40" />
                <span className="absolute right-6 top-6 h-4 w-4 border-r border-t border-zinc-700/30 dark:border-zinc-400/40" />
                <span className="absolute bottom-6 left-6 h-4 w-4 border-b border-l border-zinc-700/30 dark:border-zinc-400/40" />
                <span className="absolute bottom-6 right-6 h-4 w-4 border-b border-r border-zinc-700/30 dark:border-zinc-400/40" />
              </div>
              <div className="absolute left-1/2 top-6 flex -translate-x-1/2 items-center gap-2 rounded-md border border-zinc-300 bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-zinc-900 dark:border-zinc-600 dark:bg-black/70 dark:text-zinc-200">
                <span className="h-2 w-2 rounded-full bg-[var(--accent-lime)]" />
                Flagship Event
              </div>
              <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border-2 border-zinc-900 bg-white shadow-[0_10px_0_#111] dark:border-zinc-200/30 dark:bg-[#151515] dark:shadow-[0_10px_0_#000]">
                <Image
                  src="/events/dataverse.jpg"
                  alt="DataVerse 2025 – National Level Hackathon"
                  width={600}
                  height={400}
                  className="h-auto w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-900/80 to-transparent p-4">
                  <p className="text-sm font-bold text-white">🚀 DataVerse 2025 — National Level Hackathon</p>
                  <p className="text-xs text-zinc-300">200+ participants · 30+ colleges</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 bg-[var(--background)] px-8 py-14 sm:px-12 lg:border-l lg:border-zinc-900/10 dark:lg:border-zinc-200/10">
              <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
                <span className="h-px w-12 bg-zinc-300 dark:bg-zinc-600" />
                Our Biggest Yet
              </div>
              <h3 className="font-serif text-4xl leading-tight text-zinc-900 sm:text-5xl dark:text-zinc-100">
                DataVerse took{" "}
                <span className="text-emerald-700 dark:text-emerald-300">campus</span>
                <br />
                to national stage.
              </h3>
              <p className="text-sm leading-6 text-zinc-600 sm:text-base dark:text-zinc-300">
                In March 2025, KTS hosted its biggest event — a national-level hackathon
                that brought 200+ students from 30+ colleges together to solve real
                data problems in 24 hours. The energy was electric.
              </p>
              <ul className="space-y-3 text-sm text-zinc-700 dark:text-zinc-200">
                {["200+ participants from 30+ colleges nationwide", "₹1,00,000 prize pool distributed", "24-hour non-stop build sprint", "Live demos judged by industry experts"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="mt-4 inline-flex w-fit items-center gap-2 rounded-none border-2 border-zinc-900 bg-zinc-900 px-6 py-3 text-xs font-semibold uppercase tracking-[0.32em] text-white shadow-[0_4px_0_#111]"
              >
                <span>View Recap</span>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h12" /><path d="M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* ── JOIN CTA + FOOTER ── */}
        <section
          className="full-bleed border-y-2 border-[var(--section-border)] bg-[var(--background)]"
          style={{
            backgroundImage: "radial-gradient(var(--contact-dot) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        >
          <div className="mx-auto w-full max-w-7xl px-6 pb-12 pt-10 text-center">
            <h2 className="mb-4 font-display text-[36px] font-bold text-[#121212] md:text-[60px] dark:text-[#f3f2eb]">
              Don't watch from<br className="hidden sm:block" /> the sidelines.
            </h2>
            <p className="mb-8 text-[18px] font-medium text-[#4b5563] dark:text-zinc-300">
              Join KTS and be the one building the next event.
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
              <a
                href="/"
                className="flex items-center justify-center gap-2 rounded-xl border-2 border-[#121212] bg-white px-8 py-4 text-lg font-bold shadow-[4px_4px_0px_0px_#121212] transition-all hover:-translate-y-0.5 hover:bg-[#cbb6ff] hover:text-[#121212] dark:border-zinc-200/40 dark:bg-[#151515] dark:text-zinc-100 dark:shadow-[4px_4px_0px_0px_#f3f2eb] dark:hover:bg-[#7c3aed] dark:hover:text-white"
              >
                View Projects
              </a>
            </div>
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