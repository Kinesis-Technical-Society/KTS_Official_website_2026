"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";

interface Project {
  id: string;
  title: string;
  category: "Web" | "Android" | "AI & ML" | "Open Source" | "Exhibition";
  description: string;
  tags: string[];
  stars?: number;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

const projectsData: Project[] = [
  {
    id: "1",
    title: "KTS Official Portal",
    category: "Web",
    description: "The official website and student portal for Kinesis Technical Society featuring neo-brutalist aesthetics, interactive timelines, and dynamic event registration.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    stars: 42,
    githubUrl: "https://github.com/Kinesis-Technical-Society",
    liveUrl: "https://kts-kiet.edu",
    featured: true,
  },
  {
    id: "2",
    title: "Innotech Exhibition Showcase",
    category: "Exhibition",
    description: "Annual project showcase platform for student innovation projects, hardware prototypes, and software solutions displayed during college-level tech fests.",
    tags: ["React", "Node.js", "MongoDB", "WebSockets"],
    stars: 28,
    githubUrl: "https://github.com/Kinesis-Technical-Society",
    featured: true,
  },
  {
    id: "3",
    title: "DevVerse Community Bot",
    category: "Open Source",
    description: "Automated Discord & Telegram community bot for managing tech events, coding challenges, leaderboard tracking, and automated announcements.",
    tags: ["Python", "AsyncIO", "Discord.py", "Docker"],
    stars: 35,
    githubUrl: "https://github.com/Kinesis-Technical-Society",
    featured: true,
  },
  {
    id: "4",
    title: "Smart Campus Companion",
    category: "Android",
    description: "Cross-platform mobile application providing real-time class notifications, event registrations, campus navigation, and student resource sharing.",
    tags: ["Flutter", "Dart", "Firebase", "Android"],
    stars: 19,
    githubUrl: "https://github.com/Kinesis-Technical-Society",
  },
  {
    id: "5",
    title: "AI Resume & Portfolio Analyzer",
    category: "AI & ML",
    description: "Machine learning application analyzing developer portfolios and resumes against job descriptions to suggest skill enhancements and project ideas.",
    tags: ["Python", "FastAPI", "OpenAI", "React"],
    stars: 53,
    githubUrl: "https://github.com/Kinesis-Technical-Society",
  },
  {
    id: "6",
    title: "Algorithm Visualizer Engine",
    category: "Web",
    description: "Interactive data structures and algorithms visualization tool designed for competitive programmers and computer science learners.",
    tags: ["TypeScript", "Canvas API", "Algorithms"],
    stars: 61,
    githubUrl: "https://github.com/Kinesis-Technical-Society",
  },
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Web", "Android", "AI & ML", "Open Source", "Exhibition"];

  const filteredProjects = activeCategory === "All"
    ? projectsData
    : projectsData.filter((p) => p.category === activeCategory);

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
              className={`rounded-xl border-2 border-zinc-900 px-4 py-2 text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0_#111] transition-all hover:-translate-y-0.5 dark:border-zinc-200/40 ${
                activeCategory === category
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                  : "bg-white text-zinc-900 hover:bg-zinc-100 dark:bg-[#151515] dark:text-zinc-200 dark:hover:bg-zinc-800"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
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
                  {project.stars && (
                    <span className="flex items-center gap-1 text-xs font-bold text-zinc-600 dark:text-zinc-400">
                      ⭐ {project.stars}
                    </span>
                  )}
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

        <FooterSection />
      </div>
    </main>
  );
}
