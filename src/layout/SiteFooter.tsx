import Link from "next/link";
import { Lock } from "lucide-react";
import { COMPANY, COMPANY_ADDRESS_LINE } from "@/src/lib/company";
import { FOOTER_COMPANY_LINKS, FOOTER_LEGAL_LINKS } from "@/src/lib/navigation";

/**
 * Headings and links previously shared `text-teal-300`, so a column heading was
 * indistinguishable from the links beneath it and the whole footer read as one
 * flat block. Headings now carry the accent; links sit back in body grey and
 * pick the accent up only on hover.
 */
const linkClass =
  "rounded text-[0.9375rem] text-ink-100/85 transition-colors duration-150 hover:text-teal-300 hover:underline underline-offset-4";

const headingClass =
  "text-xs font-bold uppercase tracking-[0.16em] text-teal-300";

/** Contact details sit inside running text, so they need to out-weight it. */
const contactLinkClass =
  "rounded font-medium text-white transition-colors duration-150 hover:text-teal-300 hover:underline underline-offset-4";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-ink-900 text-ink-100">
      {/* Hairline ripple: decorative, echoes the navbar mark. */}
      <div
        aria-hidden="true"
        className="h-px w-full bg-linear-to-r from-transparent via-teal-500 to-transparent opacity-50"
      />

      <div className="container-page py-16">
        <div className="grid gap-10 md:grid-cols-3 lg:gap-16">
          {/* Company */}
          <div className="md:col-span-1">
            <h2 className="text-lg font-bold tracking-tight text-white">
              {COMPANY.name}
            </h2>

            <address className="mt-4 space-y-2.5 text-sm not-italic leading-relaxed text-ink-100/75">
              <p>{COMPANY_ADDRESS_LINE}</p>

              <p>
                Phone:{" "}
                <a
                  href={COMPANY.phoneHref}
                  className={`${contactLinkClass} num`}
                >
                  {COMPANY.phone}
                </a>
              </p>

              <p>
                Email:{" "}
                <a
                  href={`mailto:${COMPANY.email}`}
                  className={contactLinkClass}
                >
                  {COMPANY.email}
                </a>
              </p>
            </address>
          </div>

          {/* Company links */}
          <nav aria-labelledby="footer-company">
            <h3 id="footer-company" className={headingClass}>
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {FOOTER_COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal links */}
          <nav aria-labelledby="footer-legal">
            <h3 id="footer-legal" className={headingClass}>
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              {FOOTER_LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Legal disclosures — content is load-bearing, do not trim. */}
        <div className="mt-14 space-y-4 border-t border-white/10 pt-8 text-xs leading-6 text-ink-100/80 md:max-w-full">
          <p>
            Lakeside Loans offers personal loans up to $25,000 with a fixed
            Annual Percentage Rate (APR) of 10.00%. Lakeside Loans charges zero
            upfront fees, zero origination fees, and zero prepayment penalties.
            Approval is subject to verification of identity, income, and
            standard underwriting criteria. All credit profiles are welcome to
            apply. Funds are typically deposited within 24 hours of final
            approval. If you are approved for a loan, your specific term and
            monthly payment will be clearly outlined in your loan agreement
            prior to signing.
          </p>

          <p>
            California Residents: Loans made or arranged pursuant to a
            California Financing Law license. Loan products, terms, and maximum
            loan amounts may vary by state. Our services may not be available in
            all states due to specific regulatory requirements. Applying for a
            loan may result in a hard inquiry on your credit report, which could
            impact your credit score.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-ink-100/70 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>

          <p className="flex items-center gap-2">
            <Lock className="h-3.5 w-3.5 text-teal-300" aria-hidden="true" />
            Secure Application • SSL Encrypted
          </p>
        </div>
      </div>
    </footer>
  );
}
