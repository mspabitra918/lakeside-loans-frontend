"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { COMPANY } from "../lib/company";
import { PRIMARY_NAV, ROUTES, isActiveRoute } from "../lib/navigation";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Concentric "lakeside ripple" mark. Decorative — the wordmark carries the
 * accessible name, so this is aria-hidden.
 */
function RippleMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="16" cy="16" r="15" className="fill-ink-900" />
      <circle
        cx="16"
        cy="20"
        r="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        className="text-teal-300"
      />
      <path
        d="M4.5 20a11.5 11.5 0 0 1 23 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        className="text-teal-500"
        opacity="0.75"
      />
      <path
        d="M9 20a7 7 0 0 1 14 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        className="text-teal-300"
        opacity="0.55"
      />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Hairline border hardens into a blurred, elevated bar once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape to close + focus trap while the mobile panel is open.
  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== "Tab" || !panel) return;

      const nodes = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      const toggle = toggleRef.current;
      const focusable = toggle ? [toggle, ...nodes] : nodes;
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  const isActive = (href: string) => isActiveRoute(pathname, href);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-200 ${
        scrolled
          ? "border-line bg-white/85 shadow-header backdrop-blur-md backdrop-saturate-150"
          : "border-transparent bg-white"
      }`}
    >
      <div className="container-page flex items-center justify-between gap-6 py-4">
        <Link
          href="/"
          className="group flex items-center gap-2.5 rounded-lg"
          aria-label={`${COMPANY.name} — home`}
        >
          <RippleMark className="h-8 w-8 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5" />
          <span className="text-lg font-bold tracking-tight text-ink-900">
            Lakeside <span className="font-semibold text-teal-700">Loans</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Main"
          className="hidden flex-1 items-center justify-center md:flex"
        >
          <div className="flex flex-wrap items-center justify-end gap-2 rounded-full border border-line bg-white/90 px-2 py-2 shadow-sm">
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-150 ${
                  isActive(item.href)
                    ? "bg-ink-900 text-white shadow-card"
                    : "text-muted hover:bg-canvas hover:text-ink-900"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <a
            href={COMPANY.phoneHref}
            className="flex items-center gap-2 rounded text-sm font-semibold text-ink-900 transition-colors duration-150 hover:text-teal-700"
          >
            <Phone className="h-4 w-4 text-teal-600" aria-hidden="true" />
            <span className="num">{COMPANY.phone}</span>
          </a>

          <Link
            href={ROUTES.apply.href}
            className="rounded-xl bg-ink-900 px-5 py-2.5 text-sm font-semibold text-white shadow-card transition-[background-color,transform] duration-150 hover:-translate-y-0.5 hover:bg-ink-800"
          >
            {ROUTES.apply.label}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 inline-flex items-center justify-center rounded-lg p-2 text-ink-900 transition-colors duration-150 hover:bg-canvas md:hidden"
          onClick={() => (open ? close() : setOpen(true))}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile menu — kept in the DOM so aria-controls always resolves. */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="border-t border-line bg-white md:hidden"
      >
        <nav
          aria-label="Mobile"
          className="container-page flex flex-col gap-1 py-3"
        >
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`rounded-2xl border px-4 py-3 text-base font-medium transition-colors ${
                isActive(item.href)
                  ? "border-teal-600 bg-teal-50 text-ink-900"
                  : "border-line text-body hover:border-teal-200 hover:bg-canvas"
              }`}
            >
              {item.label}
            </Link>
          ))}

          <a
            href={COMPANY.phoneHref}
            className="mt-4 flex items-center gap-2 rounded-2xl border border-line bg-canvas px-4 py-3 text-base font-semibold text-ink-900"
          >
            <Phone className="h-4 w-4 text-teal-600" aria-hidden="true" />
            <span className="num">{COMPANY.phone}</span>
          </a>

          <Link
            href={ROUTES.apply.href}
            onClick={() => setOpen(false)}
            className="mt-4 mb-5 rounded-xl bg-ink-900 px-5 py-3.5 text-center text-base font-semibold text-white"
          >
            {ROUTES.apply.label}
          </Link>
        </nav>
      </div>
    </header>
  );
}
