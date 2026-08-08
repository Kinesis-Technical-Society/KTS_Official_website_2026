"use client";

import { useRef, useState } from "react";

import { Event } from "../types";
import { BookOverlay } from "./BookOverlay";
import { SectionLabel } from "./SectionLabel";

function PastEventCard({
  event,
  index,
  onOpen,
}: {
  event: Event;
  index: number;
  onOpen: () => void;
}) {
  return (
    <div
      className="ev-card"
      style={{
        ["--ac" as string]: event.accent,
        boxShadow: "0 0 0 transparent",
        animationDelay: `${index * 90}ms`,
      } as React.CSSProperties}
      onClick={onOpen}
    >
      <div className="ev-card-media">
        {event.image ? (
          <img src={event.image} alt={event.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        ) : (
          <div style={{ width: "100%", height: "100%", background: event.gradient }} />
        )}
      </div>

      <div className="ev-card-body">
        <div className="ev-card-title">{event.title}</div>
        <div style={{ fontSize: "13px", lineHeight: 1.6, color: "#a1a1aa" }}>{event.location.split(",")[0]}</div>
        <div className="ev-card-meta">
          <div className="ev-card-date">{event.date}</div>
          <div className="ev-card-open">
            <span>Open</span>
            <span>→</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PastEventsSection({ events }: { events: Event[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const startingScrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    trackRef.current?.classList.add("grabbing");
    startX.current = e.pageX - (trackRef.current?.offsetLeft ?? 0);
    startingScrollLeft.current = trackRef.current?.scrollLeft ?? 0;
  };

  const stopDragging = () => {
    isDragging.current = false;
    trackRef.current?.classList.remove("grabbing");
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) {
      return;
    }

    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    trackRef.current.scrollLeft = startingScrollLeft.current - (x - startX.current) * 1.5;
  };

  return (
    <section id="past" className="full-bleed border-b-2 border-zinc-900 bg-[var(--background)] dark:border-zinc-200/15">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-10 flex flex-col gap-4">
          <SectionLabel label="The Archives" />
          <div className="flex flex-col gap-3">
            <span className="h-12 w-1 bg-emerald-600" />
            <h2 className="font-serif text-4xl leading-tight text-zinc-900 sm:text-5xl dark:text-zinc-100">
              Past <span className="italic">Events.</span>
            </h2>
            <p className="max-w-md text-sm leading-7 text-zinc-600 dark:text-zinc-300">
              Every event is a chapter. <span className="font-semibold text-zinc-900 dark:text-zinc-100">Click any event</span> to
              open the book.
            </p>
          </div>
        </div>

        <div
          ref={trackRef}
          className="scroll-track"
          onMouseDown={handleMouseDown}
          onMouseLeave={stopDragging}
          onMouseUp={stopDragging}
          onMouseMove={handleMouseMove}
        >
          {events.map((event, index) => (
            <PastEventCard key={event.id} event={event} index={index} onOpen={() => setActiveIndex(index)} />
          ))}
        </div>

        <p className="mt-4 text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-zinc-500">
          ← scroll to explore · click to open →
        </p>
      </div>

      {activeIndex !== null ? (
        <BookOverlay
          events={events}
          activeIdx={activeIndex}
          onClose={() => setActiveIndex(null)}
          onPrev={() => setActiveIndex((prev) => (prev !== null ? Math.max(0, prev - 1) : null))}
          onNext={() => setActiveIndex((prev) => (prev !== null ? Math.min(events.length - 1, prev + 1) : null))}
        />
      ) : null}
    </section>
  );
}
