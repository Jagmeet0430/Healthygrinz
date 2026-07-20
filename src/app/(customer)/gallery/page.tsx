import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Clinical Case Gallery",
  description:
    "Explore premium dental case journeys, smile transformations, cosmetic restorations, pediatric care, root canal treatment, and AI-assisted clinical insights.",
};

const cases = [
  {
    title: "Smile Brightening & Preventive Cleaning",
    problem: "Surface stains, plaque buildup, and gum sensitivity.",
    diagnosis: "Early gum inflammation with extrinsic staining.",
    treatment: "Scaling, polishing, hygiene coaching, and preventive follow-up.",
    duration: "45 minutes",
    recovery: "Same day",
    doctor: "Dr. Lisha",
    tags: ["Cleaning", "Preventive", "Low difficulty"],
    success: "98%",
  },
  {
    title: "Root Canal Tooth Preservation",
    problem: "Deep tooth pain and night sensitivity.",
    diagnosis: "Pulp inflammation requiring endodontic care.",
    treatment: "Root canal cleaning, sealing, and crown planning.",
    duration: "1-2 visits",
    recovery: "2-5 days tenderness",
    doctor: "Dr. Lisha",
    tags: ["Root Canal", "Pain Relief", "Moderate"],
    success: "96%",
  },
  {
    title: "Natural Crown Restoration",
    problem: "Weak tooth after deep decay.",
    diagnosis: "Reduced tooth structure and bite stress.",
    treatment: "Tooth build-up and crown restoration.",
    duration: "2 visits",
    recovery: "Normal chewing after fit check",
    doctor: "Dr. Lisha",
    tags: ["Crown", "Restorative", "Premium"],
    success: "97%",
  },
];

const filters = ["Smile Makeover", "Root Canal", "Crowns", "Whitening", "Pediatric", "Emergency", "AI Recommended"];

export default function GalleryPage() {
  return (
    <section className="gallery-premium-page">
      <header className="gallery-hero">
        <div className="gallery-hero-image" aria-hidden="true" />
        <div className="gallery-hero-card">
          <p className="section-kicker">Clinical Case Gallery</p>
          <h1>Our Clinical Case Gallery</h1>
          <p>
            Explore real patient treatment journeys, smile transformations, cosmetic restorations, implants,
            orthodontics, pediatric dentistry, and advanced dental procedures. Every case reflects our commitment to
            precision, ethics, modern technology, and exceptional patient care.
          </p>
          <div className="blog-hub-actions">
            <a className="button primary" href="#cases">View Cases</a>
            <a className="button secondary" href="#videos">Watch Procedures</a>
            <Link className="button secondary" href="/booking">Book Consultation</Link>
          </div>
        </div>
      </header>

      <div className="gallery-stats-row">
        <span><strong>5000+</strong> Cases</span>
        <span><strong>98%</strong> Success</span>
        <span><strong>15+</strong> Years</span>
        <span><strong>4.9</strong> Rating</span>
      </div>

      <section className="case-filter-bar" aria-label="Case filters">
        {filters.map((filter) => <button key={filter} type="button">{filter}</button>)}
      </section>

      <section id="cases" className="case-showcase-list">
        {cases.map((item, index) => (
          <article className={`case-showcase ${index % 2 ? "is-reversed" : ""}`} key={item.title}>
            <div className="case-visual">
              <div className="before-after-track">
                <span>Before</span>
                <span>After</span>
              </div>
            </div>
            <div className="case-copy">
              <p className="section-kicker">Case {String(index + 1).padStart(2, "0")}</p>
              <h2>{item.title}</h2>
              <div className="case-detail-grid">
                <span><strong>Problem</strong>{item.problem}</span>
                <span><strong>Diagnosis</strong>{item.diagnosis}</span>
                <span><strong>Treatment</strong>{item.treatment}</span>
                <span><strong>Duration</strong>{item.duration}</span>
                <span><strong>Doctor</strong>{item.doctor}</span>
                <span><strong>Recovery</strong>{item.recovery}</span>
              </div>
              <div className="case-tag-row">
                {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <div className="case-ai-insight">
                <strong>AI Insight</strong>
                <p>Estimated case success confidence: {item.success}. Dentist review and patient-specific examination remain essential.</p>
              </div>
              <div className="blog-hub-actions">
                <button className="button secondary" type="button">Download Case PDF</button>
                <Link className="button primary" href="/booking">Book Similar Treatment</Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section id="videos" className="procedure-video-section">
        <div className="procedure-video-card">
          <p className="section-kicker">Procedure Videos</p>
          <h2>Watch modern dental care explained clearly.</h2>
          <div className="video-filter-row">
            {["Cleaning", "Root Canal", "Crowns", "Kids Dentistry"].map((item) => <button key={item} type="button">{item}</button>)}
          </div>
          <div className="video-carousel-grid">
            {["Gentle Cleaning Workflow", "Root Canal Explained", "Crown Fit Journey"].map((title) => (
              <article key={title}>
                <div className="video-thumb"><span>Play</span></div>
                <strong>{title}</strong>
                <p>Doctor-led procedure overview with patient-friendly explanations.</p>
                <Link href="/booking">Watch Full Video</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="gallery-ai-cta">
        <div>
          <p className="section-kicker">DentMind AI Case Guidance</p>
          <h2>Ask AI about treatments, recovery, eligibility, and cost ranges.</h2>
        </div>
        <Link className="button primary" href="/booking">Start Consultation</Link>
      </section>
    </section>
  );
}
