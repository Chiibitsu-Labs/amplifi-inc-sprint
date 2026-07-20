import type { Metadata } from "next";
import { recapHtml } from "@/content/recap";

export const metadata: Metadata = { title: "Sprint Recap — Chiibitsu Labs for Amplifi" };

export default function RecapPage() {
  return <div dangerouslySetInnerHTML={{ __html: recapHtml }} />;
}
