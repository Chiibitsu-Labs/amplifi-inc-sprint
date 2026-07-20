import type { Metadata } from "next";
import { teamHtml } from "@/content/team";

export const metadata: Metadata = { title: "The Team — Chiibitsu Labs for Amplifi" };

export default function TeamPage() {
  return <div dangerouslySetInnerHTML={{ __html: teamHtml }} />;
}
