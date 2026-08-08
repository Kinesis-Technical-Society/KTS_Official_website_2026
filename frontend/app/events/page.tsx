"use client";

import { useEffect, useState } from "react";
import eventsData from "../data/events.json" with { type: "json" };
import { fetchEvents, EventItem } from "../services/api";

import Navbar from "../components/Navbar";
import { CultureCallout } from "./components/CultureCallout";
import { EventFormatsMarquee } from "./components/EventFormatsMarquee";
import { EventsHero } from "./components/EventsHero";
import { eventPageStyles } from "./components/EventPageStyles";
import { JoinFooterSection } from "./components/JoinFooterSection";
import { MysterySection } from "./components/MysterySection";
import { PastEventsSection } from "./components/PastEventsSection";
import { Event } from "./types";

export default function EventsPage() {
  const [pastEvents, setPastEvents] = useState<Event[]>(() => {
    return (eventsData as any[]).filter((e) => e.status === "past") as Event[];
  });

  useEffect(() => {
    async function loadPastEventsFromDb() {
      try {
        const dbPast = await fetchEvents("past");
        if (dbPast && dbPast.length > 0) {
          const formattedDbEvents: Event[] = dbPast.map((item, idx) => ({
            id: item._id || item.id || `db-${idx}`,
            title: item.title,
            date: item.date,
            status: item.status as any,
            description: item.description,
            tags: item.tags || [],
            participants: item.participants || 0,
            highlights: item.highlights || [],
            prize: item.prize || "",
            location: item.location || "KIET Group of Institutions, Ghaziabad",
            image: item.image || "",
            accent: item.accent || "#bcf954",
            gradient: item.gradient || "linear-gradient(135deg,#0a1a02 0%,#0e0e0e 100%)",
            photos: item.photos || [],
            photoColors: [],
          }));

          // Merge DB events with local events, avoiding duplicates by title
          const dbTitles = new Set(formattedDbEvents.map((e) => e.title.toLowerCase()));
          const fallbackEvents = (eventsData as any[]).filter(
            (e) => e.status === "past" && !dbTitles.has(e.title.toLowerCase())
          );
          setPastEvents([...formattedDbEvents, ...fallbackEvents]);
        }
      } catch (err) {
        console.warn("Failed to load past events from backend DB, using local JSON archive:", err);
      }
    }

    loadPastEventsFromDb();
  }, []);

  return (
    <main className="hero-grid flex-1">
      <style>{eventPageStyles}</style>

      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-0 px-4 pb-0 pt-6 sm:px-6">
        <Navbar />
        <EventsHero />
        <EventFormatsMarquee />
        <MysterySection />
        <CultureCallout />
        <PastEventsSection events={pastEvents} />
        <JoinFooterSection />
      </div>
    </main>
  );
}
