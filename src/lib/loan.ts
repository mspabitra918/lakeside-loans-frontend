/**
 * Loan product constants and the amortization math behind the TILA
 * representative example.
 *
 * The disclosure figures are COMPUTED, never hardcoded. A representative
 * example whose numbers drift from the stated APR is a Reg Z problem, so the
 * page renders whatever `amortize()` returns for the advertised rate.
 */

/** Advertised nominal APR, as a decimal. */
export const APR = 0.1;

/** Ceiling used in marketing copy. Not a promise of approval at that amount. */
export const MAX_LOAN_AMOUNT = 25_000;

export const MIN_LOAN_AMOUNT = 1_000;

export const LOAN_TERMS_MONTHS = [12, 24, 36, 48, 60] as const;

export type LoanTermMonths = (typeof LOAN_TERMS_MONTHS)[number];

export const LOAN_PURPOSES = [
  "Debt Consolidation",
  "Home Improvement",
  "Unexpected Bills",
  "Auto",
  "Medical",
  "Other",
] as const;

export type LoanPurpose = (typeof LOAN_PURPOSES)[number];

/** Selectable request amounts, in dollars. */
export const LOAN_AMOUNT_OPTIONS = [
  1_000, 2_500, 5_000, 7_500, 10_000, 15_000, 20_000, 25_000,
] as const;

export type Amortization = {
  principal: number;
  termMonths: number;
  apr: number;
  monthlyPayment: number;
  totalRepaid: number;
  financeCharge: number;
};

/**
 * Standard fixed-rate amortization.
 *
 * payment = P * r / (1 - (1 + r)^-n), where r is the periodic (monthly) rate.
 * Falls back to simple division when the rate is zero to avoid a 0/0.
 */
export function amortize(
  principal: number,
  termMonths: number,
  apr: number = APR,
): Amortization {
  const monthlyRate = apr / 12;

  const monthlyPayment =
    monthlyRate === 0
      ? principal / termMonths
      : (principal * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -termMonths));

  // Round the payment to cents first — the total a borrower actually pays is
  // the rounded payment times the term, not the unrounded product.
  const roundedPayment = Math.round(monthlyPayment * 100) / 100;
  const totalRepaid = Math.round(roundedPayment * termMonths * 100) / 100;

  return {
    principal,
    termMonths,
    apr,
    monthlyPayment: roundedPayment,
    totalRepaid,
    financeCharge: Math.round((totalRepaid - principal) * 100) / 100,
  };
}

/**
 * Representative examples rendered in the TILA disclosure block.
 *
 * Spanning the range matters: a single mid-size example lets an applicant
 * assume the headline maximum costs proportionally less than it does. The
 * $25,000 rows show the real total at the advertised ceiling.
 */
export const REPRESENTATIVE_EXAMPLES = [
  // amortize(5_000, 24),
  amortize(10_000, 36),
  // amortize(25_000, 36),
  amortize(25_000, 60),
] as const;

/** The example expanded in full detail alongside the comparison table. */
export const REPRESENTATIVE_EXAMPLE = amortize(25_000, 60);

export const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const usdWhole = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export const US_STATES = [
  ["AL", "Alabama"],
  ["AK", "Alaska"],
  ["AZ", "Arizona"],
  ["AR", "Arkansas"],
  ["CA", "California"],
  ["CO", "Colorado"],
  ["CT", "Connecticut"],
  ["DE", "Delaware"],
  ["DC", "District of Columbia"],
  ["FL", "Florida"],
  ["GA", "Georgia"],
  ["HI", "Hawaii"],
  ["ID", "Idaho"],
  ["IL", "Illinois"],
  ["IN", "Indiana"],
  ["IA", "Iowa"],
  ["KS", "Kansas"],
  ["KY", "Kentucky"],
  ["LA", "Louisiana"],
  ["ME", "Maine"],
  ["MD", "Maryland"],
  ["MA", "Massachusetts"],
  ["MI", "Michigan"],
  ["MN", "Minnesota"],
  ["MS", "Mississippi"],
  ["MO", "Missouri"],
  ["MT", "Montana"],
  ["NE", "Nebraska"],
  ["NV", "Nevada"],
  ["NH", "New Hampshire"],
  ["NJ", "New Jersey"],
  ["NM", "New Mexico"],
  ["NY", "New York"],
  ["NC", "North Carolina"],
  ["ND", "North Dakota"],
  ["OH", "Ohio"],
  ["OK", "Oklahoma"],
  ["OR", "Oregon"],
  ["PA", "Pennsylvania"],
  ["RI", "Rhode Island"],
  ["SC", "South Carolina"],
  ["SD", "South Dakota"],
  ["TN", "Tennessee"],
  ["TX", "Texas"],
  ["UT", "Utah"],
  ["VT", "Vermont"],
  ["VA", "Virginia"],
  ["WA", "Washington"],
  ["WV", "West Virginia"],
  ["WI", "Wisconsin"],
  ["WY", "Wyoming"],
] as const;

export const formattedNumber = (value: string) => {
  let digits = value.replace(/\D/g, "");

  // Remove leading country code (1) if present
  if (digits.length === 11 && digits.startsWith("1")) {
    digits = digits.slice(1);
  }

  digits = digits.slice(0, 10);

  if (digits.length > 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  if (digits.length > 3) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }

  if (digits.length > 0) {
    return `(${digits}`;
  }

  return "";
};
