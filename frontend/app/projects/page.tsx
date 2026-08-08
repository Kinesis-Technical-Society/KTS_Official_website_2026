"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import projectsData from "../data/projects.json";

interface RawProject {
  id?: string;
  title: string;
  category?: string;
  domain?: string;
  description: string;
  tags?: string[];
  techStack?: string[];
  stars?: number;
  githubUrl?: string;
  githubLink?: string;
  liveUrl?: string;
  liveLink?: string;
  featured?: boolean;
}

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const projectsList = (projectsData as RawProject[]).map((p, idx) => ({
    id: p.id || String(idx + 1),
    title: p.title,
    category: p.domain || p.category || "General",
    description: p.description,
    tags: p.techStack || p.tags || [],
    githubUrl: p.githubLink || p.githubUrl,
    liveUrl: p.liveLink || p.liveUrl,
    featured: p.featured,
  }));

  const categories = [
    "All",
    ...Array.from(new Set(projectsList.map((p) => p.category))),
  ];
  if (!categories.includes("Android Development")) {
    categories.push("Android Development");
  }

  const filteredProjects =
    activeCategory === "All"
      ? projectsList
      : projectsList.filter((p) => p.category === activeCategory);

  return (
    <main className="hero-grid flex-1">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-12 px-4 pb-0 pt-6 sm:px-6">
        <Navbar />

        {/* Hero Banner */}
        <section className="hero-rise mt-4 flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 self-start rounded-lg border-2 border-[#121212] bg-white px-3 py-1 text-xs font-bold shadow-[2px_2px_0px_0px_#121212] dark:border-zinc-200/40 dark:bg-[#151515] dark:text-zinc-100">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--accent-lavender)]" />
            SHOWCASE & LABS
          </div>

          <h1 className="font-display text-4xl font-bold uppercase leading-[0.95] text-[#121212] md:text-6xl lg:text-7xl dark:text-[#f3f2eb]">
            PROJECTS BUILT BY <br />
            <span className="bg-[var(--accent-lavender)] px-2 text-[#121212]">THE COMMUNITY.</span>
          </h1>

          <p className="max-w-xl font-sans text-base leading-relaxed text-zinc-700 md:text-lg dark:text-zinc-300">
            From open-source developer tools to award-winning hackathon entries — explore what our members have engineered.
          </p>
        </section>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b-2 border-zinc-900/20 pb-4 dark:border-zinc-200/20">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-xl border-2 border-zinc-900 px-4 py-2 text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0_#111] transition-all hover:-translate-y-0.5 dark:border-zinc-200/40 ${activeCategory === category
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                  : "bg-white text-zinc-900 hover:bg-zinc-100 dark:bg-[#151515] dark:text-zinc-200 dark:hover:bg-zinc-800"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid / Empty State */}
        {filteredProjects.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group relative flex flex-col justify-between rounded-3xl border-2 border-zinc-900 bg-white p-6 shadow-[0_6px_0_#111] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_10px_0_#111] dark:border-zinc-200/30 dark:bg-[#151515] dark:shadow-[0_6px_0_#000]"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="rounded-lg border-2 border-zinc-900 bg-[var(--accent-lime)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-zinc-900 shadow-[1px_1px_0_#111] dark:border-zinc-200/30">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                    {project.title}
                  </h3>

                  <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-zinc-900/20 bg-zinc-100 px-2 py-0.5 text-[11px] font-semibold text-zinc-700 dark:border-zinc-200/20 dark:bg-zinc-800 dark:text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-3 border-t border-zinc-900/10 pt-4 dark:border-zinc-200/10">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-zinc-900 bg-zinc-100 py-2 text-xs font-bold uppercase tracking-wider text-zinc-900 shadow-[2px_2px_0_#111] transition hover:-translate-y-0.5 hover:bg-[var(--accent-lavender)] dark:border-zinc-200/30 dark:bg-zinc-800 dark:text-zinc-100 dark:shadow-[2px_2px_0_#000]"
                    >
                      GitHub
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-zinc-900 bg-[var(--accent-lime)] py-2 text-xs font-bold uppercase tracking-wider text-zinc-900 shadow-[2px_2px_0_#111] transition hover:-translate-y-0.5 dark:border-zinc-200/30 dark:shadow-[2px_2px_0_#000]"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-zinc-900 bg-white p-12 text-center shadow-[0_6px_0_#111] dark:border-zinc-200/30 dark:bg-[#151515] dark:shadow-[0_6px_0_#000]">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-zinc-900 bg-[var(--accent-lavender)] text-3xl shadow-[2px_2px_0_#111]">
              🛠️
            </div>
            <h3 className="font-display text-2xl font-bold uppercase text-zinc-900 dark:text-zinc-100">
              Projects Currently Under Development
            </h3>
            <p className="mt-2 max-w-md font-sans text-sm text-zinc-700 dark:text-zinc-300">
              Projects are currently under active development. Stay tuned, exciting {activeCategory} projects are coming soon! 🚀
            </p>
          </div>
        )}

        <FooterSection />
      </div>
    </main>
  );
}

