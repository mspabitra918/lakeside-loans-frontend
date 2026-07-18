/**
 * Shared shell for long-form / legal pages.
 *
 * `eyebrow` and `intro` are optional — existing callers that pass only
 * `title` + `children` keep working.
 *
 * `width` defaults to the prose measure, which is right for legal copy and
 * wrong for anything laid out in columns: a card grid nested inside a 68ch
 * column gets crushed into a ribbon down the left of the viewport. Pages that
 * render their own layout pass `width="wide"` to opt out of both the measure
 * cap and the prose typography defaults.
 */
export function PageShell({
  eyebrow,
  title,
  intro,
  lastUpdated,
  width = "prose",
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: React.ReactNode;
  lastUpdated?: string;
  width?: "prose" | "wide";
  children: React.ReactNode;
}) {
  return (
    <article>
      {/* Page header — canvas band with a faint navy wash. */}
      <header className="relative overflow-hidden border-b border-line bg-canvas">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 right-[-10%] h-96 w-96 rounded-full bg-radial from-teal-500/[0.07] to-transparent"
        />
        <div className="container-page relative py-14 sm:py-20">
          <div className="max-w-[42rem]">
            {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}

            <h1
              className={`text-4xl font-bold tracking-tight text-balance text-ink-900 sm:text-5xl ${
                eyebrow ? "mt-3" : ""
              }`}
            >
              {title}
            </h1>

            {intro ? (
              <div className="mt-5 max-w-[65ch] text-lg leading-relaxed text-pretty text-body">
                {intro}
              </div>
            ) : null}

            {lastUpdated ? (
              <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium text-muted">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-teal-500"
                />
                Last updated:{" "}
                <span className="num text-ink-900">{lastUpdated}</span>
              </p>
            ) : null}
          </div>
        </div>
      </header>

      {/*
        Prose defaults for legal copy: comfortable measure, clear h2/h3
        hierarchy, generous section spacing.
      */}
      <div className="container-page py-14 sm:py-20">
        {width === "wide" ? (
          children
        ) : (
          <div
            className="
            w-full space-y-6 text-base leading-relaxed text-pretty text-body
            [&_a]:rounded [&_a]:font-medium [&_a]:text-teal-700 [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-ink-900
            [&_h2]:mt-14 [&_h2]:scroll-mt-28 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-ink-900 [&_h2]:first:mt-0
            [&_h3]:mt-10 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-ink-800
            [&_h2+p]:mt-4 [&_h3+p]:mt-3
            [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6
            [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6
            [&_li::marker]:text-teal-600
            [&_strong]:font-semibold [&_strong]:text-ink-900
            [&_dt]:font-semibold [&_dt]:text-ink-900
          "
          >
            {children}
          </div>
        )}
      </div>
    </article>
  );
}
