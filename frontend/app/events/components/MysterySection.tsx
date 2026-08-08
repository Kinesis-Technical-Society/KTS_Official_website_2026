"use client";

import { useEffect, useState } from "react";
import { fetchEvents, EventItem } from "../../services/api";
import EventDetailsModal from "../../components/EventDetailsModal";

export function MysterySection() {
  const [typed, setTyped] = useState("");
  const [brewingEvents, setBrewingEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const fullText = "SOMETHING.IS.COMING";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTyped(fullText.slice(0, index + 1));
      index += 1;
      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 80);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function loadBrewingEvents() {
      try {
        const data = await fetchEvents("upcoming_or_brewing");
        setBrewingEvents(data);
      } catch (err) {
        console.warn("Failed to load brewing events:", err);
      } finally {
        setLoading(false);
      }
    }
    loadBrewingEvents();
  }, []);

  const glitchTextBaseClasses = "font-display text-4xl font-bold uppercase md:text-6xl lg:text-7xl";

  return (
    <>
      <section id="brewing-section" className="full-bleed relative overflow-hidden border-b border-zinc-800 bg-zinc-950 py-16 sm:py-24">
        {/* Dynamic Scanline background effect */}
        <div className="pointer-events-none absolute inset-0 z-0 opacity-10">
          <div className="scanline-anim absolute left-0 right-0 h-20 bg-linear-to-b from-transparent via-[#bcf954]/40 to-transparent" />
        </div>
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-20"
          style={{ backgroundImage: "radial-gradient(rgba(188,249,84,0.4) 1px,transparent 1px)", backgroundSize: "24px 24px" }}
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-center gap-10 text-center">
            {/* Section Badge */}
            <div className="inline-flex items-center gap-2 rounded-lg border border-[#bcf954]/30 bg-[#bcf954]/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.4em] text-[#bcf954]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#bcf954] cursor-blink" />
              What&apos;s Next & Brewing
            </div>

            {/* Glitch Animated Heading */}
            <div className="relative select-none">
              <h2 className={`${glitchTextBaseClasses} text-white`}>
                {typed}
                <span className="cursor-blink text-[#bcf954]">_</span>
              </h2>
              <h2 className={`glitch-1 pointer-events-none absolute inset-0 ${glitchTextBaseClasses} text-[#bcf954]`}>
                {typed}
              </h2>
              <h2 className={`glitch-2 pointer-events-none absolute inset-0 ${glitchTextBaseClasses} text-[#cbb6ff]`}>
                {typed}
              </h2>
            </div>

            {/* DYNAMIC BREWING EVENTS LISTING */}
            {brewingEvents.length > 0 ? (
              <div className="w-full max-w-5xl mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                {brewingEvents.map((event, idx) => (
                  <div
                    key={event._id || event.id || idx}
                    className="group relative rounded-2xl border border-zinc-800 bg-zinc-900/90 p-6 sm:p-8 backdrop-blur-md hover:border-[#bcf954]/50 transition-all duration-300 shadow-xl flex flex-col justify-between cursor-pointer"
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className="space-y-4">
                      {/* Event Status & Date Header */}
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          {event.status === "brewing" ? "BREWING..." : "UPCOMING"}
                        </span>
                        {event.date && (
                          <span className="font-mono text-xs text-[#bcf954] bg-[#bcf954]/10 px-2.5 py-1 rounded-md border border-[#bcf954]/20">
                            {event.date}
                          </span>
                        )}
                      </div>

                      {/* Event Title */}
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#bcf954] transition-colors">
                        {event.title}
                      </h3>

                      {/* Full / Truncated Description */}
                      <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                        {event.description}
                      </p>

                      {/* Meta Details: Location & Prize */}
                      <div className="space-y-1.5 pt-2 border-t border-zinc-800/80 font-mono text-xs text-zinc-300">
                        {event.location && (
                          <p className="flex items-center gap-2">
                            <span className="text-zinc-500">📍 Location:</span>
                            <span className="text-zinc-200">{event.location}</span>
                          </p>
                        )}
                        {event.prize && (
                          <p className="flex items-center gap-2">
                            <span className="text-zinc-500">🏆 Rewards:</span>
                            <span className="text-amber-400">{event.prize}</span>
                          </p>
                        )}
                      </div>

                      {/* Tags */}
                      {event.tags && event.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {event.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="rounded bg-zinc-800/80 px-2 py-0.5 text-[11px] font-mono text-zinc-400 border border-zinc-800"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Actions & More Info Button */}
                    <div className="pt-6 mt-6 border-t border-zinc-800/60 flex items-center justify-between">
                      <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                        // GET READY
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEvent(event);
                        }}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#bcf954] px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider text-zinc-950 hover:bg-[#a6e63e] hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(188,249,84,0.3)] cursor-pointer"
                      >
                        View Details
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Fallback Cyber Card when no events are currently listed */
              <div className="w-full max-w-lg rounded-2xl border border-zinc-700 bg-zinc-900 px-8 py-6 font-mono text-left text-sm text-zinc-400 shadow-2xl">
                <p className="mb-2 text-xs tracking-widest text-[#bcf954]">{"//STAY TUNED"}</p>
                <p>
                  event_name: <span className="text-zinc-600">██████████████</span>
                </p>
                <p>
                  date: <span className="text-zinc-600">██ ███ 2026</span>
                </p>
                <p>
                  location: <span className="text-zinc-600">████████████</span>
                </p>
                <p>
                  Exciting rewards: <span className="text-zinc-600">██,███</span>
                </p>
                <p className="mt-3 text-[#bcf954]">
                  status: <span className="text-emerald-400">BREWING...</span>
                </p>
              </div>
            )}

            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-zinc-500">
              Stay tuned. We don&apos;t announce until it&apos;s ready.
            </p>
          </div>
        </div>
      </section>

      {/* Full Event Details Modal showing all database fields */}
      <EventDetailsModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </>
  );
}
