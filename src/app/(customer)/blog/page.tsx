import type { Metadata } from "next";
import Link from "next/link";
import { FiBookmark, FiEye, FiHeart, FiMessageCircle, FiSearch, FiShare2 } from "react-icons/fi";
import { getBlogs, getPublishedBlogs, getReadingTime } from "@/lib/blogs";

export const metadata: Metadata = {
  title: "Dental Knowledge Center",
  description:
    "Evidence-based dental education, treatment guides, oral hygiene tips, cosmetic dentistry, AI-assisted diagnosis, patient stories and expert advice from DentMind AI.",
};

const categories = [
  "Oral Hygiene",
  "Cosmetic Dentistry",
  "Root Canal",
  "Implants",
  "Pediatric Dentistry",
  "Orthodontics",
  "AI Dentistry",
  "Emergency Care",
  "Preventive Care",
];

export default async function BlogPage() {
  const posts = getPublishedBlogs(await getBlogs());
  const [featured, ...recent] = posts;
  const totalMinutes = posts.reduce((sum, post) => sum + getReadingTime(post.content), 0);

  return (
    <section className="page-section blog-page premium-blog-page">
      <div className="blog-hub-hero premium-blog-hero">
        <div>
          <p className="section-kicker">DentMind AI Knowledge Center</p>
          <h1>Dental Knowledge Center</h1>
          <p>
            Evidence-based dental education, treatment guides, oral hygiene tips, cosmetic dentistry, AI-assisted
            diagnosis, patient stories and expert advice from DentMind AI.
          </p>
        </div>
        <div className="premium-blog-search">
          <FiSearch aria-hidden="true" />
          <input placeholder="Search symptoms, treatments, articles, or dental questions..." aria-label="Search dental articles" />
          <button type="button">Search</button>
        </div>
        <div className="premium-category-pills" aria-label="Trending categories">
          {categories.map((category) => (
            <Link key={category} href={`/blog?category=${encodeURIComponent(category)}`}>
              {category}
            </Link>
          ))}
        </div>
        <div className="premium-blog-stats">
          <span>{posts.length} expert articles</span>
          <span>{totalMinutes} min education library</span>
          <span>AI summaries on every article</span>
          <Link href="#newsletter">Newsletter</Link>
        </div>
      </div>

      {featured ? (
        <article className="featured-article-card">
          <div className="featured-article-media">
            <span>Featured</span>
            <strong>{featured.category}</strong>
          </div>
          <div className="featured-article-copy">
            <div className="article-meta-row">
              <span>{featured.category}</span>
              <span>{getReadingTime(featured.content)} min read</span>
              <span>{new Date(featured.updatedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
            </div>
            <h2>{featured.title}</h2>
            <p>{featured.excerpt}</p>
            <div className="article-author-row">
              <span className="doctor-avatar">DL</span>
              <div>
                <strong>{featured.author}</strong>
                <small>BDS, Dental Surgeon</small>
              </div>
            </div>
            <div className="article-stats-row">
              <span><FiEye /> 2.4k</span>
              <span><FiHeart /> 184</span>
              <span><FiMessageCircle /> 18</span>
              <button type="button"><FiBookmark /> Save</button>
              <button type="button"><FiShare2 /> Share</button>
            </div>
            <div className="blog-hub-actions">
              <Link className="button primary" href={`/blog/${featured.slug}`}>Read Article</Link>
              <Link className="button secondary" href={`/blog/${featured.slug}`}>AI Summary</Link>
            </div>
          </div>
        </article>
      ) : null}

      <div className="premium-blog-layout">
        <main className="editorial-article-list">
          <div className="section-heading split">
            <div>
              <p className="section-kicker">Recent Articles</p>
              <h2>Expert dental guidance, designed for real patients.</h2>
            </div>
          </div>
          {recent.map((post, index) => (
            <article className={`editorial-article-card ${index % 2 ? "is-reversed" : ""}`} key={post.id}>
              <div className="editorial-card-media">
                <span>{post.category}</span>
              </div>
              <div className="editorial-card-copy">
                <div className="article-meta-row">
                  <span>{post.author}</span>
                  <span>{new Date(post.updatedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                  <span>{getReadingTime(post.content)} min read</span>
                </div>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <div className="article-stats-row">
                  <span><FiEye /> 980</span>
                  <span><FiHeart /> 76</span>
                  <span><FiMessageCircle /> 9</span>
                  <button type="button"><FiBookmark /> Bookmark</button>
                  <button type="button"><FiShare2 /> Share</button>
                </div>
                <Link className="text-link" href={`/blog/${post.slug}`}>Read More</Link>
              </div>
            </article>
          ))}
        </main>

        <aside className="premium-blog-sidebar">
          <section>
            <strong>Popular Articles</strong>
            {posts.slice(0, 3).map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>{post.title}</Link>
            ))}
          </section>
          <section>
            <strong>Patient Resources</strong>
            <Link href="/booking">Free Smile Assessment</Link>
            <Link href="/#services">Treatment Cost Guide</Link>
            <Link href="/faq">Emergency Guide</Link>
            <Link href="/treatments">Dental Dictionary</Link>
          </section>
          <section className="sidebar-ai-card">
            <strong>AI Oral Health Checker</strong>
            <p>Ask DentMind AI about symptoms, treatments, reports, and appointment planning.</p>
            <Link href="/booking">Start assessment</Link>
          </section>
          <section id="newsletter" className="sidebar-newsletter-card">
            <strong>Stay Updated</strong>
            <p>Receive weekly dental health tips.</p>
            <form>
              <input type="email" placeholder="Email address" aria-label="Email address" />
              <button type="submit">Subscribe</button>
            </form>
          </section>
        </aside>
      </div>

      <section className="blog-footer-cta">
        <div>
          <p className="section-kicker">Need professional dental care?</p>
          <h2>Book care, ask AI, or call the clinic.</h2>
        </div>
        <div>
          <Link className="button primary" href="/booking">Book Appointment</Link>
          <Link className="button secondary" href="/#contact">Call Clinic</Link>
        </div>
      </section>
    </section>
  );
}
