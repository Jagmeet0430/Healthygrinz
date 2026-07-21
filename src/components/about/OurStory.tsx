import Image from "next/image";

export default function OurStory() {
  return (
    <section className="about-section">
      <div className="about-container">

        <div className="story-grid">

          {/* Left Image */}
          <div>
            <Image
              src="/images/about/our-story.avif"
              alt="HealthyGrinz Clinic"
              width={650}
              height={700}
            />
          </div>

          {/* Right Content */}
          <div className="story-card">

            <span className="about-subtitle">
              Our Story
            </span>

            <h2 className="about-title">
              Creating Beautiful Smiles Through
              Trusted Dental Care
            </h2>

            <p className="about-text">
              HealthyGrinz Dental Clinic was established with a vision to
              provide ethical, affordable and modern dental care for every
              patient. We believe every smile deserves personal attention,
              advanced treatment and compassionate care.
            </p>

            <p className="about-text">
              Our experienced dental team combines years of expertise with
              modern technology to deliver safe, comfortable and predictable
              treatments for patients of every age.
            </p>

            <div className="story-features">

              <div className="story-feature">
                ✓ Patient-Centered Care
              </div>

              <div className="story-feature">
                ✓ Modern Dental Technology
              </div>

              <div className="story-feature">
                ✓ Experienced Professionals
              </div>

              <div className="story-feature">
                ✓ Comfortable Environment
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}