import Image from "next/image";
import Link from "next/link";

export default function AboutHero() {
  return (
    <section className="about-hero">
      <div className="about-container">
        <div className="about-hero-grid">

          {/* Left Content */}
          <div>

            <span className="about-subtitle">
              About HealthyGrinz
            </span>

            <h1>
              Creating Healthy Smiles
              <br />
              with Care & Technology
            </h1>

            <p>
              HealthyGrinz Dental Clinic combines compassionate dental care with
              advanced technology to provide safe, comfortable and personalized
              treatment for every patient. Our goal is to help families achieve
              healthy, confident smiles in a calm and welcoming environment.
            </p>

            <div className="about-buttons">

              <Link
                href="/booking"
                className="about-btn-primary"
              >
                Book Appointment
              </Link>

              <Link
                href="/contact"
                className="about-btn-outline"
              >
                Contact Us
              </Link>

            </div>

            {/* Statistics */}

            <div className="about-stats">

              <div className="about-stat">
                <h3>Advanced Technology
</h3>
                <span>Modern digital equipment
</span>
              </div>

              <div className="about-stat">
                <h3>Gentle Dental Care</h3>
                <span>Comfortable & painless treatment
</span>
              </div>

              <div className="about-stat">
                <h3>Sterilized Clinic</h3>
                <span>100% hygiene protocols</span>
              </div>

            </div>

          </div>

          {/* Right Image */}

          <div className="about-image">

            <Image
              src="/images/about/about-hero.avif"
              alt="HealthyGrinz Dental Clinic"
              width={650}
              height={700}
              priority
            />

          </div>

        </div>
      </div>
    </section>
  );
}