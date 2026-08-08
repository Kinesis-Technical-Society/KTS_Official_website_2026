"use client";

import { useEffect, useState } from "react";

import { Event } from "../types";
import { TrophyIcon } from "./icons";

function EventPhotoLightbox({ photo, onClose }: { photo: string; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 w-screen h-screen bg-black/90 flex items-center justify-center z-[9999] cursor-zoom-out"
    >
      <img
        src={photo}
        alt="Event preview"
        className="max-w-[90%] max-h-[90%] rounded-[10px] object-contain shadow-[0_0_30px_rgba(0,0,0,0.5)]"
      />
    </div>
  );
}

function EventGallery({
  event,
  onPhotoOpen,
}: {
  event: Event;
  onPhotoOpen: (photo: string) => void;
}) {
  return (
    <>
      <p className="text-[9px] font-bold tracking-[.35em] uppercase text-zinc-600 pb-2 border-b border-zinc-800">
      
        Gallery
      </p>

      <div className="polaroid-grid">
        {event.photos.map((photo, index) => (
          <div
            key={`${photo}-${index}`}
            className="polaroid"
            style={{ ["--bac" as string]: event.accent } as React.CSSProperties}
          >
            <div className="polaroid-img-box">
              <img
                src={photo}
                alt={`${event.title} ${index + 1}`}
                onClick={() => onPhotoOpen(photo)}
                className="w-full h-full object-cover rounded-[6px] cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function EventHighlights({ event }: { event: Event }) {
  if (!event.highlights?.length) {
    return null;
  }

  return (
    <div className="mt-auto pt-4 border-t border-zinc-800">
      <p className="text-[9px] font-bold tracking-[.3em] uppercase text-zinc-600 mb-[10px]">
        Highlights
      </p>
      <div className="flex flex-col gap-[6px]">
        {event.highlights.map((highlight) => (
          <div
            key={highlight}
            className="flex items-center gap-[10px] text-[12px] text-zinc-400 font-semibold"
          >
            <span className="w-[6px] h-[6px] rounded-full flex-shrink-0 inline-block" style={{ background: event.accent }} />
            {highlight}
          </div>
        ))}
      </div>
    </div>
  );
}

export function BookOverlay({
  events,
  activeIdx,
  onClose,
  onPrev,
  onNext,
}: {
  events: Event[];
  activeIdx: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const event = events[activeIdx];
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && activeIdx > 0) onPrev();
      if (e.key === "ArrowRight" && activeIdx < events.length - 1) onNext();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeIdx, events.length, onClose, onNext, onPrev]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const navBtnBase = "bg-zinc-800 text-[11px] font-bold tracking-[.2em] uppercase px-[14px] py-[8px] rounded-[10px] flex items-center gap-[6px] border-2 transition-all";

  return (
    <div className="book-overlay overlay-in" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div
        className="book-grid book-open"
        style={{ height: "100vh", ["--bac" as string]: event.accent } as React.CSSProperties}
      >
        <div className="book-spine" />
        <button className="book-close-btn" onClick={onClose} aria-label="Close event details">
          x
        </button>

        <div className="book-left">
          <div
            className="w-full flex-shrink-0"
            style={{ height: "220px", backgroundImage: event.image ? `url(${event.image})` : event.gradient, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
          />

          <div
            className="book-left-body overflow-y-auto max-h-full pr-[6px] scrollbar-hide"
          >
            

            <h3 className="text-[clamp(20px,3vw,28px)] font-bold uppercase leading-[1.1] text-[#f3f2eb]">
              {event.title}
            </h3>

            <p className="text-[10px] font-bold tracking-[.2em] uppercase" style={{ color: event.accent }}>
              {event.date} · {event.location.split(",")[0]}
            </p>

            <p className="text-[13px] leading-[1.8] text-zinc-400 flex-1">{event.description}</p>

            <div className="flex flex-wrap gap-[6px]">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] font-bold tracking-[.25em] uppercase px-[10px] py-[4px] rounded-[8px] border bg-transparent"
                  style={{ borderColor: `${event.accent}44`, color: event.accent }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {event.participants && (
                <div
                  className="bg-zinc-800 border-2 border-zinc-800 rounded-xl p-3 flex flex-col gap-[3px]"
                >
                  <span className="text-lg font-bold text-[#f3f2eb]">{event.participants}+</span>
                  <span className="text-[9px] font-bold tracking-[.25em] uppercase text-zinc-600">
                    Attended
                  </span>
                </div>
              )}

           
            </div>
          

            <div className="page-corner" />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "auto",
                paddingTop: "16px",
                borderTop: "1px solid #2a2a2a",
              }}
            >
              <button
                disabled={activeIdx === 0}
                onClick={onPrev}
                className={`${navBtnBase} ${activeIdx === 0 ? "border-zinc-800 text-zinc-600 cursor-not-allowed opacity-30" : "cursor-pointer opacity-100"}`}
                style={activeIdx !== 0 ? { borderColor: event.accent, color: event.accent } : {}}
              >
                ← Prev
              </button>
              <button
                disabled={activeIdx === events.length - 1}
                onClick={onNext}
                className={`${navBtnBase} ${activeIdx === events.length - 1 ? "border-zinc-800 text-zinc-600 cursor-not-allowed opacity-30" : "cursor-pointer opacity-100"}`}
                style={activeIdx !== events.length - 1 ? { borderColor: event.accent, color: event.accent } : {}}
              >
                Next →
              </button>
              <span style={{ marginLeft: "auto", fontSize: "10px", fontFamily: "monospace", color: "#52525b", letterSpacing: ".1em" }}>
                {activeIdx + 1} / {events.length}
              </span>
            </div>
          </div>
        </div>

        <div
          className="book-right overflow-y-auto scrollbar-hide"
        >
          <EventGallery event={event} onPhotoOpen={setActivePhoto} />
          <EventHighlights event={event} />
        </div>
      </div>

      {activePhoto ? <EventPhotoLightbox photo={activePhoto} onClose={() => setActivePhoto(null)} /> : null}
    </div>
  );
}
