import type { Metadata } from "next";
import { DoctorSection } from "@/components/home/DoctorSection";
import { getSiteContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "Meet Dr. Lisha, BDS, and learn about Healthy Grins Dental Clinic in Krishna Nagar, East Delhi.",
};

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const content = await getSiteContent();

  return (
    <>
      <section className="page-hero">
        <p className="section-kicker">About the clinic</p>
        <h1>Dental visits made clear, calm, and personal.</h1>
        <p>
          Healthy Grins Dental Clinic focuses on practical explanations, hygienic care, and treatment plans patients can understand before they begin.
        </p>
      </section>
      <DoctorSection doctor={content.doctor} />
    </>
  );
}
