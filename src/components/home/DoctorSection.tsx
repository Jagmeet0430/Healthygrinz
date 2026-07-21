import Image from "next/image";
import Link from "next/link";

export default function DoctorProfile() {
  return (
    <section className="about-section doctor-section">
      <div className="about-container">

        <div className="doctor-grid">

          {/* Doctor Image */}
          <div className="doctor-image">

            <Image
              src="/images/about/doctor.jpg"
              alt="Dr. Lisha"
              width={300}
              height={300}
              className="doctor-photo"
            />

          </div>

          {/* Doctor Content */}
          <div className="doctor-content">

            <span className="about-subtitle">
              Meet Our Doctor
            </span>

            <h2 className="about-title">
              Dr. Lisha
            </h2>

            <p className="doctor-role">
              BDS • Cosmetic & Family Dentist
            </p>

            <p className="about-text">
              Dr. Lisha is dedicated to providing compassionate,
              ethical and modern dental care. She believes that
              every patient deserves a healthy smile and a comfortable
              treatment experience.
            </p>

            <p className="about-text">
              Using advanced dental technology and evidence-based
              treatments, she focuses on preventive care,
              cosmetic dentistry and personalized treatment plans.
            </p>

            {/* Statistics */}
            <div className="doctor-stats">

              <div className="doctor-stat">
                <h3>6+</h3>
                <span>Years Experience</span>
              </div>

              <div className="doctor-stat">
                <h3>5000+</h3>
                <span>Patients Treated</span>
              </div>

              <div className="doctor-stat">
                <h3>98%</h3>
                <span>Patient Satisfaction</span>
              </div>

            </div>

            {/* Philosophy */}
            <div className="doctor-philosophy">

              <h3>Our Philosophy</h3>

              <p>
                &ldquo;Every smile tells a story. Our mission is to make
                that story healthier, brighter and more confident
                through modern dentistry and genuine care.&rdquo;
              </p>

            </div>

            <Link
              href="/booking"
              className="about-btn-primary"
            >
              Book Consultation
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}
