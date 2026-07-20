import { BookingForm } from "@/components/forms/BookingForm";
import type { SiteContent } from "@/lib/content";

type ContactSectionProps = {
  contact: SiteContent["contact"];
};

export function ContactSection({ contact }: ContactSectionProps) {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-copy">
        <p className="section-kicker">Contact</p>
        <h2 id="contact-title">{contact.title}</h2>
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
        <ul className="contact-list">
          <li>
            <strong>Phone:</strong> <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
          </li>
          <li>
            <strong>Email:</strong> <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </li>
          <li>
            <strong>Hours:</strong> {contact.hours}
          </li>
        </ul>
      </div>
      <BookingForm phoneHref={contact.phoneHref} />
    </section>
  );
}
