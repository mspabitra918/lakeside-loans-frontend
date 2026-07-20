"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FileText, LayoutDashboard, LogOut } from "lucide-react";
import {
  adminDisplayName,
  clearAuth,
  getUser,
  isAuthenticated,
} from "@/src/lib/auth";
import type { AdminUser } from "@/src/lib/auth";
import { cn } from "@/src/lib/utils";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/applications", label: "Applications", icon: FileText },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUserState] = useState<AdminUser | null>(null);
  const [checked, setChecked] = useState(false);

  // The token lives in localStorage, so the guard can only run on the client.
  // Until it has, render nothing — otherwise the dashboard flashes for
  // unauthenticated visitors before the redirect lands.
  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/admin/login");
      return;
    }
    setUserState(getUser());
    setChecked(true);
  }, [router]);

  function handleLogout() {
    clearAuth();
    router.replace("/admin/login");
  }

  if (!checked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy-50">
        <p className="text-sm text-navy-700">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-50">
      <header className="border-b border-gray-300 bg-white">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-semibold text-navy-900">
              Lakeside <span className="text-teal-700">Admin</span>
            </Link>

            <nav className="flex items-center gap-1">
              {NAV.map(({ href, label, icon: Icon }) => {
                // `/admin` would match every child route with startsWith, so the
                // dashboard link needs an exact test.
                const active =
                  href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(href);

                return (
                  <Link
                    key={href}
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      active
                        ? "bg-emerald-50 text-teal-700"
                        : "text-navy-700 hover:bg-navy-50",
                    )}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                    <span className="hidden sm:inline">{label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {user && (
              <span className="hidden text-sm text-navy-700 md:inline">
                {adminDisplayName(user) || user.email}
              </span>
            )}
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50"
            >
              <LogOut className="size-4" aria-hidden="true" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8">
        {children}
      </div>
    </div>
  );
}
