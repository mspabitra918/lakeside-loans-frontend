import type { Metadata } from "next";
import Link from "next/link";
import { Quote } from "lucide-react";
import { PageShell } from "@/src/components/PageShell";
import { ROUTES } from "@/src/lib/navigation";
import { TESTIMONIALS } from "@/src/lib/testimonials";

export const metadata: Metadata = {
  title: "Reviews & Testimonials",
  description: "Read customer feedback and testimonials about Lakeside Loans.",
};

/**
 * A carousel used to hold these, which is the wrong pattern for the one page
 * whose entire job is reading the reviews: it showed two of four at a time,
 * auto-advanced under the reader, and put the rest behind a control. A grid
 * shows all of them at once with no interaction cost and no motion to suppress.
 * The carousel component still exists for surfaces where reviews are a sidebar
 * to other content.
 */
export default function ReviewsPage() {
  return (
    <PageShell
      eyebrow="Reviews"
      title="What our customers say"
      width="wide"
      intro={
        <p>
          Feedback submitted by Lakeside Loans customers about their borrowing
          experience.
        </p>
      }
    >
      <ul className="grid gap-6 sm:grid-cols-2">
        {TESTIMONIALS.map((review) => (
          <li key={review.author} className="flex">
            <figure className="flex h-full flex-col rounded-2xl border border-line bg-white p-7 shadow-card transition duration-200 hover:-translate-y-0.5 hover:shadow-card-lift sm:p-8">
              <Quote
                aria-hidden="true"
                className="h-7 w-7 text-teal-500"
                strokeWidth={1.75}
              />

              <h2 className="mt-5 text-lg font-semibold text-ink-900">
                {review.title}
              </h2>

              <blockquote className="mt-3 flex-1 text-base leading-relaxed text-pretty text-body">
                <p>&ldquo;{review.quote}&rdquo;</p>
              </blockquote>

              <figcaption className="mt-7 flex items-center gap-3 border-t border-line pt-5">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-canvas text-sm font-semibold text-ink-900"
                >
                  {review.author.charAt(0)}
                </span>

                <span>
                  <span className="block text-sm font-semibold text-ink-900">
                    {review.author}
                  </span>
                  <span className="block text-sm text-muted">
                    {review.location}
                  </span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      {/*
        Individual-results disclosure. These are unverified customer statements
        that name specific rates and funding times; presenting them without
        qualification reads as a promise of the same outcome to the next
        applicant. Rate and term are set by underwriting, not by testimonial.
      */}
      <p className="mt-10 max-w-full text-sm leading-6 text-muted">
        Testimonials reflect the individual experiences of the customers quoted
        and are not a guarantee of approval, rate, term, or funding time. Your
        rate and term depend on verification of your identity and income and on
        standard underwriting criteria.
      </p>

      <div className="mt-12 flex flex-col gap-4 rounded-2xl border border-line bg-canvas p-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-ink-900">
            Ready to start your application?
          </h2>
          <p className="mt-1.5 text-base text-body">
            Submitting does not guarantee approval and does not obligate you to
            accept a loan.
          </p>
        </div>

        <Link
          href={ROUTES.apply.href}
          className="shrink-0 rounded-xl bg-ink-900 px-6 py-3.5 text-center text-base font-semibold text-white shadow-card transition-[background-color,transform] duration-150 hover:-translate-y-0.5 hover:bg-ink-800"
        >
          {ROUTES.apply.label}
        </Link>
      </div>
    </PageShell>
  );
}
