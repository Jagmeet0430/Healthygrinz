import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FiBookmark, FiEye, FiHeart, FiMessageCircle, FiPrinter, FiShare2 } from "react-icons/fi";
import { BlogAiPanel } from "@/components/blog/BlogAiPanel";
import { getBlogs, getPublishedBlogs, getReadingTime } from "@/lib/blogs";
import { getSiteContent } from "@/lib/content";

type BlogDetailProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPublishedBlogs(await getBlogs()).find((item) => item.slug === slug);

  if (!post) return { title: "Blog" };

  return {
    title: post.title,
    description: post.excerpt,
    keywords: [post.category, "dentist", "dental care", "DentMind AI", "Healthy Grins"],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailProps) {
  const { slug } = await params;
  const [posts, content] = await Promise.all([getBlogs(), getSiteContent()]);
  const published = getPublishedBlogs(posts);
  const post = published.find((item) => item.slug === slug);

  if (!post) notFound();

  const related = published.filter((item) => item.slug !== post.slug).slice(0, 3);
  const paragraphs = post.content.split("\n").filter(Boolean);
  const faq = [
    {
      question: `When should I visit a dentist for ${post.category.toLowerCase()} concerns?`,
      answer: "Book a dentist visit if pain, swelling, bleeding, sensitivity, or difficulty chewing continues or worsens.",
    },
    {
      question: "Can DentMind AI diagnose my dental problem?",
      answer: "No. DentMind AI provides educational support from this article only. A dentist must confirm diagnosis and treatment.",
    },
  ];
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "MedicalArticle",
      headline: post.title,
      description: post.excerpt,
      author: { "@type": "Person", name: post.author },
      publisher: { "@type": "MedicalClinic", name: "Healthy Grins Dental Clinic" },
      datePublished: post.createdAt,
      dateModified: post.updatedAt,
      medicalAudience: "Patient",
      about: post.category,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "/" },
        { "@type": "ListItem", position: 2, name: "Blog", item: "/blog" },
        { "@type": "ListItem", position: 3, name: post.title, item: `/blog/${post.slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ];

  return (
    <article className="page-section blog-detail premium-article-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="article-progress-bar" aria-hidden="true" />
      <nav className="article-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/blog">Blog</Link>
        <span>/</span>
        <strong>{post.category}</strong>
      </nav>
      <header className="premium-article-header">
        <span className="article-category-badge">{post.category}</span>
        <h1>{post.title}</h1>
        <p>{post.excerpt}</p>
        <div className="article-author-row">
          <span className="doctor-avatar">DL</span>
          <div>
            <strong>{post.author}</strong>
            <small>BDS, Dental Surgeon | Updated {new Date(post.updatedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} | {getReadingTime(post.content)} min read</small>
          </div>
        </div>
        <div className="article-stats-row">
          <span><FiEye /> 2.4k views</span>
          <span><FiHeart /> 184 likes</span>
          <span><FiMessageCircle /> 18 comments</span>
          <button type="button"><FiBookmark /> Bookmark</button>
          <button type="button"><FiShare2 /> Share</button>
          <button type="button"><FiPrinter /> Print</button>
        </div>
      </header>

      <div className="blog-detail-layout">
        <aside className="article-toc">
          <strong>On this page</strong>
          <a href="#overview">Overview</a>
          <a href="#education">Patient Education</a>
          <a href="#faq">FAQs</a>
          <a href="#related">Related</a>
        </aside>

        <main>
          {post.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="blog-detail-image" src={post.coverImage} alt={`${post.title} cover`} />
          ) : (
            <div className="article-cover-placeholder">
              <span>DentMind AI</span>
              <strong>{post.category}</strong>
            </div>
          )}
          <div id="overview" className="blog-copy">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <section id="education" className="patient-education-grid">
            <article>
              <strong>Symptoms to mention</strong>
              <p>Pain, swelling, bleeding gums, sensitivity, chewing discomfort, injury, or changes around old dental work.</p>
            </article>
            <article>
              <strong>When to visit</strong>
              <p>Visit sooner if symptoms continue, worsen, disturb sleep, or are linked with swelling or fever.</p>
            </article>
            <article>
              <strong>Prevention tips</strong>
              <p>Brush twice daily, clean between teeth, reduce frequent sugar exposure, and schedule routine dental checks.</p>
            </article>
            <article>
              <strong>Myth vs fact</strong>
              <p>Dental pain going away does not always mean the problem is solved. A dentist should still examine the tooth.</p>
            </article>
          </section>

          <section id="faq" className="article-faq-section">
            <p className="section-kicker">Frequently Asked Questions</p>
            {faq.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </section>

          <section className="blog-trust-panel">
            <p className="section-kicker">Doctor-reviewed guidance</p>
            <h2>Educational information, not a diagnosis.</h2>
            <p>
              This article is designed to help patients understand dental care topics in simple language. A dentist
              should review symptoms, X-rays, medical history, and oral examination findings before treatment decisions.
            </p>
            <Link className="button primary" href="/booking">Book appointment</Link>
          </section>

          <section id="related" className="related-article-grid">
            <p className="section-kicker">Recommended Reading</p>
            <h2>Continue learning with DentMind AI.</h2>
            <div>
              {related.map((item) => (
                <Link key={item.id} href={`/blog/${item.slug}`}>
                  <span>{item.category}</span>
                  <strong>{item.title}</strong>
                </Link>
              ))}
            </div>
          </section>
        </main>

        <BlogAiPanel post={post} treatments={content.treatments} />
      </div>
    </article>
  );
}
