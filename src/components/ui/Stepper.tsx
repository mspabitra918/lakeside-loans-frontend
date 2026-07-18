export const STEPS = [
  {
    title: "Your Loan Request & Personal Profile",
    hint: "Loan details & personal information",
  },
  {
    title: "Funding & Deposit Details",
    hint: "Banking information & verification",
  },
] as const;
import { Check } from "lucide-react";

export function Stepper({ current }: { current: number }) {
  return (
    <ol className="flex items-center gap-3" aria-label="Application progress">
      {STEPS.map((step, index) => {
        const done = index < current;
        const active = index === current;

        return (
          <li key={step.title} className="flex flex-1 items-center gap-3">
            <span
              aria-hidden="true"
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition ${
                done || active
                  ? "bg-ink-900 text-white"
                  : "bg-slate-200 text-slate-600"
              }`}
            >
              {done ? <Check className="h-4 w-4" /> : index + 1}
            </span>

            <span className="min-w-0">
              <span
                className={`block truncate text-sm font-semibold ${
                  active || done ? "text-slate-900" : "text-slate-500"
                }`}
              >
                {step.title}
                {active && <span className="sr-only"> (current step)</span>}
              </span>
              <span className="block truncate text-xs text-slate-500">
                {step.hint}
              </span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}
