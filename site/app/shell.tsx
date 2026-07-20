"use client";

import { useState } from "react";
import { Rail, TopBar } from "./rail";

export function Shell({ children }: { children: React.ReactNode }) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <>
      <TopBar onToggle={() => setNavOpen((v) => !v)} />
      <div className="shell">
        <Rail open={navOpen} onClose={() => setNavOpen(false)} />
        <main className="main">
          <div className="page doc">{children}</div>
        </main>
      </div>
    </>
  );
}
