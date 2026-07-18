import type { ReactNode } from "react";
import { TriangleAlert } from "lucide-react";

/**
 * Amber "pending verification" callout.
 *
 * These notices are load-bearing, not decoration. `src/lib/company.ts` keeps
 * award/BBB/OLA/licence claims in `unverifiedClaims` and off the page until
 * evidence exists, and these callouts are the visible trace of that decision.
 * Restyle freely — do not delete the content.
 *
 * Amber sits deliberately outside the ink/teal palette: it is the only place on
 * the site that signals "unresolved", so it should not blend in. Contrast is
 * checked against amber-50 (#fffbeb): amber-900 ~9.6:1, amber-800 ~6.4:1.
 */
export function Callout({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <aside className="mt-8 overflow-hidden rounded-2xl border border-amber-200 bg-amber-50">
      {/* Hairline accent rail — reads as a status marker, not a border. */}
      <div aria-hidden="true" className="h-1 w-full bg-amber-300" />

      <div className="flex gap-4 p-5 sm:gap-5 sm:p-6">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-800"
        >
          <TriangleAlert className="h-5 w-5" strokeWidth={2} />
        </span>

        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-[0.14em] text-amber-800 uppercase">
            {label}
          </p>

          <p className="mt-2 font-semibold text-amber-900">{title}</p>

          <div className="mt-2 space-y-2 text-sm leading-6 text-amber-800">
            {children}
          </div>
        </div>
      </div>
    </aside>
  );
}
