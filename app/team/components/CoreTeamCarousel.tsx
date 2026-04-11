"use client";
import { useState } from "react";
import coreTeamData from "../../data/coreteam.json";

interface Person {
  name: string;
  role: string;
  bio: string;
  linkedin?: string;
  github?: string;
  photo?: string;
}

const coreTeam: Person[] = coreTeamData;

function LinkedInIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
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
  const [current, setCurrent] = useState(0);
  const [animState, setAnimState] = useState<AnimState>("idle");

  const go = (nextIndex: number, dir: "right" | "left") => {
    if (animState !== "idle") return;

    setAnimState(dir === "right" ? "out-left" : "out-right");

    setTimeout(() => {
      setCurrent(nextIndex);
      setAnimState(dir === "right" ? "in-right" : "in-left");
      setTimeout(() => setAnimState("idle"), 420);
    }, 300);
  };

  const next = () => go((current + 1) % coreTeam.length, "right");
  const prev = () => go((current - 1 + coreTeam.length) % coreTeam.length, "left");

  const animClass =
    animState === "out-left"  ? "anim-rotate-out-left"  :
    animState === "in-right"  ? "anim-rotate-in-right"  :
    animState === "out-right" ? "anim-rotate-out-right" :
    animState === "in-left"   ? "anim-rotate-in-left"   : "";

  const person = coreTeam[current];

  return (
    <div className="flex justify-center" style={{ perspective: "1200px" }}>
      <div className="w-full max-w-4xl">
        <style>{animStyles}</style>

        <div
          className={`${animClass} rounded-3xl border-2 border-zinc-900 bg-white shadow-[0_8px_0_#111] dark:border-zinc-200/30 dark:bg-[#151515] dark:shadow-[0_8px_0_#000]`}
          style={{ transformStyle: "preserve-3d", willChange: "transform, opacity" }}
        >
          <div className="h-2 w-full bg-[#cbb6ff] rounded-t-3xl" />

          <div className="grid lg:grid-cols-[1.0fr_1.2fr]">
            <div className="relative overflow-hidden bg-zinc-900 lg:min-h-115.5 rounded-bl-3xl">
              <img
                src={person.photo}
                alt={person.name}
                className="absolute inset-0 h-full w-full object-fill object-[center_20%] opacity-90"
                style={{ minHeight: "450px" }}
              />
            </div>

            <div className="flex flex-col justify-between gap-8 p-8 lg:p-12">
              <div className="flex flex-col gap-5">
                <div>
                  <h3 className="font-display text-3xl font-bold uppercase leading-tight text-zinc-900 dark:text-zinc-100 lg:text-4xl">
                    {person.name}
                  </h3>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500 dark:text-zinc-400">
                    {person.role}
                  </p>
                </div>

                <p className="text-base leading-7 text-zinc-600 dark:text-zinc-300">
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
                      <LinkedInIcon /> LinkedIn
                    </a>
                  )}
                  {person.github && person.github !== "#" && (
                    <a
                      href={person.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-xl border-2 border-zinc-900 bg-zinc-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-900 shadow-[2px_2px_0_#111] transition hover:-translate-y-0.5 hover:bg-(--accent-lavender) dark:border-zinc-200/30 dark:bg-zinc-800 dark:text-zinc-100 dark:shadow-[2px_2px_0_#000]"
                    >
                      <GitHubIcon /> GitHub
                    </a>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-zinc-900/10 pt-6 dark:border-zinc-200/10">
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
