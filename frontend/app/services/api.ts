export function getApiBaseUrl(): string {
  let url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      url = `http://${hostname}:5000/api`;
    } else {
      url = "http://localhost:5000/api";
    }
  }

  // Prevent Mixed Content errors (e.g., HTTPS frontend requesting HTTP backend)
  const isHttpsPage = typeof window !== "undefined" && window.location.protocol === "https:";
  const isRemoteHost = !url.includes("localhost") && !url.includes("127.0.0.1");

  if ((isHttpsPage || isRemoteHost) && url.startsWith("http://")) {
    url = url.replace(/^http:\/\//i, "https://");
  }

  return url;
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
    return data.data || [];
  } catch (error) {
    console.warn("Failed to fetch projects from backend API:", error);
    return [];
  }
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

/* Team Member APIs */
export interface TeamMemberItem {
  _id?: string;
  id?: string;
  name: string;
  category: "core" | "coordinator";
  role?: string;
  domain?: string;
  photo?: string;
  bio?: string;
  linkedin?: string;
  github?: string;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export async function fetchTeamMembers(category?: string): Promise<TeamMemberItem[]> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = category
      ? `${baseUrl}/team?category=${encodeURIComponent(category)}`
      : `${baseUrl}/team`;

    const res = await fetch(url, { next: { revalidate: 30 } });
    if (!res.ok) {
      throw new Error(`Error status ${res.status}`);
    }
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.warn("Failed to fetch team members from backend API:", error);
    return [];
  }
}

export async function createTeamMember(memberData: Partial<TeamMemberItem>, token: string) {
  const res = await fetch(`${getApiBaseUrl()}/team`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(memberData),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to create team member");
  }
  return data;
}

export async function updateTeamMember(id: string, memberData: Partial<TeamMemberItem>, token: string) {
  const res = await fetch(`${getApiBaseUrl()}/team/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(memberData),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to update team member");
  }
  return data;
}

export async function deleteTeamMember(id: string, token: string) {
  const res = await fetch(`${getApiBaseUrl()}/team/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to delete team member");
  }
  return data;
}

