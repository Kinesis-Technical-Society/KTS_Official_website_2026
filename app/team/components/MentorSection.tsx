"use client";

import { useState } from "react";
import mentorsData from "../../data/mentors.json";

interface Person {
  name: string;
  role: string;
  bio: string;
  linkedin?: string;
  github?: string;
  domain?: string;
  photo?: string;
}

const mentors: Person[] = mentorsData;

const domainColors: Record<string, string> = {
  Engineering: "bg-blue-100 text-blue-900",
  "Design × Dev": "bg-purple-100 text-purple-900",
  Product: "bg-green-100 text-green-900",
  Community: "bg-orange-100 text-orange-900",
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

function LinkedInIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" y="4" r="2" />
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
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

function MentorCard({ person, index }: { person: Person; index: number }) {
  const gradients = [
    "from-violet-900 via-indigo-800 to-zinc-900",
    "from-emerald-900 via-teal-800 to-zinc-900",
  ];
  const gradient = gradients[index % gradients.length];

  return (
    <div className="group relative flex flex-col w-80 rounded-3xl border-2 border-zinc-900 bg-white overflow-hidden shadow-[0_6px_0_#111] transition-all duration-200 mx-auto hover:-translate-y-1 hover:shadow-[0_10px_0_#111] dark:border-zinc-200/30 dark:bg-[#151515] dark:shadow-[0_6px_0_#000]">

      <div className={`relative h-60 w-full overflow-hidden bg-linear-to-br ${gradient}`}>
        {person.photo ? (
          <img
            src={person.photo}
            alt={person.name}
            className="h-full w-full object-cover object-[center_20%] opacity-90 transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-5xl font-bold tracking-tight text-white/20 select-none">
              {getInitials(person.name)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
      
      </div>

  
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-col gap-2 mb-4">
          <h3 className="text-lg font-bold leading-tight text-zinc-900 dark:text-zinc-100">
            {person.name}
          </h3>
          {person.role && (
            <span className={`w-fit rounded-lg border-2 transition hover:-translate-y-0.5 hover:bg-(--accent-lime) border-zinc-900 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest shadow-[1px_1px_0_#111] dark:border-zinc-200/30 ${domainColors[person.role] ?? "bg-zinc-100 text-zinc-900"}`}>
              {person.role}
            </span>
          )}
        </div>

        <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-300 flex-1">
          {person.bio}
        </p>

        <div className="flex gap-3 pt-4 mt-auto">
          {person.linkedin && (
            <a
              href={person.linkedin}
              className="flex items-center gap-2 rounded-xl border-2 border-zinc-900 bg-zinc-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-900 shadow-[2px_2px_0_#111] transition hover:-translate-y-0.5 hover:bg-(--accent-lime) dark:border-zinc-200/30 dark:bg-zinc-800 dark:text-zinc-100 dark:shadow-[2px_2px_0_#000]"
            >
              <LinkedInIcon /> LinkedIn
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MentorSection() {
  return (
    <section id="mentors" className="full-bleed border-b border-zinc-900/20 bg-background dark:border-zinc-200/15">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-10 flex flex-col gap-4 border-zinc-900/20 lg:flex-row lg:items-end lg:justify-between dark:border-zinc-200/15">
          <div className="flex flex-col gap-4">
            <SectionLabel number="01" label="The Guides" />
            <h2 className="font-serif text-4xl leading-tight text-zinc-900 sm:text-5xl dark:text-zinc-100">
              Our <span className="italic">Mentors.</span>
            </h2>
            <p className="max-w-md text-sm leading-7 text-zinc-600 dark:text-zinc-300">
              The people who've been where we're going — guiding every semester's batch
              with experience, patience, and the occasional reality check.
            </p>
          </div>
         
        </div>
        <div className="grid sm:grid-cols-2">
          {mentors.map((m, i) => <MentorCard key={m.name} person={m} index={i} />)}
        </div>
      </div>
    </section>
  );
}