"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { ProjectsHero } from "./components/ProjectsHero";
import { ProjectFilterTabs } from "./components/ProjectFilterTabs";
import { ProjectGrid } from "./components/ProjectGrid";
import { ListYourProject } from "./components/ListYourProject";
import { fetchProjects, ProjectItem } from "../services/api";

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [rawProjects, setRawProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadProjects() {
      setLoading(true);
      try {
        const data = await fetchProjects();
        setRawProjects(data);
      } catch (err) {
        console.error("Failed to load projects:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  const projectsList = rawProjects.map((p, idx) => ({
    id: p._id || p.id || String(idx + 1),
    title: p.title,
    category: p.domain || "General",
    description: p.description,
    tags: Array.isArray(p.techStack) ? p.techStack : [],
    githubUrl: p.githubLink || p.githubUrl || "",
    liveUrl: p.liveLink || p.liveUrl || "",
    linkedinUrl: p.linkedinUrl || "",
  }));

  // Unique categories derived dynamically from fetched projects
  const dynamicCategories = Array.from(
    new Set(projectsList.map((p) => p.category).filter(Boolean))
  );

  const categories = ["All", ...dynamicCategories];

  const filteredProjects =
    activeCategory === "All"
      ? projectsList
      : projectsList.filter((p) => p.category === activeCategory);

  return (
    <main className="hero-grid flex-1 min-h-screen">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-10 px-4 pt-6 sm:px-6">
        <Navbar />
        <ProjectsHero />
        <ProjectFilterTabs
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
        <ProjectGrid loading={loading} projects={filteredProjects} />
        <ListYourProject />
      </div>
    </main>
  );
}
