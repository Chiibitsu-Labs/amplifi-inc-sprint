"use client";

import { useRef, useState } from "react";

const IDLE = "Copy the start line";
const DONE = "Copied — now paste it into Claude";
const MANUAL = "Couldn't copy — the line above is selected, press Ctrl+C (⌘C)";

export function StartLine({ text }: { text: string }) {
  const [label, setLabel] = useState(IDLE);
  const btnRef = useRef<HTMLButtonElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  // Puts the caret across the whole line so a keyboard user can copy it with
  // Ctrl+C. The line is a focusable div rather than a plain block precisely so
  // this is reachable by Tab — without it, "select the line above" is an
  // instruction a keyboard-only or screen-reader user cannot carry out.
  const selectLine = () => {
    const node = lineRef.current;
    const sel = window.getSelection();
    if (!node || !sel) return;
    const range = document.createRange();
    range.selectNodeContents(node);
    sel.removeAllRanges();
    sel.addRange(range);
  };

  const flash = (next: string) => {
    setLabel(next);
    if (next !== MANUAL) setTimeout(() => setLabel(IDLE), 2600);
  };

  // Both clipboard paths failed. Hand the reader something they can act on
  // rather than a dead end: select the line for them and move focus onto it,
  // so the very next keystroke copies.
  const manual = () => {
    flash(MANUAL);
    lineRef.current?.focus();
    selectLine();
  };

  // Legacy path for browsers/contexts without the async clipboard API. The
  // textarea must be torn down even when execCommand throws — otherwise it's
  // left focused off-screen at -9999px and the reader is stranded. One leaks
  // per retry, so the failure compounds.
  const fallback = () => {
    const ta = document.createElement("textarea");
    let copied = false;
    try {
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.setAttribute("aria-hidden", "true");
      ta.style.position = "absolute";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      copied = document.execCommand("copy");
    } catch {
      copied = false;
    } finally {
      ta.remove();
    }
    if (copied) {
      flash(DONE);
      btnRef.current?.focus();
    } else {
      manual();
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
    <>
      <div
        ref={lineRef}
        className="ob-cmd"
        tabIndex={0}
        onFocus={selectLine}
        onClick={selectLine}
      >
        {text}
      </div>
      <button
        ref={btnRef}
        type="button"
        className={`ob-copy${label === DONE ? " is-done" : ""}`}
        onClick={onClick}
      >
        {label}
      </button>
      <p className="ob-cmd-hint">
        Prefer the keyboard? Tab to the line above — it selects itself — then
        Ctrl+C (⌘C on a Mac).
      </p>
    </>
  );
}
