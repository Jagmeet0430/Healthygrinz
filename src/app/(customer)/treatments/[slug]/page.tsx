import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSiteContent } from "@/lib/content";

type TreatmentPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: TreatmentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = await getSiteContent();
  const treatment = content.treatments.find((item) => item.slug === slug);

  if (!treatment) {
    return {};
  }

  return {
    title: treatment.title,
    description: treatment.description,
  };
}

export default async function TreatmentDetailPage({ params }: TreatmentPageProps) {
  const { slug } = await params;
  const content = await getSiteContent();
  const treatment = content.treatments.find((item) => item.slug === slug);

  if (!treatment) {
    notFound();
  }

  return (
    <section className="section treatment-detail">
      <Link className="text-link" href="/treatments">
        Back to treatments
      </Link>
      <p className="section-kicker">Treatment</p>
      <h1>{treatment.title}</h1>
      <p className="lead">{treatment.description}</p>
      <div className="detail-grid">
        <article>
          <h2>Good for</h2>
          <p>{treatment.goodFor}</p>
        </article>
        <article>
          <h2>What to expect</h2>
          <p>{treatment.details}</p>
        </article>
      </div>
      <a className="button primary" href="/booking">
        Book consultation
      </a>
    </section>
  );
}
