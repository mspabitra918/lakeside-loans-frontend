// export const STEPS = [
//   {
//     title: "Your Loan Request & Personal Profile",
//     hint: "Loan details & personal information",
//   },
//   {
//     title: "Funding & Deposit Details",
//     hint: "Banking information & verification",
//   },
// ] as const;
// import { Check } from "lucide-react";

// export function Stepper({ current }: { current: number }) {
//   return (
//     <ol className="flex items-center gap-3" aria-label="Application progress">
//       {STEPS.map((step, index) => {
//         const done = index < current;
//         const active = index === current;

//         return (
//           <li key={step.title} className="flex flex-1 items-center gap-3">
//             <span
//               aria-hidden="true"
//               className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition ${
//                 done || active
//                   ? "bg-ink-900 text-white"
//                   : "bg-slate-200 text-slate-600"
//               }`}
//             >
//               {done ? <Check className="h-4 w-4" /> : index + 1}
//             </span>

//             <span className="min-w-0">
//               <span
//                 className={`hidden md:block truncate text-sm font-semibold ${
//                   active || done ? "text-slate-900" : "text-slate-500"
//                 }`}
//               >
//                 {step.title}
//                 {active && <span className="sr-only"> (current step)</span>}
//               </span>
//               <span className="hidden md:block truncate text-xs text-slate-500">
//                 {step.hint}
//               </span>
//             </span>
//           </li>
//         );
//       })}
//     </ol>
//   );
// }

import { Check } from "lucide-react";

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

type StepperProps = {
  current: number;
};

export function Stepper({ current }: StepperProps) {
  return (
    <>
      {/* Mobile */}
      <div className="md:hidden">
        <ol className="flex items-center" aria-label="Application progress">
          {STEPS.map((_, index) => {
            const done = index < current;
            const active = index === current;

            return (
              <li
                key={index}
                className={`flex items-center ${
                  index === STEPS.length - 1 ? "" : "flex-1"
                }`}
              >
                {/* Circle */}
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-semibold transition-colors
                    ${
                      done
                        ? "bg-ink-900 text-white"
                        : active
                          ? "bg-ink-900 text-white"
                          : "bg-blue-100 text-blue-700"
                    }`}
                >
                  {done ? <Check className="h-5 w-5" /> : index + 1}
                </span>

                {/* Line */}
                {index !== STEPS.length - 1 && (
                  <div
                    className={`mx-2 h-1 flex-1 rounded-full
                      ${done ? "bg-amber-400" : "bg-blue-100"}`}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>

      {/* Desktop */}
      <div className="hidden md:block">
        <ol
          className="flex items-start gap-6"
          aria-label="Application progress"
        >
          {STEPS.map((step, index) => {
            const done = index < current;
            const active = index === current;

            return (
              <li key={step.title} className="flex flex-1 items-start gap-3">
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors
                    ${
                      done || active
                        ? "bg-slate-900 text-white"
                        : "bg-slate-200 text-slate-600"
                    }`}
                >
                  {done ? <Check className="h-5 w-5" /> : index + 1}
                </span>

                <div className="min-w-0">
                  <p
                    className={`font-semibold ${
                      done || active ? "text-slate-900" : "text-slate-500"
                    }`}
                  >
                    {step.title}
                    {active && <span className="sr-only"> (current step)</span>}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">{step.hint}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
}
