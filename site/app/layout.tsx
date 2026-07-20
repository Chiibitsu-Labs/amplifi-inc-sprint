import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chiibitsu Labs — Amplifi AI Incorporation Sprint",
  description:
    "Executive record of the Amplifi AI Incorporation Sprint, prepared by Chiibitsu Labs — all five deliverables, each with a downloadable PDF.",
  icons: { icon: "/logos/cl-icon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
