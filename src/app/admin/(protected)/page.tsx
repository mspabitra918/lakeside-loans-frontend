"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { api } from "@/src/lib/api";
import { adminDisplayName, getUser } from "@/src/lib/auth";
import type { AdminStats } from "@/src/lib/type";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");

  useEffect(() => {
    setName(adminDisplayName(getUser()));

    let cancelled = false;

    api
      .getStats()
      .then((data) => {
        if (!cancelled) setStats(data);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Could not load stats");
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const cards = [
    {
      label: "Loan applications",
      value: stats?.applications,
      href: "/admin/applications",
      icon: FileText,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-navy-900">
        {name ? `Welcome back, ${name}` : "Dashboard"}
      </h1>
      <p className="mt-1 text-sm text-navy-700">
        An overview of everything submitted through the site.
      </p>

      {error && (
        <p
          role="alert"
          className="mt-6 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {cards.map(({ label, value, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group rounded-2xl border border-gray-300 bg-white p-5 shadow-lift transition-colors hover:border-gray-600/40"
          >
            <div className="flex items-start justify-between">
              <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <ArrowRight className="size-4 text-navy-300 transition-transform group-hover:translate-x-0.5 group-hover:text-emerald-600" />
            </div>

            <p className="mt-4 text-3xl font-semibold text-navy-900 tabular-nums">
              {value ?? "—"}
            </p>
            <p className="mt-1 text-sm text-navy-700">{label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
