"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/src/lib/api";
import { MoveLeft } from "lucide-react";
import { formatUSD } from "@/src/lib/constants";
import { formattedNumber } from "@/src/lib/loan";

interface LoanApplication {
  id: string;
  reference: string;
  amountRequested: string;
  purpose: string;
  termMonths: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  bankName: string;
  routingNumber: string;
  accountNumber: string;
  bankAccountAge: string;
  accountStatus: string;
  status: string;
  consentIp: string;
  createdAt: string;
  updatedAt: string;
}

function formatDate(value?: string) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "—"
    : date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
}

export default function ApplicationDetailsPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const [application, setApplication] = useState<LoanApplication | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchApplication = async () => {
      try {
        const data = await api.getApplication(id);
        setApplication(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!application) {
    return <div className="p-6">Application not found.</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header */}
      <div
        onClick={() => router.back()}
        className="rounded bg-gray-50 cursor-pointer hover:bg-gray-200 w-fit px-4 mb-5"
      >
        <MoveLeft />
      </div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Application</p>
          <h1 className="text-3xl font-bold text-slate-900">
            #{application.reference}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Submitted {formatDate(application.createdAt)}
          </p>
        </div>

        <span className="rounded-full uppercase bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
          received
        </span>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Requested Loan</p>

          <h2 className="mt-2 text-4xl font-bold text-blue-600">
            {formatUSD(Number(application.amountRequested))}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Loan Term</p>

          <h2 className="mt-2 text-2xl font-semibold">
            {application.termMonths} Months
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Status</p>

          <h2 className="mt-2 text-2xl font-semibold capitalize">
            {application.status}
          </h2>
        </div>
      </div>

      {/* Details */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Applicant */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="mb-5 text-lg font-bold">👤 Applicant</h3>

          <Info
            label="Full Name"
            value={`${application.firstName} ${application.lastName}`}
          />

          <Info label="Email" value={application.email} />

          <Info label="Phone" value={formattedNumber(application.phone)} />

          <Info label="Street" value={application.street} />

          <Info
            label="City / State"
            value={`${application.city}, ${application.state}`}
          />

          <Info label="ZIP Code" value={application.postalCode} />
        </div>

        {/* Business */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="mb-5 text-lg font-bold">🏦 Banking</h3>

          <Info label="Bank Name" value={application.bankName} />

          <Info label="Routing Number" value={application.routingNumber} />

          <Info label="Account Number" value={application.accountNumber} />

          <Info label="Account Age" value={application.bankAccountAge} />

          <Info label="Account Status" value={application.accountStatus} />
        </div>

        {/* Loan */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="mb-5 text-lg font-bold">💰 Loan</h3>

          <Info
            label="Requested Amount"
            value={formatUSD(Number(application.amountRequested))}
          />

          <Info label="Purpose" value={application.purpose} />

          <Info label="Loan Term" value={`${application.termMonths} Months`} />

          <Info label="Status" value={application.status} />
        </div>

        {/* Metadata */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="mb-5 text-lg font-bold">📄 Metadata</h3>

          <Info label="Reference" value={application.reference} />

          <Info label="UUID" value={application.id} />

          <Info label="IP Address" value={application.consentIp} />

          <Info label="Created" value={formatDate(application.createdAt)} />

          <Info label="Updated" value={formatDate(application.updatedAt)} />
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value?: string }) {
  return (
    <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="font-medium text-slate-900">{value || "-"}</span>
    </div>
  );
}
