import Image from "next/image";

const images = [
  {
    src: "/images/about/image(3).avif",
    alt: "HealthyGrinz Reception",
  },
  {
    src: "/images/about/image(2).avif",
    alt: "Treatment Room",
  },
  {
    src: "/images/about/clinic(1).avif",
    alt: "Clinic Exterior",
  },
];

export default function ClinicGallery() {
  return (
    <section className="about-section">
      <div className="about-container">

        <div className="section-heading">
          <span className="about-subtitle">
            Our Clinic
          </span>

          <h2 className="about-title">
            Experience HealthyGrinz
          </h2>

          <p className="about-text">
            Take a look inside our modern dental clinic, designed to provide a
            comfortable, welcoming and advanced treatment environment for every
            patient.
          </p>
        </div>

        <div className="gallery-grid">
          {images.map((image) => (
            <div className="gallery-item" key={image.src}>
              <Image
                src={image.src}
                alt={image.alt}
                width={600}
                height={450}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}