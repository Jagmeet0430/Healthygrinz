import type { Metadata } from "next";
import Link from "next/link";
import { DoctorVideosShowcase } from "@/components/home/DoctorVideosShowcase";
import { doctorVideos } from "@/data/doctor-videos";

export const metadata: Metadata = {
  title: "Doctor Videos | Healthy Grins Dental Clinic",
  description: "Watch short educational dental videos from Healthy Grins doctors with AI summaries, FAQs, and booking actions.",
};

export default function DoctorVideosPage() {
  const featured = doctorVideos[0];

  return (
    <main className="doctor-videos-page">
      <section className="doctor-videos-page-hero">
        <p className="clinic-kicker">HealthyGrinz Video Hub</p>
        <h1>Dental advice in short, clear, doctor-led videos.</h1>
        <p>
          Explore root canal, whitening, pediatric care, cosmetic dentistry, and emergency dental guidance with
          AI-generated summaries and direct booking support.
        </p>
        <div>
          <Link className="clinic-button primary" href="/booking">Book Appointment</Link>
          <Link className="clinic-button ghost" href="/doctor-chat">Chat with Doctor</Link>
        </div>
      </section>

      <DoctorVideosShowcase />

      <section className="doctor-video-detail-preview">
        <div>
          <p className="clinic-kicker">Featured Video Detail</p>
          <h2>{featured.title}</h2>
          <p>{featured.aiSummary}</p>
        </div>
        <div className="doctor-video-detail-grid">
          <article>
            <strong>AI Transcript</strong>
            <p>{featured.aiTranscript}</p>
          </article>
          <article>
            <strong>AI FAQs</strong>
            {featured.aiFaqs.map((faq) => (
              <span key={faq.question}>{faq.question}: {faq.answer}</span>
            ))}
          </article>
          <article>
            <strong>Related Actions</strong>
            <span>Book appointment</span>
            <span>WhatsApp chat</span>
            <span>Download brochure</span>
            <span>View related treatment</span>
          </article>
        </div>
      </section>
    </main>
  );
}
