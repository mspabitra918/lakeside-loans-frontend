"use client";

import Link from "next/link";
import {
  LOAN_AMOUNT_OPTIONS,
  LOAN_PURPOSES,
  LOAN_TERMS_MONTHS,
  US_STATES,
  usdWhole,
} from "@/src/lib/loan";
import { buttonClass, Field } from "@/src/components/ui/Field";
import { ApplyFormValues } from "./types";

type Props = {
  values: ApplyFormValues;
  errors: Record<string, string>;
  onNext: () => void;
  onChange: (name: string, value: string | boolean) => void;
};

export default function StepOne({ values, errors, onNext, onChange }: Props) {
  return (
    <div className="space-y-10">
      {/* Loan Details */}
      <fieldset className="space-y-5">
        <legend className="sr-only">Loan Details</legend>

        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field
              name="amountRequested"
              label="Requested loan amount"
              errors={errors}
              values={values}
              onChange={onChange}
            >
              {(props) => (
                <select {...props}>
                  <option value="">Select loan amount</option>

                  {LOAN_AMOUNT_OPTIONS.map((amount) => (
                    <option key={amount} value={amount}>
                      {usdWhole.format(amount)}
                    </option>
                  ))}
                </select>
              )}
            </Field>

            <Field
              name="termMonths"
              label="Desired loan term"
              errors={errors}
              values={values}
              onChange={onChange}
            >
              {(props) => (
                <select {...props}>
                  <option value="">Select term</option>

                  {LOAN_TERMS_MONTHS.map((months) => (
                    <option key={months} value={months}>
                      {months} Months
                    </option>
                  ))}
                </select>
              )}
            </Field>
          </div>

          <Field
            name="purpose"
            label="Purpose of loan"
            errors={errors}
            values={values}
            onChange={onChange}
            className="sm:col-span-2"
          >
            {(props) => (
              <select {...props}>
                <option value="">Select purpose</option>

                {LOAN_PURPOSES.map((purpose) => (
                  <option key={purpose} value={purpose}>
                    {purpose}
                  </option>
                ))}
              </select>
            )}
          </Field>
        </div>
      </fieldset>

      {/* Personal Information */}
      <fieldset className="space-y-5">
        <legend className="sr-only">Personal Information</legend>

        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field
              name="firstName"
              label="First name"
              errors={errors}
              values={values}
              onChange={onChange}
            >
              {(props) => (
                <input {...props} type="text" autoComplete="given-name" />
              )}
            </Field>

            <Field
              name="lastName"
              label="Last name"
              errors={errors}
              values={values}
              onChange={onChange}
            >
              {(props) => (
                <input {...props} type="text" autoComplete="family-name" />
              )}
            </Field>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field
              name="email"
              label="Email address"
              errors={errors}
              values={values}
              onChange={onChange}
            >
              {(props) => (
                <input {...props} type="email" autoComplete="email" />
              )}
            </Field>

            <Field
              name="phone"
              label="Phone number"
              errors={errors}
              values={values}
              onChange={onChange}
            >
              {(props) => <input {...props} type="tel" autoComplete="tel" />}
            </Field>
          </div>

          <Field
            name="street"
            label="Street address"
            errors={errors}
            values={values}
            onChange={onChange}
            className="sm:col-span-2"
          >
            {(props) => (
              <input {...props} type="text" autoComplete="street-address" />
            )}
          </Field>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <Field
              name="city"
              label="City"
              errors={errors}
              values={values}
              onChange={onChange}
            >
              {(props) => (
                <input {...props} type="text" autoComplete="address-level2" />
              )}
            </Field>

            <Field
              name="state"
              label="State"
              errors={errors}
              values={values}
              onChange={onChange}
            >
              {(props) => (
                <select {...props} autoComplete="address-level1">
                  <option value="">Select State</option>

                  {US_STATES.map(([code, label]) => (
                    <option key={code} value={code}>
                      {label}
                    </option>
                  ))}
                </select>
              )}
            </Field>

            <Field
              name="postalCode"
              label="ZIP code"
              errors={errors}
              values={values}
              onChange={onChange}
            >
              {(props) => (
                <input
                  {...props}
                  type="text"
                  inputMode="numeric"
                  maxLength={10}
                  autoComplete="postal-code"
                />
              )}
            </Field>
          </div>
        </div>
      </fieldset>

      {/* SMS Consent */}
      <fieldset>
        <legend className="sr-only">SMS Consent</legend>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
          <div className="flex items-start gap-3">
            <input
              id="smsConsent"
              name="smsConsent"
              type="checkbox"
              checked={values.smsConsent}
              onChange={(e) => onChange("smsConsent", e.target.checked)}
              className="mt-1 h-5 w-5 rounded border-slate-400"
            />

            <label
              htmlFor="smsConsent"
              className="text-sm leading-6 text-slate-700"
            >
              By checking this box and clicking{" "}
              <strong>Continue to Step 2</strong>, you consent to receive
              marketing, promotional and account-related SMS messages from
              Lakeside Loans. Consent is not required to obtain a loan. Message
              and data rates may apply. Reply STOP to opt out or HELP for
              assistance. Read our{" "}
              <Link
                href="/privacy"
                target="_blank"
                className="text-blue-700 underline"
              >
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link
                href="/terms"
                target="_blank"
                className="text-blue-700 underline"
              >
                Terms of Use
              </Link>
              .
            </label>
          </div>
        </div>
        {errors.smsConsent && (
          <p className="mt-2 text-sm text-red-600">{errors.smsConsent}</p>
        )}
      </fieldset>

      <button
        type="button"
        onClick={onNext}
        className={`${buttonClass} w-full bg-slate-900 text-white hover:bg-slate-800`}
      >
        Continue to Step 2
      </button>
    </div>
  );
}
