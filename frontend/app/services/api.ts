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

export async function fetchEvents(status?: string): Promise<EventItem[]> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = status
      ? `${baseUrl}/events?status=${encodeURIComponent(status)}`
      : `${baseUrl}/events`;

    const res = await fetch(url, { cache: "no-store" });
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
