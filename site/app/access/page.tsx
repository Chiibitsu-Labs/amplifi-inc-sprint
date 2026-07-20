import type { Metadata } from "next";
import { AccessForm } from "./access-form";

export const metadata: Metadata = { title: "Access — Chiibitsu Labs for Amplifi" };

export default async function AccessPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  return <AccessForm next={next && next.startsWith("/") ? next : "/"} />;
}
