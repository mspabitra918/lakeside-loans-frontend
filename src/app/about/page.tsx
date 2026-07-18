import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/src/components/PageShell";
import { ContactCard } from "@/src/components/ContactCard";
import { COMPANY } from "@/src/lib/company";
import { APR, MAX_LOAN_AMOUNT, MIN_LOAN_AMOUNT, usdWhole } from "@/src/lib/loan";
import { ROUTES } from "@/src/lib/navigation";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn more about Lakeside Loans and our commitment to transparent, responsible lending.",
};

/**
 * Styling note: PageShell's prose wrapper already sets the h2 / p / a / li
 * treatment. This page used to restate all of it in `slate-*` and `blue-*`,
 * which is off-palette (the site runs on ink / teal / body / muted) and fought
 * the shell. Markup here stays semantic and lets the shell style it.
 */
export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About"
      title="About Lakeside Loans"
      intro={
        <p>
          We believe accessing personal funding should be transparent, fast, and
          fair — with the cost of borrowing stated plainly before you sign.
        </p>
      }
    >
      <p>
        {COMPANY.name} is based in Laguna Beach, California. We offer fixed-rate
        personal loans from {usdWhole.format(MIN_LOAN_AMOUNT)} to{" "}
        {usdWhole.format(MAX_LOAN_AMOUNT)} at a fixed{" "}
        {(APR * 100).toFixed(2)}% APR on approved applications, and we aim to
        treat every applicant with honesty and respect.
      </p>

      <h2>Our mission</h2>

      <p>
        Provide straightforward personal loans without hidden fees or
        unnecessary complexity. We aim to help qualified borrowers access
        financing with transparent terms and responsive customer support
        throughout the application process.
      </p>

      <h2>How applying works</h2>

      <ol>
        <li>
          <strong>Tell us what you need.</strong> Choose your amount, term, and
          what the loan is for.
        </li>
        <li>
          <strong>Tell us how to reach you.</strong> Provide your name, contact
          details, and address.
        </li>
        <li>
          <strong>We review your application.</strong> Approval depends on
          verification of your identity and income and on standard underwriting
          criteria.
        </li>
      </ol>

      <p>
        Applying may result in a hard inquiry on your credit report, which could
        affect your credit score. Submitting an application does not guarantee
        approval and does not obligate you to accept a loan. If approved, your
        specific rate, term, and monthly payment are disclosed in your loan
        agreement before you sign.
      </p>

      <p>
        <Link href={ROUTES.apply.href}>Start an application</Link> when you are
        ready, or review our{" "}
        <Link href={ROUTES.licenses.href}>state licensing information</Link>{" "}
        first.
      </p>

      <h2>Contact our team</h2>

      <ContactCard note="Please do not send account numbers, your Social Security number, or other sensitive information by email." />
    </PageShell>
  );
}
