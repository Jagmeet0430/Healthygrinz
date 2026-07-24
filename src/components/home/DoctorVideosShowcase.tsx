"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  FiAlertCircle,
  FiBookmark,
  FiCopy,
  FiDownload,
  FiMaximize2,
  FiMessageCircle,
  FiPlusCircle,
  FiSearch,
  FiShare2,
  FiVolume2,
  FiVolumeX,
  FiZap,
} from "react-icons/fi";
import { doctorVideos, videoCategories } from "@/data/doctor-videos";

const sortOptions = ["Trending", "Latest", "Most Viewed", "Most Liked"] as const;

export function DoctorVideosShowcase() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [language, setLanguage] = useState("All");
  const [sort, setSort] = useState<(typeof sortOptions)[number]>("Trending");
  const [muted, setMuted] = useState(true);
  const [activeId, setActiveId] = useState(doctorVideos[0]?.id || "");
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [followedDoctors, setFollowedDoctors] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [notice, setNotice] = useState("Reels are ready with AI summaries, captions, and booking actions.");

  const languages = useMemo(() => ["All", ...Array.from(new Set(doctorVideos.map((video) => video.language)))], []);

  const filteredVideos = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const results = doctorVideos.filter((video) => {
      const searchable = [
        video.title,
        video.description,
        video.doctorName,
        video.treatment,
        video.category,
        video.language,
        ...video.hashtags,
        ...video.keywords,
        ...video.suggestedHashtags,
      ]
        .join(" ")
        .toLowerCase();

      const matchesCategory = category === "All" || video.category === category || video.treatment === category;
      const matchesLanguage = language === "All" || video.language === language;
      const matchesQuery = !normalized || searchable.includes(normalized);

      return matchesCategory && matchesLanguage && matchesQuery;
    });

    return [...results].sort((a, b) => {
      if (sort === "Latest") return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
      if (sort === "Most Viewed") return b.views - a.views;
      if (sort === "Most Liked") return b.likes - a.likes;
      return b.views + b.likes + b.saves + b.shares - (a.views + a.likes + a.saves + a.shares);
    });
  }, [category, language, query, sort]);

  const visibleVideos = filteredVideos.slice(0, visibleCount);

  async function copyVideoLink(slug: string) {
    const url = `${window.location.origin}/doctor-videos/${slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setNotice("Video link copied.");
    } catch {
      setNotice(url);
    }
  }

  function toggleDoctorFollow(doctorName: string) {
    setFollowedDoctors((current) => {
      const isFollowing = current.includes(doctorName);
      setNotice(isFollowing ? `Unfollowed ${doctorName}.` : `Following ${doctorName}.`);
      return isFollowing ? current.filter((name) => name !== doctorName) : [...current, doctorName];
    });
  }

  return (
    <section className="doctor-videos-section" id="doctor-videos" aria-labelledby="doctor-videos-title">
      <div className="doctor-videos-heading">
        <div>
          <p className="clinic-kicker">Doctor Videos</p>
          <h2 id="doctor-videos-title">Short dental videos from your care team.</h2>
          <span>Reels-style education with AI summaries, captions, treatment links, moderated comments, and direct booking actions.</span>
        </div>
        <Link className="clinic-button primary" href="/doctor-videos/root-canal-pain-explained">
          Open Featured
        </Link>
      </div>

      <div className="doctor-videos-controls">
        <label>
          <FiSearch aria-hidden="true" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by doctor, treatment, disease, language..." />
        </label>
        <select value={language} onChange={(event) => setLanguage(event.target.value)} aria-label="Filter by language">
          {languages.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <select value={sort} onChange={(event) => setSort(event.target.value as (typeof sortOptions)[number])} aria-label="Sort videos">
          {sortOptions.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <div>
          {videoCategories.map((item) => (
            <button className={category === item ? "is-active" : ""} key={item} type="button" onClick={() => setCategory(item)}>
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="doctor-reels-grid">
        {visibleVideos.map((video) => {
          const isActive = activeId === video.id;
          const isSaved = savedIds.includes(video.id);
          const isLiked = likedIds.includes(video.id);
          const isFollowing = followedDoctors.includes(video.doctorName);

          return (
            <article className={isActive ? "doctor-reel-card is-active" : "doctor-reel-card"} key={video.id} onMouseEnter={() => setActiveId(video.id)}>
              <div className="doctor-reel-media">
                <Image src={video.poster} alt={video.title} fill sizes="(max-width: 720px) 86vw, 320px" />
                <div className="doctor-reel-gradient" />
                <Image className="doctor-reel-logo" src={video.clinicLogo} alt="HealthyGrinz" width={38} height={38} />
                <button className="doctor-reel-mute" type="button" onClick={() => setMuted((value) => !value)} aria-label={muted ? "Unmute video" : "Mute video"}>
                  {muted ? <FiVolumeX aria-hidden="true" /> : <FiVolume2 aria-hidden="true" />}
                </button>
                <Link className="doctor-reel-fullscreen" href={`/doctor-videos/${video.slug}`} aria-label={`Open ${video.title}`}>
                  <FiMaximize2 aria-hidden="true" />
                </Link>
                <span className="doctor-reel-duration">{video.duration}</span>
                <div className="doctor-reel-playback">
                  <i />
                  <span>{isActive ? "Auto preview active" : "Hover to preview"}</span>
                </div>
              </div>

              <div className="doctor-reel-content">
                <div className="doctor-reel-doctor">
                  <Image src={video.doctorPhoto} alt={video.doctorName} width={46} height={46} />
                  <div>
                    <strong>{video.doctorName}</strong>
                    <span>{video.qualification} - {video.specialization}</span>
                  </div>
                </div>

                <h3>{video.title}</h3>
                <p>{video.description}</p>

                <div className="doctor-reel-tags">
                  <span>{video.category}</span>
                  <span>{video.treatment}</span>
                  <span>{video.language}</span>
                  <span>{video.moderationStatus}</span>
                </div>

                <div className="doctor-reel-metrics">
                  <button className={isLiked ? "is-active" : ""} type="button" onClick={() => setLikedIds((ids) => (ids.includes(video.id) ? ids.filter((id) => id !== video.id) : [...ids, video.id]))}>
                    {formatCount(video.likes + (isLiked ? 1 : 0))} Likes
                  </button>
                  <button type="button">{formatCount(video.comments)} Comments</button>
                  <button type="button">{formatCount(video.shares)} Shares</button>
                  <button type="button">{formatCount(video.views)} Views</button>
                </div>

                <div className="doctor-reel-actions">
                  <Link href={`/doctor-videos/${video.slug}`}><FiMaximize2 aria-hidden="true" /> Open</Link>
                  <button type="button" onClick={() => setNotice(`Share sheet ready for ${video.title}.`)}><FiShare2 aria-hidden="true" /> Share</button>
                  <button type="button" onClick={() => copyVideoLink(video.slug)}><FiCopy aria-hidden="true" /> Copy</button>
                  <button className={isSaved ? "is-active" : ""} type="button" onClick={() => setSavedIds((ids) => (ids.includes(video.id) ? ids.filter((id) => id !== video.id) : [...ids, video.id]))}>
                    <FiBookmark aria-hidden="true" /> Save
                  </button>
                  <button className={isFollowing ? "is-active" : ""} type="button" onClick={() => toggleDoctorFollow(video.doctorName)}>
                    <FiPlusCircle aria-hidden="true" /> {isFollowing ? "Following" : "Follow"}
                  </button>
                  <Link href="/booking">Book</Link>
                  <Link href="/doctor-chat"><FiMessageCircle aria-hidden="true" /> Chat</Link>
                  <button type="button" onClick={() => setNotice(`AI assistant opened context for ${video.treatment}.`)}><FiZap aria-hidden="true" /> Ask AI</button>
                  <Link href={video.brochureUrl}><FiDownload aria-hidden="true" /> PDF</Link>
                  <button type="button" onClick={() => setNotice("Report received for moderation review.")}><FiAlertCircle aria-hidden="true" /> Report</button>
                </div>

                <div className="doctor-reel-ai">
                  <FiZap aria-hidden="true" />
                  <span>{video.aiSummary}</span>
                </div>

                <div className="doctor-reel-comments">
                  <strong>{video.commentsList[0]?.name || "Patient"}</strong>
                  <span>{video.commentsList[0]?.text || "Helpful doctor-led explanation."}</span>
                  <button type="button" onClick={() => setNotice("Reply box opened for moderation.")}>Reply</button>
                </div>

                <div className="doctor-reel-hashtags">
                  {[...video.hashtags, ...video.suggestedHashtags].slice(0, 6).map((tag) => (
                    <button key={tag} type="button" onClick={() => setQuery(tag)}>
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="doctor-videos-footer">
        <p aria-live="polite">{notice}</p>
        {visibleCount < filteredVideos.length ? (
          <button className="clinic-button ghost" type="button" onClick={() => setVisibleCount((count) => count + 6)}>
            Load more videos
          </button>
        ) : null}
      </div>
    </section>
  );
}

function formatCount(value: number) {
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return String(value);
}
