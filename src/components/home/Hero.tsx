import Image from "next/image";
import { getWhatsappUrl, type SiteContent } from "@/lib/content";

type HeroProps = {
  hero: SiteContent["hero"];
  contact: SiteContent["contact"];
};

export function Hero({ hero, contact }: HeroProps) {
  return (
    <section className="hero" id="home">
      <Image
        src="/images/healthy-grins-hero-hd.png"
        alt="A dentist consulting with a patient inside a clean dental clinic"
        fill
        priority
        sizes="100vw"
      />
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className="eyebrow">{hero.location}</p>
        <h1>{hero.title}</h1>
        <p className="hero-copy">{hero.copy}</p>
        <div className="hero-actions" aria-label="Appointment actions">
          <a
            className="button primary"
            href={getWhatsappUrl(contact.phoneHref)}
            target="_blank"
            rel="noreferrer"
          >
            {hero.primaryCta}
          </a>
          <a className="button secondary" href={`tel:${contact.phoneHref}`}>
            {hero.secondaryCta}
          </a>
        </div>
        <dl className="hero-facts" aria-label="Clinic quick facts">
          {hero.facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
