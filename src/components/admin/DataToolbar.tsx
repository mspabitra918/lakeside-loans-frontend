"use client";

import { Search, X } from "lucide-react";

/**
 * Search input for the admin lists. Deliberately a controlled input driven by
 * local state (not the URL) — reading it from useSearchParams would force every
 * consuming page into a Suspense boundary to survive a production build.
 */
export function SearchInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div className="relative w-full sm:max-w-xs">
      <Search
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-300"
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full rounded-xl border border-gray-300 bg-white py-2.5 pr-9 pl-9 text-sm text-gray-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute top-1/2 right-2 -translate-y-1/2 rounded p-1 text-gray-300 hover:text-gray-700"
        >
          {/* <X className="size-4" aria-hidden="true" /> */}
        </button>
      )}
    </div>
  );
}

export function Pagination({
  page,
  limit,
  total,
  onPageChange,
}: {
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
}) {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-300 px-4 py-3 sm:flex-row">
      <p className="text-sm text-gray-700">
        {total === 0 ? "No results" : `Showing ${from}–${to} of ${total}`}
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-800 disabled:cursor-not-allowed disabled:opacity-40 hover:enabled:bg-gray-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">
          Page {page} of {totalPages}
        </span>
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-800 disabled:cursor-not-allowed disabled:opacity-40 hover:enabled:bg-gray-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
