import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiBookmark, FiDownload, FiMessageCircle, FiShare2, FiZap } from "react-icons/fi";
import { doctorVideos } from "@/data/doctor-videos";

type DoctorVideoDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return doctorVideos.map((video) => ({ slug: video.slug }));
}

export async function generateMetadata({ params }: DoctorVideoDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const video = doctorVideos.find((item) => item.slug === slug);

  if (!video) {
    return {
      title: "Doctor Video | Healthy Grins Dental Clinic",
    };
  }

  return {
    title: video.seoTitle,
    description: video.seoDescription,
  };
}

export default async function DoctorVideoDetailPage({ params }: DoctorVideoDetailPageProps) {
  const { slug } = await params;
  const video = doctorVideos.find((item) => item.slug === slug);

  if (!video) notFound();

  const relatedVideos = doctorVideos.filter((item) => video.recommendedVideoSlugs.includes(item.slug));

  return (
    <main className="doctor-video-detail-page">
      <section className="doctor-video-detail-hero">
        <div className="doctor-video-player">
          <Image src={video.poster} alt={video.title} fill priority sizes="(max-width: 960px) 100vw, 58vw" />
          <div className="doctor-reel-gradient" />
          <span>{video.duration}</span>
          <strong>Doctor video preview</strong>
        </div>

        <aside className="doctor-video-side-panel">
          <p className="clinic-kicker">{video.category}</p>
          <h1>{video.title}</h1>
          <p>{video.description}</p>
          <div className="doctor-video-doctor-card">
            <Image src={video.doctorPhoto} alt={video.doctorName} width={72} height={72} />
            <div>
              <strong>{video.doctorName}</strong>
              <span>{video.qualification}</span>
              <span>{video.specialization}</span>
            </div>
          </div>
          <p>{video.doctorBio}</p>
          <div className="doctor-video-action-row">
            <Link className="clinic-button primary" href="/booking">Book Appointment</Link>
            <Link className="clinic-button ghost" href="/doctor-chat"><FiMessageCircle aria-hidden="true" /> Chat Doctor</Link>
            <Link className="clinic-button ghost" href="/doctor-chat"><FiZap aria-hidden="true" /> Ask AI</Link>
            <Link className="clinic-button ghost" href={video.brochureUrl}><FiDownload aria-hidden="true" /> Download PDF</Link>
          </div>
          <div className="doctor-video-mini-actions">
            <button type="button"><FiShare2 aria-hidden="true" /> Share</button>
            <button type="button"><FiBookmark aria-hidden="true" /> Save</button>
            <span>{video.views.toLocaleString("en-IN")} views</span>
            <span>{video.likes.toLocaleString("en-IN")} likes</span>
          </div>
        </aside>
      </section>

      <section className="doctor-video-detail-main">
        <article>
          <p className="clinic-kicker">AI Summary</p>
          <h2>Patient-friendly explanation</h2>
          <p>{video.aiSummary}</p>
          <div className="doctor-video-ai-grid">
            {video.aiCaptions.map((caption) => (
              <span key={caption}>{caption}</span>
            ))}
          </div>
        </article>

        <article>
          <p className="clinic-kicker">Transcript</p>
          <h2>Readable video transcript</h2>
          <p>{video.aiTranscript}</p>
        </article>

        <article>
          <p className="clinic-kicker">FAQs</p>
          <h2>Common patient questions</h2>
          <div className="doctor-video-faq-list">
            {video.aiFaqs.map((faq) => (
              <div key={faq.question}>
                <strong>{faq.question}</strong>
                <span>{faq.answer}</span>
              </div>
            ))}
          </div>
        </article>

        <article>
          <p className="clinic-kicker">SEO & Captions</p>
          <h2>Optimized publishing data</h2>
          <div className="doctor-video-tag-cloud">
            {video.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}
            {video.suggestedHashtags.map((tag) => <span key={tag}>{tag}</span>)}
            {video.subtitles.map((subtitle) => <span key={subtitle.language}>{subtitle.language}: {subtitle.status}</span>)}
          </div>
        </article>

        <article>
          <p className="clinic-kicker">Clinic Context</p>
          <h2>{video.clinicInfo}</h2>
          <div className="doctor-video-tag-cloud">
            {video.relatedTreatments.map((item) => <Link key={item} href="/#services">{item}</Link>)}
            {video.relatedBlogs.map((item) => <Link key={item} href="/blog">{item}</Link>)}
          </div>
        </article>

        <article>
          <p className="clinic-kicker">Patient Reviews</p>
          <h2>Related patient feedback</h2>
          <div className="doctor-video-faq-list">
            {video.patientReviews.map((review) => (
              <div key={review.name}>
                <strong>{review.name} - {review.rating}/5</strong>
                <span>{review.text}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      {relatedVideos.length ? (
        <section className="doctor-video-related">
          <div>
            <p className="clinic-kicker">Related Videos</p>
            <h2>Continue learning with your care team.</h2>
          </div>
          <div className="doctor-video-related-grid">
            {relatedVideos.map((item) => (
              <Link key={item.id} href={`/doctor-videos/${item.slug}`}>
                <Image src={item.poster} alt={item.title} width={220} height={150} />
                <strong>{item.title}</strong>
                <span>{item.duration} - {item.treatment}</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
