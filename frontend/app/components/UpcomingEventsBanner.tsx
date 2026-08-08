"use client";

import { useEffect, useState } from "react";
import { fetchEvents, EventItem } from "../services/api";
import EventDetailsModal from "./EventDetailsModal";

const DEFAULT_UPCOMING_EVENTS: EventItem[] = [
  {
    id: "default-1",
    title: "KTS Hackathon 2026 — Build for Tomorrow",
    date: "Coming Soon • March 2026",
    status: "upcoming",
    description:
      "Annual flagship hackathon by Kinesis Technical Society featuring real-world challenges, open-source tracks, and exciting prize pools.",
    location: "KIET Group of Institutions, Ghaziabad",
    prize: "₹50,000+ Prize Pool & Swag Kits",
    tags: ["Hackathon", "Open Source", "Innovation", "Development"],
    highlights: ["48-Hour Hybrid Hackathon", "Mentorship from Industry Experts", "Swag Kits & Goodies"],
  },
  {
    id: "default-2",
    title: "Web3 & AI Tech Summit 2026",
    date: "April 2026",
    status: "brewing",
    description:
      "Hands-on workshops, keynote sessions, and live project demos on AI agents, LLMs, and decentralized technologies.",
    location: "Auditorium, KIET Group of Institutions",
    prize: "Certificates & Internship Opportunities",
    tags: ["AI", "Web3", "Workshop", "Tech Talk"],
    highlights: ["Live AI Agent Demos", "Keynote Talks by Alum Innovators"],
  },
];

export default function UpcomingEventsBanner() {
  const [events, setEvents] = useState<EventItem[]>(DEFAULT_UPCOMING_EVENTS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [modalEvent, setModalEvent] = useState<EventItem | null>(null);

  useEffect(() => {
    async function loadBannerEvents() {
      try {
        const fetched = await fetchEvents("upcoming_or_brewing");
        if (fetched && fetched.length > 0) {
          setEvents(fetched);
        } else {
          setEvents(DEFAULT_UPCOMING_EVENTS);
        }
      } catch (err) {
        console.warn("Banner events fetch error:", err);
        setEvents(DEFAULT_UPCOMING_EVENTS);
      }
    }

    loadBannerEvents();
  }, []);

  if (dismissed || events.length === 0) {
    return null;
  }

  const currentEvent = events[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  return (
    <>
      <div className="relative z-30 w-full bg-white/95 text-zinc-900 border-b border-zinc-200 shadow-sm dark:bg-zinc-950/95 dark:text-zinc-100 dark:border-[#bcf954]/30 backdrop-blur-md transition-colors duration-200">
        {/* Subtle glowing ambient line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-lime-500 to-transparent opacity-60 dark:via-[#bcf954] dark:opacity-80" />

        <div className="mx-auto max-w-7xl px-4 py-3.5 sm:py-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-3.5 text-sm min-h-[62px]">
          {/* Left Side: Badge + Title + Inline Description */}
          <div className="flex items-center gap-3.5 flex-wrap justify-center md:justify-start text-center md:text-left flex-1 min-w-0">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-lime-600/40 bg-lime-500/10 px-3 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-lime-700 dark:border-[#bcf954]/50 dark:bg-[#bcf954]/15 dark:text-[#bcf954] shrink-0 shadow-[0_0_10px_rgba(188,249,84,0.15)]">
              <span className="h-2 w-2 rounded-full bg-lime-500 dark:bg-[#bcf954] animate-pulse" />
              {currentEvent.status === "brewing" ? "NOW BREWING" : "UPCOMING EVENT"}
            </span>

            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2.5 min-w-0">
              <button
                type="button"
                onClick={() => setModalEvent(currentEvent)}
                className="font-bold text-zinc-900 dark:text-white text-sm sm:text-base tracking-wide hover:text-lime-600 dark:hover:text-[#bcf954] transition-colors text-left truncate cursor-pointer pointer-events-auto touch-manipulation"
              >
                {currentEvent.title}
              </button>

              {currentEvent.date && (
                <span className="hidden lg:inline text-zinc-500 dark:text-zinc-400 text-xs font-mono shrink-0">
                  • {currentEvent.date}
                </span>
              )}
            </div>

            {/* Banner Event Description snippet */}
            {currentEvent.description && (
              <p
                onClick={() => setModalEvent(currentEvent)}
                className="hidden xl:line-clamp-1 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans cursor-pointer hover:text-zinc-900 dark:hover:text-white transition-colors border-l border-zinc-300 dark:border-zinc-800 pl-3.5 max-w-md leading-relaxed"
              >
                {currentEvent.description}
              </p>
            )}
          </div>

          {/* Right Side: Actions & Controls */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Multi-event Navigation */}
            {events.length > 1 && (
              <div className="flex items-center gap-1 text-xs text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900/90 px-2.5 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous event"
                  className="hover:text-lime-600 dark:hover:text-[#bcf954] transition-colors cursor-pointer px-1 text-xs pointer-events-auto touch-manipulation"
                >
                  ◀
                </button>
                <span className="font-mono text-xs font-medium">
                  {currentIndex + 1}/{events.length}
                </span>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next event"
                  className="hover:text-lime-600 dark:hover:text-[#bcf954] transition-colors cursor-pointer px-1 text-xs pointer-events-auto touch-manipulation"
                >
                  ▶
                </button>
              </div>
            )}

            {/* View Full Details Button */}
            <button
              type="button"
              onClick={() => setModalEvent(currentEvent)}
              className="inline-flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider bg-[#bcf954] text-zinc-950 hover:bg-[#a6e63e] px-4 py-2 rounded-lg transition-all shadow-[0_0_15px_rgba(188,249,84,0.3)] hover:shadow-[0_0_20px_rgba(188,249,84,0.5)] cursor-pointer pointer-events-auto touch-manipulation"
            >
              <span>View Details</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>

            {/* Dismiss Banner Button */}
            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="Dismiss banner"
              className="text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800 p-1.5 transition-colors cursor-pointer rounded-md pointer-events-auto touch-manipulation"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Full Event Details Modal displaying all database information */}
      <EventDetailsModal
        event={modalEvent}
        onClose={() => setModalEvent(null)}
      />
    </>
  );
}

