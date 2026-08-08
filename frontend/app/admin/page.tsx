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
    accent: "#bcf954",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Bulk input state
  const [bulkJson, setBulkJson] = useState(`[
  {
    "title": "HackKTS 2026 — 24 Hour Hackathon",
    "date": "March 28–29, 2026",
    "status": "upcoming",
    "description": "Join the biggest student hackathon at KIET! Build innovate web and AI projects.",
    "location": "KIET Campus, Ghaziabad",
    "moreInfoUrl": "https://kts-hackathon.devfolio.co",
    "prize": "₹1,00,00,000 Pool + Goodies",
    "tags": ["Hackathon", "AI", "Web3", "Innovation"]
  }
]`);

  // Edit Modal State
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);

  // Apply admin scrollbar theme to HTML root element while in admin panel
  useEffect(() => {
    document.documentElement.classList.add("admin-theme");
    document.documentElement.setAttribute("data-admin-theme", "true");
    return () => {
      document.documentElement.classList.remove("admin-theme");
      document.documentElement.removeAttribute("data-admin-theme");
    };
  }, []);

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
      const updated = await updateEvent(id, editingEvent, token);
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
      <main className="admin-theme min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-zinc-900/90 border border-zinc-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#bcf954] via-emerald-400 to-[#cbb6ff]" />
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#bcf954]/30 bg-[#bcf954]/10 text-xs font-mono font-semibold uppercase tracking-widest text-[#bcf954] mb-3">
              KTS ADMIN CONTROL
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">Admin Portal</h1>
            <p className="text-sm text-zinc-400 mt-2">Log in to manage events, brewing releases & banners.</p>
          </div>

          {authError && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono">
              ⚠️ {authError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-5 font-mono text-sm">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                Admin Email
              </label>
              <input
                type="email"
                required
                placeholder="Enter admin email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-[#bcf954] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter admin password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-[#bcf954] transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3.5 px-4 rounded-xl font-bold uppercase tracking-wider bg-[#bcf954] text-zinc-950 hover:bg-[#a6e63e] transition-all shadow-[0_0_20px_rgba(188,249,84,0.3)] disabled:opacity-50 cursor-pointer"
            >
              {isLoggingIn ? "Authenticating..." : "Access Admin Panel"}
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
    <main className="admin-theme min-h-screen bg-zinc-950 text-white pb-20 font-sans">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl border text-sm font-mono shadow-2xl flex items-center gap-2 ${
            notification.type === "success"
              ? "bg-emerald-950 border-emerald-500 text-emerald-300"
              : "bg-red-950 border-red-500 text-red-300"
          }`}
        >
          <span>{notification.type === "success" ? "✅" : "⚠️"}</span>
          <span>{notification.message}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="border-b border-zinc-800 bg-zinc-900/60 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-[#bcf954] animate-pulse" />
            <h1 className="text-xl font-extrabold tracking-tight">KTS Admin Panel</h1>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="hidden sm:inline text-zinc-400">Logged in as Admin</span>
            <button
              onClick={handleLogout}
              className="px-3.5 py-1.5 rounded-lg border border-red-500/40 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-zinc-900/70 border border-zinc-800 p-5 rounded-2xl">
            <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Total Events</p>
            <p className="text-3xl font-extrabold text-white mt-2">{totalCount}</p>
          </div>
          <div className="bg-zinc-900/70 border border-[#bcf954]/30 p-5 rounded-2xl">
            <p className="text-xs font-mono text-[#bcf954] uppercase tracking-wider">Upcoming & Brewing</p>
            <p className="text-3xl font-extrabold text-[#bcf954] mt-2">{upcomingCount}</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("list")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "list"
                  ? "bg-[#bcf954] text-zinc-950 shadow-[0_0_15px_rgba(188,249,84,0.3)]"
                  : "bg-zinc-900 text-zinc-400 hover:text-white"
              }`}
            >
              All Events ({events.length})
            </button>
            <button
              onClick={() => setActiveTab("create")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "create"
                  ? "bg-[#bcf954] text-zinc-950 shadow-[0_0_15px_rgba(188,249,84,0.3)]"
                  : "bg-zinc-900 text-zinc-400 hover:text-white"
              }`}
            >
              + Create Single Event
            </button>
            <button
              onClick={() => setActiveTab("bulk")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "bulk"
                  ? "bg-[#bcf954] text-zinc-950 shadow-[0_0_15px_rgba(188,249,84,0.3)]"
                  : "bg-zinc-900 text-zinc-400 hover:text-white"
              }`}
            >
              ⚡ Bulk Add Events
            </button>
          </div>

          <button
            onClick={loadAdminEvents}
            className="text-xs font-mono text-zinc-400 hover:text-[#bcf954] transition-colors"
          >
            🔄 Refresh List
          </button>
        </div>

        {/* TAB 1: ALL EVENTS LIST */}
        {activeTab === "list" && (
          <div className="space-y-4">
            {/* Search & Filter bar */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              <input
                type="text"
                placeholder="Search events by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-80 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-white focus:outline-none focus:border-[#bcf954]"
              />

              <div className="flex items-center gap-2 w-full sm:w-auto text-xs font-mono">
                <span className="text-zinc-500">Filter:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-[#bcf954]"
                >
                  <option value="all">All Statuses</option>
                  <option value="brewing">Brewing</option>
                  <option value="upcoming">Upcoming</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12 text-zinc-500 font-mono text-sm">
                Loading events from MongoDB...
              </div>
            ) : filteredEvents.length === 0 ? (
              <div className="text-center py-12 bg-zinc-900/50 rounded-2xl border border-zinc-800 text-zinc-400 font-mono text-sm">
                No events found matching your criteria.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredEvents.map((event) => (
                  <div
                    key={event._id || event.id}
                    className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-2xl hover:border-zinc-700 transition-all flex flex-col md:flex-row justify-between gap-4"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                            event.status === "brewing"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                              : event.status === "upcoming"
                              ? "bg-[#bcf954]/20 text-[#bcf954] border border-[#bcf954]/40"
                              : "bg-zinc-800 text-zinc-400"
                          }`}
                        >
                          {event.status}
                        </span>
                        <span className="font-mono text-xs text-zinc-400">{event.date}</span>
                      </div>

                      <h3 className="text-lg font-bold text-white">{event.title}</h3>
                      <p className="text-xs text-zinc-400 line-clamp-2">{event.description}</p>

                      {event.moreInfoUrl && (
                        <p className="text-xs font-mono text-[#bcf954]">
                          🔗 More Info Link:{" "}
                          <a
                            href={event.moreInfoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="underline hover:text-white"
                          >
                            {event.moreInfoUrl}
                          </a>
                        </p>
                      )}
                    </div>

                    <div className="flex md:flex-col items-center justify-end gap-2 shrink-0 border-t md:border-t-0 md:border-l border-zinc-800 pt-3 md:pt-0 md:pl-4">
                      <button
                        onClick={() => setEditingEvent(event)}
                        className="w-full sm:w-auto px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-mono font-semibold text-white transition-all cursor-pointer"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(event)}
                        className="w-full sm:w-auto px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/40 text-xs font-mono font-semibold transition-all cursor-pointer"
                      >
                        🗑️ Delete
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
          <div className="bg-zinc-900/80 border border-zinc-800 p-6 sm:p-8 rounded-3xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">Create New Event</h2>
              <p className="text-xs text-zinc-400 mt-1 font-mono">
                Fill in event details to list on website load banner and brewing section.
              </p>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-300 mb-1">Event Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kode Kombat 6.0 — Annual CP Fest"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-[#bcf954]"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 mb-1">Date *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. March 15–20, 2026"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-[#bcf954]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-zinc-300 mb-1">Status *</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-[#bcf954]"
                  >
                    <option value="brewing">Brewing (Something is Brewing)</option>
                    <option value="upcoming">Upcoming</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-300 mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="KIET Group of Institutions, Ghaziabad"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-[#bcf954]"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 mb-1">Link for More Info (URL)</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={formData.moreInfoUrl}
                    onChange={(e) => setFormData({ ...formData, moreInfoUrl: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-[#bcf954]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detailed event description..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-[#bcf954]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-300 mb-1">Prize / Rewards</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹50,000 Cash Pool + Certificates"
                    value={formData.prize}
                    onChange={(e) => setFormData({ ...formData, prize: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-[#bcf954]"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 mb-1">Tags (comma separated)</label>
                  <input
                    type="text"
                    placeholder="DSA, Competitive Programming, Hackathon"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-[#bcf954]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl font-bold uppercase tracking-wider bg-[#bcf954] text-zinc-950 hover:bg-[#a6e63e] transition-all cursor-pointer"
              >
                {isSubmitting ? "Creating Event..." : "Publish Event to Database"}
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: BULK ADD EVENTS */}
        {activeTab === "bulk" && (
          <div className="bg-zinc-900/80 border border-zinc-800 p-6 sm:p-8 rounded-3xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">⚡ Bulk Create Multiple Events</h2>
              <p className="text-xs text-zinc-400 mt-1 font-mono">
                Add multiple events at once by pasting a JSON array of events.
              </p>
            </div>

            <form onSubmit={handleBulkSubmit} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-zinc-300 mb-2">Events JSON Array</label>
                <textarea
                  rows={12}
                  required
                  value={bulkJson}
                  onChange={(e) => setBulkJson(e.target.value)}
                  className="w-full p-4 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-zinc-300 focus:outline-none focus:border-[#bcf954]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl font-bold uppercase tracking-wider bg-[#bcf954] text-zinc-950 hover:bg-[#a6e63e] transition-all cursor-pointer"
              >
                {isSubmitting ? "Adding Events..." : "Bulk Save Events to Database"}
              </button>
            </form>
          </div>
        )}
      </div>

      {/* EDIT EVENT MODAL */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-2xl rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h2 className="text-lg font-bold text-white">Edit Event</h2>
              <button
                onClick={() => setEditingEvent(null)}
                className="text-zinc-500 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-zinc-300 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={editingEvent.title}
                  onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-[#bcf954]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-300 mb-1">Date</label>
                  <input
                    type="text"
                    required
                    value={editingEvent.date}
                    onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-[#bcf954]"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 mb-1">Status</label>
                  <select
                    value={editingEvent.status}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        status: e.target.value as any,
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-[#bcf954]"
                  >
                    <option value="brewing">Brewing</option>
                    <option value="upcoming">Upcoming</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 mb-1">Link for More Info (URL)</label>
                <input
                  type="url"
                  value={editingEvent.moreInfoUrl || ""}
                  onChange={(e) => setEditingEvent({ ...editingEvent, moreInfoUrl: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-[#bcf954]"
                />
              </div>

              <div>
                <label className="block text-zinc-300 mb-1">Description</label>
                <textarea
                  rows={4}
                  required
                  value={editingEvent.description}
                  onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-[#bcf954]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={editingEvent.location || ""}
                    onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-[#bcf954]"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 mb-1">Prize / Rewards</label>
                  <input
                    type="text"
                    value={editingEvent.prize || ""}
                    onChange={(e) => setEditingEvent({ ...editingEvent, prize: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-[#bcf954]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setEditingEvent(null)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 rounded-xl font-bold uppercase bg-[#bcf954] text-zinc-950 hover:bg-[#a6e63e]"
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
