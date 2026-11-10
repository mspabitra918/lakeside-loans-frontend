"use client";

import React, { useState } from "react";

interface Props {
  reference: string;
}

export default function RejectAndResendButton({ reference }: Props) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://api.zippycash.online";

  const handleRejectAndResend = async () => {
    if (
      !confirm(
        "Are you sure the bank details were incorrect? This will reset verification and email the user a new link.",
      )
    ) {
      return;
    }

    try {
      setLoading(true);
      setMessage(null);
      setIsError(false);

      const response = await fetch(
        `${API_BASE_URL}/bank-accountverification/reject-and-resend`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            reference,
            reason: "Incorrect credentials or bank details provided",
          }),
        },
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to re-send verification link.");

      setMessage("New verification link emailed successfully!");
    } catch (err: any) {
      setIsError(true);
      setMessage(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-1">
      <button
        onClick={handleRejectAndResend}
        disabled={loading}
        className="bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs px-3 py-2 rounded-xl transition-all shadow-sm disabled:opacity-50 flex items-center gap-1.5"
      >
        {loading ? (
          <>
            <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Resetting & Sending...
          </>
        ) : (
          "⚠️ Reject & Request Re-Verification"
        )}
      </button>

      {message && (
        <p
          className={`text-[11px] font-medium ${isError ? "text-red-600" : "text-emerald-600"}`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
