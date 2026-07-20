import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/src/components/PageShell";
import { ContactCard } from "@/src/components/ContactCard";
import { COMPANY } from "@/src/lib/company";
import {
  APR,
  MAX_LOAN_AMOUNT,
  MIN_LOAN_AMOUNT,
  usdWhole,
} from "@/src/lib/loan";
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
          At Lakeside Loans, we believe that accessing personal funding should
          be transparent, fast, and fair. Headquartered in Laguna Beach,
          California, we have built a reputation as a trusted financial partner
          for consumers nationwide.
        </p>
      }
    >
      <p>
        {COMPANY.name} is based in Laguna Beach, California. We offer fixed-rate
        personal loans from {usdWhole.format(MIN_LOAN_AMOUNT)} to{" "}
        {usdWhole.format(MAX_LOAN_AMOUNT)} at a fixed {(APR * 100).toFixed(2)}%
        APR on approved applications, and we aim to treat every applicant with
        honesty and respect.
      </p>

      <h2>Our mission</h2>

      <p>
        Provide straightforward personal loans without the hidden fees and
        predatory rates that clutter the financial industry. We offer a fixed
        10% APR to all our approved borrowers, ensuring you always know exactly
        what you owe.
      </p>

      <h2>Award-Winning Service</h2>

      {/* <ol>
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
      </ol> */}

      <p>
        We are incredibly proud to have been awarded as one of the{" "}
        <strong>&quot; Top 10 Lenders in California. &quot;</strong> We are also
        a Better Business Bureau (BBB) Verified Lender and an active member of
        the Online Lenders Alliance (OLA), demonstrating our commitment to best
        practices and consumer protection in online lending.
      </p>

      <p>
        <Link href={ROUTES.apply.href}>Start an application</Link> when you are
        ready, or review our{" "}
        <Link href={ROUTES.licenses.href}>state licensing information</Link>{" "}
        first.
      </p>

      <h2>Contact our team</h2>

      <ContactCard />
    </PageShell>
  );
}
