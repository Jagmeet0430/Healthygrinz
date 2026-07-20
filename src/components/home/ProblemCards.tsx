import type { SiteContent } from "@/lib/content";

type ProblemCardsProps = {
  concerns: SiteContent["concerns"];
};

export function ProblemCards({ concerns }: ProblemCardsProps) {
  return (
    <section className="section concern-section" aria-labelledby="concern-title">
      <div className="section-heading">
        <p className="section-kicker">Start here</p>
        <h2 id="concern-title">What brings you in today?</h2>
      </div>
      <div className="concern-grid">
        {concerns.map((concern) => (
          <article key={concern.title}>
            <span className="icon" aria-hidden="true">
              {concern.icon}
            </span>
            <h3>{concern.title}</h3>
            <p>{concern.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
