"use client";

import { useState, useMemo, useEffect } from "react";
import coordinatorsData from "../../data/coordinators.json";

export type DomainType = "All" | "Web" | "Android" | "ML" | "DSA" | "UIUX";

export interface CoordinatorPerson {
  name: string;
  role: "Coordinator" | "Mentor";
  domain: "Web" | "Android" | "ML" | "DSA" | "UIUX";
  photo?: string;
  bio: string;
  linkedin?: string;
  github?: string;
}

const coordinators: CoordinatorPerson[] = coordinatorsData as CoordinatorPerson[];

const DOMAINS: { id: DomainType; label: string }[] = [
  { id: "All", label: "All Domains" },
  { id: "Web", label: "Web" },
  { id: "Android", label: "Android" },
  { id: "ML", label: "ML" },
  { id: "DSA", label: "DSA" },
  { id: "UIUX", label: "UI / UX" },
];

function LinkedInIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
} 

const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

const normalizeDomain = (domain: string): DomainType | null => {
  if (!domain) return null;
  const d = domain.toUpperCase().trim();
  if (d === "WEB") return "Web";
  if (d === "ANDROID") return "Android";
  if (d === "ML") return "ML";
  if (d.includes("DSA") || d.includes("CP")) return "DSA";
  if (d.includes("UI") || d.includes("UX")) return "UIUX";
  return null;
};

export default function CoordinatorsCarousel() {
  const [mounted, setMounted] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<DomainType>("All");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter list by selected domain
  const filteredList = useMemo(() => {
    if (selectedDomain === "All") return coordinators;
    return coordinators.filter((item) => normalizeDomain(item.domain) === selectedDomain);
  }, [selectedDomain]);

  // Calculate count for domain tabs
  const domainCounts = useMemo(() => {
    const counts: Record<DomainType, number> = {
      All: coordinators.length,
      Web: 0,
      Android: 0,
      ML: 0,
      DSA: 0,
      UIUX: 0,
    };
    coordinators.forEach((item) => {
      const norm = normalizeDomain(item.domain);
      if (norm && counts[norm] !== undefined) {
        counts[norm]++;
      }
    });
    return counts;
  }, []);

  const handleDomainChange = (domain: DomainType) => {
    setSelectedDomain(domain);
    setCurrentIndex(0);
  };

  const nextSlide = () => {
    if (filteredList.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % filteredList.length);
  };

  const prevSlide = () => {
    if (filteredList.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + filteredList.length) % filteredList.length);
  };

  return (
    <div className="w-full space-y-8">
      {/* Domain Selection Pills Bar */}
      <div suppressHydrationWarning className="flex flex-wrap items-center justify-start gap-2.5 sm:gap-3">
        {DOMAINS.map((domain) => {
          const isActive = selectedDomain === domain.id;
          const count = domainCounts[domain.id];

          return (
            <button
              key={domain.id}
              onClick={() => handleDomainChange(domain.id)}
              className={`flex items-center gap-2 rounded-xl border-2 border-zinc-900 px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-[2px_2px_0_#111] dark:border-zinc-200/30 dark:shadow-[2px_2px_0_#000] ${
                isActive
                  ? "bg-(--accent-lime) text-zinc-900 scale-105"
                  : "bg-white text-zinc-700 hover:bg-zinc-100 dark:bg-[#151515] dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              <span>{domain.label}</span>
              <span
                suppressHydrationWarning
                className={`rounded-md px-1.5 py-0.5 text-[10px] font-extrabold ${
                  isActive
                    ? "bg-zinc-900 text-white dark:bg-zinc-900 dark:text-white"
                    : "bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Carousel Section Header & Controls */}
      <div className="flex items-center justify-between border-b-2 border-zinc-900/10 pb-4 dark:border-zinc-200/10">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          <span suppressHydrationWarning>Showing {filteredList.length} member{filteredList.length === 1 ? "" : "s"}</span>
          {selectedDomain !== "All" && (
            <span className="rounded-md border border-zinc-900/20 bg-zinc-100 px-2 py-0.5 text-zinc-900 dark:border-zinc-200/20 dark:bg-zinc-800 dark:text-zinc-100">
              {selectedDomain}
            </span>
          )}
        </div>

        {/* Carousel Prev/Next Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={prevSlide}
            disabled={filteredList.length <= 1}
            aria-label="Previous Coordinator"
            className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-zinc-900 bg-white shadow-[2px_2px_0_#111] transition hover:-translate-y-0.5 hover:bg-zinc-100 disabled:opacity-40 dark:border-zinc-200/30 dark:bg-[#151515] dark:shadow-[2px_2px_0_#000]"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M19 12H5" />
              <path d="M11 6l-6 6 6 6" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            disabled={filteredList.length <= 1}
            aria-label="Next Coordinator"
            className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-zinc-900 bg-(--accent-lime) shadow-[2px_2px_0_#111] transition hover:-translate-y-0.5 hover:bg-(--accent-lavender) disabled:opacity-40 dark:border-zinc-200/30 dark:shadow-[2px_2px_0_#000]"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Cards Slider Container (Multi-card Responsive Grid Slider) */}
      {filteredList.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-zinc-300 py-16 text-center dark:border-zinc-700">
          <p className="text-base font-semibold text-zinc-500 dark:text-zinc-400">
            No coordinators found for {selectedDomain} domain.
          </p>
        </div>
      ) : (
        <div className="relative overflow-hidden">
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300"
          >
            {/* Show unique visible cards up to available members count (max 3) */}
            {Array.from({ length: Math.min(3, filteredList.length) }).map((_, offset) => {
              const idx = (currentIndex + offset) % filteredList.length;
              const person = filteredList[idx];

              if (!person) return null;

              const isCoordinator = person.role === "Coordinator";

              return (
                <div
                  key={`${person.name}-${idx}-${offset}`}
                  className={`group relative flex flex-col justify-between rounded-3xl border-2 border-zinc-900 bg-white p-6 shadow-[0_6px_0_#111] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_0_#111] dark:border-zinc-200/30 dark:bg-[#151515] dark:shadow-[0_6px_0_#000] ${
                    offset > 0 ? "hidden md:flex" : "flex"
                  } ${offset === 2 ? "hidden lg:flex" : ""}`}
                >
                  <div>
                    {/* Card Top Header: Domain Badge & Role Pill */}
                    <div className="flex items-center justify-between gap-2 border-b-2 border-zinc-900/10 pb-4 dark:border-zinc-200/10">
                      <span className="rounded-lg border-2 border-zinc-900 bg-zinc-100 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-zinc-900 shadow-[1px_1px_0_#111] dark:border-zinc-200/30 dark:bg-zinc-800 dark:text-zinc-100 dark:shadow-[1px_1px_0_#000]">
                        {person.domain}
                      </span>
                      <span
                        className={`rounded-lg border-2 border-zinc-900 px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-[1px_1px_0_#111] dark:border-zinc-200/30 ${
                          isCoordinator
                            ? "bg-(--accent-lime) text-zinc-900"
                            : "bg-(--accent-lavender) text-zinc-900"
                        }`}
                      >
                        {person.role}
                      </span>
                    </div>

                    {/* Member Image & Details */}
                    <div className="mt-5 flex items-center gap-4 sm:gap-5">
                      <div className="relative h-32 w-32 sm:h-36 sm:w-36 shrink-0 overflow-hidden rounded-2xl border-2 border-zinc-900 bg-zinc-800 shadow-[3px_3px_0_#111] dark:border-zinc-200/30 dark:shadow-[3px_3px_0_#000]">
                        {person.photo ? (
                          <img
                            src={person.photo}
                            alt={person.name}
                            className="h-full w-full object-cover object-[center_20%] transition-transform duration-300 group-hover:scale-110"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-3xl font-extrabold text-white">
                            {getInitials(person.name)}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-1.5 min-w-0">
                        <h3 className="font-display text-xl sm:text-2xl font-bold uppercase leading-snug text-zinc-900 dark:text-zinc-100 break-words">
                          {person.name}
                        </h3>
                        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                          {person.role} • {person.domain}
                        </p>
                      </div>
                    </div>

                    {/* Short Bio */}
                    <p className="mt-4 text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 line-clamp-3">
                      {person.bio}
                    </p>
                  </div>

                  {/* Social Action Links */}
                  <div className="mt-6 flex items-center gap-2.5 pt-4 border-t border-zinc-900/10 dark:border-zinc-200/10">
                    {person.linkedin && (
                      <a
                        href={person.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border-2 border-zinc-900 bg-zinc-100 px-3 py-2 text-xs font-bold uppercase tracking-wider text-zinc-900 shadow-[2px_2px_0_#111] transition hover:-translate-y-0.5 hover:bg-(--accent-lime) dark:border-zinc-200/30 dark:bg-zinc-800 dark:text-zinc-100 dark:shadow-[2px_2px_0_#000]"
                      >
                        <LinkedInIcon className="h-3.5 w-3.5" />
                        <span>LinkedIn</span>
                      </a>
                    )} 
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Pagination Indicator Pills */}
      {filteredList.length > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          {filteredList.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2.5 rounded-full border-2 border-zinc-900 transition-all duration-300 dark:border-zinc-200/40 ${
                i === currentIndex
                  ? "w-8 bg-(--accent-lime)"
                  : "w-2.5 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
