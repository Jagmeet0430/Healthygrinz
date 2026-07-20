"use client";

import Link from "next/link";
import { useState } from "react";
import {
  dentMindFeatures,
  dentMindMetrics,
  dentMindPricing,
  dentMindTestimonials,
  dentMindWorkflow,
} from "@/data/dentmind";
import { DentMindIcon } from "@/components/dentmind/DentMindIcon";

export function DentMindMarketing() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  return (
    <main className={`dm-page dm-${theme}`}>
      <header className="dm-header">
        <Link className="dm-brand" href="/dentmind">
          <span className="dm-brand-mark">D</span>
          <span>
            <strong>DentMind AI</strong>
            <small>Clinical intelligence platform</small>
          </span>
        </Link>
        <nav aria-label="DentMind navigation">
          <a href="#features">Features</a>
          <a href="#workflow">Workflow</a>
          <a href="#pricing">Pricing</a>
          <Link href="/dentmind/dashboard">Dashboard</Link>
        </nav>
        <div className="dm-header-actions">
          <button type="button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? "Light" : "Dark"}
          </button>
          <a className="dm-button dm-primary" href="#demo">
            Book demo
          </a>
        </div>
      </header>

      <section className="dm-hero" id="demo">
        <div className="dm-hero-copy">
          <p className="dm-kicker">AI operating system for modern dental clinics</p>
          <h1>The future of dental care will feel prepared before every appointment.</h1>
          <p>
            DentMind AI helps clinic owners save time, search records instantly, review reports, draft notes, and give
            doctors clinically grounded AI support with citations and audit trails.
          </p>
          <div className="dm-actions">
            <a className="dm-button dm-primary" href="mailto:healthygrinsbylisha@gmail.com?subject=DentMind%20AI%20demo">
              Request private demo
            </a>
            <Link className="dm-button dm-secondary" href="/dentmind/dashboard">
              Explore dashboard
            </Link>
          </div>
          <div className="dm-trust-row" aria-label="Trust indicators">
            <span>HIPAA-ready architecture</span>
            <span>Doctor verification</span>
            <span>Grounded citations</span>
          </div>
        </div>

        <div className="dm-live-demo" aria-label="Live AI workflow preview">
          <div className="dm-demo-toolbar">
            <span />
            <span />
            <span />
            <strong>Live clinical assistant</strong>
          </div>
          <div className="dm-demo-body">
            <div className="dm-patient-card">
              <span className="dm-status-dot" />
              <div>
                <strong>Arjun Rao</strong>
                <small>Lower molar pain - X-ray uploaded</small>
              </div>
            </div>
            <div className="dm-xray-card">
              <div className="dm-xray-grid">
                <span className="dm-heat dm-heat-one" />
                <span className="dm-heat dm-heat-two" />
              </div>
              <aside>
                <strong>AI observations</strong>
                <p>Possible periapical concern. Verify clinically and compare with symptoms.</p>
                <meter value={0.78}>78%</meter>
              </aside>
            </div>
            <div className="dm-chat-card">
              <span>Doctor</span>
              <p>Summarize the likely next exam steps.</p>
              <span>DentMind</span>
              <p>Check percussion, vitality, periodontal probing, and review radiograph quality. Clinical verification required.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="dm-logo-strip" aria-label="Trusted by clinics">
        {["ORTHO+", "SMILELAB", "ROOTCARE", "PERIOX", "ALIGNIQ"].map((logo) => (
          <span key={logo}>{logo}</span>
        ))}
      </section>

      <section className="dm-metrics" aria-label="DentMind in numbers">
        {dentMindMetrics.map((metric) => (
          <article key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
            <p>{metric.detail}</p>
          </article>
        ))}
      </section>

      <section className="dm-section" id="features">
        <div className="dm-section-heading">
          <p className="dm-kicker">Full AI clinic stack</p>
          <h2>Not a chatbot. A clinical operations layer.</h2>
          <p>
            DentMind connects records, reports, voice, RAG, X-ray analysis, scheduling, and analytics into one premium
            workspace.
          </p>
        </div>
        <div className="dm-feature-grid">
          {dentMindFeatures.map((feature) => (
            <article className="dm-feature-card" key={feature.title}>
              <DentMindIcon label={feature.title} />
              <span>{feature.tag}</span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="dm-workflow" id="workflow">
        <div>
          <p className="dm-kicker">Doctor workflow</p>
          <h2>From upload to verified clinical artifact.</h2>
        </div>
        <ol>
          {dentMindWorkflow.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>

      <section className="dm-split-section">
        <div className="dm-video-preview">
          <div className="dm-play">Play</div>
          <strong>2 min product walkthrough</strong>
          <p>See patient timeline, RAG citations, voice notes, and X-ray review in one flow.</p>
        </div>
        <div className="dm-ai-stack">
          <p className="dm-kicker">AI pipeline</p>
          <h2>Provider-agnostic, retrieval-first, audit-ready.</h2>
          <div className="dm-stack-list">
            {["OpenAI", "Gemini", "Claude", "Ollama", "Qdrant", "Pinecone", "FAISS", "Redis"].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="dm-testimonials">
        {dentMindTestimonials.map((testimonial) => (
          <blockquote key={testimonial.name}>
            <p>{testimonial.quote}</p>
            <cite>
              {testimonial.name}
              <span>{testimonial.role}</span>
            </cite>
          </blockquote>
        ))}
      </section>

      <section className="dm-section" id="pricing">
        <div className="dm-section-heading">
          <p className="dm-kicker">Pricing</p>
          <h2>Start focused. Scale to multi-clinic intelligence.</h2>
        </div>
        <div className="dm-pricing-grid">
          {dentMindPricing.map((plan) => (
            <article className={`dm-price-card ${plan.featured ? "is-featured" : ""}`} key={plan.name}>
              <span>{plan.name}</span>
              <strong>{plan.price}</strong>
              <p>{plan.text}</p>
              <ul>
                {plan.features.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a className="dm-button dm-secondary" href="#demo">
                Start conversation
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="dm-faq">
        <details open>
          <summary>Does DentMind replace the dentist?</summary>
          <p>No. It is clinical decision support. The doctor verifies every suggestion, note, and treatment artifact.</p>
        </details>
        <details>
          <summary>Can RAG answers avoid hallucination?</summary>
          <p>The RAG module is designed to answer only from uploaded documents and show citations/source chunks.</p>
        </details>
        <details>
          <summary>Is this ready for compliance review?</summary>
          <p>The architecture includes encryption, RBAC, audit logging, private uploads, and deployment controls for review.</p>
        </details>
      </section>

      <footer className="dm-footer">
        <strong>DentMind AI</strong>
        <span>The AI dental assistant platform for clinics that want the future now.</span>
        <Link href="/">Healthy Grins site</Link>
      </footer>
    </main>
  );
}

