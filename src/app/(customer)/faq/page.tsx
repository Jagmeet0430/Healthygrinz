import type { Metadata } from "next";
import { getSiteContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common dental appointment and treatment questions.",
};

export const dynamic = "force-dynamic";

export default async function FaqPage() {
  const content = await getSiteContent();

  return (
    <section className="section page-section">
      <p className="section-kicker">FAQ</p>
      <h1>Quick answers before you book.</h1>
      <div className="faq-list">
        {content.faqs.map((faq) => (
          <details key={faq.question}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
