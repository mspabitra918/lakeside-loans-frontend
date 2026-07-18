import type { Metadata } from "next";
import { PageShell } from "@/src/components/PageShell";
import { COMPANY, COMPANY_ADDRESS_LINE } from "@/src/lib/company";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description:
    "Lakeside Loans is committed to ensuring digital accessibility for people with disabilities.",
};

export default function AccessibilityPage() {
  return (
    <PageShell title="Accessibility Statement">
      <div className="space-y-10">
        <section className="space-y-4">
          <p className="text-slate-700 leading-7">
            {COMPANY.name} is committed to ensuring digital accessibility for
            people with disabilities. We are continually improving the user
            experience for everyone and applying the relevant accessibility
            standards.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">
            Conformance Status
          </h2>

          <p className="text-slate-700 leading-7">
            The Web Content Accessibility Guidelines (WCAG) define requirements
            for designers and developers to improve accessibility for people
            with disabilities. WCAG defines three levels of conformance:
            <strong> Level A</strong>, <strong>Level AA</strong>, and
            <strong> Level AAA</strong>.
          </p>

          <p className="text-slate-700 leading-7">
            The {COMPANY.name} website strives to conform with
            <strong> WCAG 2.1 Level AA</strong> and continues to improve the
            accessibility of our website for all visitors.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Feedback</h2>

          <p className="text-slate-700 leading-7">
            We welcome your feedback on the accessibility of the {COMPANY.name}{" "}
            website. If you encounter any accessibility barriers, please contact
            us and we will make every reasonable effort to address the issue
            promptly.
          </p>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
            <address className="space-y-3 not-italic text-sm text-slate-700">
              <p>
                <span className="font-semibold text-slate-900">Phone:</span>{" "}
                <a
                  href={COMPANY.phoneHref}
                  className="text-blue-700 hover:underline"
                >
                  {COMPANY.phone}
                </a>
              </p>

              <p>
                <span className="font-semibold text-slate-900">Email:</span>{" "}
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="text-blue-700 hover:underline"
                >
                  {COMPANY.email}
                </a>
              </p>

              <p>
                <span className="font-semibold text-slate-900">
                  Postal Address:
                </span>{" "}
                {COMPANY_ADDRESS_LINE}
              </p>
            </address>
          </div>

          <p className="text-sm text-slate-600">
            We aim to respond to accessibility feedback within two business
            days.
          </p>
        </section>
      </div>
    </PageShell>
  );
}
