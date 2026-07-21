import Link from "next/link";

export default function WhyChoose() {
  const features = [
    {
      icon: "👨‍⚕️",
      title: "Experienced Dentists",
      description:
        "Our skilled dentists combine years of expertise with a patient-first approach to deliver precise, personalized treatments.",
      tag: "Expert Team",
    },
    {
      icon: "🦷",
      title: "Advanced Technology",
      description:
        "Modern diagnostic tools and digital dentistry ensure accurate treatment planning and comfortable procedures.",
      tag: "Digital Dentistry",
    },
    {
      icon: "🛡️",
      title: "Safe & Sterile Clinic",
      description:
        "Every treatment follows strict sterilization protocols, maintaining the highest standards of hygiene and safety.",
      tag: "100% Sterile",
    },
    {
      icon: "😊",
      title: "Comfortable Experience",
      description:
        "A calm environment with gentle treatment techniques helps every patient feel relaxed and confident.",
      tag: "Stress-Free Care",
    },
    {
      icon: "💜",
      title: "Personalized Care",
      description:
        "Every smile is unique. We create customized treatment plans designed around your oral health goals.",
      tag: "Customized Plans",
    },
    {
      icon: "⭐",
      title: "Trusted by Families",
      description:
        "HealthyGrinz is trusted by families for honest advice, ethical care and long-term dental wellness.",
      tag: "Trusted Care",
    },
  ];

  return (
    <section className="about-section why-section">
      <div className="about-container">

        <div className="section-heading">

          <span className="about-subtitle">
            WHY CHOOSE HEALTHYGRINZ
          </span>

          <h2 className="about-title">
            Excellence in Every Smile We Create
          </h2>

          <p className="about-text">
            Combining advanced technology, experienced professionals and
            compassionate care to deliver a premium dental experience for
            every patient.
          </p>

        </div>

        <div className="why-grid">

          {features.map((item, index) => (
            <div className="why-card" key={index}>

              <div className="why-top">

                <div className="why-icon">
                  {item.icon}
                </div>

                <span className="why-tag">
                  {item.tag}
                </span>

              </div>

              <h3>{item.title}</h3>

              <p>{item.description}</p>

              <Link
                href="/services"
                className="why-link"
              >
                
              </Link>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}