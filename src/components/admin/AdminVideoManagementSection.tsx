"use client";

import { useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import {
  FiActivity,
  FiAlertCircle,
  FiBarChart2,
  FiCalendar,
  FiClock,
  FiCopy,
  FiDownload,
  FiEdit3,
  FiEye,
  FiFileText,
  FiFilter,
  FiMessageCircle,
  FiPlusCircle,
  FiRefreshCw,
  FiRotateCcw,
  FiSearch,
  FiServer,
  FiSettings,
  FiShare2,
  FiShield,
  FiTrash2,
  FiUploadCloud,
  FiVideo,
  FiZap,
} from "react-icons/fi";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { doctorVideos, socialPlatforms, videoCategories, type DoctorVideo, type DoctorVideoStatus } from "@/data/doctor-videos";

type VideoAdminTab =
  | "Dashboard"
  | "Upload Video"
  | "Video Library"
  | "Categories"
  | "Comments"
  | "Analytics"
  | "Scheduled Posts"
  | "Social Media"
  | "AI Processing"
  | "Settings"
  | "Trash";

const videoTabs: VideoAdminTab[] = [
  "Dashboard",
  "Upload Video",
  "Video Library",
  "Categories",
  "Comments",
  "Analytics",
  "Scheduled Posts",
  "Social Media",
  "AI Processing",
  "Settings",
  "Trash",
];

const performanceData = [
  { day: "Mon", views: 2400, appointments: 18, watchTime: 320, completion: 68 },
  { day: "Tue", views: 3200, appointments: 24, watchTime: 410, completion: 72 },
  { day: "Wed", views: 4100, appointments: 29, watchTime: 520, completion: 74 },
  { day: "Thu", views: 3900, appointments: 27, watchTime: 500, completion: 71 },
  { day: "Fri", views: 5200, appointments: 36, watchTime: 690, completion: 78 },
  { day: "Sat", views: 6100, appointments: 42, watchTime: 780, completion: 81 },
];

const uploadProgress = [
  ["Video Compression", 92],
  ["Thumbnail Generation", 84],
  ["AI Transcript", 76],
  ["Subtitle Generation", 68],
  ["SEO Optimization", 88],
  ["Moderation", 96],
  ["Spam Detection", 94],
  ["Social Caption Generation", 82],
];

const socialAccounts = [
  ["Instagram Business", "Connected", "@healthygrinz", "24 Jul 2026", "42 days"],
  ["Facebook Page", "Connected", "Healthy Grins Dental Clinic", "24 Jul 2026", "42 days"],
  ["YouTube Channel", "Reconnect", "HealthyGrinz Dental", "18 Jul 2026", "Expired"],
  ["LinkedIn Company", "Connected", "HealthyGrinz Healthcare", "24 Jul 2026", "51 days"],
  ["X Account", "Connected", "@healthygrinz", "24 Jul 2026", "38 days"],
  ["TikTok Account", "Reconnect", "@healthygrinz", "16 Jul 2026", "Expired"],
  ["Google Business Profile", "Connected", "Healthy Grins Krishna Nagar", "23 Jul 2026", "56 days"],
];

const notificationRules = [
  "Doctor approval required before publishing",
  "Notify admin when comments need moderation",
  "Notify marketing when a social token expires",
  "Notify reception when a video generates appointment clicks",
];

export function AdminVideoManagementSection({ globalSearch = "" }: { globalSearch?: string }) {
  const [tab, setTab] = useState<VideoAdminTab>("Dashboard");
  const [videos, setVideos] = useState(doctorVideos);
  const [query, setQuery] = useState(globalSearch);
  const [status, setStatus] = useState<DoctorVideoStatus | "All">("All");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["Website", "Instagram", "YouTube Shorts"]);
  const [toast, setToast] = useState("Video Management workspace ready.");

  const filteredVideos = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return videos.filter((video) => {
      const matchesStatus = status === "All" || video.status === status;
      const searchable = [
        video.id,
        video.title,
        video.description,
        video.doctorName,
        video.category,
        video.treatment,
        video.language,
        ...video.hashtags,
        ...video.keywords,
        ...video.suggestedHashtags,
      ]
        .join(" ")
        .toLowerCase();

      return matchesStatus && (!normalized || searchable.includes(normalized));
    });
  }, [query, status, videos]);

  const stats = [
    { label: "Total Videos", value: String(videos.length), delta: "+3 this week", icon: FiVideo },
    { label: "Total Views", value: formatCount(videos.reduce((sum, video) => sum + video.views, 0)), delta: "+21%", icon: FiEye },
    { label: "Appointments", value: "96", delta: "+14", icon: FiCalendar },
    { label: "AI Processed", value: "94%", delta: "+8%", icon: FiZap },
    { label: "Scheduled Posts", value: String(videos.filter((video) => video.status === "Scheduled").length), delta: "Next 7 days", icon: FiClock },
    { label: "Social Reach", value: "48.2K", delta: "+32%", icon: FiShare2 },
  ];

  function runAction(action: string, video?: DoctorVideo) {
    setToast(`${action}${video ? `: ${video.title}` : ""} queued.`);
  }

  function createVideo() {
    const next: DoctorVideo = {
      ...videos[0],
      id: `VID-${Date.now().toString().slice(-4)}`,
      slug: `new-doctor-video-${Date.now().toString().slice(-4)}`,
      title: "New doctor education video",
      description: "Draft video ready for upload, AI processing, SEO, moderation, and social distribution.",
      status: "Draft",
      views: 0,
      likes: 0,
      comments: 0,
      shares: 0,
      saves: 0,
      publishAt: "Draft",
      platforms: ["Website"],
    };
    setVideos((current) => [next, ...current]);
    setTab("Video Library");
    setToast("Draft video created.");
  }

  function togglePlatform(platform: string) {
    setSelectedPlatforms((current) => (current.includes(platform) ? current.filter((item) => item !== platform) : [...current, platform]));
  }

  return (
    <section className="adm-video-shell">
      <div className="adm-video-tabs" aria-label="Video Management tabs">
        {videoTabs.map((item) => (
          <button className={tab === item ? "is-active" : ""} key={item} type="button" onClick={() => setTab(item)}>
            {getTabIcon(item)}
            {item}
          </button>
        ))}
      </div>

      <section className="adm-video-hero">
        <div>
          <p className="adm-eyebrow">Doctor Video OS</p>
          <h2>Upload once. Educate patients everywhere.</h2>
          <span>Manage doctor reels, AI captions, SEO, moderation, scheduling, analytics, and cross-platform publishing.</span>
        </div>
        <div>
          <button className="adm-secondary-button" type="button" onClick={() => runAction("Export video report")}><FiDownload aria-hidden="true" /> Export</button>
          <button className="adm-primary-button" type="button" onClick={createVideo}><FiUploadCloud aria-hidden="true" /> Upload Video</button>
        </div>
      </section>

      <div className="adm-video-stat-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <article key={stat.label}>
              <div><span><Icon aria-hidden="true" /></span><mark>{stat.delta}</mark></div>
              <strong>{stat.value}</strong>
              <p>{stat.label}</p>
            </article>
          );
        })}
      </div>

      <section className="adm-card adm-video-controls">
        <label>
          <FiSearch aria-hidden="true" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search videos, doctors, treatments, categories, hashtags..." />
        </label>
        <label>
          <FiFilter aria-hidden="true" />
          <select value={status} onChange={(event) => setStatus(event.target.value as DoctorVideoStatus | "All")}>
            {["All", "Draft", "Scheduled", "Published", "Private", "Archived", "Rejected", "Deleted"].map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>
        <button type="button" onClick={() => runAction("Bulk publish")}><FiShare2 aria-hidden="true" /> Bulk Publish</button>
        <button type="button" onClick={() => runAction("AI processing")}><FiZap aria-hidden="true" /> Run AI</button>
      </section>

      <div className="adm-video-workspace">
        <main className="adm-video-main">
          {tab === "Upload Video" ? <VideoUploadPanel onCreate={createVideo} /> : null}
          {tab === "Analytics" || tab === "Dashboard" ? <VideoAnalyticsPanel /> : null}
          {tab === "Social Media" || tab === "Dashboard" ? <SocialPublishingPanel selectedPlatforms={selectedPlatforms} onTogglePlatform={togglePlatform} onAction={runAction} /> : null}
          {tab === "AI Processing" || tab === "Dashboard" ? <AiProcessingPanel /> : null}
          {tab === "Dashboard" ? <VideoNotificationsPanel onAction={runAction} /> : null}
          {tab === "Comments" ? <CommentsModerationPanel onAction={runAction} /> : null}
          {tab === "Categories" ? <CategoriesPanel /> : null}
          {tab === "Scheduled Posts" ? <ScheduledPostsPanel videos={videos} /> : null}
          {tab === "Settings" ? <><VideoSettingsPanel /><VideoSecurityPanel /></> : null}
          {tab === "Trash" ? <TrashPanel onAction={runAction} /> : null}
          {tab === "Video Library" || tab === "Dashboard" ? <VideoLibrary videos={filteredVideos} onAction={runAction} /> : null}
        </main>

        <aside className="adm-video-side">
          <section className="adm-card">
            <div className="adm-card-head">
              <div><p className="adm-eyebrow">Publishing Queue</p><h2>Publish once</h2></div>
            </div>
            <div className="adm-video-platform-list">
              {socialPlatforms.map((platform) => (
                <label key={platform}>
                  <input checked={selectedPlatforms.includes(platform)} onChange={() => togglePlatform(platform)} type="checkbox" />
                  <span>{platform}</span>
                  <small>{selectedPlatforms.includes(platform) ? "Selected" : "Optional"}</small>
                </label>
              ))}
            </div>
            <button className="adm-primary-button" type="button" onClick={() => runAction("Cross-platform publish")}>
              <FiShare2 aria-hidden="true" /> Publish Once
            </button>
          </section>
          <section className="adm-card adm-video-log">
            <div className="adm-card-head">
              <div><p className="adm-eyebrow">System Status</p><h2>Automation</h2></div>
            </div>
            {["Auto captions ready", "Thumbnail suggestions queued", "AI moderation passed", "Blog draft from transcript ready"].map((item, index) => (
              <span key={item}><i /> <strong>{item}</strong><small>{index + 1}m ago</small></span>
            ))}
          </section>
        </aside>
      </div>

      <p className="adm-video-toast" aria-live="polite">{toast}</p>
    </section>
  );
}

function VideoUploadPanel({ onCreate }: { onCreate: () => void }) {
  return (
    <section className="adm-card adm-video-upload">
      <div className="adm-card-head">
        <div><p className="adm-eyebrow">Upload Video</p><h2>Doctor educational content</h2></div>
        <button type="button" onClick={onCreate}><FiPlusCircle aria-hidden="true" /> Create Draft</button>
      </div>
      <div className="adm-video-upload-grid">
        <div className="adm-video-dropzone"><FiUploadCloud aria-hidden="true" /><strong>Drop HD video here</strong><span>MP4, MOV, vertical reels, shorts, adaptive streaming ready</span></div>
        <label>Title<input placeholder="Video title" /></label>
        <label>Description<textarea placeholder="Patient-friendly description" rows={4} /></label>
        <label>Category<select>{videoCategories.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Treatment<input placeholder="Root Canal, Whitening, Braces..." /></label>
        <label>Doctor<input placeholder="Dr. Lisha" /></label>
        <label>Language<select><option>English</option><option>Hindi</option><option>Punjabi</option></select></label>
        <label>Hashtags<input placeholder="#RootCanal #HealthyGrinz" /></label>
        <label>Thumbnail<input placeholder="Upload thumbnail or choose AI suggestion" /></label>
        <label>PDF Brochure<input placeholder="Attach treatment PDF or patient guide" /></label>
        <label>Before / After Images<input placeholder="Attach comparison images" /></label>
        <label>External Links<input placeholder="Instagram, YouTube, website canonical URL" /></label>
        <label>Timezone<select><option>Asia/Kolkata</option><option>UTC</option><option>Clinic default</option></select></label>
        <label>Schedule / Publish At<input placeholder="24 Jul 2026, 8:30 PM" /></label>
        <label>Expiry Date<input placeholder="Optional campaign end date" /></label>
        <label>Recurring Rule<select><option>No repeat</option><option>Weekly repost</option><option>Monthly evergreen push</option></select></label>
        <label>Role Permission<select><option>Doctor approval required</option><option>Admin can publish</option><option>Marketing can schedule only</option></select></label>
      </div>
    </section>
  );
}

function VideoLibrary({ videos, onAction }: { videos: DoctorVideo[]; onAction: (action: string, video?: DoctorVideo) => void }) {
  return (
    <section className="adm-card">
      <div className="adm-card-head">
        <div><p className="adm-eyebrow">Video Library</p><h2>{videos.length} managed videos</h2></div>
        <span className="adm-pill">Version history and restore ready</span>
      </div>
      <div className="adm-video-library">
        {videos.map((video) => (
          <article key={video.id}>
            <Image src={video.poster} alt="" width={96} height={128} />
            <div>
              <strong>{video.title}</strong>
              <span>{video.doctorName} - {video.treatment} - {video.duration}</span>
              <small>{video.id} - {video.views.toLocaleString("en-IN")} views - {video.publishAt}</small>
              <div>{video.hashtags.map((tag) => <mark key={tag}>{tag}</mark>)}</div>
            </div>
            <b className={`adm-video-status ${video.status.toLowerCase()}`}>{video.status}</b>
            <div className="adm-video-row-actions">
              {[
                ["Preview", FiEye],
                ["Edit", FiEdit3],
                ["Duplicate", FiCopy],
                ["Archive", FiTrash2],
                ["Restore", FiRotateCcw],
              ].map(([label, Icon]) => (
                <button key={String(label)} type="button" onClick={() => onAction(String(label), video)} title={String(label)} aria-label={`${String(label)} ${video.title}`}>
                  <Icon aria-hidden="true" />
                </button>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function VideoAnalyticsPanel() {
  const metrics = [
    ["Watch Time", "3,220 min", "+18%"],
    ["Completion Rate", "74%", "+9%"],
    ["Average Duration", "0:39", "+4s"],
    ["Likes", "4.1K", "+22%"],
    ["Comments", "263", "+14%"],
    ["Shares", "796", "+31%"],
    ["Saves", "1.1K", "+27%"],
    ["Appointment Clicks", "96", "+14"],
    ["Chat Clicks", "128", "+23"],
    ["Revenue Attribution", "₹1.8L", "+16%"],
    ["Top Doctor", "Dr. Lisha", "Endodontics"],
    ["Top Treatment", "Teeth Whitening", "22.1K views"],
  ];

  return (
    <section className="adm-card adm-video-chart-card">
      <div className="adm-card-head">
        <div><p className="adm-eyebrow">Analytics</p><h2>Views, watch time, and appointments</h2></div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={performanceData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--adm-line)" />
          <XAxis dataKey="day" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <Tooltip />
          <Line dataKey="views" type="monotone" stroke="#6D5DF6" strokeWidth={3} />
          <Line dataKey="appointments" type="monotone" stroke="#22C55E" strokeWidth={3} />
          <Line dataKey="completion" type="monotone" stroke="#F59E0B" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
      <div className="adm-video-analytics-grid">
        {metrics.map(([label, value, delta]) => (
          <article key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
            <small>{delta}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

function SocialPublishingPanel({ selectedPlatforms, onTogglePlatform, onAction }: { selectedPlatforms: string[]; onTogglePlatform: (platform: string) => void; onAction: (action: string) => void }) {
  return (
    <section className="adm-card adm-video-social">
      <div className="adm-card-head">
        <div><p className="adm-eyebrow">Social Media</p><h2>Account manager</h2></div>
        <button type="button" onClick={() => onAction("Sync social accounts")}><FiRefreshCw aria-hidden="true" /> Sync</button>
      </div>
      {socialAccounts.map(([platform, connectionStatus, account, sync, expiry]) => (
        <article key={platform}>
          <div><strong>{platform}</strong><span>{account}</span></div>
          <mark className={connectionStatus === "Connected" ? "connected" : "reconnect"}>{connectionStatus}</mark>
          <span>Last sync: {sync}</span>
          <small>Token: {expiry}</small>
          <div className="adm-video-account-actions">
            <button type="button" onClick={() => onAction(connectionStatus === "Connected" ? "Reconnect account" : "Connect account")}>{connectionStatus === "Connected" ? "Reconnect" : "Connect"}</button>
            <button type="button" onClick={() => onAction("Disconnect account")}>Disconnect</button>
            <button type="button" onClick={() => onAction("Open publishing logs")}>Logs</button>
          </div>
        </article>
      ))}
      <div className="adm-video-platform-pills">
        {socialPlatforms.map((platform) => (
          <button className={selectedPlatforms.includes(platform) ? "is-active" : ""} key={platform} type="button" onClick={() => onTogglePlatform(platform)}>
            {platform}
          </button>
        ))}
      </div>
    </section>
  );
}

function AiProcessingPanel() {
  return (
    <section className="adm-card adm-video-ai">
      <div className="adm-card-head">
        <div><p className="adm-eyebrow">AI Processing</p><h2>Automation pipeline</h2></div>
        <FiZap aria-hidden="true" />
      </div>
      {uploadProgress.map(([label, value]) => (
        <div key={label}>
          <span>{label}</span>
          <strong>{value}%</strong>
          <i style={{ width: `${value}%` }} />
        </div>
      ))}
    </section>
  );
}

function VideoNotificationsPanel({ onAction }: { onAction: (action: string) => void }) {
  return (
    <section className="adm-card adm-video-notifications">
      <div className="adm-card-head">
        <div><p className="adm-eyebrow">Notifications</p><h2>Operational alerts</h2></div>
        <FiAlertCircle aria-hidden="true" />
      </div>
      {notificationRules.map((rule) => (
        <article key={rule}>
          <FiAlertCircle aria-hidden="true" />
          <div><strong>{rule}</strong><span>Email, dashboard, and in-app alerts enabled.</span></div>
          <button type="button" onClick={() => onAction(`Test notification - ${rule}`)}>Test</button>
        </article>
      ))}
    </section>
  );
}

function CommentsModerationPanel({ onAction }: { onAction: (action: string) => void }) {
  return (
    <section className="adm-card adm-video-comments">
      <div className="adm-card-head">
        <div><p className="adm-eyebrow">Comments</p><h2>Moderation queue</h2></div>
      </div>
      {["Great explanation, doctor!", "Can I book whitening this week?", "Spam: unrelated promotion"].map((comment, index) => (
        <article key={comment}>
          <FiMessageCircle aria-hidden="true" />
          <div><strong>{comment}</strong><span>{index === 2 ? "AI moderation: spam risk" : "Patient comment awaiting action"}</span></div>
          {["Approve", "Reply", "Hide", "Report"].map((action) => <button key={action} type="button" onClick={() => onAction(action)}>{action}</button>)}
        </article>
      ))}
    </section>
  );
}

function CategoriesPanel() {
  return (
    <section className="adm-card adm-video-categories">
      <div className="adm-card-head">
        <div><p className="adm-eyebrow">Categories</p><h2>Treatment taxonomy</h2></div>
      </div>
      {videoCategories.slice(1).map((category, index) => (
        <article key={category}><FiFileText aria-hidden="true" /><strong>{category}</strong><span>{12 + index * 3} videos - SEO collection ready</span></article>
      ))}
    </section>
  );
}

function ScheduledPostsPanel({ videos }: { videos: DoctorVideo[] }) {
  return (
    <section className="adm-card adm-video-schedule">
      <div className="adm-card-head">
        <div><p className="adm-eyebrow">Scheduling</p><h2>Upcoming posts</h2></div>
      </div>
      {videos.map((video) => (
        <article key={video.id}><FiCalendar aria-hidden="true" /><div><strong>{video.title}</strong><span>{video.publishAt} - {video.platforms.join(", ")}</span></div></article>
      ))}
    </section>
  );
}

function VideoSettingsPanel() {
  return (
    <section className="adm-card adm-video-settings">
      <div className="adm-card-head">
        <div><p className="adm-eyebrow">Settings</p><h2>Automation controls</h2></div>
        <FiSettings aria-hidden="true" />
      </div>
      {[
        "Require approval before publish",
        "Auto-generate captions",
        "Auto-create blog from transcript",
        "Auto-generate SEO title, meta description, keywords, and hashtags",
        "Enable patient comments with AI moderation",
        "Enable social publishing logs",
        "Auto-resize videos for each platform",
        "Keep deleted videos in trash before permanent removal",
      ].map((item) => (
        <label key={item}><input defaultChecked type="checkbox" /> {item}</label>
      ))}
    </section>
  );
}

function VideoSecurityPanel() {
  return (
    <section className="adm-card adm-video-security">
      <div className="adm-card-head">
        <div><p className="adm-eyebrow">Security & API Readiness</p><h2>Enterprise controls</h2></div>
        <FiShield aria-hidden="true" />
      </div>
      {[
        ["RBAC", "Admin, Doctor, Marketing, Reception, Viewer"],
        ["Audit Logs", "Every upload, edit, publish, delete, restore, and account action is tracked"],
        ["Validation", "File type, duration, size, metadata, caption, and external URL checks"],
        ["API Surface", "/api/videos, /api/video-comments, /api/social-posts, /api/video-analytics"],
        ["Storage", "Original video, thumbnails, captions, subtitles, brochures, and publishing logs"],
      ].map(([label, value]) => (
        <article key={label}>
          <FiServer aria-hidden="true" />
          <div><strong>{label}</strong><span>{value}</span></div>
        </article>
      ))}
    </section>
  );
}

function TrashPanel({ onAction }: { onAction: (action: string) => void }) {
  return (
    <section className="adm-card adm-video-trash">
      <div className="adm-card-head">
        <div><p className="adm-eyebrow">Trash</p><h2>Archived and deleted videos</h2></div>
      </div>
      <p>Deleted videos, comments, thumbnails, captions, subtitles, brochures, and publishing logs appear here with restore controls.</p>
      <button type="button" onClick={() => onAction("Restore selected trash items")}><FiRotateCcw aria-hidden="true" /> Restore Selected</button>
    </section>
  );
}

function getTabIcon(tab: VideoAdminTab) {
  const icons: Record<VideoAdminTab, ReactNode> = {
    Dashboard: <FiBarChart2 aria-hidden="true" />,
    "Upload Video": <FiUploadCloud aria-hidden="true" />,
    "Video Library": <FiVideo aria-hidden="true" />,
    Categories: <FiFileText aria-hidden="true" />,
    Comments: <FiMessageCircle aria-hidden="true" />,
    Analytics: <FiActivity aria-hidden="true" />,
    "Scheduled Posts": <FiCalendar aria-hidden="true" />,
    "Social Media": <FiShare2 aria-hidden="true" />,
    "AI Processing": <FiZap aria-hidden="true" />,
    Settings: <FiSettings aria-hidden="true" />,
    Trash: <FiTrash2 aria-hidden="true" />,
  };
  return icons[tab];
}

function formatCount(value: number) {
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return String(value);
}
