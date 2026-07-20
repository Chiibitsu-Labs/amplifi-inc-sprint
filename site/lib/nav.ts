export type NavItem = {
  href: string;
  n: string;
  label: string;
  soon?: boolean;
};

export const NAV_OVERVIEW: NavItem = { href: "/", n: "—", label: "Executive summary" };

export const NAV_DELIVERABLES: NavItem[] = [
  { href: "/deliverable/1", n: "01", label: "Knowledge Foundation" },
  { href: "/deliverable/2", n: "02", label: "Output Consistency" },
  { href: "/deliverable/3", n: "03", label: "Architecture Map" },
  { href: "/deliverable/4", n: "04", label: "Roadmap" },
  { href: "/deliverable/5", n: "05", label: "When-to-Hire Instrument" },
];

export const NAV_TEAM: NavItem = { href: "/team", n: "—", label: "The people", soon: true };

export const PAGE_TITLES: Record<string, string> = {
  "/": "Executive Overview",
  "/deliverable/1": "Knowledge Foundation Blueprint",
  "/deliverable/2": "Output Consistency & Quality System",
  "/deliverable/3": "AI Ecosystem Architecture Map",
  "/deliverable/4": "Prioritized Implementation Roadmap",
  "/deliverable/5": "When-to-Hire Instrument",
  "/team": "The Team",
};
