# PDF Design Standard — Chiibitsu Labs

How every deliverable PDF this stack exports should look and be built, regardless of
which brand palette is in play. Written after getting `amplifi-01`–`05` to render
edge-to-edge, colored, correctly margined — Chromium's print engine has three
undocumented quirks that will quietly break any of that if you don't know to work
around them. This doc is the "no matter what color the bg is" spec Chii asked for:
apply it token-driven, and a future rebrand (new `--paper`/`--ink`) carries through
automatically.

## The rule

**Every PDF page is colored edge-to-edge, top to bottom, left to right — never a white
margin showing through, never the header/footer painted a different shade than the
body.** The background is whatever `--paper` currently resolves to (`#F5EEDC` for
Chiibitsu Labs' cream); the point of the rule isn't the specific hex, it's that there is
exactly one background color per page and it reaches every edge.

Content gets real breathing room from that edge — margins exist to separate the reader
from the paper edge, not to expose a second color underneath.

## Why this is harder than `printBackground: true`

Chromium's headless PDF export (what Playwright's `page.pdf()` drives) has three
behaviors that aren't documented anywhere obvious, discovered by testing solid
red/blue rectangles at known sizes and pixel-sampling the output with PyMuPDF (`fitz`)
until the actual behavior matched the model below:

1. **`printBackground: true` only colors the page's own background — not the
   header/footer template's.** `headerTemplate`/`footerTemplate` render in their own
   isolated print context, and `background-color` inside them is silently dropped
   unless that context is separately told to keep it.
2. **Header/footer templates don't clip to the margin box you reserved for them.**
   They start painting from a fixed **~0.53cm inset off the true physical page edge**
   and grow toward the body content — freely, with no automatic clipping — so a
   template sized to fill its whole margin will overflow into real content instead of
   stopping at the boundary you gave it in `margin.top`/`margin.bottom`.
3. **`margin.left`/`margin.right` in `page.pdf()` create real whitespace no CSS
   inside the page can paint over.** Unlike top/bottom, though, left/right margins
   don't have a multi-page continuation problem, so there's a much simpler fix
   available for them than for top/bottom (below).

## The fix, piece by piece

### 1. Force color inside the header/footer template

Add print-color-adjust *inside the template's own inline style* — the page-level
`printBackground` option doesn't reach in here:

```js
const colorAdjust = `-webkit-print-color-adjust: exact; print-color-adjust: exact;`;
const headerTemplate = `
  <div style="${colorAdjust} background: var(--paper, #F5EEDC); ...">…</div>`;
```

(Header/footer templates can't see your app's CSS custom properties — hardcode the
resolved hex that matches whatever `--paper` currently is, and update it here if the
palette ever changes.)

### 2. Push the header/footer past the fixed inset with a negative margin

To get genuine edge-to-edge color *and* land the visible content exactly where you
want it, combine a negative margin on the edge-facing side with a height equal to the
real `margin.top`/`margin.bottom` you reserved:

```js
const headerTemplate = `
  <div style="${colorAdjust}
    width: 100%; height: 2.6cm; box-sizing: border-box;
    background: #F5EEDC;
    margin: -0.53cm 0 0;           /* cancels the fixed inset */
    padding: 1.13cm 1.4cm 0;       /* pushes the real content down from the true edge */
    font-size: 8px; color: #8C7F66;">
    …
  </div>`;
```

Same pattern mirrored for the footer (`margin: 0 0 -0.53cm`, `padding: 0 1.4cm 1.13cm`).
The `-0.53cm` figure is a Chromium constant, not a token — if a future Chromium version
changes it, re-derive it empirically (see **Verifying it worked** below) rather than
assuming it still holds.

This is what buys the "margin after the header/footer before the content, so it
doesn't feel cramped" breathing room Chii asked for: the padding value (not the
height) is what actually separates the rule/text from the true edge, so tune *that*
for more or less air, not the height.

### 3. Left/right margins: skip the template trick, use CSS padding instead

Left/right margins don't carry the multi-page continuation problem top/bottom do, so
don't bother with the negative-margin dance for them. Just zero them at the
`page.pdf()` level and move the equivalent spacing into the page's own CSS padding —
the body background then reaches the true left/right edges automatically, no header
template involved:

```js
await page.pdf({
  margin: { top: '2.6cm', bottom: '2.4cm', left: '0', right: '0' },
  // ...
});
```
```css
.page.doc { padding: 0 1.4cm; box-sizing: border-box; }
```

## Print-specific pagination CSS

Two more rules matter for anything longer than a page or two, learned from a real
PDF ending on an otherwise-blank final page:

- **Let tables paginate normally.** `break-inside: avoid` on a whole table container
  (rather than on individual rows) means a table too tall for the remaining page space
  gets shoved *entirely* onto the next page, leaving a large blank gap behind it. Set
  `break-inside: avoid` on `tr`, not on the table's wrapper, and let `thead` repeat
  (`display: table-header-group`) across the break instead.
- **Keep closing/attribution blocks tight and `break-inside: avoid`.** A short trailing
  block (brand line, attribution) is small enough that it should always ride along with
  whatever content precedes it — give it its own `break-inside: avoid` so it can't get
  orphaned onto a page by itself.

## Token-driven, not hardcoded

Everything above keys off `--paper`/`--ink`/`--ink-soft`/`--line` in
`app/globals.css`. A future rebrand only needs two things to stay correct:

1. Update the CSS custom properties (already the single source of truth for the live
   site).
2. Update the hardcoded hex fallbacks inside `headerTemplate`/`footerTemplate` in the
   PDF-generation script to match — that's the one place color can't be read from a
   CSS variable, because Chromium's header/footer template is its own isolated
   document with no access to the parent page's stylesheet.

Nothing else in this standard is color-specific. The inset trick, the margin/padding
split, and the pagination rules hold regardless of what `--paper` resolves to.

## Verifying it worked

Don't eyeball a PDF and call it done — sample it. This is the check that actually
catches the failure modes above:

1. Open the PDF with PyMuPDF (`fitz`) and sample pixel color at the true edges (x=0,
   y=0, and the opposite corners) on every page — any pixel that isn't `--paper`'s hex
   means a gap got through.
2. Walk a horizontal and vertical line of pixels near each edge, not just the corner —
   a header/footer that's *almost* right can leave a thin sliver of white that a single
   corner sample misses.
3. Extract text per page (`page.get_text()`) and confirm no page is 100% header/footer
   furniture — a page whose only content is the running head, the page-number, and the
   attribution line is the empty-page-6 failure mode; it means something upstream
   didn't paginate cleanly.
4. Re-run the sweep after *any* change to margins, fonts, or content length — the
   inset/negative-margin numbers are exact enough that small changes elsewhere can
   reopen a gap that was previously closed.

---

*Chiibitsu Labs ~ more human, by design.*
