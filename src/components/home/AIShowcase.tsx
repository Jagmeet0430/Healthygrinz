export function AIShowcase() {
  const features = [
    {
      title: "Clinic-aware chat",
      text: "Answers timing, treatment, appointment, and preparation questions from Healthy Grins content.",
    },
    {
      title: "Voice guidance",
      text: "Patients can speak a question and hear the assistant respond before booking.",
    },
    {
      title: "Doctor AI Lab",
      text: "Report and X-ray uploads produce structured observations, red flags, and questions to verify.",
    },
  ];

  return (
    <section className="ai-showcase" aria-labelledby="ai-title">
      <div className="ai-showcase-inner">
        <div>
          <p className="section-kicker">Smart clinic experience</p>
          <h2 id="ai-title">AI support that makes every visit feel prepared.</h2>
          <p>
            Patients get faster clarity before booking, while the doctor gets a focused review assistant for clinical
            notes and reports.
          </p>
        </div>
        <div className="ai-feature-grid">
          {features.map((feature) => (
            <article key={feature.title}>
              <span aria-hidden="true" />
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

