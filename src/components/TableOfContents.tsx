import { ListTree } from "lucide-react";

export type TocItem = {
  /** Must match the `id` on the corresponding <h2>. */
  id: string;
  label: string;
};

/**
 * Jump list for the long legal pages.
 *
 * Deliberately NOT a sticky rail: PageShell owns the page wrapper and caps the
 * measure at 68ch, so a sticky sidebar would mean breaking out of that wrapper
 * with negative margins. With five sections per page a jump card at the top of
 * the document does the same job without fighting the shell.
 *
 * `html` carries `scroll-padding-top: 6rem` and PageShell's h2s carry
 * `scroll-mt-28`, so anchors clear the sticky navbar.
 *
 * Rendered inside PageShell's prose wrapper — the `[&_a]` defaults supply the
 * teal underline treatment, which is what we want for a list of links.
 */
export function TableOfContents({ items }: { items: readonly TocItem[] }) {
  return (
    <nav
      aria-labelledby="toc-heading"
      className="rounded-2xl border border-line bg-canvas p-5 sm:p-6"
    >
      <p id="toc-heading" className="flex items-center gap-2">
        <ListTree aria-hidden="true" className="h-4 w-4 text-teal-600" />
        <span className="eyebrow">On this page</span>
      </p>

      {/*
        Plain links rather than <ol>: PageShell's `[&_ol]` prose defaults force
        decimal markers and a 6-unit indent, which a two-column grid does not
        want. The nav landmark carries the semantics.
      */}
      <div className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
        {items.map((item, index) => (
          <p key={item.id} className="flex items-baseline gap-3">
            <span
              aria-hidden="true"
              className="num text-xs text-muted"
            >
              {index + 1}
            </span>

            <a href={`#${item.id}`}>{item.label}</a>
          </p>
        ))}
      </div>
    </nav>
  );
}
