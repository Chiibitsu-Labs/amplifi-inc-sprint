"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function AccessForm({ next }: { next: string }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Something went wrong — try again.");
        setSubmitting(false);
        return;
      }
      router.replace(next || "/");
      router.refresh();
    } catch {
      setError("Couldn't reach the server — check your connection and try again.");
      setSubmitting(false);
    }
  }

  return (
    <div className="gate">
      <div className="gate-card">
        <div className="gate-mark">
          <Image src="/logos/cl-icon.png" alt="" width={40} height={44} priority />
        </div>
        <h1>Client confidential</h1>
        <p>
          This is the Amplifi AI Incorporation Sprint record, prepared by Chiibitsu Labs. Enter your
          name, email, and the password shared with your team to continue.
        </p>
        <form className="gate-form" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Your name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Your email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <hr className="gate-divider" />
          <input
            type="password"
            placeholder="Password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={submitting}>
            {submitting ? "Checking…" : "Unlock"}
          </button>
          <p className="gate-error">{error}</p>
        </form>
        <div className="gate-foot">Chiibitsu Labs · more human, by design.</div>
      </div>
    </div>
  );
}
