/**
 * Single source of truth for company details used across the site.
 *
 * Anything under `unverifiedClaims` is intentionally NOT rendered anywhere yet.
 * Each item needs a verifiable source before it goes on the site — a license
 * number, a public profile URL, a membership ID. Fill in `evidence` and then
 * wire the claim into the footer / About page.
 */

export const COMPANY = {
  name: "ZIPPY Cash",
  phone: "(747) 202-9713",
  phoneHref: "tel:+‪17472029713",
  email: " info@zippycash.online",
  address: {
    street: "3101 Ocean Park Blvd #140",
    city: "Santa Monica",
    region: "CA",
    postalCode: "90405",
    country: "United States",
  },
} as const;

export const COMPANY_ADDRESS_LINE = `${COMPANY.address.street}, ${COMPANY.address.city}, ${COMPANY.address.region} ${COMPANY.address.postalCode}, ${COMPANY.address.country}`;

/**
 * Claims from the original content spec that cannot be published as-is.
 * Publishing an unearned trust badge or a lending-license reference without a
 * number is a compliance problem independent of intent, so these stay off the
 * page until `evidence` is filled in.
 */
export const unverifiedClaims = [
  {
    id: "cfl-license",
    claim:
      "Loans made or arranged pursuant to a California Financing Law license.",
    needs:
      "CFL license number issued by the CA DFPI. Required to be displayed.",
    evidence: null,
  },
  {
    id: "bbb",
    claim: "BBB Verified Lender",
    needs: "Public BBB profile URL for the legal entity.",
    evidence: null,
  },
  {
    id: "ola",
    claim: "Member of the Online Lenders Alliance (OLA)",
    needs: "OLA membership confirmation or listing URL.",
    evidence: null,
  },
  {
    id: "top-10-award",
    claim: 'Awarded "Top 10 Lenders in California"',
    needs: "Awarding body, year, and a link to the published result.",
    evidence: null,
  },
] as const;
