import type { Metadata } from "next";
import Link from "next/link";
import { getSiteContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Treatments",
  description: "Explore dental treatments available at Healthy Grins Dental Clinic.",
};

export const dynamic = "force-dynamic";

export default async function TreatmentsPage() {
  const content = await getSiteContent();

  return (
    <section className="section page-section">
      <div className="section-heading split">
        <div>
          <p className="section-kicker">Treatments</p>
          <h1>Clear dental care for common concerns.</h1>
        </div>
        <Link className="button outline" href="/booking">
          Book appointment
        </Link>
      </div>
      <div className="services-grid">
        {content.treatments.map((treatment) => (
          <article className="service-card" key={treatment.slug}>
            <h2>{treatment.title}</h2>
            <p>{treatment.description}</p>
            <span>{treatment.goodFor}</span>
            <Link className="text-link" href={`/treatments/${treatment.slug}`}>
              Learn more
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
