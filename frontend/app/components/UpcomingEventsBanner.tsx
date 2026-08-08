"use client";

import { useEffect, useState } from "react";
import { fetchEvents, EventItem } from "../services/api";
import EventDetailsModal from "./EventDetailsModal";

export default function UpcomingEventsBanner() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalEvent, setModalEvent] = useState<EventItem | null>(null);

  useEffect(() => {
    async function loadBannerEvents() {
      try {
        const fetched = await fetchEvents("upcoming_or_brewing");
        if (fetched && fetched.length > 0) {
          setEvents(fetched);
        }
      } catch (err) {
        console.warn("Banner events fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadBannerEvents();
  }, []);

  if (dismissed || loading || events.length === 0) {
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
      <div className="relative z-50 w-full bg-zinc-950/95 border-b border-[#bcf954]/30 backdrop-blur-md transition-all duration-300">
        {/* Subtle glowing ambient line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#bcf954] to-transparent opacity-80" />

        <div className="mx-auto max-w-7xl px-4 py-3.5 sm:py-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-3.5 text-sm min-h-[62px]">
          {/* Left Side: Badge + Title + Inline Description */}
          <div className="flex items-center gap-3.5 flex-wrap justify-center md:justify-start text-center md:text-left flex-1 min-w-0">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#bcf954]/40 bg-[#bcf954]/10 px-3 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-[#bcf954] shrink-0 shadow-[0_0_10px_rgba(188,249,84,0.15)]">
              <span className="h-2 w-2 rounded-full bg-[#bcf954] animate-pulse" />
              {currentEvent.status === "brewing" ? "NOW BREWING" : "UPCOMING EVENT"}
            </span>

            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2.5 min-w-0">
              <button
                onClick={() => setModalEvent(currentEvent)}
                className="font-bold text-white text-sm sm:text-base tracking-wide hover:text-[#bcf954] transition-colors text-left truncate cursor-pointer"
              >
                {currentEvent.title}
              </button>

              {currentEvent.date && (
                <span className="hidden lg:inline text-zinc-400 text-xs font-mono shrink-0">
                  • {currentEvent.date}
                </span>
              )}
            </div>

            {/* Banner Event Description snippet */}
            {currentEvent.description && (
              <p
                onClick={() => setModalEvent(currentEvent)}
                className="hidden xl:line-clamp-1 text-xs sm:text-sm text-zinc-400 font-sans cursor-pointer hover:text-zinc-200 transition-colors border-l border-zinc-800 pl-3.5 max-w-md leading-relaxed"
              >
                {currentEvent.description}
              </p>
            )}
          </div>

          {/* Right Side: Actions & Controls */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Multi-event Navigation */}
            {events.length > 1 && (
              <div className="flex items-center gap-1 text-xs text-zinc-400 bg-zinc-900/90 px-2.5 py-1.5 rounded-lg border border-zinc-800">
                <button
                  onClick={handlePrev}
                  aria-label="Previous event"
                  className="hover:text-[#bcf954] transition-colors cursor-pointer px-1 text-xs"
                >
                  ◀
                </button>
                <span className="font-mono text-xs font-medium">
                  {currentIndex + 1}/{events.length}
                </span>
                <button
                  onClick={handleNext}
                  aria-label="Next event"
                  className="hover:text-[#bcf954] transition-colors cursor-pointer px-1 text-xs"
                >
                  ▶
                </button>
              </div>
            )}

            {/* View Full Details Button */}
            <button
              onClick={() => setModalEvent(currentEvent)}
              className="inline-flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider bg-[#bcf954] text-zinc-950 hover:bg-[#a6e63e] px-4 py-2 rounded-lg transition-all shadow-[0_0_15px_rgba(188,249,84,0.3)] hover:shadow-[0_0_20px_rgba(188,249,84,0.5)] cursor-pointer"
            >
              <span>View Details</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>

            {/* Dismiss Banner Button */}
            <button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss banner"
              className="text-zinc-500 hover:text-white p-1.5 transition-colors cursor-pointer rounded-md hover:bg-zinc-800"
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

