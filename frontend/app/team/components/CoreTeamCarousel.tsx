"use client";
import { useState, useEffect } from "react";
import { fetchTeamMembers } from "../../services/api";

interface Person {
  name: string;
  role: string;
  bio: string;
  linkedin?: string;
  github?: string;
  photo?: string;
}

function LinkedInIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function GitHubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
    </svg>
  );
}

type AnimState = "idle" | "out-left" | "in-right" | "out-right" | "in-left";

const animStyles = `
  @keyframes rotateOutLeft {
    0%   { transform: perspective(1200px) rotateY(0deg);   opacity: 1; }
    100% { transform: perspective(1200px) rotateY(-90deg); opacity: 0; }
  }
  @keyframes rotateInRight {
    0%   { transform: perspective(1200px) rotateY(90deg);  opacity: 0; }
    100% { transform: perspective(1200px) rotateY(0deg);   opacity: 1; }
  }
  @keyframes rotateOutRight {
    0%   { transform: perspective(1200px) rotateY(0deg);   opacity: 1; }
    100% { transform: perspective(1200px) rotateY(90deg);  opacity: 0; }
  }
  @keyframes rotateInLeft {
    0%   { transform: perspective(1200px) rotateY(-90deg); opacity: 0; }
    100% { transform: perspective(1200px) rotateY(0deg);   opacity: 1; }
  }
  .anim-rotate-out-left  { animation: rotateOutLeft  0.30s cubic-bezier(0.4,0,1,1)   forwards; }
  .anim-rotate-in-right  { animation: rotateInRight  0.40s cubic-bezier(0,0,0.2,1)   forwards; }
  .anim-rotate-out-right { animation: rotateOutRight  0.30s cubic-bezier(0.4,0,1,1)   forwards; }
  .anim-rotate-in-left   { animation: rotateInLeft   0.40s cubic-bezier(0,0,0.2,1)   forwards; }
`;

export default function CoreTeamCarousel() {
  const [coreTeam, setCoreTeam] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [animState, setAnimState] = useState<AnimState>("idle");

  useEffect(() => {
    async function loadData() {
      try {
        const dbMembers = await fetchTeamMembers("core");
        if (dbMembers && dbMembers.length > 0) {
          const formatted: Person[] = dbMembers.map((m) => ({
            name: m.name,
            role: m.role || "Core Member",
            bio: m.bio || "",
            photo: m.photo || "",
            linkedin: m.linkedin || "",
            github: m.github || "",
          }));
          setCoreTeam(formatted);
        }
      } catch (err) {
        console.error("Failed to load core team from API:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const go = (nextIndex: number, dir: "right" | "left") => {
    if (animState !== "idle" || coreTeam.length === 0) return;

    setAnimState(dir === "right" ? "out-left" : "out-right");

    setTimeout(() => {
      setCurrent(nextIndex);
      setAnimState(dir === "right" ? "in-right" : "in-left");
      setTimeout(() => setAnimState("idle"), 420);
    }, 300);
  };

  const next = () => {
    if (coreTeam.length === 0) return;
    go((current + 1) % coreTeam.length, "right");
  };

  const prev = () => {
    if (coreTeam.length === 0) return;
    go((current - 1 + coreTeam.length) % coreTeam.length, "left");
  };

  const animClass =
    animState === "out-left"  ? "anim-rotate-out-left"  :
    animState === "in-right"  ? "anim-rotate-in-right"  :
    animState === "out-right" ? "anim-rotate-out-right" :
    animState === "in-left"   ? "anim-rotate-in-left"   : "";

  if (loading) {
    return (
      <div className="flex justify-center">
        <div className="w-full max-w-4xl rounded-3xl border-2 border-zinc-900 bg-white p-8 dark:border-zinc-200/30 dark:bg-[#151515] animate-pulse min-h-[300px] flex items-center justify-center">
          <p className="text-sm font-bold text-zinc-500">Loading Core Team from database...</p>
        </div>
      </div>
    );
  }

  if (coreTeam.length === 0) {
    return (
      <div className="flex justify-center">
        <div className="w-full max-w-4xl rounded-3xl border-2 border-zinc-900 bg-white p-8 dark:border-zinc-200/30 dark:bg-[#151515] min-h-[200px] flex items-center justify-center">
          <p className="text-sm font-bold text-zinc-500">No core team members found in database.</p>
        </div>
      </div>
    );
  }

  const person = coreTeam[current];

  return (
    <div className="flex justify-center" style={{ perspective: "1200px" }}>
      <div className="w-full max-w-4xl">
        <style>{animStyles}</style>

        <div
          className={`${animClass} overflow-hidden rounded-3xl border-2 border-zinc-900 bg-white shadow-[0_8px_0_#111] dark:border-zinc-200/30 dark:bg-[#151515] dark:shadow-[0_8px_0_#000]`}
          style={{ transformStyle: "preserve-3d", willChange: "transform, opacity" }}
        >
          <div className="h-2 w-full bg-[#cbb6ff]" />

          <div className="grid grid-cols-1 lg:grid-cols-[1.0fr_1.2fr]">
            <div className="relative w-full h-72 sm:h-96 lg:h-full lg:min-h-[460px] overflow-hidden bg-zinc-900">
              <img
                src={person.photo}
                alt={person.name}
                className="h-full w-full object-cover object-[center_20%] opacity-90 transition-opacity duration-300"
              />
            </div>

            <div className="flex flex-col justify-between gap-6 p-6 sm:p-8 lg:p-12">
              <div className="flex flex-col gap-5">
                <div>
                  <h3 className="font-display text-2xl font-bold uppercase leading-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl lg:text-4xl">
                    {person.name}
                  </h3>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500 dark:text-zinc-400">
                    {person.role}
                  </p>
                </div>

                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 sm:text-base sm:leading-7">
                  {person.bio}
                </p>

                <div className="flex gap-3 flex-wrap">
                  {person.linkedin && person.linkedin !== "#" && (
                    <a
                      href={person.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-xl border-2 border-zinc-900 bg-zinc-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-900 shadow-[2px_2px_0_#111] transition hover:-translate-y-0.5 hover:bg-(--accent-lime) dark:border-zinc-200/30 dark:bg-zinc-800 dark:text-zinc-100 dark:shadow-[2px_2px_0_#000]"
                    >
                      <LinkedInIcon className="h-4 w-4" /> LinkedIn
                    </a>
                  )}
                  {person.github && person.github !== "#" && (
                    <a
                      href={person.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-xl border-2 border-zinc-900 bg-zinc-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-900 shadow-[2px_2px_0_#111] transition hover:-translate-y-0.5 hover:bg-(--accent-lavender) dark:border-zinc-200/30 dark:bg-zinc-800 dark:text-zinc-100 dark:shadow-[2px_2px_0_#000]"
                    >
                      <GitHubIcon className="h-4 w-4" /> GitHub
                    </a>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-zinc-900/10 pt-6 dark:border-zinc-200/10 gap-4">
                <div className="flex gap-2 flex-wrap max-w-60">
                  {coreTeam.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => go(i, i > current ? "right" : "left")}
                      className={`h-2 rounded-full border-2 border-zinc-900 transition-all duration-300 dark:border-zinc-200/40 ${
                        i === current ? "w-6 bg-(--accent-lime)" : "w-2 bg-zinc-200 dark:bg-zinc-700"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={prev}
                    disabled={animState !== "idle"}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-zinc-900 bg-white shadow-[2px_2px_0_#111] transition hover:-translate-y-0.5 hover:bg-zinc-100 disabled:opacity-40 dark:border-zinc-200/30 dark:bg-[#151515] dark:shadow-[2px_2px_0_#000]"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M19 12H5" /><path d="M11 6l-6 6 6 6" />
                    </svg>
                  </button>
                  <button
                    onClick={next}
                    disabled={animState !== "idle"}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-zinc-900 bg-(--accent-lime) shadow-[2px_2px_0_#111] transition hover:-translate-y-0.5 hover:bg-(--accent-lavender) disabled:opacity-50 dark:border-zinc-200/30 dark:shadow-[2px_2px_0_#000]"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M5 12h14" /><path d="M13 6l6 6-6 6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
