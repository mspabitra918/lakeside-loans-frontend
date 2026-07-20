// Central source of truth for the business rules from the brief. Keeping these
// in one place means the marketing copy, JSON-LD schema, and form validation
// never drift apart.

// The five sequential milestones a user can see on their status page, in order.
// DECLINED is a terminal off-ramp handled separately.
export const LIFECYCLE_STAGES = [
  {
    key: "APPLICATION_SUBMITTED",
    label: "Application Submitted",
    blurb:
      "Your details are safely stored. Next, connect your bank to verify your account.",
  },
  {
    key: "PHONE_VERIFICATION_PENDING",
    label: "Phone Verification",
    blurb: "A loan specialist will confirm a few details with you by phone.",
  },
  {
    key: "SIGN_LOAN_AGREEMENT",
    label: "Sign Agreement",
    blurb: "Review and e-sign your loan agreement from this portal.",
  },
  {
    key: "VERIFICATION_DEPOSIT",
    label: "Verification Deposit",
    blurb:
      "A small micro-deposit confirms your routing details before funding.",
  },
  {
    key: "FUNDED",
    label: "Funded",
    blurb: "Your funds are on the way — typically within 24 hours via ACH.",
  },
] as const;

export function formatUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

// Tel-href safe version of a display phone number ("(747) 330-5650" -> "+17473305650").
export function telHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return `tel:+1${digits.replace(/^1/, "")}`;
}

export function formatDateTime(value?: string) {
  if (!value) return "—";

  return new Date(value).toLocaleString("en-CA", {
    timeZone: "America/Toronto",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
