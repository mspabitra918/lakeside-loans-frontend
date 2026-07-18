/**
 * Single source of truth for site navigation.
 *
 * Routes were previously declared three times — `navItems` in the navbar plus
 * `COMPANY_LINKS` / `LEGAL_LINKS` in the footer — with /about, /reviews, and
 * /licenses each appearing twice. Renaming a route meant editing two files and
 * silently shipping a 404 from whichever one you missed.
 *
 * Define each route once in `ROUTES`, then compose the groupings from it.
 */

export type Route = {
  readonly href: string;
  readonly label: string;
};

export const ROUTES = {
  home: { href: "/", label: "Home" },
  apply: { href: "/apply", label: "Apply Now" },
  about: { href: "/about", label: "About Us" },
  reviews: { href: "/reviews", label: "Reviews" },
  privacy: { href: "/privacy", label: "Privacy Policy" },
  terms: { href: "/terms", label: "Terms of Use" },
  licenses: { href: "/licenses", label: "State Licenses" },
  accessibility: { href: "/accessibility", label: "Accessibility" },
} as const satisfies Record<string, Route>;

export type RouteKey = keyof typeof ROUTES;

/**
 * Header navigation. Deliberately excludes `apply` — the header renders it as a
 * button rather than a nav link, and duplicating it inside <nav> would make
 * screen readers announce the same destination twice in one landmark.
 */
export const PRIMARY_NAV: readonly Route[] = [
  ROUTES.about,
  ROUTES.reviews,
  ROUTES.licenses,
];

export const FOOTER_COMPANY_LINKS: readonly Route[] = [
  ROUTES.about,
  ROUTES.reviews,
  ROUTES.apply,
];

/**
 * Consumer-disclosure routes. These are linked from the footer on every page
 * on purpose: privacy, terms, licensing, and accessibility statements are
 * expected to be reachable site-wide, not buried on one page.
 */
export const FOOTER_LEGAL_LINKS: readonly Route[] = [
  ROUTES.privacy,
  ROUTES.terms,
  ROUTES.licenses,
  ROUTES.accessibility,
];

/** Matches a route exactly or as a path prefix, for `aria-current` marking. */
export function isActiveRoute(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
