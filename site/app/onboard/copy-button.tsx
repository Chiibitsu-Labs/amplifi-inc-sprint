"use client";

import { useRef, useState } from "react";

const IDLE = "Copy the start line";
const DONE = "Copied — now paste it into Claude";
const MANUAL = "Couldn't copy — the line above is selected, press Ctrl+C (⌘C)";

export function StartLine({ text }: { text: string }) {
  const [label, setLabel] = useState(IDLE);
  const [status, setStatus] = useState("");
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

  const succeed = () => {
    flash(DONE);
    setStatus("Copied. Paste it into Claude.");
  };

  // Both clipboard paths failed. Hand the reader something they can act on
  // rather than a dead end: select the line for them and move focus onto it,
  // so the very next keystroke copies.
  //
  // The button's own label can't carry this news to a screen reader — focus
  // leaves the button in the same tick the label changes, so it's never
  // announced. The live region below is what actually speaks, and it has to
  // be written AFTER the focus move or the announcement is cut off by it.
  const manual = () => {
    flash(MANUAL);
    lineRef.current?.focus();
    selectLine();
    setStatus(
      "Couldn't copy automatically. The start line is now selected — press Control C, or Command C on a Mac, to copy it.",
    );
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
      succeed();
      btnRef.current?.focus();
    } else {
      manual();
    }
  };

  const onClick = () => {
    setStatus("");
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(succeed, fallback);
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
      {/* assertive, not polite: on the failure path the reader has just been
          moved to the line and needs to know why before they do anything else.
          Visually hidden — sighted readers already have the button label. */}
      <p role="status" aria-live="assertive" className="ob-sr">
        {status}
      </p>
    </>
  );
}
