import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { d1Html } from "@/content/d1";
import { d2Html } from "@/content/d2";
import { d3Html } from "@/content/d3";
import { d4Html } from "@/content/d4";
import { d5Html } from "@/content/d5";

const DELIVERABLES: Record<string, { html: string; title: string }> = {
  "1": { html: d1Html, title: "Knowledge Foundation Blueprint" },
  "2": { html: d2Html, title: "Output Consistency & Quality System" },
  "3": { html: d3Html, title: "AI Ecosystem Architecture Map" },
  "4": { html: d4Html, title: "Prioritized Implementation Roadmap" },
  "5": { html: d5Html, title: "When-to-Hire Instrument" },
};

type Params = Promise<{ id: string }>;

export function generateStaticParams() {
  return Object.keys(DELIVERABLES).map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const entry = DELIVERABLES[id];
  return { title: entry ? `${entry.title} — Chiibitsu Labs for Amplifi` : "Not found" };
}

export default async function DeliverablePage({ params }: { params: Params }) {
  const { id } = await params;
  const entry = DELIVERABLES[id];
  if (!entry) notFound();
  return <div dangerouslySetInnerHTML={{ __html: entry.html }} />;
}
