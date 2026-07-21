import Link from "next/link";

export default function MissionVision() {
  return (
    <section className="about-section mission-section">
      <div className="about-container">

        <div className="section-heading">
          <span className="about-subtitle">
            OUR VALUES
          </span>

          <h2 className="about-title">
            Mission & Vision
          </h2>

          <p className="about-text">
            At HealthyGrinz Dental Clinic, every smile is treated with compassion,
            precision and innovation. Our mission and vision inspire us to deliver
            exceptional dental care while building lasting relationships with every patient.
          </p>
        </div>

        <div className="mission-grid">

          {/* Mission */}

          <div className="mission-card">

            <div className="mission-top">

              <div className="mission-icon">
                🦷
              </div>

              <span className="mission-badge">
                Our Mission
              </span>

            </div>

            <h3>
              Creating Healthy & Confident Smiles
            </h3>

            <p>
              To provide ethical, affordable and technology-driven dental care
              that makes every patient feel comfortable, respected and confident
              throughout their smile journey.
            </p>

            <div className="mission-list">

              <span>✓ Patient-Centered Care</span>

              <span>✓ Modern Dental Technology</span>

              <span>✓ Safe & Sterile Environment</span>

              <span>✓ Transparent Treatment Plans</span>

            </div>

            <Link
              href="/services"
              className="mission-btn"
            >
              
            </Link>

          </div>

          {/* Vision */}

          <div className="mission-card vision-card">

            <div className="mission-top">

              <div className="mission-icon">
                ✨
              </div>

              <span className="mission-badge">
                Our Vision
              </span>

            </div>

            <h3>
              Becoming Delhi's Trusted Smile Destination
            </h3>

            <p>
              To become one of India's most trusted modern dental clinics by
              combining innovation, expertise and compassionate care with
              world-class treatment standards.
            </p>

            <div className="mission-list">

              <span>✓ Trusted Dental Brand</span>

              <span>✓ Healthy Smiles For Every Family</span>

              <span>✓ Continuous Innovation</span>

              <span>✓ Long-Term Patient Relationships</span>

            </div>

            <Link
              href="/contact"
              className="mission-btn"
            >
              
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}