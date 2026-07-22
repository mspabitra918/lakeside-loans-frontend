import React from "react";

type SuccessPageProps = {
  searchParams: Promise<{
    firstName?: string;
    reference?: string;
    status?: string;
  }>;
};

// App-router pages receive `searchParams`, not bare props — the previous
// signature meant firstName/applicationId were always undefined here.
export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { firstName, reference, status } = await searchParams;

  return (
    <div className="mx-auto max-w-3xl rounded-2xl border border-green-200 bg-white p-8 shadow-sm mb-6">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-8 w-8 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          {firstName ? `Thank you, ${firstName}!` : "Thank you!"}
        </h1>

        <p className="mt-4 text-lg text-slate-700">
          Your loan application has been successfully submitted. Its current
          status is{" "}
          <span className="font-semibold text-green-700">
            {status ?? "received"}
          </span>
          . No credit decision has been made yet — we will contact you once your
          application has been reviewed.
        </p>

        <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
            Your Application Reference
          </p>

          <p className="mt-2 text-4xl font-bold tracking-[0.2em] text-slate-900">
            {reference ?? "—"}
          </p>

          <p className="mt-3 text-sm text-slate-600">
            Please save this reference for your records.
          </p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-slate-900">
          Important: Your Next Steps
        </h2>

        <p className="mt-3 leading-7 text-slate-700">
          Your application is now in our review queue. We will verify the
          information you provided and let you know the outcome. Submitting an
          application does not guarantee approval, and no funds have been
          committed at this stage.
        </p>

        <p className="mt-4 font-medium text-slate-900">
          Choose one of the two options below to finalize your loan:
        </p>
      </div>

      <div className="mt-8 rounded-xl border-2 border-green-500 bg-green-50 p-6">
        <div className="mb-4 inline-flex rounded-full bg-green-600 px-3 py-1 text-sm font-semibold text-white">
          Recommended
        </div>

        <h3 className="text-xl font-bold text-slate-900">
          Option 1: Fast-Track Your Funding
        </h3>

        <p className="mt-3 leading-7 text-slate-700">
          To process your application instantly and get your funds deposited
          within <strong>24 hours</strong>, call our underwriting team right
          now:
        </p>

        <a
          href="tel:+18772312232"
          className="mt-6 flex items-center justify-center rounded-lg bg-green-600 px-6 py-4 text-lg font-semibold text-white transition hover:bg-green-700"
        >
          📞 Call Us Immediately: (747) 330-5650
        </a>

        <p className="mt-3 text-sm text-slate-600">
          Have your Application ID ready when you call.
        </p>
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h3 className="text-xl font-bold text-slate-900">
          Option 2: Wait for Our Call
        </h3>

        <p className="mt-3 leading-7 text-slate-700">
          If you cannot call us right now, our team will review your file and
          contact you to proceed with your loan agreement within the next{" "}
          <strong>12 hours.</strong>
        </p>

        <div className="mt-5 rounded-lg bg-yellow-50 p-4">
          <p className="font-medium text-yellow-900">
            📱 Please answer when you see <strong>(747) 330-5650</strong>{" "}
            calling your phone.
          </p>
        </div>
      </div>
    </div>
  );
}
