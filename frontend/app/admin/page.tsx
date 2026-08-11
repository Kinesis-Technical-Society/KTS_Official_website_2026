"use client";

import { useEffect, useState } from "react";
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

import { AdminLoginForm } from "./components/AdminLoginForm";
import { AdminHeader } from "./components/AdminHeader";
import { AdminNavTabs, AdminTab } from "./components/AdminNavTabs";
import { EventListTab } from "./components/EventListTab";
import { EventFormTab } from "./components/EventFormTab";
import { EventBulkTab } from "./components/EventBulkTab";
import { ProjectListTab } from "./components/ProjectListTab";
import { ProjectFormTab } from "./components/ProjectFormTab";
import { EventEditModal } from "./components/EventEditModal";
import { ProjectEditModal } from "./components/ProjectEditModal";

export default function AdminPage() {
  // Auth state
  const [token, setToken] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<AdminTab>("list");

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
    } finally {
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

  // Event handlers
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

  // Project handlers
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
    const techString = Array.isArray(p.techStack)
      ? p.techStack.join(" ")
      : String(p.techStack || "");
    const matchesSearch =
      p.title.toLowerCase().includes(projectSearchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(projectSearchQuery.toLowerCase()) ||
      techString.toLowerCase().includes(projectSearchQuery.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  const projectDomains = Array.from(
    new Set(projects.map((p) => p.domain).filter(Boolean))
  );

  // Render Login Form if unauthenticated
  if (!token) {
    return (
      <AdminLoginForm
        emailInput={emailInput}
        setEmailInput={setEmailInput}
        passwordInput={passwordInput}
        setPasswordInput={setPasswordInput}
        authError={authError}
        isLoggingIn={isLoggingIn}
        onLoginSubmit={handleLoginSubmit}
      />
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#0c0c0e] dark:text-zinc-100 transition-colors duration-200 pb-20 font-sans">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-2xl border text-xs font-mono shadow-2xl flex items-center gap-2 animate-in slide-in-from-top-4 ${
            notification.type === "success"
              ? "bg-emerald-50 border-emerald-300 text-emerald-900 dark:bg-emerald-950/90 dark:border-emerald-500/60 dark:text-emerald-200"
              : "bg-red-50 border-red-300 text-red-900 dark:bg-red-950/90 dark:border-red-500/60 dark:text-red-200"
          }`}
        >
          <span>{notification.type === "success" ? "✅" : "⚠️"}</span>
          <span className="font-semibold">{notification.message}</span>
        </div>
      )}

      {/* Admin Header */}
      <AdminHeader onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Navigation Tabs */}
        <AdminNavTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          eventsCount={events.length}
          projectsCount={projects.length}
        />

        {/* Tab 1: Events List */}
        {activeTab === "list" && (
          <EventListTab
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            loadingEvents={loadingEvents}
            filteredEvents={filteredEvents}
            onEdit={setEditingEvent}
            onDelete={handleDelete}
          />
        )}

        {/* Tab 2: Create Event */}
        {activeTab === "create" && (
          <EventFormTab
            formData={formData}
            setFormData={setFormData}
            handleImageFileRead={handleImageFileRead}
            onSubmit={handleCreateSubmit}
            isSubmitting={isSubmitting}
          />
        )}

        {/* Tab 3: Bulk Import Events */}
        {activeTab === "bulk" && (
          <EventBulkTab
            bulkJson={bulkJson}
            setBulkJson={setBulkJson}
            onSubmit={handleBulkSubmit}
            isSubmitting={isSubmitting}
          />
        )}

        {/* Tab 4: Projects List */}
        {activeTab === "projects-list" && (
          <ProjectListTab
            projectSearchQuery={projectSearchQuery}
            setProjectSearchQuery={setProjectSearchQuery}
            projectDomainFilter={projectDomainFilter}
            setProjectDomainFilter={setProjectDomainFilter}
            projectDomains={projectDomains}
            loadingProjects={loadingProjects}
            filteredProjects={filteredProjects}
            onEdit={setEditingProject}
            onDelete={handleDeleteProject}
          />
        )}

        {/* Tab 5: Create Project */}
        {activeTab === "create-project" && (
          <ProjectFormTab
            projectFormData={projectFormData}
            setProjectFormData={setProjectFormData}
            onSubmit={handleCreateProjectSubmit}
            isSubmittingProject={isSubmittingProject}
          />
        )}
      </div>

      {/* Edit Event Modal */}
      {editingEvent && (
        <EventEditModal
          event={editingEvent}
          setEvent={setEditingEvent}
          onSubmit={handleUpdateSubmit}
          isSubmitting={isSubmitting}
        />
      )}

      {/* Edit Project Modal */}
      {editingProject && (
        <ProjectEditModal
          project={editingProject}
          setProject={setEditingProject}
          onSubmit={handleUpdateProjectSubmit}
          isSubmitting={isSubmittingProject}
        />
      )}
    </main>
  );
}
