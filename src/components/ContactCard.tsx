import { Mail, MapPin, Phone } from "lucide-react";
import { COMPANY, COMPANY_ADDRESS_LINE } from "@/src/lib/company";

/**
 * Contact block shared by /about and /accessibility.
 *
 * Every value comes from `COMPANY` — nothing here is hardcoded, so changing a
 * phone number is a one-line edit in `src/lib/company.ts`.
 *
 * Rendered inside PageShell's prose wrapper, whose `[&_a]` defaults already
 * give links the teal underline treatment.
 */
export function ContactCard({ note }: { note?: string }) {
  const rows = [
    {
      icon: MapPin,
      label: "Address",
      value: <span className="text-ink-900">{COMPANY_ADDRESS_LINE}</span>,
    },
    {
      icon: Phone,
      label: "Phone",
      value: (
        <a href={COMPANY.phoneHref} className="num">
          {COMPANY.phone}
        </a>
      ),
    },
    {
      icon: Mail,
      label: "Email",
      value: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>,
    },
  ];

  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-white shadow-card">
      <address className="divide-y divide-line not-italic">
        {rows.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-start gap-4 p-5 sm:px-6">
            <span
              aria-hidden="true"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-canvas text-teal-600"
            >
              <Icon className="h-[18px] w-[18px]" />
            </span>

            <div className="min-w-0">
              <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">
                {label}
              </p>

              <p className="mt-1 break-words">{value}</p>
            </div>
          </div>
        ))}
      </address>

      {note ? (
        <p className="border-t border-line bg-canvas px-5 py-4 text-sm text-muted sm:px-6">
          {note}
        </p>
      ) : null}
    </div>
  );
}
