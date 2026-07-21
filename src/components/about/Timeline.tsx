import Link from "next/link";

export default function Timeline() {
  const timeline = [
    {
      year: "2019",
      title: "HealthyGrinz Was Founded",
      description:
        "Established with a vision to deliver ethical, affordable and patient-first dental care in a welcoming environment.",
    },
    {
      year: "2020",
      title: "Growing Patient Trust",
      description:
        "Hundreds of families placed their trust in HealthyGrinz for quality treatment and compassionate dental care.",
    },
    {
      year: "2022",
      title: "Technology Upgrade",
      description:
        "Introduced advanced digital diagnostics, modern dental equipment and improved treatment planning.",
    },
    {
      year: "2024",
      title: "Complete Smile Solutions",
      description:
        "Expanded into cosmetic dentistry, smile makeovers, aligners and comprehensive restorative treatments.",
    },
  ];

  return (
    <section className="about-section timeline-section">
      <div className="about-container">

        <div className="section-heading">

          <span className="about-subtitle">
            OUR JOURNEY
          </span>

          <h2 className="about-title">
            Building Healthy Smiles,
            One Milestone at a Time
          </h2>

          <p className="about-text">
            Every achievement represents our commitment to innovation,
            compassion and excellence in modern dentistry.
          </p>

        </div>

        <div className="timeline-wrapper">

          <div className="timeline-line"></div>

          {timeline.map((item, index) => (

            <div
              key={index}
              className={`timeline-row ${
                index % 2 === 0 ? "left" : "right"
              }`}
            >

              <div className="timeline-card">

                <div className="timeline-badge">
                  {item.year}
                </div>

                <h3>{item.title}</h3>

                <p>{item.description}</p>

              </div>

            </div>

          ))}

        </div>

        {/* Achievement Card */}

        <div className="timeline-achievement">

          <div className="achievement-icon">
            🏆
          </div>

          <h3>
            5000+ Healthy Smiles Created
          </h3>

          <p>
            Today, HealthyGrinz continues to provide advanced,
            compassionate and personalized dental care for
            individuals and families across Delhi.
          </p>

          <Link
            href="/booking"
            className="about-btn-primary"
          >
            Book Your Visit
          </Link>

        </div>

      </div>
    </section>
  );
}