"use client";

import { useEffect, useState } from "react";
import { EventItem } from "../services/api";

interface EventDetailsModalProps {
  event: EventItem | null;
  onClose: () => void;
}

export default function EventDetailsModal({ event, onClose }: EventDetailsModalProps) {
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (activePhoto) {
          setActivePhoto(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, activePhoto]);

  useEffect(() => {
    if (event) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [event]);

  if (!event) return null;

  const accentColor = event.accent || "#bcf954";

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md transition-all duration-300 animate-in fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-zinc-800 bg-zinc-950 text-white shadow-2xl scrollbar-hide">
        {/* Glowing Top Accent Bar */}
        <div
          className="h-1.5 w-full sticky top-0 z-20"
          style={{
            background: `linear-gradient(90deg, ${accentColor}, #cbb6ff, ${accentColor})`,
          }}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close details"
          className="absolute top-4 right-4 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900/90 text-zinc-400 border border-zinc-800 hover:border-zinc-600 hover:text-white transition-all cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Cover Image Banner (if available) */}
        {event.image ? (
          <div className="relative w-full h-48 sm:h-64 overflow-hidden bg-zinc-900">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
          </div>
        ) : (
          <div
            className="w-full h-28 sm:h-36 opacity-30"
            style={{ background: event.gradient || "linear-gradient(135deg, #0a1a02 0%, #0e0e0e 100%)" }}
          />
        )}

        <div className="p-6 sm:p-8 space-y-6">
          {/* Header Badge & Title */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider"
                style={{
                  borderColor: `${accentColor}55`,
                  backgroundColor: `${accentColor}15`,
                  color: accentColor,
                }}
              >
                <span
                  className="h-2 w-2 rounded-full animate-pulse"
                  style={{ backgroundColor: accentColor }}
                />
                {event.status === "brewing"
                  ? "NOW BREWING"
                  : event.status === "upcoming"
                  ? "UPCOMING EVENT"
                  : "PAST EVENT"}
              </span>

              {event.date && (
                <span className="font-mono text-xs text-zinc-400 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
                  📅 {event.date}
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {event.title}
            </h2>
          </div>

          {/* Key Database Metadata Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs">
            {event.location && (
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800">
                <span className="text-base">📍</span>
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Location</div>
                  <div className="text-zinc-200 font-semibold">{event.location}</div>
                </div>
              </div>
            )}

            {event.prize && (
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800">
                <span className="text-base">🏆</span>
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Prize & Rewards</div>
                  <div className="text-amber-400 font-bold">{event.prize}</div>
                </div>
              </div>
            )}

            {typeof event.participants === "number" && event.participants > 0 && (
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800">
                <span className="text-base">👥</span>
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Expected / Attended</div>
                  <div className="text-zinc-200 font-semibold">{event.participants}+ Participants</div>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2 pt-2 border-t border-zinc-900">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400">
              // ABOUT THIS EVENT
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-zinc-300 whitespace-pre-line font-sans">
              {event.description}
            </p>
          </div>

          {/* Highlights */}
          {event.highlights && event.highlights.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-zinc-900">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400">
                // EVENT HIGHLIGHTS
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {event.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 text-xs font-semibold text-zinc-300 bg-zinc-900/50 p-2.5 rounded-xl border border-zinc-800/80"
                  >
                    <span className="text-[#bcf954] font-bold">✓</span>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-zinc-900">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400">
                // TAGS & CATEGORIES
              </h3>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono px-3 py-1 rounded-lg bg-zinc-900 text-zinc-300 border border-zinc-800"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Photo Gallery (if available) */}
          {event.photos && event.photos.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-zinc-900">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400">
                // PHOTO GALLERY
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {event.photos.map((photo, pIdx) => (
                  <div
                    key={pIdx}
                    onClick={() => setActivePhoto(photo)}
                    className="group relative h-24 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 cursor-pointer hover:border-[#bcf954] transition-all"
                  >
                    <img
                      src={photo}
                      alt={`Photo ${pIdx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-4 border-t border-zinc-800 flex items-center justify-between gap-4 flex-wrap">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-zinc-800 text-xs font-mono font-semibold text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all cursor-pointer"
            >
              Close Window
            </button>

            {event.moreInfoUrl && (
              <a
                href={event.moreInfoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-zinc-950 hover:scale-105 active:scale-95 transition-all shadow-lg cursor-pointer"
                style={{
                  backgroundColor: accentColor,
                  boxShadow: `0 0 20px ${accentColor}44`,
                }}
              >
                <span>Register / External Link</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox photo viewer */}
      {activePhoto && (
        <div
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-[10000] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
        >
          <img
            src={activePhoto}
            alt="Enlarged view"
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-2xl border border-zinc-800 shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
