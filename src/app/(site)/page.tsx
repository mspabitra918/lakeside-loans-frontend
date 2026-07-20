import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  ArrowRight,
  FileText,
  PenLine,
  PhoneCall,
  Search,
  Send,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { COMPANY } from "../../lib/company";
import {
  APR,
  LOAN_TERMS_MONTHS,
  MAX_LOAN_AMOUNT,
  MIN_LOAN_AMOUNT,
  REPRESENTATIVE_EXAMPLE as EX,
  REPRESENTATIVE_EXAMPLES,
  usd,
  usdWhole,
} from "../../lib/loan";

export const metadata: Metadata = {
  title: "Personal Loans up to $25,000",
  description:
    "Personal loans up to $25,000 with a fixed 10.00% APR on approved loans. No origination fees, no prepayment penalties. Check your options in minutes.",
};

/** Advertised rate rendered once, reused everywhere. Never retyped. */
const APR_LABEL = `${(APR * 100).toFixed(2)}%`;

const SHORTEST_TERM = LOAN_TERMS_MONTHS[0];
const LONGEST_TERM = LOAN_TERMS_MONTHS[LOAN_TERMS_MONTHS.length - 1];

const BENEFITS = [
  {
    icon: Wallet,
    title: "Funding after approval",
    body: "Once your loan agreement is signed and your identity and bank details are verified, approved funds are typically deposited within one business day.",
  },
  {
    icon: FileText,
    title: "No origination or prepayment fees",
    body: `Approved loans carry a fixed ${APR_LABEL} APR with no origination fee, no application fee, and no penalty for paying early.`,
  },
  {
    icon: ShieldCheck,
    title: "A range of credit profiles",
    body: "We review more than a credit score alone. Applying does not guarantee approval, and your rate and term are confirmed in writing before you sign.",
  },
];

const STEPS = [
  {
    icon: PenLine,
    title: "Apply online",
    body: "Complete our secure, 2-step application in minutes.",
  },
  {
    icon: Search,
    title: "We review your request",
    body: "Get conditionally pre-approved immediately upon submission.",
  },
  {
    icon: Send,
    title: "Get funded",
    body: "Finalize your agreement over the phone and receive your money within 24 hours.",
  },
];

/**
 * The eight TILA rows. `mono` marks the cells that carry a figure and so take
 * the tabular-numeral treatment; "None" is prose and stays in the sans face.
 */
const TILA_ROWS: { label: string; value: ReactNode; mono: boolean }[] = [
  { label: "Amount financed", value: usd.format(EX.principal), mono: true },
  {
    label: "Annual Percentage Rate (APR)",
    value: (
      <>
        {APR_LABEL}
        <span className="ml-1.5 font-sans text-sm font-medium tracking-normal text-muted">
          fixed
        </span>
      </>
    ),
    mono: true,
  },
  {
    label: "Term",
    value: (
      <>
        {EX.termMonths}
        <span className="ml-1.5 font-sans text-sm font-medium tracking-normal text-muted">
          months
        </span>
      </>
    ),
    mono: true,
  },
  {
    label: "Monthly payment",
    value: usd.format(EX.monthlyPayment),
    mono: true,
  },
  { label: "Finance charge", value: usd.format(EX.financeCharge), mono: true },
  { label: "Total of payments", value: usd.format(EX.totalRepaid), mono: true },
  { label: "Origination fee", value: usd.format(0), mono: true },
  { label: "Prepayment penalty", value: "None", mono: false },
];

/**
 * Decorative "lakeside ripple" — concentric arcs that bleed off the edge of a
 * band. Kept under 6% opacity: atmosphere, not pattern.
 */
function Ripple({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.25">
        {[40, 80, 120, 160, 200, 240, 280].map((r) => (
          <circle key={r} cx="200" cy="200" r={r} />
        ))}
      </g>
    </svg>
  );
}

export default function Home() {
  return (
    <>
      {/* ---------------------------------------------------------------
          Hero — headline on the left, the rate itself set large on the
          right. Leading with the APR rather than burying it is the point.
          --------------------------------------------------------------- */}
      <section className="relative isolate overflow-hidden border-b border-line bg-linear-to-b from-canvas to-white">
        <Ripple className="pointer-events-none absolute -top-24 -right-40 h-[36rem] w-[36rem] text-ink-900 opacity-[0.055] sm:-right-24" />

        <div className="container-page section-y relative">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div>
              <p className="eyebrow">Personal loans</p>

              <h1 className="mt-4 text-5xl leading-[1.05] font-bold tracking-tight text-balance sm:text-6xl">
                Borrow up to{" "}
                <span className="num text-teal-700">
                  {usdWhole.format(MAX_LOAN_AMOUNT)}
                </span>{" "}
                with the cost in plain sight.
              </h1>

              <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-pretty text-body">
                A fixed <span className="num">{APR_LABEL}</span> APR on approved
                loans, with no origination fees and no prepayment penalties. See
                what you qualify for without a long application.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/apply"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-ink-900 px-7 py-3.5 text-base font-semibold text-white shadow-card transition-[background-color,transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:bg-ink-800 hover:shadow-card-lift"
                >
                  Start your application
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>

                <a
                  href={COMPANY.phoneHref}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-white px-7 py-3.5 text-base font-semibold text-ink-900 transition-[border-color,transform] duration-150 hover:-translate-y-0.5 hover:border-ink-900"
                >
                  <PhoneCall
                    className="h-4 w-4 text-teal-600"
                    aria-hidden="true"
                  />
                  <span className="num">{COMPANY.phone}</span>
                </a>
              </div>

              <p className="mt-7 max-w-[52ch] text-sm leading-relaxed text-muted">
                Checking your options does not obligate you to accept a loan.
                Approval is subject to underwriting.
              </p>
            </div>

            {/* Rate card — the disclosure as the hero image. */}
            <div className="rounded-2xl border border-line bg-white p-7 shadow-card sm:p-9">
              <p className="eyebrow">Fixed rate</p>

              <p className="mt-4 flex items-baseline gap-1.5">
                <span className="num text-6xl leading-none font-bold text-ink-900 sm:text-7xl">
                  {APR_LABEL}
                </span>
                <span className="text-lg font-semibold text-muted">APR</span>
              </p>

              <p className="mt-3 text-sm leading-relaxed text-muted">
                On approved loans. Not a range, not a teaser rate, and not
                dependent on autopay enrollment.
              </p>

              <dl className="mt-7 divide-y divide-line border-t border-line">
                {[
                  {
                    term: "Loan amounts",
                    value: `${usdWhole.format(MIN_LOAN_AMOUNT)} – ${usdWhole.format(MAX_LOAN_AMOUNT)}`,
                  },
                  {
                    term: "Repayment terms",
                    value: `${SHORTEST_TERM} – ${LONGEST_TERM} months`,
                  },
                  { term: "Origination fee", value: usd.format(0) },
                  { term: "Prepayment penalty", value: "None" },
                ].map(({ term, value }) => (
                  <div
                    key={term}
                    className="flex items-baseline justify-between gap-4 py-3.5"
                  >
                    <dt className="text-sm text-body">{term}</dt>
                    <dd className="num text-sm font-semibold text-ink-900">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------
          Benefits — a hairline-divided row rather than three boxed cards.
          --------------------------------------------------------------- */}
      <section className="bg-canvas">
        <div className="container-page section-y">
          <p className="eyebrow">Why Lakeside</p>

          <h2 className="mt-4 max-w-[20ch] text-3xl font-bold tracking-tight sm:text-4xl">
            Borrowing made simple and transparent
          </h2>

          <p className="mt-5 max-w-[65ch] text-base leading-relaxed text-pretty text-body">
            Whether you are consolidating debt or covering an unexpected
            expense, we aim to make the terms clear before you commit to
            anything.
          </p>

          <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
            {BENEFITS.map(({ icon: Icon, title, body }) => (
              <li key={title} className="bg-white p-7 sm:p-8">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-canvas ring-1 ring-line">
                  <Icon
                    className="h-5.5 w-5.5 text-teal-600"
                    aria-hidden="true"
                  />
                </span>

                <h3 className="mt-5 text-lg font-semibold">{title}</h3>

                <p className="mt-2.5 text-sm leading-relaxed text-pretty text-body">
                  {body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------------------
          How it works — numbered nodes threaded on a single hairline.
          --------------------------------------------------------------- */}
      <section className="border-y border-line bg-white">
        <div className="container-page section-y">
          <p className="eyebrow">How it works</p>

          <h2 className="mt-4 max-w-[24ch] text-3xl font-bold tracking-tight sm:text-4xl">
            Three steps, and nothing binding until you sign
          </h2>

          <ol className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {/* The thread connecting the three nodes. Decorative. */}
            <span
              aria-hidden="true"
              className="absolute top-6 left-[16.667%] hidden h-px w-[66.667%] bg-linear-to-r from-teal-500/0 via-teal-500 to-teal-500/0 md:block"
            />

            {STEPS.map(({ icon: Icon, title, body }, i) => (
              <li key={title} className="relative md:text-center">
                <div className="flex items-center gap-4 md:flex-col md:gap-0">
                  <span className="relative z-10 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink-900 ring-8 ring-white">
                    <Icon
                      className="h-5 w-5 text-teal-300"
                      aria-hidden="true"
                    />
                  </span>

                  <p className="num text-xs font-semibold tracking-[0.14em] text-teal-700 uppercase md:mt-5">
                    Step {i + 1}
                  </p>
                </div>

                <h3 className="mt-4 text-lg font-semibold">{title}</h3>

                <p className="mx-auto mt-2.5 max-w-[38ch] text-sm leading-relaxed text-pretty text-body">
                  {body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------------------------------------------------------
          Pricing — the TILA representative example in full, plus the
          spanning comparison so the ceiling isn't read as proportional.
          --------------------------------------------------------------- */}
      <section className="bg-canvas">
        <div className="container-page section-y">
          <p className="eyebrow">Transparent pricing</p>

          <h2 className="mt-4 max-w-[22ch] text-3xl font-bold tracking-tight sm:text-4xl">
            What a loan actually costs
          </h2>

          <p className="mt-5 max-w-[65ch] text-base leading-relaxed text-pretty text-body">
            Representative example. Your own amount, term, and payment are
            confirmed in your loan agreement before you sign.
          </p>

          <div className="mt-12 lg:gap-10 ">
            {/* Spanning comparison */}
            <div className="flex flex-col gap-6 overflow-auto max-w-ful ">
              <div className="rounded-2xl border border-line bg-white shadow-card ">
                <div className="border-b border-line px-6 py-5 sm:px-7">
                  <h3 className="text-lg font-semibold">
                    The same rate across the range
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    A larger loan or a longer term costs more in total interest,
                    even at an identical{" "}
                    <span className="num">{APR_LABEL}</span> APR.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-[950px] w-full border-collapse text-left text-sm">
                    <caption className="sr-only">
                      Monthly payment, total of payments, and finance charge for
                      four representative loans at a fixed {APR_LABEL} APR
                    </caption>

                    <thead>
                      <tr className="border-b border-line bg-canvas">
                        <th
                          scope="col"
                          className="px-5 py-3 text-xs font-semibold tracking-wide text-muted uppercase sm:px-7"
                        >
                          Loan Amount
                        </th>
                        <th
                          scope="col"
                          className="px-5 py-3 text-center text-xs font-semibold tracking-wide text-muted uppercase"
                        >
                          APR
                        </th>
                        <th
                          scope="col"
                          className="px-5 py-3 text-center text-xs font-semibold tracking-wide text-muted uppercase sm:px-7"
                        >
                          Loan Term
                        </th>
                        <th
                          scope="col"
                          className="px-5 py-3 text-center text-xs font-semibold tracking-wide text-muted uppercase sm:px-7"
                        >
                          Monthly Payment{" "}
                        </th>
                        <th
                          scope="col"
                          className="px-5 py-3 text-center text-xs font-semibold tracking-wide text-muted uppercase sm:px-7"
                        >
                          Total Amount Paid
                        </th>
                        <th
                          scope="col"
                          className="px-5 py-3 text-center text-xs font-semibold tracking-wide text-muted uppercase sm:px-7"
                        >
                          Upfront Fees
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {REPRESENTATIVE_EXAMPLES.map((ex) => (
                        <tr
                          key={`${ex.principal}-${ex.termMonths}`}
                          className="border-t border-line first:border-t-0"
                        >
                          <th
                            scope="row"
                            className="px-5 py-4 font-medium whitespace-nowrap text-ink-900 sm:px-7"
                          >
                            <span className="num">
                              {usdWhole.format(ex.principal)}
                            </span>
                            {/* <span className="text-muted"> · </span>
                            <span className="num font-normal text-muted">
                              {ex.termMonths} mo
                            </span> */}
                          </th>
                          <td className="num px-5 py-4 text-center font-semibold whitespace-nowrap text-ink-900">
                            {APR_LABEL} fixed
                          </td>
                          <td className="num px-5 py-4 text-center font-semibold whitespace-nowrap text-ink-900">
                            <span className="num font-normal text-muted">
                              {ex.termMonths} mo
                            </span>{" "}
                          </td>
                          <td className="num px-5 py-4 text-center font-semibold whitespace-nowrap text-ink-900">
                            {usd.format(ex.monthlyPayment)}
                          </td>

                          <td className="num px-5 py-4 text-center whitespace-nowrap text-body sm:px-7">
                            {usd.format(ex.totalRepaid)}
                          </td>
                          <td className="num px-5 py-4 text-center whitespace-nowrap text-body sm:px-7">
                            {usd.format(0)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <p className="max-w-[65ch] text-sm leading-relaxed text-pretty text-muted">
                Based on a {usd.format(EX.principal)} loan repaid over{" "}
                {EX.termMonths} months at a fixed {APR_LABEL} APR with no fees.
                Totals assume every payment is made on time. Amounts from{" "}
                {usdWhole.format(MIN_LOAN_AMOUNT)} to{" "}
                {usdWhole.format(MAX_LOAN_AMOUNT)} and terms from{" "}
                {SHORTEST_TERM} to {LONGEST_TERM} months are available on
                approved loans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------
          Closing CTA
          --------------------------------------------------------------- */}
      <section className="relative isolate overflow-hidden bg-ink-900">
        {/* <Ripple className="pointer-events-none absolute -bottom-56 -left-32 h-[34rem] w-[34rem] text-white opacity-[0.06]" /> */}

        <div className="container-page relative py-20 sm:py-24">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div>
              {/*
                Hand-rolled rather than the `eyebrow` utility: on navy the
                label needs teal-300, and layering a color utility over a
                custom utility that also sets `color` is order-dependent.
              */}
              <p className="text-xs font-semibold tracking-[0.14em] text-teal-300 uppercase">
                Ready when you are
              </p>

              <h2 className="mt-4 max-w-[18ch] text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl">
                Ready to see your options?
              </h2>

              <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-pretty text-ink-100">
                The application takes a few minutes. You are not committed to
                anything until you sign a loan agreement.
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/apply"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-base font-semibold text-ink-900 transition-transform duration-150 hover:-translate-y-0.5"
              >
                Start your application
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>

              <a
                href={COMPANY.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 px-7 py-3.5 text-base font-semibold text-white transition-colors duration-150 hover:border-white/60"
              >
                <PhoneCall
                  className="h-4 w-4 text-teal-300"
                  aria-hidden="true"
                />
                <span className="num">{COMPANY.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
