import type { Metadata } from "next";
import { getSiteContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Read patient reviews for Healthy Grins Dental Clinic.",
};

export const dynamic = "force-dynamic";

export default async function ReviewsPage() {
  const content = await getSiteContent();

  return (
    <section className="section page-section">
      <p className="section-kicker">Reviews</p>
      <h1>Patients value comfort, clarity, and genuine care.</h1>
      <div className="review-grid">
        {content.reviews.map((review) => (
          <blockquote key={review.name}>
            {review.quote}
            <cite>{review.name}</cite>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
