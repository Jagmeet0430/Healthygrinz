import type { Treatment } from "@/lib/content";

type TreatmentsProps = {
  treatments: Treatment[];
};

export function Treatments({ treatments }: TreatmentsProps) {
  return (
    <section className="section services-section" id="services" aria-labelledby="services-title">
      <div className="section-heading split">
        <div>
          <p className="section-kicker">Services</p>
          <h2 id="services-title">Clear treatments, explained in plain language.</h2>
        </div>
        <a className="button outline" href="/contact">
          Ask about a service
        </a>
      </div>
      <div className="services-grid">
        {treatments.map((treatment) => (
          <article className="service-card" key={treatment.slug}>
            <h3>{treatment.title}</h3>
            <p>{treatment.description}</p>
            <span>Good for: {treatment.goodFor}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
