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
} from "../services/api";

export default function AdminPage() {
  // Auth state
  const [token, setToken] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Data state
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"list" | "create" | "bulk">("list");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

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

  // Bulk input state
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

  // Edit Modal State
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);

  // Check stored auth token on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("kts_admin_token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // Fetch events when logged in
  useEffect(() => {
    if (token) {
      loadAdminEvents();
    }
  }, [token]);

  const loadAdminEvents = async () => {
    setLoading(true);
    try {
      const data = await fetchEvents();
      setEvents(data);
    } catch (err: any) {
      showNotify("error", err.message || "Failed to load events.");
    } finally {
      setLoading(false);
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

  // Handle Single Event Form Submission
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

  // Handle Bulk Event Submission
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

  // Handle Event Update
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

  // Handle Delete Event
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

  // Filter events
  const filteredEvents = events.filter((ev) => {
    const matchesStatus = statusFilter === "all" || ev.status === statusFilter;
    const matchesSearch =
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Calculate statistics
  const totalCount = events.length;
  const upcomingCount = events.filter((e) => e.status === "upcoming" || e.status === "brewing").length;

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
            <Link href="/" className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-lime-600/30 bg-lime-500/10 dark:border-[#bcf954]/30 dark:bg-[#bcf954]/10 text-xs font-mono font-semibold uppercase tracking-widest text-lime-700 dark:text-[#bcf954] mb-4 hover:scale-105 transition-transform">
              ← Back to KTS Website
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Admin Portal
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-2">
              Log in to manage society events & announcements.
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
                placeholder="admin@kts.edu"
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
                placeholder="••••••••"
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

      {/* Clean Top Header */}
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
                KTS Admin Panel
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
        {/* Statistics Bar */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white border border-zinc-200 dark:bg-[#141418] dark:border-zinc-800 p-5 rounded-2xl shadow-sm transition-colors">
            <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-semibold">
              Total Managed Events
            </p>
            <p className="text-3xl font-extrabold text-zinc-900 dark:text-white mt-1">{totalCount}</p>
          </div>
          <div className="bg-white border border-lime-500/40 dark:bg-[#141418] dark:border-[#bcf954]/30 p-5 rounded-2xl shadow-sm transition-colors">
            <p className="text-xs font-mono text-lime-700 dark:text-[#bcf954] uppercase tracking-wider font-semibold">
              Active / Upcoming Events
            </p>
            <p className="text-3xl font-extrabold text-lime-600 dark:text-[#bcf954] mt-1">{upcomingCount}</p>
          </div>
        </div> */}

        {/* Clean Segmented Tab Control */}
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800/80 pb-4 flex-wrap gap-3">
          <div className="flex items-center gap-1.5 bg-zinc-200/60 dark:bg-zinc-900/80 p-1.5 rounded-2xl border border-zinc-300/60 dark:border-zinc-800">
            <button
              type="button"
              onClick={() => setActiveTab("list")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${activeTab === "list"
                  ? "bg-[#bcf954] text-zinc-950 shadow-md"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
            >
              Events List ({events.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("create")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${activeTab === "create"
                  ? "bg-[#bcf954] text-zinc-950 shadow-md"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
            >
              + Add Event
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("bulk")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${activeTab === "bulk"
                  ? "bg-[#bcf954] text-zinc-950 shadow-md"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
            >
              ⚡ Bulk Import
            </button>
          </div>
        </div>

        {/* TAB 1: ALL EVENTS LIST */}
        {activeTab === "list" && (
          <div className="space-y-4">
            {/* Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              <input
                type="text"
                placeholder="Search events by title..."
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

            {loading ? (
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
                        className="px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-mono font-semibold text-zinc-800 dark:text-zinc-100 transition-all cursor-pointer pointer-events-auto"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(event)}
                        className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30 text-xs font-mono font-semibold transition-all cursor-pointer pointer-events-auto"
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

              {/* Cover Image Upload / URL Input */}
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
                            handleImageFileRead(file, (base64) => setFormData((prev) => ({ ...prev, image: base64 })));
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

        {/* TAB 3: BULK IMPORT */}
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
                className="w-full py-3.5 rounded-2xl font-bold uppercase tracking-wider bg-[#bcf954] text-zinc-950 hover:bg-[#a6e63e] transition-all cursor-pointer pointer-events-auto shadow-md"
              >
                {isSubmitting ? "Importing..." : "Import Events"}
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
    </main>
  );
}
