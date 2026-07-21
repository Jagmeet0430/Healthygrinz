import Link from "next/link";

export default function BookCTA() {
  return (
    <section className="about-cta">
      <div className="about-container">

        <div className="cta-card">

          <span className="about-subtitle">
            Ready to Transform Your Smile?
          </span>

          <h2>
            Schedule Your Dental Visit Today
          </h2>

          <p>
            Whether you need a routine dental check-up, cosmetic treatment,
            orthodontic care or emergency dental services, our experienced team
            is here to help you achieve a healthy and confident smile.
          </p>

          <div className="cta-buttons">

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

          <div className="cta-contact">

            <div>
              <strong>📞 Call Us</strong>
              <span>+91 9821127942 </span>
            </div>

            <div>
              <strong>📧 Email</strong>
              <span>healthygrinsbylisha@gmail.com</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}