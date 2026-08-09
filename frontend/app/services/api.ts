import projectsFallback from "../data/projects.json";

export function getApiBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    return `http://${hostname}:5000/api`;
  }
  return "http://localhost:5000/api";
}

export interface EventItem {
  _id?: string;
  id?: number | string;
  title: string;
  date: string;
  status: "upcoming" | "brewing" | "past";
  description: string;
  location?: string;
  moreInfoUrl?: string;
  prize?: string;
  tags?: string[];
  highlights?: string[];
  image?: string;
  accent?: string;
  gradient?: string;
  participants?: number;
  photos?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectItem {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  techStack: string[];
  domain: string;
  linkedinUrl: string;
  githubLink?: string;
  githubUrl?: string;
  liveLink?: string;
  liveUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export async function loginAdmin(email: string, password: string) {
  const res = await fetch(`${getApiBaseUrl()}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to log in as admin");
  }
  return data;
}

/* Event APIs */
export async function fetchEvents(status?: string): Promise<EventItem[]> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = status
      ? `${baseUrl}/events?status=${encodeURIComponent(status)}`
      : `${baseUrl}/events`;

    const res = await fetch(url, { next: { revalidate: 30 } });
    if (!res.ok) {
      throw new Error(`Error status ${res.status}`);
    }
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.warn("Failed to fetch events from backend API, using fallback if available:", error);
    return [];
  }
}

export async function createEvent(eventData: Partial<EventItem>, token: string) {
  const res = await fetch(`${getApiBaseUrl()}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(eventData),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to create event");
  }
  return data;
}

export async function bulkCreateEvents(events: Partial<EventItem>[], token: string) {
  const res = await fetch(`${getApiBaseUrl()}/events/bulk`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ events }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to bulk create events");
  }
  return data;
}

export async function updateEvent(id: string, eventData: Partial<EventItem>, token: string) {
  const res = await fetch(`${getApiBaseUrl()}/events/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(eventData),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to update event");
  }
  return data;
}

export async function deleteEvent(id: string, token: string) {
  const res = await fetch(`${getApiBaseUrl()}/events/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to delete event");
  }
  return data;
}

/* Project APIs */
export async function fetchProjects(): Promise<ProjectItem[]> {
  try {
    const baseUrl = getApiBaseUrl();
    const res = await fetch(`${baseUrl}/projects`, { next: { revalidate: 30 } });
    if (!res.ok) {
      throw new Error(`Error status ${res.status}`);
    }
    const data = await res.json();
    if (data.data && Array.isArray(data.data) && data.data.length > 0) {
      return data.data;
    }
  } catch (error) {
    console.warn("Failed to fetch projects from backend API, using fallback projects.json:", error);
  }

  // Fallback to projects.json
  return (projectsFallback as any[]).map((p, idx) => ({
    _id: String(idx + 1),
    title: p.title,
    description: p.description,
    techStack: p.techStack || p.tags || [],
    domain: p.domain || p.category || "Web Development",
    linkedinUrl: p.linkedinUrl || "",
    githubLink: p.githubLink || p.githubUrl || "",
    liveLink: p.liveLink || p.liveUrl || "",
  }));
}

export async function createProject(projectData: Partial<ProjectItem>, token: string) {
  const res = await fetch(`${getApiBaseUrl()}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(projectData),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to create project");
  }
  return data;
}

export async function updateProject(id: string, projectData: Partial<ProjectItem>, token: string) {
  const res = await fetch(`${getApiBaseUrl()}/projects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(projectData),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to update project");
  }
  return data;
}

export async function deleteProject(id: string, token: string) {
  const res = await fetch(`${getApiBaseUrl()}/projects/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to delete project");
  }
  return data;
}
