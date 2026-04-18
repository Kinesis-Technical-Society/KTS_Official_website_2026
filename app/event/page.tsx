"use client";

import eventsData from "../data/events.json" with { type: "json" };

import { CultureCallout } from "./components/CultureCallout";
import { EventFormatsMarquee } from "./components/EventFormatsMarquee";
import { EventsHeader } from "./components/EventsHeader";
import { EventsHero } from "./components/EventsHero";
import { eventPageStyles } from "./components/EventPageStyles";
import { JoinFooterSection } from "./components/JoinFooterSection";
import { MysterySection } from "./components/MysterySection";
import { PastEventsSection } from "./components/PastEventsSection";
import { Event } from "./types";

export default function EventsPage() {
  const pastEvents = (eventsData as Event[]).filter((event) => event.status === "past");

  return (
    <main className="hero-grid flex-1">
      <style>{eventPageStyles}</style>

      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-0 px-4 pb-0 pt-6 sm:px-6">
        <EventsHeader />
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
