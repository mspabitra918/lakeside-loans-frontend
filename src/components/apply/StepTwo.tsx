"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { buttonClass, Field } from "@/src/components/ui/Field";
import { ApplyFormValues } from "./types";

const BANK_ACCOUNT_AGE_OPTIONS = [
  "Less than 6 months",
  "6 - 12 months",
  "1+ years",
] as const;

const ACCOUNT_STATUS_OPTIONS = [
  "Positive Balance",
  "Negative Balance",
] as const;

type Props = {
  values: ApplyFormValues;
  errors: Record<string, string>;
  pending?: boolean;
  onBack: () => void;
  onChange: (name: string, value: string | boolean) => void;
};

export default function StepTwo({
  values,
  errors,
  pending = false,
  onBack,
  onChange,
}: Props) {
  const [showAccountNumber, setShowAccountNumber] = useState(false);

  return (
    <div className="space-y-8">
      {/* Security Banner */}
      <div className="rounded-xl border border-green-200 bg-green-50 p-4">
        <div className="flex items-center gap-3">
          <span className="text-xl">🔒</span>

          <div>
            <h3 className="font-semibold text-green-800">
              256-Bit SSL Secure Connection
            </h3>

            <p className="text-sm text-green-700">
              Your banking information is encrypted and transmitted securely.
            </p>
          </div>
        </div>
      </div>

      <fieldset className="space-y-5">
        <legend className="sr-only">Bank Details</legend>

        <div className="grid gap-5 sm:grid-cols-2">
          {/* Bank Name */}
          <Field
            name="bankName"
            label="Bank name"
            errors={errors}
            values={values}
            onChange={onChange}
            className="sm:col-span-2"
          >
            {(props) => (
              <input
                {...props}
                type="text"
                autoComplete="off"
                placeholder="Enter your bank name"
              />
            )}
          </Field>

          {/* Routing Number */}
          <Field
            name="routingNumber"
            label="Routing number"
            errors={errors}
            values={values}
            onChange={onChange}
          >
            {(props) => (
              <input
                {...props}
                type="text"
                inputMode="numeric"
                maxLength={9}
                placeholder="9-digit routing number"
              />
            )}
          </Field>

          {/* Account Number */}
          <Field
            name="accountNumber"
            label="Account number"
            errors={errors}
            values={values}
            onChange={onChange}
          >
            {(props) => (
              <div className="relative">
                <input
                  {...props}
                  type={showAccountNumber ? "text" : "password"}
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder="Enter account number"
                />

                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-blue-600"
                  onClick={() => setShowAccountNumber(!showAccountNumber)}
                >
                  {showAccountNumber ? "Hide" : "Show"}
                </button>
              </div>
            )}
          </Field>

          {/* Account Age */}
          <Field
            name="bankAccountAge"
            label="Bank account age"
            errors={errors}
            values={values}
            onChange={onChange}
          >
            {(props) => (
              <select {...props}>
                <option value="">Select account age</option>

                {BANK_ACCOUNT_AGE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          </Field>

          {/* Account Status */}
          <Field
            name="accountStatus"
            label="Current account status"
            errors={errors}
            values={values}
            onChange={onChange}
          >
            {(props) => (
              <select {...props}>
                <option value="">Select status</option>

                {ACCOUNT_STATUS_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          </Field>
        </div>
      </fieldset>

      {/* Navigation Buttons */}
      <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg border border-slate-300 px-6 py-3 font-medium text-slate-700 hover:bg-slate-100"
        >
          ← Back
        </button>

        <button
          type="submit"
          disabled={pending}
          className={`${buttonClass} bg-slate-900 text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60`}
        >
          {pending ? "Submitting..." : "Submit Secure Application"}
        </button>
      </div>
    </div>
  );
}
