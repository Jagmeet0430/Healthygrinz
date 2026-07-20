import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { getSiteContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Healthy Grins Dental Clinic in Krishna Nagar, East Delhi.",
};

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const { contact } = await getSiteContent();

  return (
    <section className="contact-section">
      <div className="contact-copy">
        <p className="section-kicker">Contact</p>
        <h1>{contact.title}</h1>
        <address>
          {contact.addressLines.map((line) => (
            <span key={line}>
              {line}
              <br />
            </span>
          ))}
        </address>
        <div className="contact-actions">
          <a className="button primary" href={`tel:${contact.phoneHref}`}>
            Call clinic
          </a>
          <a
            className="button secondary"
            href={contact.mapsUrl}
            target="_blank"
            rel="noreferrer"
          >
            Get directions
          </a>
        </div>
      </div>
      <ContactForm />
    </section>
  );
}
