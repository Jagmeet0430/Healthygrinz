
import Link from "next/link";

export default function Technology() {
  const technologies = [
    {
      icon: "🩻",
      title: "Digital X-Ray",
      description:
        "Low-radiation digital imaging for faster, safer and highly accurate diagnosis.",
      tag: "Digital Imaging",
    },
    {
      icon: "📷",
      title: "Intraoral Camera",
      description:
        "High-definition images help patients clearly understand their oral health and treatment.",
      tag: "HD Visualization",
    },
    {
      icon: "✨",
      title: "Laser Dentistry",
      description:
        "Minimally invasive procedures with improved precision, comfort and quicker recovery.",
      tag: "Advanced Care",
    },
    {
      icon: "🦷",
      title: "Premium Dental Chairs",
      description:
        "Ergonomic treatment chairs designed to maximize comfort throughout every procedure.",
      tag: "Patient Comfort",
    },
    {
      icon: "🛡️",
      title: "Sterilization System",
      description:
        "International sterilization standards ensure a clean, safe and infection-free environment.",
      tag: "100% Hygiene",
    },
    {
      icon: "💻",
      title: "Digital Records",
      description:
        "Secure digital patient records for efficient diagnosis and personalized treatment planning.",
      tag: "Smart Management",
    },
  ];

  return (
    <section className="about-section technology-section">
      {/* <div className="about-container"> */}

        <div className="section-heading">

          <span className="about-subtitle">
            TECHNOLOGY & EQUIPMENT
          </span>

          <h2 className="about-title">
            Modern Dentistry Built Around Precision
          </h2>

          <p className="about-text">
            At HealthyGrinz Dental Clinic, we combine advanced technology,
            precision instruments and modern treatment techniques to deliver
            safe, comfortable and predictable dental care.
          </p>

        </div>

        {/* Featured Image */}

        <div className="technology-banner">

          

        {/* Technology Cards */}

        <div className="technology-grid">

          {technologies.map((item, index) => (

            <div
              className="technology-card"
              key={index}
            >

              <div className="technology-top">

                <div className="technology-icon">
                  {item.icon}
                </div>

                <span className="technology-tag">
                  {item.tag}
                </span>

              </div>

              <h3>{item.title}</h3>

              <p>{item.description}</p>

              <Link
                href="/services"
                className="technology-link"
              >
               
              </Link>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}