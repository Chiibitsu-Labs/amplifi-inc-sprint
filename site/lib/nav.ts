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

export const NAV_RECAP: NavItem = { href: "/recap", n: "—", label: "Sprint Recap" };
