// app/config/links/home/events.ts

export type EventsLink = {
  key: string;
  href: string;  // ⬅️ Gewoon 1 href, geen object meer
};

/**
 * 🎟 EVENTS LINKS
 */
export const eventsLinks = {
  overview: {
    key: "allEvents",
    href: "/event-transport",  // ⬅️ Basis path (Engels als default)
  },
};