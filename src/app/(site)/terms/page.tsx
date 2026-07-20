import type { Metadata } from "next";
import { PageShell } from "@/src/components/PageShell";
import { COMPANY } from "@/src/lib/company";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Review the Terms of Use governing your access to and use of the Lakeside Loans website and services.",
};

export default function TermsPage() {
  return (
    <PageShell title="Terms of Use">
      <div className="space-y-10">
        <section className="space-y-3">
          <p className="text-sm text-slate-500">Last Updated: July 2026</p>

          <p className="leading-7 text-slate-700">
            By accessing or using the {COMPANY.name} website, you agree to be
            bound by these Terms of Use. If you do not agree with these terms,
            please discontinue use of our website and services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-slate-900">
            1. Eligibility
          </h2>

          <p className="leading-7 text-slate-700">
            You must be a legal resident of the United States and at least 18
            years of age to use our services or submit a loan application.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-slate-900">
            2. E-Sign Consent
          </h2>

          <p className="leading-7 text-slate-700">
            By submitting an application, you consent to receive disclosures,
            agreements, notices, and other communications electronically. You
            may withdraw your consent by contacting us, although doing so may
            limit or prevent our ability to provide online services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-slate-900">
            3. SMS and Text Messaging Terms
          </h2>

          <p className="leading-7 text-slate-700">
            By providing your mobile phone number and selecting the SMS consent
            checkbox, you agree to receive text messages related to your
            application, account, and other communications from {COMPANY.name}.
            Message and data rates may apply. Message frequency may vary. You
            may opt out at any time by replying <strong>STOP</strong>. For
            assistance, reply <strong>HELP</strong>. Wireless carriers are not
            responsible for delayed or undelivered messages.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-slate-900">
            4. Accuracy of Information
          </h2>

          <p className="leading-7 text-slate-700">
            You agree that all information submitted during the application
            process is accurate, complete, truthful, and belongs to you.
            Providing false, misleading, or fraudulent information—including
            inaccurate banking details—may result in denial of your application
            and may subject you to legal action where permitted by law.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-slate-900">
            5. Dispute Resolution
          </h2>

          <p className="leading-7 text-slate-700">
            Any disputes arising from your use of this website or our services
            will be resolved through binding arbitration rather than in court,
            except where prohibited by applicable law. By using this website,
            you agree to resolve disputes on an individual basis and waive any
            right to participate in class action proceedings.
          </p>
        </section>
      </div>
    </PageShell>
  );
}
