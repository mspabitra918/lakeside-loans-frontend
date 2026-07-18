import type { Metadata } from "next";
import { PageShell } from "@/src/components/PageShell";
import { COMPANY } from "@/src/lib/company";

export const metadata: Metadata = {
  title: "State Licenses",
  description: "State licensing and lending disclosures for Lakeside Loans.",
};

export default function LicensesPage() {
  return (
    <PageShell title="State Licensing and Disclosures">
      <div className="space-y-10">
        <section className="space-y-4">
          <p className="leading-7 text-slate-700">
            {COMPANY.name} operates in compliance with applicable federal and
            state lending regulations. Loan availability, maximum loan amounts,
            and lending terms may vary depending on your state of residence.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">
            California Residents
          </h2>

          <div className="rounded-lg border border-amber-300 bg-amber-50 p-5">
            <p className="font-medium text-amber-900">
              California Financing Law license information is pending.
            </p>

            <p className="mt-2 text-sm leading-6 text-amber-800">
              Before this website is published, replace this placeholder with
              the official California DFPI license number issued to the lending
              entity. Remove this notice once the information has been verified.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">
            General State Availability
          </h2>

          <p className="leading-7 text-slate-700">
            Our services may not be available in every state due to licensing
            and regulatory requirements. If we are unable to offer loans in your
            state, we will notify you that your application cannot be processed.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">
            Credit Inquiries
          </h2>

          <p className="leading-7 text-slate-700">
            Applying for a loan may result in a hard inquiry on your credit
            report, which could affect your credit score.
          </p>

          <p className="leading-7 text-slate-700">
            If you have questions regarding licensing in your state, please
            contact our compliance team at{" "}
            <a
              href={`mailto:${COMPANY.email}`}
              className="font-medium text-blue-700 hover:underline"
            >
              {COMPANY.email}
            </a>
            .
          </p>
        </section>
      </div>
    </PageShell>
  );
}
