"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { TESTIMONIALS as testimonials } from "@/src/lib/testimonials";

export default function TestimonialsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({
      delay: 5000,
      // Autoplay is driven entirely from the effect below so that one code
      // path owns hover, focus, and reduced-motion.
      playOnInit: false,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      stopOnFocusIn: false,
    }),
  ]);

  const [selected, setSelected] = useState(0);
  const [snapCount, setSnapCount] = useState(testimonials.length);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  // Start conservative: no motion until we have actually measured the
  // preference. This also keeps SSR and first paint in agreement.
  const [reducedMotion, setReducedMotion] = useState(true);

  const paused = hovered || focused;
  const autoplayRunning = !paused && !reducedMotion;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(query.matches);

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const sync = () => {
      setSelected(emblaApi.selectedScrollSnap());
      setSnapCount(emblaApi.scrollSnapList().length);
    };

    sync();
    emblaApi.on("select", sync).on("reInit", sync);

    return () => {
      emblaApi.off("select", sync).off("reInit", sync);
    };
  }, [emblaApi]);

  /*
    The global `prefers-reduced-motion` block in globals.css neutralizes CSS
    animations and transitions, but it cannot stop a JavaScript timer — an
    unguarded autoplay would keep moving content for exactly the users who
    asked it not to. So the timer is gated here as well.
  */
  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    if (autoplayRunning) autoplay.play();
    else autoplay.stop();
  }, [emblaApi, autoplayRunning]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
      emblaApi?.plugins()?.autoplay?.reset();
    },
    [emblaApi],
  );

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
    emblaApi?.plugins()?.autoplay?.reset();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
    emblaApi?.plugins()?.autoplay?.reset();
  }, [emblaApi]);

  return (
    <section
      aria-label="Customer testimonials"
      aria-roledescription="carousel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <div className="overflow-hidden" ref={emblaRef}>
        {/*
          When autoplay is running the slides move on their own, so announcing
          every change would be noise. Once it is paused — hover, focus, reduced
          motion, or manual control — changes become user-initiated and are
          worth announcing.
        */}
        <div
          className="flex touch-pan-y"
          aria-live={autoplayRunning ? "off" : "polite"}
        >
          {testimonials.map((review, index) => (
            <article
              key={review.author}
              aria-label={`${index + 1} of ${testimonials.length}`}
              aria-roledescription="slide"
              className="min-w-0 flex-[0_0_100%] pr-5 md:flex-[0_0_50%]"
            >
              <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-7 shadow-card transition duration-200 hover:-translate-y-0.5 hover:shadow-card-lift sm:p-8">
                <Quote
                  aria-hidden="true"
                  className="h-7 w-7 text-teal-500"
                  strokeWidth={1.75}
                />

                <h3 className="mt-5 text-lg font-semibold text-ink-900">
                  {review.title}
                </h3>

                <blockquote className="mt-3 flex-1 text-base leading-relaxed text-pretty text-body">
                  <p>
                    &ldquo;{review.quote}&rdquo;
                  </p>
                </blockquote>

                <footer className="mt-7 flex items-center gap-3 border-t border-line pt-5">
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
                </footer>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink-900 shadow-card transition duration-150 hover:border-ink-900 hover:bg-canvas"
          >
            <ChevronLeft aria-hidden="true" className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink-900 shadow-card transition duration-150 hover:border-ink-900 hover:bg-canvas"
          >
            <ChevronRight aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          {Array.from({ length: snapCount }, (_, index) => {
            const isCurrent = index === selected;

            return (
              <button
                key={index}
                type="button"
                onClick={() => scrollTo(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={isCurrent ? "true" : undefined}
                className="group flex h-8 w-6 items-center justify-center"
              >
                <span
                  aria-hidden="true"
                  className={`block h-1.5 rounded-full transition-all duration-200 ${
                    isCurrent
                      ? "w-6 bg-teal-500"
                      : "w-1.5 bg-line group-hover:bg-muted"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
