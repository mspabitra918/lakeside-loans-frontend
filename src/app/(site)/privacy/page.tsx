import type { Metadata } from "next";
import { PageShell } from "@/src/components/PageShell";
import { COMPANY } from "@/src/lib/company";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Lakeside Loans collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <PageShell title="Privacy Policy">
      <div className="space-y-10">
        <section className="space-y-3">
          <p className="text-sm text-slate-500">Last Updated: July 2026</p>

          <p className="leading-7 text-slate-700">
            {COMPANY.name} ("we," "us," or "our") respects your privacy. This
            Privacy Policy explains how we collect, use, and safeguard your
            personal and financial information when you visit our website and
            use our services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-slate-900">
            1. Information We Collect
          </h2>

          <p className="leading-7 text-slate-700">
            We collect Personally Identifiable Information (PII) that you
            voluntarily provide when applying for a loan, including your:
          </p>

          <ul className="list-disc space-y-2 pl-6 text-slate-700">
            <li>Name</li>
            <li>Mailing address</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Banking information</li>
          </ul>

          <p className="leading-7 text-slate-700">
            We also collect non-identifying information such as IP addresses,
            browser types, device information, and usage analytics to improve
            website security and performance.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-slate-900">
            2. How We Use Your Information
          </h2>

          <p className="leading-7 text-slate-700">
            We use the information you provide to:
          </p>

          <ul className="list-disc space-y-2 pl-6 text-slate-700">
            <li>Process and underwrite your loan application.</li>
            <li>Verify your identity and help prevent fraud.</li>
            <li>Communicate with you regarding your application or account.</li>
            <li>Deposit approved loan funds into your bank account.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-slate-900">
            3. Mobile Information Sharing
          </h2>

          <p className="leading-7 text-slate-700">
            No mobile information will be shared with third parties or
            affiliates for marketing or promotional purposes. All categories
            above exclude text messaging originator opt-in data and consent;
            this information will not be shared with any third parties.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-slate-900">
            4. Data Security
          </h2>

          <p className="leading-7 text-slate-700">
            We implement bank-level 256-bit encryption, secure servers, and
            industry-standard security practices designed to protect your
            personal information from unauthorized access, disclosure,
            alteration, or destruction.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-slate-900">
            5. Your California Privacy Rights (CCPA)
          </h2>

          <p className="leading-7 text-slate-700">
            If you are a California resident, you may have the right to request
            access to the personal information we maintain about you, request
            deletion of eligible personal information, and exercise other rights
            available under applicable California privacy laws.
          </p>

          <p className="leading-7 text-slate-700">
            To submit a privacy request or ask questions about this Privacy
            Policy, please contact us at{" "}
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
