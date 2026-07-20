import type { Metadata } from "next";
import { Lock } from "lucide-react";
import { APR, MAX_LOAN_AMOUNT, usdWhole } from "@/src/lib/loan";
import ApplyForm from "@/src/components/apply/ApplyForm";

export const metadata: Metadata = {
  title: "Apply",
  description:
    "Start your Lakeside Loans personal loan application. Submitting does not guarantee approval.",
};

export default function ApplyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        Apply for a personal loan
      </h1>

      <p className="mt-3 text-base leading-relaxed text-slate-700">
        Tell us what you need and how to reach you. Loans up to{" "}
        {usdWhole.format(MAX_LOAN_AMOUNT)} at a fixed {(APR * 100).toFixed(2)}%
        APR on approved applications.
      </p>

      <p className="mt-4 flex items-center gap-2 text-sm text-slate-600">
        <Lock className="h-4 w-4 text-slate-500" aria-hidden="true" />
        This form is served over an encrypted connection.
      </p>

      <hr className="my-8 border-slate-200" />

      <ApplyForm />
    </div>
  );
}
