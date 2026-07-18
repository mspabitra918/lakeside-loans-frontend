/**
 * Testimonial content is unchanged and stays that way. No star ratings, no
 * aggregate score, no review count — none of that is backed by anything in the
 * codebase, and `src/lib/company.ts` documents why unevidenced trust signals
 * stay off the page.
 *
 * Lives here rather than inside a component because two surfaces render it: the
 * /reviews grid and the carousel.
 */

export type Testimonial = {
  readonly title: string;
  readonly quote: string;
  readonly author: string;
  readonly location: string;
};

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    title: "Fastest funding ever.",
    quote:
      "I was skeptical, but the 10% fixed rate was exactly what I got. The money hit my bank account the very next morning. No hidden fees at all.",
    author: "Sarah T.",
    location: "California",
  },
  {
    title: "Lifesaver for unexpected bills.",
    quote:
      "My application took two minutes, and I had my pre-approval instantly. The agent was incredibly professional.",
    author: "Marcus J.",
    location: "Texas",
  },
  {
    title: "Straightforward and honest.",
    quote:
      "No origination fees and no surprises. Highly recommend them if you need cash quickly.",
    author: "David L.",
    location: "Florida",
  },
  {
    title: "Great for less-than-perfect credit.",
    quote: "They looked at the whole picture instead of only my credit score.",
    author: "Elena R.",
    location: "Ohio",
  },
];
