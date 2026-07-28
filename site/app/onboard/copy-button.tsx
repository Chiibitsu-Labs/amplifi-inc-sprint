"use client";

import { useState } from "react";

const IDLE = "Copy the start line";
const DONE = "Copied — now paste it into Claude";
const MANUAL = "Select the line above and copy it";

export function CopyButton({ text }: { text: string }) {
  const [label, setLabel] = useState(IDLE);

  const flash = (next: string) => {
    setLabel(next);
    if (next !== MANUAL) setTimeout(() => setLabel(IDLE), 2600);
  };

  const fallback = () => {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "absolute";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      flash(ok ? DONE : MANUAL);
    } catch {
      flash(MANUAL);
    }
  };

  const onClick = () => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => flash(DONE), fallback);
    } else {
      fallback();
    }
  };

  return (
    <button
      type="button"
      className={`ob-copy${label === DONE ? " is-done" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
