import Link from "next/link";
import Image from "next/image";
import { getSiteContent, getWhatsappUrl } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const content = await getSiteContent();
  const featuredReview = content.reviews[0];
  const servicesSection = content.servicesSection || {
    kicker: "Our Services",
    title: "Everything your smile needs, explained simply.",
  };
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(content.contact.addressLines.join(" "))}&output=embed`;

  return (
    <div className="clinic-home">
      <section className="clinic-hero" id="home" aria-labelledby="home-title">
        <div className="clinic-hero-copy">
          <Image
            className="clinic-hero-logo"
            src="/images/healthy-grins-logo.svg"
            alt="Healthy Grins"
            width={230}
            height={72}
            priority
          />
          <p className="clinic-script">Crafting radiant smiles with care</p>
          <h1 id="home-title">Healthy Grins Dental Clinic</h1>
          <p>
            Premium dental care in Krishna Nagar for families who want clear guidance, gentle treatment, and a calmer
            clinic experience.
          </p>
          <div className="clinic-hero-actions">
            <Link className="clinic-button primary" href="/booking">
              Book Now
            </Link>
            <a className="clinic-button ghost" href={getWhatsappUrl(content.contact.phoneHref)} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </div>
        </div>
        <div className="clinic-hero-image">
          <Image
            src="/images/healthy-grins-hero-hd.png"
            alt="Healthy Grins dental clinic"
            fill
            priority
            sizes="100vw"
            className="hero-photo"
          />
        </div>
      </section>

      <section className="clinic-services" id="services" aria-labelledby="services-title">
        <div className="clinic-services-card">
          <p className="clinic-kicker">{servicesSection.kicker}</p>
          <h2 id="services-title">{servicesSection.title}</h2>
          <ul>
            {content.treatments.slice(0, 8).map((treatment) => (
              <li key={treatment.slug}>{treatment.title}</li>
            ))}
          </ul>
        </div>
        <div className="clinic-pattern-panel mint-pattern" aria-hidden="true">
          <span>+</span>
          <span>HG</span>
          <span>+</span>
        </div>
      </section>

      <section className="clinic-doctor" id="doctor" aria-labelledby="doctor-title">
        <p className="clinic-kicker">Meet the Doctor</p>
        <h2 id="doctor-title">Experienced, gentle, and focused on patient comfort.</h2>
        <div className="clinic-doctor-card">
          <div className="clinic-doctor-image">
            <Image
              src="/images/healthy-grins-doctor.png"
              alt="Healthy Grins dentist"
              fill
              sizes="(max-width: 700px) 86vw, 360px"
            />
          </div>
          <h3>{content.doctor.name}</h3>
          <p>{content.doctor.bio}</p>
          <Link className="clinic-button primary" href="/about">
            More About Us
          </Link>
        </div>
      </section>

      <section className="clinic-testimonials" id="reviews" aria-labelledby="reviews-title">
        <div className="clinic-pattern-panel purple-pattern" aria-hidden="true">
          <span>+</span>
          <span>HG</span>
          <span>+</span>
        </div>
        <article className="clinic-testimonial-card">
          <p className="clinic-kicker">Testimonials</p>
          <h2 id="reviews-title">Patients feel heard before treatment begins.</h2>
          <blockquote>{featuredReview?.quote || "The appointment felt calm, clear, and reassuring."}</blockquote>
          <cite>{featuredReview?.name || "Healthy Grins patient"}</cite>
          <div className="clinic-dots" aria-hidden="true">
            <span className="is-active" />
            <span />
            <span />
          </div>
        </article>
      </section>

      <section className="clinic-map" id="contact" aria-labelledby="map-title">
        <div className="clinic-pattern-strip peach-pattern" aria-hidden="true" />
        <div className="clinic-map-card">
          <p className="clinic-kicker">Find Us</p>
          <h2 id="map-title">Visit Healthy Grins Dental Clinic</h2>
          <iframe
            title="Healthy Grins Dental Clinic location"
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <address>
            {content.contact.addressLines.join(", ")}
            <br />
            {content.contact.hours}
          </address>
        </div>
        <div className="clinic-pattern-strip peach-pattern" aria-hidden="true" />
      </section>
    </div>
  );
}
