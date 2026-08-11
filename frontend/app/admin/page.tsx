"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ThemeToggle from "../components/ThemeToggle";
import {
  loginAdmin,
  fetchEvents,
  createEvent,
  bulkCreateEvents,
  updateEvent,
  deleteEvent,
  EventItem,
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
  ProjectItem,
} from "../services/api";

export default function AdminPage() {
  // Auth state
  const [token, setToken] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    "list" | "create" | "bulk" | "projects-list" | "create-project"
  >("list");

  // Notifications
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Events Data State
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);

  // Single event form state
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    status: "upcoming" as "upcoming" | "brewing",
    description: "",
    location: "KIET Group of Institutions, Ghaziabad",
    moreInfoUrl: "",
    prize: "",
    tags: "",
    highlights: "",
    image: "",
    accent: "#bcf954",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Bulk events input state
  const [bulkJson, setBulkJson] = useState(`[
  {
    "title": "HackKTS 2026 — 24 Hour Hackathon",
    "date": "March 28–29, 2026",
    "status": "upcoming",
    "description": "Join the biggest student hackathon at KIET! Build innovative web and AI projects.",
    "location": "KIET Campus, Ghaziabad",
    "moreInfoUrl": "https://kts-hackathon.devfolio.co",
    "prize": "₹50,000 Pool + Swags",
    "tags": ["Hackathon", "AI", "Web3"]
  }
]`);

  // Projects Data State
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [projectSearchQuery, setProjectSearchQuery] = useState<string>("");
  const [projectDomainFilter, setProjectDomainFilter] = useState<string>("all");
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isSubmittingProject, setIsSubmittingProject] = useState(false);

  // Project creation form state
  const [projectFormData, setProjectFormData] = useState({
    title: "",
    description: "",
    techStack: "",
    domain: "Web Development",
    linkedinUrl: "",
    githubLink: "",
    liveLink: "",
  });

  // Helper for reading image files as Base64 Data URLs
  const handleImageFileRead = (file: File, callback: (base64Url: string) => void) => {
    if (!file.type.startsWith("image/")) {
      showNotify("error", "Please select a valid image file (PNG, JPG, WEBP, GIF, SVG).");
      return;
    }
    if (file.size > 6 * 1024 * 1024) {
      showNotify("error", "Image size is too large (max 6MB). Please pick a smaller image.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        callback(reader.result);
      }
    };
    reader.onerror = () => {
      showNotify("error", "Failed to read image file.");
    };
    reader.readAsDataURL(file);
  };

  // Check stored auth token on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("kts_admin_token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // Fetch data when logged in
  useEffect(() => {
    if (token) {
      loadAdminEvents();
      loadAdminProjects();
    }
  }, [token]);

  const loadAdminEvents = async () => {
    setLoadingEvents(true);
    try {
      const data = await fetchEvents();
      setEvents(data);
    } catch (err: any) {
      showNotify("error", err.message || "Failed to load events.");
    } fontally: {
      setLoadingEvents(false);
    }
  };

  const loadAdminProjects = async () => {
    setLoadingProjects(true);
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (err: any) {
      showNotify("error", err.message || "Failed to load projects.");
    } finally {
      setLoadingProjects(false);
    }
  };

  const showNotify = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Handle Login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setIsLoggingIn(true);

    try {
      const res = await loginAdmin(emailInput, passwordInput);
      if (res.token) {
        localStorage.setItem("kts_admin_token", res.token);
        setToken(res.token);
        showNotify("success", "Successfully logged in as Admin!");
      }
    } catch (err: any) {
      setAuthError(err.message || "Invalid login credentials");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("kts_admin_token");
    setToken(null);
    showNotify("success", "Logged out successfully");
  };

  // -------------------------------------------------------------
  // EVENT ACTIONS
  // -------------------------------------------------------------
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
        highlights: formData.highlights.split("\n").map((h) => h.trim()).filter(Boolean),
      };

      await createEvent(payload, token);
      showNotify("success", `Event "${formData.title}" created successfully!`);
      setFormData({
        title: "",
        date: "",
        status: "upcoming",
        description: "",
        location: "KIET Group of Institutions, Ghaziabad",
        moreInfoUrl: "",
        prize: "",
        tags: "",
        highlights: "",
        image: "",
        accent: "#bcf954",
      });
      setActiveTab("list");
      loadAdminEvents();
    } catch (err: any) {
      showNotify("error", err.message || "Failed to create event");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBulkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setIsSubmitting(true);

    try {
      const parsed = JSON.parse(bulkJson);
      if (!Array.isArray(parsed)) {
        throw new Error("JSON input must be an array of event objects.");
      }
      await bulkCreateEvents(parsed, token);
      showNotify("success", `Successfully added ${parsed.length} events!`);
      setActiveTab("list");
      loadAdminEvents();
    } catch (err: any) {
      showNotify("error", err.message || "Invalid JSON or Bulk Creation Error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !editingEvent || !editingEvent._id) return;
    setIsSubmitting(true);

    try {
      const id = editingEvent._id;
      await updateEvent(id, editingEvent, token);
      showNotify("success", "Event updated successfully!");
      setEditingEvent(null);
      loadAdminEvents();
    } catch (err: any) {
      showNotify("error", err.message || "Failed to update event");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (event: EventItem) => {
    if (!token || !event._id) return;
    const confirmDelete = window.confirm(`Are you sure you want to delete "${event.title}"?`);
    if (!confirmDelete) return;

    try {
      await deleteEvent(event._id, token);
      showNotify("success", "Event deleted successfully!");
      loadAdminEvents();
    } catch (err: any) {
      showNotify("error", err.message || "Failed to delete event");
    }
  };

  // -------------------------------------------------------------
  // PROJECT ACTIONS
  // -------------------------------------------------------------
  const handleCreateProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    const title = projectFormData.title.trim();
    const description = projectFormData.description.trim();
    const techStackStr = projectFormData.techStack.trim();
    const domain = projectFormData.domain.trim();
    const linkedinUrl = projectFormData.linkedinUrl.trim();
    const githubLink = projectFormData.githubLink.trim();
    const liveLink = projectFormData.liveLink.trim();

    // Required Field Validations
    if (!title) {
      showNotify("error", "Project Title is required.");
      return;
    }
    if (!description) {
      showNotify("error", "Project Description is required.");
      return;
    }
    if (!techStackStr) {
      showNotify("error", "Tech Stack is required.");
      return;
    }
    if (!domain) {
      showNotify("error", "Domain is required.");
      return;
    }
    if (!linkedinUrl) {
      showNotify("error", "LinkedIn URL is required.");
      return;
    }

    // Link Requirement: At least one of GitHub or Live Link must be present
    if (!githubLink && !liveLink) {
      showNotify(
        "error",
        "At least one link (GitHub Link OR Live Link) is required. Please fill at least one."
      );
      return;
    }

    setIsSubmittingProject(true);

    try {
      const techStackArray = techStackStr
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        title,
        description,
        techStack: techStackArray,
        domain,
        linkedinUrl,
        githubLink,
        liveLink,
      };

      await createProject(payload, token);
      showNotify("success", `Project "${title}" added successfully!`);

      // Reset Form
      setProjectFormData({
        title: "",
        description: "",
        techStack: "",
        domain: "Web Development",
        linkedinUrl: "",
        githubLink: "",
        liveLink: "",
      });

      setActiveTab("projects-list");
      loadAdminProjects();
    } catch (err: any) {
      showNotify("error", err.message || "Failed to create project");
    } finally {
      setIsSubmittingProject(false);
    }
  };

  const handleUpdateProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !editingProject || !editingProject._id) return;

    const github = (editingProject.githubLink || "").trim();
    const live = (editingProject.liveLink || "").trim();

    if (!github && !live) {
      showNotify("error", "At least one link (GitHub Link OR Live Link) is required.");
      return;
    }

    setIsSubmittingProject(true);

    try {
      const techStack = Array.isArray(editingProject.techStack)
        ? editingProject.techStack
        : String(editingProject.techStack || "")
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);

      await updateProject(
        editingProject._id,
        {
          ...editingProject,
          techStack,
        },
        token
      );

      showNotify("success", "Project updated successfully!");
      setEditingProject(null);
      loadAdminProjects();
    } catch (err: any) {
      showNotify("error", err.message || "Failed to update project");
    } finally {
      setIsSubmittingProject(false);
    }
  };

  const handleDeleteProject = async (project: ProjectItem) => {
    if (!token || !project._id) {
      showNotify("error", "Cannot delete default static project or missing ID.");
      return;
    }
    const confirmDelete = window.confirm(`Are you sure you want to delete "${project.title}"?`);
    if (!confirmDelete) return;

    try {
      await deleteProject(project._id, token);
      showNotify("success", "Project deleted successfully!");
      loadAdminProjects();
    } catch (err: any) {
      showNotify("error", err.message || "Failed to delete project");
    }
  };

  // Filter events & projects
  const filteredEvents = events.filter((ev) => {
    const matchesStatus = statusFilter === "all" || ev.status === statusFilter;
    const matchesSearch =
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filteredProjects = projects.filter((p) => {
    const matchesDomain =
      projectDomainFilter === "all" || p.domain === projectDomainFilter;
    const techString = Array.isArray(p.techStack) ? p.techStack.join(" ") : String(p.techStack || "");
    const matchesSearch =
      p.title.toLowerCase().includes(projectSearchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(projectSearchQuery.toLowerCase()) ||
      techString.toLowerCase().includes(projectSearchQuery.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  const projectDomains = Array.from(
    new Set(projects.map((p) => p.domain).filter(Boolean))
  );

  // -------------------------------------------------------------
  // RENDER: LOGIN SCREEN (if not authenticated)
  // -------------------------------------------------------------
  if (!token) {
    return (
      <main className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#0c0c0e] dark:text-zinc-100 flex items-center justify-center p-4 relative transition-colors duration-200 font-sans">
        <div className="absolute top-6 right-6">
          <ThemeToggle />
        </div>

        <div className="w-full max-w-md bg-white border border-zinc-200 dark:bg-[#141418] dark:border-zinc-800 rounded-3xl p-8 shadow-xl relative overflow-hidden transition-all duration-200">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#bcf954] via-emerald-400 to-[#cbb6ff]" />

          <div className="text-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-lime-600/30 bg-lime-500/10 dark:border-[#bcf954]/30 dark:bg-[#bcf954]/10 text-xs font-mono font-semibold uppercase tracking-widest text-lime-700 dark:text-[#bcf954] mb-4 hover:scale-105 transition-transform"
            >
              ← Back to KTS Website
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Admin Portal
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-2">
              Log in to manage events & community projects.
            </p>
          </div>

          {authError && (
            <div className="mb-6 p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-mono text-center">
              ⚠️ {authError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4 font-mono text-xs sm:text-sm">
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
                Admin Email
              </label>
              <input
                type="email"
                required
                placeholder="Enter admin email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bcf954] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter admin password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bcf954] transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3.5 px-4 rounded-2xl font-bold uppercase tracking-wider bg-[#bcf954] text-zinc-950 hover:bg-[#a6e63e] transition-all shadow-[0_0_20px_rgba(188,249,84,0.3)] disabled:opacity-50 cursor-pointer pointer-events-auto mt-2"
            >
              {isLoggingIn ? "Authenticating..." : "Sign In to Admin"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  // -------------------------------------------------------------
  // RENDER: ADMIN DASHBOARD (when authenticated)
  // -------------------------------------------------------------
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#0c0c0e] dark:text-zinc-100 transition-colors duration-200 pb-20 font-sans">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-2xl border text-xs font-mono shadow-2xl flex items-center gap-2 animate-in slide-in-from-top-4 ${notification.type === "success"
            ? "bg-emerald-50 border-emerald-300 text-emerald-900 dark:bg-emerald-950/90 dark:border-emerald-500/60 dark:text-emerald-200"
            : "bg-red-50 border-red-300 text-red-900 dark:bg-red-950/90 dark:border-red-500/60 dark:text-red-200"
            }`}
        >
          <span>{notification.type === "success" ? "✅" : "⚠️"}</span>
          <span className="font-semibold">{notification.message}</span>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 dark:border-zinc-800/80 dark:bg-[#121215]/90 backdrop-blur-md transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="group flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-100 px-3 py-1.5 text-xs font-mono font-bold text-zinc-700 hover:bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
            >
              <span>← Home</span>
            </Link>
            <div className="h-4 w-px bg-zinc-300 dark:bg-zinc-800" />
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#bcf954] animate-pulse" />
              <h1 className="text-base sm:text-lg font-extrabold tracking-tight text-zinc-900 dark:text-white">
                KTS Admin Dashboard
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              type="button"
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-xl border border-red-500/30 bg-red-500/10 text-xs font-mono font-bold text-red-600 dark:text-red-400 hover:bg-red-500 hover:text-white transition-all cursor-pointer pointer-events-auto"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Tab Controls */}
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800/80 pb-4 overflow-x-auto">
          <div className="flex items-center gap-1.5 bg-zinc-200/60 dark:bg-zinc-900/80 p-1.5 rounded-2xl border border-zinc-300/60 dark:border-zinc-800 shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab("list")}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${activeTab === "list"
                ? "bg-[#bcf954] text-zinc-950 shadow-md"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
            >
              📅 Events ({events.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("create")}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${activeTab === "create"
                ? "bg-[#bcf954] text-zinc-950 shadow-md"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
            >
              + Add Event
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("bulk")}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${activeTab === "bulk"
                ? "bg-[#bcf954] text-zinc-950 shadow-md"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
            >
              ⚡ Bulk Events
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("projects-list")}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${activeTab === "projects-list"
                ? "bg-[#bcf954] text-zinc-950 shadow-md"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
            >
              🚀 Projects ({projects.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("create-project")}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${activeTab === "create-project"
                ? "bg-[#bcf954] text-zinc-950 shadow-md"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
            >
              + Add Project
            </button>
          </div>
        </div>

        {/* TAB 1: EVENTS LIST */}
        {activeTab === "list" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-80 px-4 py-2.5 rounded-2xl bg-white border border-zinc-200 text-xs font-mono text-zinc-900 dark:bg-[#141418] dark:border-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bcf954] shadow-sm transition-all"
              />

              <div className="flex items-center gap-2 w-full sm:w-auto text-xs font-mono">
                <span className="text-zinc-500">Filter:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3.5 py-2.5 rounded-2xl bg-white border border-zinc-200 text-zinc-900 dark:bg-[#141418] dark:border-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bcf954] shadow-sm cursor-pointer"
                >
                  <option value="all">All Events</option>
                  <option value="brewing">Brewing Only</option>
                  <option value="upcoming">Upcoming Only</option>
                </select>
              </div>
            </div>

            {loadingEvents ? (
              <div className="text-center py-12 text-zinc-500 font-mono text-sm">
                Loading events from database...
              </div>
            ) : filteredEvents.length === 0 ? (
              <div className="text-center py-12 bg-white border border-zinc-200 dark:bg-[#141418] dark:border-zinc-800 rounded-3xl text-zinc-500 font-mono text-xs">
                No events found matching your filter.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3.5">
                {filteredEvents.map((event) => (
                  <div
                    key={event._id || event.id}
                    className="bg-white border border-zinc-200 dark:bg-[#141418] dark:border-zinc-800/90 p-4 sm:p-5 rounded-2xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-all shadow-sm flex flex-col md:flex-row justify-between gap-4 items-start md:items-center"
                  >
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      {event.image ? (
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-zinc-200 dark:border-zinc-800 shrink-0"
                        />
                      ) : (
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-xs font-mono text-zinc-400 shrink-0">
                          No Image
                        </div>
                      )}

                      <div className="space-y-1.5 min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${event.status === "brewing"
                              ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30"
                              : "bg-[#bcf954]/20 text-lime-800 dark:text-[#bcf954] border border-lime-600/30 dark:border-[#bcf954]/40"
                              }`}
                          >
                            {event.status}
                          </span>
                          <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                            {event.date}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-zinc-900 dark:text-white truncate">
                          {event.title}
                        </h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
                          {event.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                      <button
                        type="button"
                        onClick={() => setEditingEvent(event)}
                        className="px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-mono font-semibold text-zinc-800 dark:text-zinc-100 transition-all cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(event)}
                        className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30 text-xs font-mono font-semibold transition-all cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CREATE SINGLE EVENT */}
        {activeTab === "create" && (
          <div className="bg-white border border-zinc-200 dark:bg-[#141418] dark:border-zinc-800 p-6 sm:p-8 rounded-3xl space-y-6 shadow-sm transition-colors">
            <div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Publish New Event</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-mono">
                Fill in details to display on website banner and brewing section.
              </p>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">Event Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="Kode Kombat 6.0"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bcf954]"
                  />
                </div>

                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">Date *</label>
                  <input
                    type="text"
                    required
                    placeholder="March 15–20, 2026"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bcf954]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">Status *</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bcf954]"
                  >
                    <option value="brewing">Brewing (Now Brewing)</option>
                    <option value="upcoming">Upcoming Event</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="KIET Campus, Ghaziabad"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bcf954]"
                  />
                </div>

                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">Registration Link (URL)</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={formData.moreInfoUrl}
                    onChange={(e) => setFormData({ ...formData, moreInfoUrl: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bcf954]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Event overview..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bcf954]"
                />
              </div>

              {/* Cover Image */}
              <div className="space-y-3 p-4 rounded-2xl bg-zinc-50 border border-zinc-200 dark:bg-[#09090b] dark:border-zinc-800">
                <label className="block text-zinc-700 dark:text-zinc-300 font-bold uppercase tracking-wider text-xs">
                  Event Cover Image
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="block text-[11px] text-zinc-500 mb-1">Upload File</span>
                    <label className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-dashed border-zinc-300 dark:bg-zinc-900 dark:border-zinc-700 hover:border-[#bcf954] text-zinc-700 dark:text-zinc-300 cursor-pointer transition-all">
                      <span className="text-xs font-semibold">Choose File...</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleImageFileRead(file, (base64) =>
                              setFormData((prev) => ({ ...prev, image: base64 }))
                            );
                          }
                        }}
                      />
                    </label>
                  </div>

                  <div>
                    <span className="block text-[11px] text-zinc-500 mb-1">Or Image URL</span>
                    <input
                      type="text"
                      placeholder="https://..."
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-zinc-300 dark:bg-zinc-900 dark:border-zinc-800 text-zinc-900 dark:text-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-2xl font-bold uppercase tracking-wider bg-[#bcf954] text-zinc-950 hover:bg-[#a6e63e] transition-all cursor-pointer pointer-events-auto shadow-md"
              >
                {isSubmitting ? "Publishing..." : "Publish Event"}
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: BULK IMPORT EVENTS */}
        {activeTab === "bulk" && (
          <div className="bg-white border border-zinc-200 dark:bg-[#141418] dark:border-zinc-800 p-6 sm:p-8 rounded-3xl space-y-6 shadow-sm transition-colors">
            <div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">⚡ Bulk Import Events</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-mono">
                Paste JSON array of event objects to add multiple events at once.
              </p>
            </div>

            <form onSubmit={handleBulkSubmit} className="space-y-4 text-xs font-mono">
              <textarea
                rows={10}
                required
                value={bulkJson}
                onChange={(e) => setBulkJson(e.target.value)}
                className="w-full p-4 rounded-2xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#bcf954]"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-2xl font-bold uppercase tracking-wider bg-[#bcf954] text-zinc-950 hover:bg-[#a6e63e] transition-all cursor-pointer shadow-md"
              >
                {isSubmitting ? "Importing..." : "Import Events"}
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: PROJECTS LIST */}
        {activeTab === "projects-list" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              <input
                type="text"
                placeholder="Search projects by title, tech stack..."
                value={projectSearchQuery}
                onChange={(e) => setProjectSearchQuery(e.target.value)}
                className="w-full sm:w-80 px-4 py-2.5 rounded-2xl bg-white border border-zinc-200 text-xs font-mono text-zinc-900 dark:bg-[#141418] dark:border-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bcf954] shadow-sm transition-all"
              />

              <div className="flex items-center gap-2 w-full sm:w-auto text-xs font-mono">
                <span className="text-zinc-500">Domain:</span>
                <select
                  value={projectDomainFilter}
                  onChange={(e) => setProjectDomainFilter(e.target.value)}
                  className="px-3.5 py-2.5 rounded-2xl bg-white border border-zinc-200 text-zinc-900 dark:bg-[#141418] dark:border-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bcf954] shadow-sm cursor-pointer"
                >
                  <option value="all">All Domains</option>
                  {projectDomains.map((dom) => (
                    <option key={dom} value={dom}>
                      {dom}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {loadingProjects ? (
              <div className="text-center py-12 text-zinc-500 font-mono text-sm">
                Loading projects...
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center py-12 bg-white border border-zinc-200 dark:bg-[#141418] dark:border-zinc-800 rounded-3xl text-zinc-500 font-mono text-xs">
                No projects found. Click "+ Add Project" to publish your first community project!
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredProjects.map((proj) => {
                  const techTags = Array.isArray(proj.techStack)
                    ? proj.techStack
                    : String(proj.techStack || "")
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean);

                  return (
                    <div
                      key={proj._id || proj.id}
                      className="bg-white border border-zinc-200 dark:bg-[#141418] dark:border-zinc-800 p-5 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between gap-4 items-start md:items-center hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
                    >
                      <div className="space-y-2 min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-[var(--accent-lime)] text-zinc-950 border border-zinc-900/30">
                            {proj.domain}
                          </span>
                          {proj.linkedinUrl && (
                            <a
                              href={proj.linkedinUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[12px] font-mono text-[#0a66c2] hover:underline"
                            >
                              🔗 Owner
                            </a>
                          )}
                        </div>

                        <h3 className="text-base font-bold text-zinc-900 dark:text-white truncate">
                          {proj.title}
                        </h3>

                        <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">
                          {proj.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {techTags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-[10px] font-mono font-semibold text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-3 pt-1 text-xs font-mono">
                          {proj.githubLink || proj.githubUrl ? (
                            <a
                              href={proj.githubLink || proj.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white font-bold hover:underline"
                            >
                              GitHub ↗
                            </a>
                          ) : null}
                          {proj.liveLink || proj.liveUrl ? (
                            <a
                              href={proj.liveLink || proj.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-emerald-700 dark:text-emerald-400 hover:underline font-bold"
                            >
                              Live Demo ↗
                            </a>
                          ) : null}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                        <button
                          type="button"
                          onClick={() => setEditingProject(proj)}
                          className="px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-mono font-semibold text-zinc-800 dark:text-zinc-100 transition-all cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteProject(proj)}
                          className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30 text-xs font-mono font-semibold transition-all cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: ADD PROJECT FORM */}
        {activeTab === "create-project" && (
          <div className="bg-white border border-zinc-200 dark:bg-[#141418] dark:border-zinc-800 p-6 sm:p-8 rounded-3xl space-y-6 shadow-sm transition-colors">
            <div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">🚀 Add New Project</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-mono">
                Publish a community project to showcase on the main Projects page.
              </p>
            </div>

            <form onSubmit={handleCreateProjectSubmit} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="StudyNotion – LMS Platform"
                    value={projectFormData.title}
                    onChange={(e) =>
                      setProjectFormData({ ...projectFormData, title: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bcf954]"
                  />
                </div>

                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">
                    Domain / Category *
                  </label>
                  <select
                    value={projectFormData.domain}
                    onChange={(e) =>
                      setProjectFormData({ ...projectFormData, domain: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bcf954] cursor-pointer"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="Android Development">Android Development</option>
                    <option value="UI/UX">UI/UX</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Blockchain / Web3">Blockchain / Web3</option>
                    <option value="Cloud / DevOps">Cloud / DevOps</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detailed overview of what the project does, key features, and tools used..."
                  value={projectFormData.description}
                  onChange={(e) =>
                    setProjectFormData({ ...projectFormData, description: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bcf954]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">
                    Tech Stack (Comma Separated) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="React, Node.js, Tailwind, MongoDB"
                    value={projectFormData.techStack}
                    onChange={(e) =>
                      setProjectFormData({ ...projectFormData, techStack: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bcf954]"
                  />
                </div>

                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">
                    LinkedIn Owner Profile URL *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://www.linkedin.com/in/username"
                    value={projectFormData.linkedinUrl}
                    onChange={(e) =>
                      setProjectFormData({ ...projectFormData, linkedinUrl: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bcf954]"
                  />
                </div>
              </div>

              {/* Links box with notice */}
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 dark:bg-[#09090b] dark:border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider text-[11px]">
                    Project Links (GitHub / Live Demo)
                  </span>
                  <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">
                    * At least ONE link is required (both allowed)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">
                      GitHub Link
                    </label>
                    <input
                      type="url"
                      placeholder="https://github.com/username/project"
                      value={projectFormData.githubLink}
                      onChange={(e) =>
                        setProjectFormData({ ...projectFormData, githubLink: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-zinc-300 dark:bg-zinc-900 dark:border-zinc-800 text-zinc-900 dark:text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">
                      Live Link
                    </label>
                    <input
                      type="url"
                      placeholder="https://project.vercel.app"
                      value={projectFormData.liveLink}
                      onChange={(e) =>
                        setProjectFormData({ ...projectFormData, liveLink: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-zinc-300 dark:bg-zinc-900 dark:border-zinc-800 text-zinc-900 dark:text-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmittingProject}
                className="w-full py-3.5 rounded-2xl font-bold uppercase tracking-wider bg-[#bcf954] text-zinc-950 hover:bg-[#a6e63e] transition-all cursor-pointer shadow-md"
              >
                {isSubmittingProject ? "Publishing Project..." : "Add Project"}
              </button>
            </form>
          </div>
        )}
      </div>

      {/* EDIT EVENT MODAL */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-zinc-200 dark:bg-[#141418] dark:border-zinc-800 w-full max-w-2xl rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl transition-colors">
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Edit Event</h2>
              <button
                type="button"
                onClick={() => setEditingEvent(null)}
                className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-zinc-700 dark:text-zinc-300 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={editingEvent.title}
                  onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 mb-1">Date</label>
                  <input
                    type="text"
                    required
                    value={editingEvent.date}
                    onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 mb-1">Status</label>
                  <select
                    value={editingEvent.status}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        status: e.target.value as any,
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none"
                  >
                    <option value="brewing">Brewing</option>
                    <option value="upcoming">Upcoming</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-zinc-700 dark:text-zinc-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={editingEvent.description}
                  onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setEditingEvent(null)}
                  className="px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 rounded-xl font-bold uppercase bg-[#bcf954] text-zinc-950 hover:bg-[#a6e63e] cursor-pointer"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT PROJECT MODAL */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-zinc-200 dark:bg-[#141418] dark:border-zinc-800 w-full max-w-2xl rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl transition-colors">
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Edit Project</h2>
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateProjectSubmit} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-zinc-700 dark:text-zinc-300 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={editingProject.title}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, title: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-zinc-700 dark:text-zinc-300 mb-1">Domain</label>
                <input
                  type="text"
                  required
                  value={editingProject.domain}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, domain: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-zinc-700 dark:text-zinc-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={editingProject.description}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, description: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-zinc-700 dark:text-zinc-300 mb-1">
                  Tech Stack (Comma Separated)
                </label>
                <input
                  type="text"
                  required
                  value={
                    Array.isArray(editingProject.techStack)
                      ? editingProject.techStack.join(", ")
                      : editingProject.techStack || ""
                  }
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      techStack: e.target.value.split(",").map((t) => t.trim()),
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-zinc-700 dark:text-zinc-300 mb-1">
                  LinkedIn Owner URL
                </label>
                <input
                  type="url"
                  required
                  value={editingProject.linkedinUrl || ""}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, linkedinUrl: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 mb-1">GitHub Link</label>
                  <input
                    type="url"
                    value={editingProject.githubLink || editingProject.githubUrl || ""}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, githubLink: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 mb-1">Live Link</label>
                  <input
                    type="url"
                    value={editingProject.liveLink || editingProject.liveUrl || ""}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, liveLink: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingProject}
                  className="px-6 py-2 rounded-xl font-bold uppercase bg-[#bcf954] text-zinc-950 hover:bg-[#a6e63e] cursor-pointer"
                >
                  {isSubmittingProject ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
