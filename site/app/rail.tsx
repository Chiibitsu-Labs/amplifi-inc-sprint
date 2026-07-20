"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_OVERVIEW, NAV_DELIVERABLES, NAV_TEAM } from "@/lib/nav";

function NavLink({ href, n, label, soon, active }: { href: string; n: string; label: string; soon?: boolean; active: boolean }) {
  return (
    <Link href={href} className={`nav-item${active ? " active" : ""}`}>
      <span className="n">{n}</span>
      <span>{label}</span>
      {soon && (
        <span
          style={{
            marginLeft: "auto",
            fontFamily: "'Public Sans'",
            fontWeight: 600,
            fontSize: ".58rem",
            letterSpacing: ".06em",
            textTransform: "uppercase",
            color: "var(--rail-faint)",
          }}
        >
          Soon
        </span>
      )}
    </Link>
  );
}

function ThemeToggle() {
  const [mode, setMode] = useState<"auto" | "light" | "dark">("auto");

  useEffect(() => {
    const saved = (localStorage.getItem("amplifi-sprint-theme") as typeof mode) || "auto";
    setMode(saved);
    applyTheme(saved);
  }, []);

  function applyTheme(next: typeof mode) {
    if (next === "auto") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", next);
  }

  function cycle() {
    const order: (typeof mode)[] = ["auto", "light", "dark"];
    const next = order[(order.indexOf(mode) + 1) % order.length];
    setMode(next);
    localStorage.setItem("amplifi-sprint-theme", next);
    applyTheme(next);
  }

  return (
    <button className="theme-toggle" type="button" onClick={cycle}>
      <span aria-hidden="true">&#9673;</span> Theme: {mode.charAt(0).toUpperCase() + mode.slice(1)}
    </button>
  );
}

export function Rail({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <aside className={`rail${open ? " open" : ""}`}>
      <Link href="/" className="brand" onClick={onClose}>
        <Image src="/logos/cl-icon.png" alt="" width={26} height={29} priority />
        <span>
          <span className="brand-word">Chiibitsu Labs</span>
          <span className="brand-sub">AI Incorporation Sprint</span>
        </span>
      </Link>
      <nav className="signals" onClick={onClose}>
        <div className="nav-label">Overview</div>
        <NavLink {...NAV_OVERVIEW} active={pathname === "/"} />
        <div className="nav-label" style={{ marginTop: "1.1rem" }}>
          Deliverables
        </div>
        {NAV_DELIVERABLES.map((item) => (
          <NavLink key={item.href} {...item} active={pathname === item.href} />
        ))}
        <div className="nav-label" style={{ marginTop: "1.1rem" }}>
          Team
        </div>
        <NavLink {...NAV_TEAM} active={pathname === NAV_TEAM.href} />
      </nav>
      <div className="rail-foot">
        <ThemeToggle />
        <div className="rail-credit">
          Prepared for
          <br />
          <strong>Amplifi Technologies Corp</strong>
          <br />
          Michele Curran, COO
        </div>
      </div>
    </aside>
  );
}

export function TopBar({ onToggle }: { onToggle: () => void }) {
  return (
    <div className="topbar">
      <button type="button" onClick={onToggle} aria-label="Open navigation">
        &#9776; Menu
      </button>
      <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
        <Image src="/logos/cl-icon.png" alt="" width={20} height={22} />
        <span className="brand-word" style={{ fontSize: ".92rem", color: "var(--rail-ink)" }}>
          Chiibitsu Labs
        </span>
      </div>
    </div>
  );
}
