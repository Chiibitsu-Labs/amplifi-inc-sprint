"use client";

import { useRef, useState } from "react";

const IDLE = "Copy the start line";
const DONE = "Copied — now paste it into Claude";
const MANUAL = "Select the line above and copy it";

export function CopyButton({ text }: { text: string }) {
  const [label, setLabel] = useState(IDLE);
  const btnRef = useRef<HTMLButtonElement>(null);

  const flash = (next: string) => {
    setLabel(next);
    if (next !== MANUAL) setTimeout(() => setLabel(IDLE), 2600);
  };

  // Legacy path for browsers/contexts without the async clipboard API. The
  // textarea must be torn down and focus handed back even when execCommand
  // throws — otherwise it's left focused off-screen at -9999px, and a keyboard
  // user is stranded away from both the button and the line we just told them
  // to select by hand. One leaks per retry, so the failure compounds.
  const fallback = () => {
    const ta = document.createElement("textarea");
    try {
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.setAttribute("aria-hidden", "true");
      ta.style.position = "absolute";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      flash(document.execCommand("copy") ? DONE : MANUAL);
    } catch {
      flash(MANUAL);
    } finally {
      ta.remove();
      btnRef.current?.focus();
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
      ref={btnRef}
      type="button"
      className={`ob-copy${label === DONE ? " is-done" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
