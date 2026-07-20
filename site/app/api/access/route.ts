import { NextRequest, NextResponse } from "next/server";
import { ACCESS_PASSWORD, SESSION_COOKIE, SESSION_MAX_AGE_SECONDS } from "@/lib/config";
import { createSessionToken } from "@/lib/session";
import { supabaseServer } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: { password?: string; name?: string; email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  const password = (body.password || "").trim();
  const name = (body.name || "").trim();
  const email = (body.email || "").trim();

  if (!name) {
    return NextResponse.json({ ok: false, error: "Enter your name." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Enter a valid email." }, { status: 400 });
  }
  if (password !== ACCESS_PASSWORD) {
    return NextResponse.json({ ok: false, error: "Incorrect password." }, { status: 401 });
  }

  const supabase = supabaseServer();
  const { error } = await supabase.from("amplifi_sprint_access").insert({
    name,
    email,
    user_agent: req.headers.get("user-agent") || null,
  });

  // A logging failure shouldn't block a correctly-passworded visitor from getting in —
  // but it's worth knowing about, so it goes to the function's own logs.
  if (error) {
    console.error("amplifi_sprint_access insert failed:", error.message);
  }

  const token = await createSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: "/",
  });
  return res;
}
