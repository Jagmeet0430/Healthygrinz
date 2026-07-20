import type { Metadata } from "next";
import { BookingForm } from "@/components/forms/BookingForm";
import { getSiteContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Booking",
  description: "Request a dental appointment at Healthy Grins Dental Clinic.",
};

export const dynamic = "force-dynamic";

export default async function BookingPage() {
  const content = await getSiteContent();

  return (
    <section className="contact-section">
      <div className="contact-copy">
        <p className="section-kicker">Booking</p>
        <h1>Send an appointment request.</h1>
        <p>
          Share your concern and preferred timing. The request can be saved through the website and also opened in WhatsApp for a faster clinic response.
        </p>
        <ol className="mini-steps">
          <li>Tell us the concern</li>
          <li>Visit for examination</li>
          <li>Review treatment options clearly</li>
        </ol>
      </div>
      <BookingForm phoneHref={content.contact.phoneHref} />
    </section>
  );
}
