import type { Metadata } from "next";
import { homeHtml } from "@/content/home";

export const metadata: Metadata = { title: "Executive Overview — Chiibitsu Labs for Amplifi" };

export default function HomePage() {
  return <div dangerouslySetInnerHTML={{ __html: homeHtml }} />;
}
