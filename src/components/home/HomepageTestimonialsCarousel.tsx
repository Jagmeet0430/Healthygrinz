"use client";

import { useEffect, useMemo, useState } from "react";
import type { SiteContent } from "@/lib/content";

type HomepageTestimonialsCarouselProps = {
  reviews: SiteContent["reviews"];
};

export function HomepageTestimonialsCarousel({ reviews }: HomepageTestimonialsCarouselProps) {
  const testimonials = useMemo(
    () =>
      reviews.length
        ? reviews
        : [{ name: "Healthy Grins patient", quote: "The appointment felt calm, clear, and reassuring." }],
    [reviews],
  );
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || testimonials.length <= 1) return undefined;
    const interval = window.setInterval(() => {
      setCurrent((index) => (index + 1) % testimonials.length);
    }, 5200);
    return () => window.clearInterval(interval);
  }, [paused, testimonials.length]);

  useEffect(() => {
    if (current >= testimonials.length) setCurrent(0);
  }, [current, testimonials.length]);

  const active = testimonials[current];

  return (
    <article
      className="clinic-testimonial-card"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <p className="clinic-kicker">Testimonials</p>
      <h2 id="reviews-title">Patients feel heard before treatment begins.</h2>
      <div className="clinic-testimonial-slide" key={`${active.name}-${current}`}>
        <blockquote>{active.quote}</blockquote>
        <cite>{active.name}</cite>
      </div>
      <div className="clinic-dots" aria-label="Choose testimonial">
        {testimonials.map((testimonial, index) => (
          <button
            aria-label={`Show testimonial from ${testimonial.name}`}
            aria-current={index === current}
            className={index === current ? "is-active" : ""}
            key={`${testimonial.name}-${index}`}
            type="button"
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </article>
  );
}
