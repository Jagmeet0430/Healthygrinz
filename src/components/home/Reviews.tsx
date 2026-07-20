import type { SiteContent } from "@/lib/content";

type ReviewsProps = {
  reviews: SiteContent["reviews"];
};

export function Reviews({ reviews }: ReviewsProps) {
  const featured = reviews[0];

  return (
    <section className="testimonial-band" aria-labelledby="testimonial-title">
      <div>
        <p className="section-kicker">Patients recommending</p>
        <h2 id="testimonial-title">Comfort matters as much as treatment.</h2>
      </div>
      {featured ? (
        <blockquote>
          {featured.quote}
          <cite>{featured.name}</cite>
        </blockquote>
      ) : null}
    </section>
  );
}
