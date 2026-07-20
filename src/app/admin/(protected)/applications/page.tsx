"use client";

import { useCallback, useEffect, useState } from "react";
import { Eye, Loader2, LucideRefreshCcw } from "lucide-react";
import { api, DEFAULT_PAGE_SIZE } from "@/src/lib/api";
import { Pagination, SearchInput } from "@/src/components/admin/DataToolbar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formatUSD } from "@/src/lib/constants";
import { formattedNumber } from "@/src/lib/loan";
import { useDebounced } from "@/src/lib/useDebounced";
import { LoanApplication } from "@/src/lib/type";

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
// Local (not UTC) YYYY-MM-DD for "today".
function todayStr(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function AdminApplicationsPage() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  // const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState<LoanApplication[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filterDate, setFilterDate] = useState(
    searchParams.get("date") || new Date().toISOString().split("T")[0],
  );
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search")?.trim() || "",
  );

  const debouncedQuery = useDebounced(searchInput);
  const [isResetting, setIsResetting] = useState(false);

  // A new search term invalidates the current page number — page 3 of the old
  // results is meaningless for the new ones.
  useEffect(() => {
    let cancelled = false;

    const fetchApplications = async () => {
      try {
        setLoading(true);

        const data = await api.getApplications({
          q: debouncedQuery,
          page,
          limit: DEFAULT_PAGE_SIZE,
          date: debouncedQuery.trim() ? undefined : filterDate,
        });

        if (cancelled) return;

        setRows(data.items);
        setTotal(data.total);
        setError(null);
      } catch (err) {
        if (cancelled) return;

        setError(
          err instanceof Error ? err.message : "Could not load applications",
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchApplications();

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery, page, filterDate]);

  const handleGoToPage = (id: string) => {
    router.push(`/admin/applications/${id}`);
  };

  // Sync URL with state
  useEffect(() => {
    const params = new URLSearchParams();

    if (page > 1) {
      params.set("page", String(page));
    }

    if (debouncedQuery.trim()) {
      params.set("search", debouncedQuery.trim());
    }

    params.set("date", filterDate);

    const url = `${pathname}?${params.toString()}`;

    router.replace(url, { scroll: false });
  }, [page, filterDate, debouncedQuery, pathname, router]);

  const handleReset = () => {
    setIsResetting(true);
    setPage(1);
    setSearchInput("");
    setFilterDate(new Date().toISOString().split("T")[0]);

    // Clear rotation after a delay
    setTimeout(() => {
      setIsResetting(false);
    }, 1000);
  };

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Applications</h1>
          <p className="mt-1 text-sm text-gray-700">
            Every loan application submitted through the site.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-6 flex-wrap">
        <SearchInput
          value={searchInput}
          onChange={setSearchInput}
          placeholder="Search name, email, phone, ID…"
        />
        <input
          type="date"
          value={filterDate}
          onChange={(e) => {
            setFilterDate(e.target.value);
            setPage(1);
          }}
          className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
        />
        {filterDate !== new Date().toISOString().split("T")[0] && (
          <button
            onClick={() => {
              setFilterDate(new Date().toISOString().split("T")[0]);
              setPage(1);
            }}
            className="text-xs text-primary hover:underline cursor-pointer"
          >
            Today
          </button>
        )}
        <div>
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2.5 text-primary border border-gray-300 rounded-md text-sm transition hover:bg-primary/5 cursor-pointer flex items-center justify-center"
          >
            <LucideRefreshCcw
              size={20}
              className={`${isResetting ? "animate-spin" : ""}`}
            />
          </button>
        </div>
      </div>

      {error && (
        <p
          role="alert"
          className="mt-6 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      <div className="mt-6 overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-lift">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-300 bg-gray-50/60">
              <tr className="text-gray-700">
                <th className="px-4 py-3 font-medium">Application ID</th>
                <th className="px-4 py-3 font-medium">Applicant</th>
                {/* <th className="px-4 py-3 font-medium">Business</th> */}
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Submitted</th>
                <th className="px-4 py-3 font-medium">View</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center">
                    <Loader2
                      className="mx-auto size-5 animate-spin text-gray-300"
                      aria-label="Loading"
                    />
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-12 text-center text-gray-700"
                  >
                    {debouncedQuery
                      ? `No applications match “${debouncedQuery}”.`
                      : "No applications yet."}
                  </td>
                </tr>
              ) : (
                rows.map((loan) => (
                  <tr
                    key={loan.id ?? loan.reference}
                    className="border-b border-gray-200 last:border-0 hover:bg-gray-50/50"
                  >
                    <td className="px-4 py-3 font-mono text-xs text-gray-900">
                      {loan.reference}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">
                        {loan.firstName} {loan.lastName}
                      </div>
                      <div className="text-xs text-gray-700">{loan.email}</div>
                      {loan.phone && (
                        <div className="text-xs text-gray-700">
                          {formattedNumber(loan.phone)}
                        </div>
                      )}
                    </td>
                    {/* <td className="px-4 py-3 text-gray-800">
                      {loan.business_name || "—"}
                    </td> */}
                    <td className="px-4 py-3 text-gray-800 tabular-nums">
                      {formatUSD(Number(loan.amountRequested)) || "—"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-700">
                      {formatDate(loan.createdAt)}
                    </td>
                    <td
                      onClick={() => handleGoToPage(loan.reference)}
                      className="cursor-pointer whitespace-nowrap px-4 py-3 text-gray-700"
                    >
                      <Eye className="h-5 w-5" />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          page={page}
          limit={DEFAULT_PAGE_SIZE}
          total={total}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
