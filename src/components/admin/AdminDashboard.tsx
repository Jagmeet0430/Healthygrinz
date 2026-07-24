"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import type { IconType } from "react-icons";
import {
  FiActivity,
  FiBell,
  FiBookOpen,
  FiCalendar,
  FiCheckCircle,
  FiChevronDown,
  FiClock,
  FiClipboard,
  FiCopy,
  FiCreditCard,
  FiDatabase,
  FiDollarSign,
  FiEdit3,
  FiEye,
  FiFileText,
  FiHelpCircle,
  FiHome,
  FiImage,
  FiInbox,
  FiLink,
  FiMail,
  FiMenu,
  FiMessageCircle,
  FiMoon,
  FiPackage,
  FiPhone,
  FiPieChart,
  FiPlusCircle,
  FiPrinter,
  FiSearch,
  FiSettings,
  FiShare2,
  FiSmile,
  FiStar,
  FiSun,
  FiType,
  FiUploadCloud,
  FiUserCheck,
  FiUsers,
  FiVideo,
  FiXCircle,
  FiZap,
} from "react-icons/fi";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { BlogPost } from "@/lib/blogs";
import type { SiteContent, Treatment } from "@/lib/content";
import type { Submissions } from "@/lib/submissions";
import { AdminPatientsSection } from "./AdminPatientsSection";
import { AdminVideoManagementSection } from "./AdminVideoManagementSection";

type NavItem = {
  id: AdminSection;
  label: string;
  icon: IconType;
};

type AdminSection =
  | "dashboard"
  | "appointments"
  | "patients"
  | "doctors"
  | "treatments"
  | "billing"
  | "reports"
  | "ai"
  | "xray"
  | "records"
  | "prescription"
  | "inventory"
  | "videos"
  | "reviews"
  | "blog"
  | "about"
  | "gallery"
  | "faqs"
  | "messages"
  | "settings";

type TrendPoint = {
  name: string;
  value: number;
};

type KpiCard = {
  label: string;
  value: string;
  delta: string;
  tone: "indigo" | "violet" | "green" | "orange";
  icon: IconType;
  data: TrendPoint[];
};

type AppointmentTrend = {
  day: string;
  completed: number;
  scheduled: number;
  cancelled: number;
};

type TreatmentSlice = {
  name: string;
  value: number;
  color: string;
};

type RevenuePoint = {
  month: string;
  revenue: number;
};

type RecentAppointment = {
  id: string;
  patient: string;
  treatment: string;
  doctor: string;
  time: string;
  status: "Completed" | "Scheduled" | "Cancelled" | "Pending";
};

type ActivityItem = {
  id: string;
  title: string;
  detail: string;
  time: Date;
  icon: IconType;
  tone: string;
};

type AdminRecord = {
  id: string;
  title: string;
  subtitle: string;
  meta: string;
  status: string;
  tone: "indigo" | "violet" | "green" | "blue" | "orange" | "red";
};

type SectionCopy = {
  title: string;
  eyebrow: string;
  description: string;
  cta: string;
};

const emptySubmissions: Submissions = {
  appointments: [],
  contacts: [],
};

const navigation: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: FiHome },
  { id: "appointments", label: "Appointments", icon: FiCalendar },
  { id: "patients", label: "Patients", icon: FiUsers },
  { id: "doctors", label: "Doctors", icon: FiUserCheck },
  { id: "treatments", label: "Website Services", icon: FiSmile },
  { id: "about", label: "Home & About", icon: FiFileText },
  { id: "gallery", label: "Gallery", icon: FiImage },
  { id: "faqs", label: "FAQs", icon: FiHelpCircle },
  { id: "billing", label: "Billing & Payments", icon: FiCreditCard },
  { id: "reports", label: "Reports", icon: FiPieChart },
  { id: "ai", label: "AI Assistant", icon: FiZap },
  { id: "xray", label: "X-Ray Analysis", icon: FiImage },
  { id: "records", label: "Medical Records", icon: FiDatabase },
  { id: "prescription", label: "Prescription", icon: FiClipboard },
  { id: "inventory", label: "Inventory", icon: FiPackage },
  { id: "videos", label: "Video Management", icon: FiVideo },
  { id: "reviews", label: "Reviews", icon: FiStar },
  { id: "blog", label: "Blog", icon: FiType },
  { id: "messages", label: "Messages", icon: FiMessageCircle },
  { id: "settings", label: "Settings", icon: FiSettings },
];

const sectionCopy: Record<AdminSection, SectionCopy> = {
  dashboard: {
    eyebrow: "Dental Clinic Management System",
    title: "Dashboard",
    description: "Real-time operations for appointments, patients, payments, AI, and reports.",
    cta: "New appointment",
  },
  appointments: {
    eyebrow: "Schedule",
    title: "Appointments",
    description: "Create, review, reschedule, and track every clinic appointment.",
    cta: "Add appointment",
  },
  patients: {
    eyebrow: "Patient CRM",
    title: "Patients",
    description: "Manage patient profiles, contact details, visit history, and follow-ups.",
    cta: "Add patient",
  },
  doctors: {
    eyebrow: "Clinic team",
    title: "Doctors",
    description: "Track doctor schedules, specialities, availability, and workload.",
    cta: "Add doctor",
  },
  treatments: {
    eyebrow: "Website content",
    title: "Website Services",
    description: "Edit the public services block shown on the clinic homepage.",
    cta: "Save services",
  },
  about: {
    eyebrow: "Website content",
    title: "Home & About",
    description: "Edit homepage hero, intro, trust highlights, and patient concern cards.",
    cta: "Save page content",
  },
  gallery: {
    eyebrow: "Website content",
    title: "Gallery",
    description: "Manage gallery cards shown on the homepage and Gallery page.",
    cta: "Save gallery",
  },
  faqs: {
    eyebrow: "Patient education",
    title: "FAQs",
    description: "Edit common patient questions shown on the FAQ page.",
    cta: "Save FAQs",
  },
  billing: {
    eyebrow: "Finance",
    title: "Billing & Payments",
    description: "Monitor invoices, payments, pending dues, and daily collections.",
    cta: "Create invoice",
  },
  reports: {
    eyebrow: "Analytics",
    title: "Reports",
    description: "Review revenue, appointment conversion, treatment demand, and patient growth.",
    cta: "Export report",
  },
  ai: {
    eyebrow: "Assistant",
    title: "AI Assistant",
    description: "Ask operational questions and draft patient communication with guardrails.",
    cta: "New AI note",
  },
  xray: {
    eyebrow: "Clinical AI",
    title: "X-Ray Analysis",
    description: "Upload X-ray notes and images for dentist-reviewed observation support.",
    cta: "Upload X-ray",
  },
  records: {
    eyebrow: "Records",
    title: "Medical Records",
    description: "Organize reports, treatment plans, allergies, and visit summaries.",
    cta: "Add record",
  },
  prescription: {
    eyebrow: "Clinical documents",
    title: "Prescription",
    description: "Draft prescriptions and post-visit instructions for dentist approval.",
    cta: "New prescription",
  },
  inventory: {
    eyebrow: "Stock",
    title: "Inventory",
    description: "Track dental materials, stock alerts, suppliers, and reorder status.",
    cta: "Add item",
  },
  videos: {
    eyebrow: "Doctor video OS",
    title: "Video Management",
    description: "Upload doctor videos, run AI processing, moderate comments, schedule posts, and publish to social platforms.",
    cta: "Upload video",
  },
  reviews: {
    eyebrow: "Reputation",
    title: "Reviews",
    description: "Review patient feedback, ratings, and response status.",
    cta: "Request review",
  },
  blog: {
    eyebrow: "Website content",
    title: "Blog",
    description: "Write, edit, publish, and unpublish doctor blogs shown on the customer website.",
    cta: "Save blogs",
  },
  messages: {
    eyebrow: "Inbox",
    title: "Messages",
    description: "Handle WhatsApp, website, and follow-up conversations from one place.",
    cta: "New message",
  },
  settings: {
    eyebrow: "Configuration",
    title: "Settings",
    description: "Configure clinic profile, notifications, appearance, and automation.",
    cta: "Save settings",
  },
};

type RecordBackedAdminSection = Exclude<
  AdminSection,
  "dashboard" | "treatments" | "about" | "gallery" | "faqs" | "reports" | "ai" | "xray" | "blog" | "settings" | "videos"
>;

const initialRecords: Record<RecordBackedAdminSection, AdminRecord[]> = {
  appointments: [
    { id: "APT-1048", title: "Aarav Mehta", subtitle: "Root Canal with Dr. Lisha", meta: "Today, 10:30 AM", status: "Scheduled", tone: "indigo" },
    { id: "APT-1047", title: "Neha Sharma", subtitle: "Cleaning & Polishing", meta: "Today, 11:45 AM", status: "Completed", tone: "green" },
    { id: "APT-1046", title: "Rohan Verma", subtitle: "Crown consultation", meta: "Today, 01:15 PM", status: "Pending", tone: "orange" },
  ],
  patients: [
    { id: "PAT-2201", title: "Manohar Lal", subtitle: "Root canal follow-up", meta: "Last visit: 14 Jul", status: "Active", tone: "green" },
    { id: "PAT-2202", title: "Isha Kapoor", subtitle: "Whitening plan", meta: "Due follow-up: 22 Jul", status: "Recall", tone: "blue" },
    { id: "PAT-2203", title: "Family Dental Visit", subtitle: "Pediatric cleaning", meta: "3 visits", status: "Family", tone: "violet" },
  ],
  doctors: [
    { id: "DOC-001", title: "Dr. Lisha", subtitle: "BDS, Dental Surgeon", meta: "Available today 10 AM - 8 PM", status: "Available", tone: "green" },
    { id: "DOC-002", title: "Visiting Orthodontist", subtitle: "Braces and aligner consults", meta: "Saturdays by appointment", status: "Visiting", tone: "indigo" },
  ],
  billing: [
    { id: "INV-8801", title: "Aarav Mehta", subtitle: "Root Canal invoice", meta: "Rs 12,500", status: "Pending", tone: "orange" },
    { id: "INV-8800", title: "Neha Sharma", subtitle: "Cleaning payment", meta: "Rs 1,800", status: "Paid", tone: "green" },
    { id: "INV-8799", title: "Isha Kapoor", subtitle: "Whitening advance", meta: "Rs 5,000", status: "Partial", tone: "blue" },
  ],
  records: [
    { id: "REC-4101", title: "Aarav Mehta", subtitle: "Lower molar X-ray and pain notes", meta: "Updated today", status: "Dentist review", tone: "orange" },
    { id: "REC-4100", title: "Neha Sharma", subtitle: "Cleaning chart and gum notes", meta: "Updated yesterday", status: "Complete", tone: "green" },
  ],
  prescription: [
    { id: "RX-701", title: "Post RCT medication", subtitle: "Pain management and care instructions", meta: "Draft", status: "Awaiting approval", tone: "orange" },
    { id: "RX-700", title: "Cleaning after-care", subtitle: "Sensitivity and hygiene guidance", meta: "Sent", status: "Approved", tone: "green" },
  ],
  inventory: [
    { id: "INV-STK-01", title: "Composite filling material", subtitle: "Restorative supplies", meta: "4 units left", status: "Low stock", tone: "red" },
    { id: "INV-STK-02", title: "Sterilization pouches", subtitle: "Hygiene supplies", meta: "28 packs", status: "In stock", tone: "green" },
    { id: "INV-STK-03", title: "Whitening gel", subtitle: "Aesthetic treatment supplies", meta: "9 kits", status: "Reorder soon", tone: "orange" },
  ],
  reviews: [
    { id: "REV-901", title: "Manohar Lal", subtitle: "Smooth procedure and genuine care", meta: "5 stars", status: "Published", tone: "green" },
    { id: "REV-902", title: "Healthy Grins patient", subtitle: "Calm appointment experience", meta: "5 stars", status: "Reply needed", tone: "orange" },
  ],
  messages: [
    { id: "MSG-551", title: "Website booking request", subtitle: "Need appointment for tooth pain", meta: "2 min ago", status: "New", tone: "indigo" },
    { id: "MSG-552", title: "WhatsApp follow-up", subtitle: "Asked for clinic location", meta: "18 min ago", status: "Open", tone: "blue" },
  ],
};

const kpiCards: KpiCard[] = [
  {
    label: "Total Appointments",
    value: "1,248",
    delta: "+12.4% this month",
    tone: "indigo",
    icon: FiCalendar,
    data: [
      { name: "Mon", value: 32 },
      { name: "Tue", value: 38 },
      { name: "Wed", value: 35 },
      { name: "Thu", value: 46 },
      { name: "Fri", value: 52 },
      { name: "Sat", value: 49 },
    ],
  },
  {
    label: "Total Patients",
    value: "8,420",
    delta: "+318 new patients",
    tone: "violet",
    icon: FiUsers,
    data: [
      { name: "Mon", value: 120 },
      { name: "Tue", value: 126 },
      { name: "Wed", value: 140 },
      { name: "Thu", value: 149 },
      { name: "Fri", value: 166 },
      { name: "Sat", value: 172 },
    ],
  },
  {
    label: "Today's Revenue",
    value: "Rs 86,540",
    delta: "+8.2% vs yesterday",
    tone: "green",
    icon: FiDollarSign,
    data: [
      { name: "9a", value: 8 },
      { name: "11a", value: 18 },
      { name: "1p", value: 14 },
      { name: "3p", value: 29 },
      { name: "5p", value: 34 },
      { name: "7p", value: 42 },
    ],
  },
  {
    label: "Pending Payments",
    value: "Rs 1.42L",
    delta: "-4 invoices cleared",
    tone: "orange",
    icon: FiCreditCard,
    data: [
      { name: "Mon", value: 22 },
      { name: "Tue", value: 26 },
      { name: "Wed", value: 21 },
      { name: "Thu", value: 24 },
      { name: "Fri", value: 18 },
      { name: "Sat", value: 16 },
    ],
  },
];

const appointmentOverview: AppointmentTrend[] = [
  { day: "Mon", completed: 24, scheduled: 32, cancelled: 3 },
  { day: "Tue", completed: 31, scheduled: 38, cancelled: 4 },
  { day: "Wed", completed: 28, scheduled: 35, cancelled: 2 },
  { day: "Thu", completed: 40, scheduled: 46, cancelled: 5 },
  { day: "Fri", completed: 45, scheduled: 52, cancelled: 4 },
  { day: "Sat", completed: 42, scheduled: 49, cancelled: 3 },
  { day: "Sun", completed: 18, scheduled: 21, cancelled: 1 },
];

const topTreatments: TreatmentSlice[] = [
  { name: "Root Canal", value: 32, color: "#6366F1" },
  { name: "Cleaning", value: 26, color: "#8B5CF6" },
  { name: "Crowns", value: 18, color: "#22C55E" },
  { name: "Whitening", value: 14, color: "#3B82F6" },
  { name: "Pediatric", value: 10, color: "#F59E0B" },
];

const revenueOverview: RevenuePoint[] = [
  { month: "Jan", revenue: 420 },
  { month: "Feb", revenue: 510 },
  { month: "Mar", revenue: 485 },
  { month: "Apr", revenue: 620 },
  { month: "May", revenue: 760 },
  { month: "Jun", revenue: 830 },
];

const mockAppointments: RecentAppointment[] = [
  {
    id: "APT-1048",
    patient: "Aarav Mehta",
    treatment: "Root Canal",
    doctor: "Dr. Lisha",
    time: "Today, 10:30 AM",
    status: "Scheduled",
  },
  {
    id: "APT-1047",
    patient: "Neha Sharma",
    treatment: "Cleaning & Polishing",
    doctor: "Dr. Lisha",
    time: "Today, 11:45 AM",
    status: "Completed",
  },
  {
    id: "APT-1046",
    patient: "Rohan Verma",
    treatment: "Crown Consultation",
    doctor: "Dr. Lisha",
    time: "Today, 01:15 PM",
    status: "Pending",
  },
  {
    id: "APT-1045",
    patient: "Isha Kapoor",
    treatment: "Teeth Whitening",
    doctor: "Dr. Lisha",
    time: "Tomorrow, 05:00 PM",
    status: "Scheduled",
  },
];

const activity: ActivityItem[] = [
  {
    id: "1",
    title: "Payment received",
    detail: "Rs 12,500 collected for crown treatment.",
    time: new Date(Date.now() - 1000 * 60 * 18),
    icon: FiDollarSign,
    tone: "#22C55E",
  },
  {
    id: "2",
    title: "X-ray uploaded",
    detail: "New molar X-ray added to patient record.",
    time: new Date(Date.now() - 1000 * 60 * 46),
    icon: FiImage,
    tone: "#6366F1",
  },
  {
    id: "3",
    title: "Review received",
    detail: "5-star review published after cleaning visit.",
    time: new Date(Date.now() - 1000 * 60 * 88),
    icon: FiStar,
    tone: "#F59E0B",
  },
  {
    id: "4",
    title: "Inventory alert",
    detail: "Composite filling material is below target stock.",
    time: new Date(Date.now() - 1000 * 60 * 132),
    icon: FiPackage,
    tone: "#EF4444",
  },
];

const aiSuggestions = ["Summarize today's schedule", "Find unpaid invoices", "Draft follow-up message", "Analyze X-ray note"];

function getToneColor(tone: KpiCard["tone"]) {
  if (tone === "violet") return "#8B5CF6";
  if (tone === "green") return "#22C55E";
  if (tone === "orange") return "#F59E0B";
  return "#6366F1";
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function buildAppointmentsFromSubmissions(submissions: Submissions): RecentAppointment[] {
  if (!submissions.appointments.length) return mockAppointments;

  return submissions.appointments.slice(0, 6).map((item, index) => ({
    id: `WEB-${String(index + 1).padStart(3, "0")}`,
    patient: item.name,
    treatment: item.concern || "Dental consultation",
    doctor: "Dr. Lisha",
    time: item.preferredTime || format(new Date(item.createdAt), "dd MMM, hh:mm a"),
    status: "Pending",
  }));
}

function AdminLogin({
  token,
  status,
  loading,
  onTokenChange,
  onSubmit,
}: {
  token: string;
  status: string;
  loading: boolean;
  onTokenChange: (value: string) => void;
  onSubmit: () => void;
}) {
  return (
    <section className="adm-login">
      <div className="adm-login-card">
        <div className="adm-logo-mark">HG</div>
        <p className="adm-eyebrow">Admin access</p>
        <h1>Dental clinic command center.</h1>
        <p>Sign in to manage appointments, patients, billing, reports, AI tools, and clinic operations.</p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
        >
          <label>
            Admin password
            <input
              value={token}
              onChange={(event) => onTokenChange(event.target.value)}
              type="password"
              autoComplete="current-password"
              required
            />
          </label>
          <button className="adm-primary-button" type="submit" disabled={loading}>
            {loading ? "Opening dashboard..." : "Open dashboard"}
          </button>
        </form>
        <p className="adm-status" aria-live="polite">
          {status}
        </p>
      </div>
    </section>
  );
}

function Sidebar({
  open,
  activeSection,
  onClose,
  onNavigate,
}: {
  open: boolean;
  activeSection: AdminSection;
  onClose: () => void;
  onNavigate: (section: AdminSection) => void;
}) {
  return (
    <>
      <aside className={`adm-sidebar ${open ? "is-open" : ""}`}>
        <div className="adm-sidebar-brand">
          <div className="adm-logo-mark">HG</div>
          <div>
            <strong>Healthy Grins</strong>
            <span>Clinic OS</span>
          </div>
        </div>
        <nav aria-label="Admin navigation">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                className={activeSection === item.id ? "is-active" : ""}
                key={item.id}
                type="button"
                onClick={() => {
                  onNavigate(item.id);
                  onClose();
                }}
              >
                <Icon aria-hidden="true" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="adm-support-card">
          <FiHelpCircle aria-hidden="true" />
          <strong>Need help?</strong>
          <span>Contact support for setup, roles, or workflow changes.</span>
          <button type="button">Open support</button>
        </div>
      </aside>
      {open ? <button className="adm-sidebar-scrim" type="button" aria-label="Close menu" onClick={onClose} /> : null}
    </>
  );
}

function Header({
  darkMode,
  onToggleDarkMode,
  onMenu,
  search,
  onSearch,
  onNavigate,
}: {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onMenu: () => void;
  search: string;
  onSearch: (value: string) => void;
  onNavigate: (section: AdminSection) => void;
}) {
  return (
    <header className="adm-header">
      <div className="adm-header-left">
        <button className="adm-icon-button adm-menu-button" type="button" aria-label="Open menu" onClick={onMenu}>
          <FiMenu aria-hidden="true" />
        </button>
        <div className="adm-header-brand">
          <div className="adm-logo-mark">HG</div>
          <div>
            <strong>Healthy Grins Dental Clinic</strong>
            <span>{format(new Date(), "EEEE, dd MMM yyyy")}</span>
          </div>
        </div>
      </div>
      <label className="adm-search">
        <FiSearch aria-hidden="true" />
        <input
          aria-label="Search dashboard"
          placeholder="Search patients, invoices, records..."
          value={search}
          onChange={(event) => onSearch(event.target.value)}
        />
        <kbd>Ctrl K</kbd>
      </label>
      <div className="adm-header-actions">
        <button className="adm-icon-button" type="button" aria-label="Messages" onClick={() => onNavigate("messages")}>
          <FiMessageCircle aria-hidden="true" />
        </button>
        <button className="adm-icon-button has-dot" type="button" aria-label="Notifications" onClick={() => onNavigate("messages")}>
          <FiBell aria-hidden="true" />
        </button>
        <button className="adm-icon-button" type="button" aria-label="Calendar" onClick={() => onNavigate("appointments")}>
          <FiCalendar aria-hidden="true" />
        </button>
        <button className="adm-icon-button" type="button" aria-label="Toggle dark mode" onClick={onToggleDarkMode}>
          {darkMode ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
        </button>
        <button className="adm-profile-button" type="button">
          <span>DL</span>
          <div>
            <strong>Dr. Lisha</strong>
            <small>Clinic Admin</small>
          </div>
          <FiChevronDown aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}

function KpiCards() {
  return (
    <section className="adm-kpi-grid" aria-label="Clinic KPI cards">
      {kpiCards.map((card) => {
        const Icon = card.icon;
        const color = getToneColor(card.tone);
        return (
          <article className="adm-kpi-card" key={card.label}>
            <div className="adm-kpi-head">
              <span style={{ background: `${color}18`, color }}>
                <Icon aria-hidden="true" />
              </span>
              <small>{card.delta}</small>
            </div>
            <p>{card.label}</p>
            <strong>{card.value}</strong>
            <div className="adm-mini-chart" aria-hidden="true">
              <ResponsiveContainer width="100%" height={58}>
                <LineChart data={card.data}>
                  <Line type="monotone" dataKey="value" stroke={color} strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </article>
        );
      })}
    </section>
  );
}

function AppointmentOverviewChart() {
  return (
    <section className="adm-card adm-chart-card">
      <div className="adm-card-head">
        <div>
          <p className="adm-eyebrow">Appointment overview</p>
          <h2>Weekly clinical flow</h2>
        </div>
        <span className="adm-pill">Live mock data</span>
      </div>
      <div className="adm-chart-area">
        <ResponsiveContainer width="100%" height={310}>
          <AreaChart data={appointmentOverview}>
            <defs>
              <linearGradient id="completedGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.36} />
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="scheduledGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#22C55E" stopOpacity={0.28} />
                <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--adm-line)" />
            <XAxis dataKey="day" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip />
            <Area dataKey="scheduled" type="monotone" stroke="#22C55E" fill="url(#scheduledGradient)" strokeWidth={3} />
            <Area dataKey="completed" type="monotone" stroke="#6366F1" fill="url(#completedGradient)" strokeWidth={3} />
            <Line dataKey="cancelled" type="monotone" stroke="#EF4444" strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

function TopTreatmentsChart() {
  return (
    <section className="adm-card">
      <div className="adm-card-head">
        <div>
          <p className="adm-eyebrow">Top treatments</p>
          <h2>Service demand</h2>
        </div>
      </div>
      <div className="adm-donut-wrap">
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={topTreatments} innerRadius={62} outerRadius={92} dataKey="value" paddingAngle={3}>
              {topTreatments.map((slice) => (
                <Cell fill={slice.color} key={slice.name} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="adm-legend">
        {topTreatments.map((slice) => (
          <span key={slice.name}>
            <i style={{ background: slice.color }} />
            {slice.name}
            <strong>{slice.value}%</strong>
          </span>
        ))}
      </div>
    </section>
  );
}

function AiAssistantCard() {
  const [prompt, setPrompt] = useState("");

  return (
    <section className="adm-card adm-ai-card">
      <div className="adm-card-head">
        <div>
          <p className="adm-eyebrow">AI assistant</p>
          <h2>Ask anything</h2>
        </div>
        <FiZap aria-hidden="true" />
      </div>
      <div className="adm-ai-input">
        <input
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="Ask about patients, schedule, payments, X-rays..."
          aria-label="Ask AI assistant"
        />
        <button type="button">Ask</button>
      </div>
      <div className="adm-chip-row">
        {aiSuggestions.map((suggestion) => (
          <button key={suggestion} type="button" onClick={() => setPrompt(suggestion)}>
            {suggestion}
          </button>
        ))}
      </div>
      <p>
        Clinical AI suggestions are support-only and should be verified by the dentist before advice, diagnosis, or
        treatment decisions.
      </p>
    </section>
  );
}

function RecentAppointments({ appointments }: { appointments: RecentAppointment[] }) {
  return (
    <section className="adm-card">
      <div className="adm-card-head">
        <div>
          <p className="adm-eyebrow">Recent appointments</p>
          <h2>Patient queue</h2>
        </div>
        <button className="adm-secondary-button" type="button">
          <FiPlusCircle aria-hidden="true" />
          Add
        </button>
      </div>
      {appointments.length ? (
        <div className="adm-table">
          {appointments.map((appointment) => (
            <article key={appointment.id}>
              <div>
                <strong>{appointment.patient}</strong>
                <span>{appointment.id}</span>
              </div>
              <div>
                <strong>{appointment.treatment}</strong>
                <span>{appointment.doctor}</span>
              </div>
              <span>{appointment.time}</span>
              <mark className={`adm-status-badge ${appointment.status.toLowerCase()}`}>{appointment.status}</mark>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState title="No appointments yet" text="New booking requests will appear here automatically." />
      )}
    </section>
  );
}

function RevenueOverviewChart() {
  return (
    <section className="adm-card adm-chart-card">
      <div className="adm-card-head">
        <div>
          <p className="adm-eyebrow">Revenue overview</p>
          <h2>Monthly collections</h2>
        </div>
        <span className="adm-pill">Rs x 1,000</span>
      </div>
      <div className="adm-chart-area">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={revenueOverview}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--adm-line)" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip />
            <Bar dataKey="revenue" fill="#6366F1" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

function ClinicActivity() {
  return (
    <section className="adm-card">
      <div className="adm-card-head">
        <div>
          <p className="adm-eyebrow">Clinic activity</p>
          <h2>Latest updates</h2>
        </div>
      </div>
      <div className="adm-timeline">
        {activity.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.id}>
              <span style={{ color: item.tone, background: `${item.tone}16` }}>
                <Icon aria-hidden="true" />
              </span>
              <div>
                <strong>{item.title}</strong>
                <p>{item.detail}</p>
                <small>{formatDistanceToNow(item.time, { addSuffix: true })}</small>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function LoadingState() {
  return (
    <section className="adm-loading" aria-label="Loading dashboard">
      {Array.from({ length: 8 }).map((_, index) => (
        <span key={index} />
      ))}
    </section>
  );
}

function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="adm-empty">
      <FiInbox aria-hidden="true" />
      <strong>{title}</strong>
      <span>{text}</span>
    </div>
  );
}

function SectionHero({
  section,
  lastUpdated,
  onPrimaryAction,
}: {
  section: AdminSection;
  lastUpdated: Date;
  onPrimaryAction: () => void;
}) {
  const copy = sectionCopy[section];

  return (
    <section className="adm-hero-row">
      <div>
        <p className="adm-eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <span>{copy.description}</span>
      </div>
      <div className="adm-hero-actions">
        <span>
          <FiActivity aria-hidden="true" />
          Updated {format(lastUpdated, "hh:mm a")}
        </span>
        <button className="adm-primary-button" type="button" onClick={onPrimaryAction}>
          <FiPlusCircle aria-hidden="true" />
          {copy.cta}
        </button>
      </div>
    </section>
  );
}

function DashboardSection({ appointments }: { appointments: RecentAppointment[] }) {
  return (
    <>
      <KpiCards />
      <section className="adm-widget-grid">
        <AppointmentOverviewChart />
        <TopTreatmentsChart />
        <AiAssistantCard />
        <RecentAppointments appointments={appointments} />
        <RevenueOverviewChart />
        <ClinicActivity />
      </section>
    </>
  );
}

function getStatusClass(status: string) {
  return status.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function GenericSection({
  section,
  records,
  search,
  onAdd,
  onAdvance,
  onDelete,
}: {
  section: RecordBackedAdminSection;
  records: AdminRecord[];
  search: string;
  onAdd: (record: AdminRecord) => void;
  onAdvance: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const filteredRecords = records.filter((record) =>
    [record.title, record.subtitle, record.meta, record.status].join(" ").toLowerCase().includes(search.toLowerCase()),
  );

  function submitRecord() {
    if (!title.trim()) return;
    onAdd({
      id: `${section.slice(0, 3).toUpperCase()}-${Date.now().toString().slice(-5)}`,
      title: title.trim(),
      subtitle: subtitle.trim() || `New ${sectionCopy[section].title.toLowerCase()} item`,
      meta: "Added just now",
      status: "New",
      tone: "indigo",
    });
    setTitle("");
    setSubtitle("");
  }

  return (
    <section className="adm-section-grid">
      <article className="adm-card adm-form-card">
        <div className="adm-card-head">
          <div>
            <p className="adm-eyebrow">Quick action</p>
            <h2>Add {sectionCopy[section].title}</h2>
          </div>
        </div>
        <label>
          Name / title
          <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Enter title" />
        </label>
        <label>
          Details
          <textarea value={subtitle} onChange={(event) => setSubtitle(event.target.value)} placeholder="Add short details" rows={4} />
        </label>
        <button className="adm-primary-button" type="button" onClick={submitRecord}>
          <FiPlusCircle aria-hidden="true" />
          Add item
        </button>
      </article>

      <article className="adm-card">
        <div className="adm-card-head">
          <div>
            <p className="adm-eyebrow">Records</p>
            <h2>{filteredRecords.length} active items</h2>
          </div>
          <span className="adm-pill">{records.length} total</span>
        </div>
        {filteredRecords.length ? (
          <div className="adm-record-list">
            {filteredRecords.map((record) => (
              <article key={record.id}>
                <div className={`adm-record-icon ${record.tone}`}>
                  <FiFileText aria-hidden="true" />
                </div>
                <div>
                  <strong>{record.title}</strong>
                  <span>{record.subtitle}</span>
                  <small>{record.id} · {record.meta}</small>
                </div>
                <mark className={`adm-status-badge ${getStatusClass(record.status)}`}>{record.status}</mark>
                <div className="adm-row-actions">
                  <button type="button" onClick={() => onAdvance(record.id)}>
                    Update
                  </button>
                  <button type="button" onClick={() => onDelete(record.id)}>
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState title="No matching records" text="Try another search or add a new item from the quick action form." />
        )}
      </article>
    </section>
  );
}

type AdminAppointmentStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";
type AdminAppointmentPayment = "Paid" | "Pending" | "Partial" | "Insurance";
type AdminAppointmentView = "list" | "calendar" | "timeline" | "kanban";

type AdminAppointment = {
  id: string;
  patient: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  treatment: string;
  doctor: string;
  date: string;
  time: string;
  duration: string;
  chair: string;
  priority: "Low" | "Normal" | "High";
  type: "New Visit" | "Follow-up" | "Emergency" | "Consultation";
  status: AdminAppointmentStatus;
  payment: AdminAppointmentPayment;
  invoice: string;
  notes: string;
};

type AdminQuickAppointmentFormState = {
  patient: string;
  phone: string;
  email: string;
  treatment: string;
  doctor: string;
  date: string;
  time: string;
  duration: string;
  chair: string;
  priority: string;
  status: AdminAppointmentStatus;
  reminder: string;
  insurance: string;
  paymentMethod: string;
  files: string;
  notes: string;
};

function getAppointmentStatus(status: string): AdminAppointmentStatus {
  const value = status.toLowerCase();
  if (value.includes("complete") || value.includes("review")) return "Completed";
  if (value.includes("cancel")) return "Cancelled";
  if (value.includes("schedule") || value.includes("confirm") || value.includes("active")) return "Confirmed";
  return "Pending";
}

function buildAdminAppointments(records: AdminRecord[]): AdminAppointment[] {
  return records.map((record, index) => {
    const status = getAppointmentStatus(record.status);

    return {
      id: record.id,
      patient: record.title || `Patient ${index + 1}`,
      age: index % 2 ? 29 : 34,
      gender: index % 2 ? "Female" : "Male",
      phone: index % 2 ? "+91 99887 77665" : "+91 98765 43210",
      email: `${slugify(record.title || "patient")}@healthygrinz.local`,
      treatment: record.subtitle || "Dental consultation",
      doctor: index % 3 ? "Dr. Lisha" : "Dr. HealthyGrinz",
      date: index === 1 ? "Tomorrow" : "Today",
      time: record.meta || format(new Date(), "hh:mm a"),
      duration: index % 2 ? "60 min" : "45 min",
      chair: `Chair ${(index % 3) + 1}`,
      priority: index % 4 === 0 ? "High" : "Normal",
      type: index % 3 === 0 ? "Follow-up" : "New Visit",
      status,
      payment: status === "Completed" ? "Paid" : index % 3 === 0 ? "Partial" : "Pending",
      invoice: `INV-${String(2040 + index).padStart(4, "0")}`,
      notes: record.subtitle || "Patient requested an appointment from the website or admin desk.",
    };
  });
}

function AdminAppointmentsSection({
  records,
  search,
  onAdd,
  onAdvance,
  onDelete,
}: {
  records: AdminRecord[];
  search: string;
  onAdd: (record: AdminRecord) => void;
  onAdvance: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const [query, setQuery] = useState(search);
  const [view, setView] = useState<AdminAppointmentView>("list");
  const [statusFilter, setStatusFilter] = useState<AdminAppointmentStatus | "All">("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [doctorFilter, setDoctorFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState<AdminAppointmentPayment | "All">("All");
  const [treatmentFilter, setTreatmentFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState<AdminAppointment["type"] | "All">("All");
  const [timeFilter, setTimeFilter] = useState("All");
  const [selected, setSelected] = useState<AdminAppointment | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);
  const [toast, setToast] = useState("Live sync active. Appointment board is current.");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [form, setForm] = useState<AdminQuickAppointmentFormState>({
    patient: "",
    phone: "",
    email: "",
    treatment: "",
    doctor: "Dr. Lisha",
    date: format(new Date(), "yyyy-MM-dd"),
    time: "10:00",
    duration: "45",
    chair: "Chair 1",
    priority: "Normal",
    status: "Pending" as AdminAppointmentStatus,
    reminder: "SMS + WhatsApp",
    insurance: "No",
    paymentMethod: "Clinic desk",
    files: "",
    notes: "",
  });

  useEffect(() => {
    setQuery(search);
  }, [search]);

  useEffect(() => {
    const savedView = window.localStorage.getItem("healthygrinz-admin-appointments-view") as AdminAppointmentView | null;
    const savedSearches = window.localStorage.getItem("healthygrinz-admin-appointment-searches");
    if (savedView && ["list", "calendar", "timeline", "kanban"].includes(savedView)) setView(savedView);
    if (savedSearches) setRecentSearches(JSON.parse(savedSearches) as string[]);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("healthygrinz-admin-appointments-view", view);
  }, [view]);

  useEffect(() => {
    const shortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        document.getElementById("adm-appointment-search")?.focus();
      }
    };
    window.addEventListener("keydown", shortcut);
    return () => window.removeEventListener("keydown", shortcut);
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = window.setTimeout(() => setToast(""), 3200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const appointments = useMemo(() => buildAdminAppointments(records), [records]);
  const doctors = useMemo(() => ["All", ...Array.from(new Set(appointments.map((appointment) => appointment.doctor)))], [appointments]);
  const treatments = useMemo(() => ["All", ...Array.from(new Set(appointments.map((appointment) => appointment.treatment)))], [appointments]);

  const suggestions = useMemo(() => {
    const values = appointments.flatMap((appointment) => [
      appointment.patient,
      appointment.phone,
      appointment.id,
      appointment.treatment,
      appointment.doctor,
      appointment.invoice,
    ]);
    return Array.from(new Set(values)).filter((value) => value.toLowerCase().includes(query.toLowerCase())).slice(0, 5);
  }, [appointments, query]);

  const filteredAppointments = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return appointments.filter((appointment) => {
      const searchable = [
        appointment.patient,
        appointment.phone,
        appointment.email,
        appointment.id,
        appointment.treatment,
        appointment.doctor,
        appointment.invoice,
        appointment.status,
        appointment.payment,
      ]
        .join(" ")
        .toLowerCase();

      return (
        (!normalizedQuery || searchable.includes(normalizedQuery)) &&
        (statusFilter === "All" || appointment.status === statusFilter) &&
        (dateFilter === "All" || dateFilter === "This Week" || appointment.date === dateFilter) &&
        (doctorFilter === "All" || appointment.doctor === doctorFilter) &&
        (paymentFilter === "All" || appointment.payment === paymentFilter) &&
        (treatmentFilter === "All" || appointment.treatment === treatmentFilter) &&
        (typeFilter === "All" || appointment.type === typeFilter) &&
        (timeFilter === "All" || appointment.time.toLowerCase().includes(timeFilter.toLowerCase()))
      );
    });
  }, [appointments, dateFilter, doctorFilter, paymentFilter, query, statusFilter, timeFilter, treatmentFilter, typeFilter]);

  const counts = useMemo(() => {
    const countStatus = (status: AdminAppointmentStatus) => appointments.filter((appointment) => appointment.status === status).length;
    return {
      today: appointments.filter((appointment) => appointment.date === "Today").length,
      pending: countStatus("Pending"),
      confirmed: countStatus("Confirmed"),
      completed: countStatus("Completed"),
      cancelled: countStatus("Cancelled"),
      revenue: appointments.filter((appointment) => appointment.payment === "Paid").length * 2500,
      patients: new Set(appointments.map((appointment) => appointment.phone)).size,
      wait: 11,
      chairs: 82,
    };
  }, [appointments]);

  function saveSearch(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return;
    const next = [trimmed, ...recentSearches.filter((item) => item !== trimmed)].slice(0, 5);
    setRecentSearches(next);
    window.localStorage.setItem("healthygrinz-admin-appointment-searches", JSON.stringify(next));
  }

  function openDrawer(appointment: AdminAppointment) {
    setSelected(appointment);
    setDrawerOpen(true);
  }

  function createAppointment() {
    if (!form.patient.trim() || !form.phone.trim()) {
      setToast("Patient name and phone are required.");
      return;
    }

    onAdd({
      id: `APT-${Date.now().toString().slice(-5)}`,
      title: form.patient.trim(),
      subtitle: form.treatment.trim() || "Dental consultation",
      meta: `${form.date} ${form.time}`,
      status: form.status,
      tone: form.status === "Confirmed" ? "blue" : "orange",
    });
    setForm({
      patient: "",
      phone: "",
      email: "",
      treatment: "",
      doctor: "Dr. Lisha",
      date: format(new Date(), "yyyy-MM-dd"),
      time: "10:00",
      duration: "45",
      chair: "Chair 1",
      priority: "Normal",
      status: "Pending",
      reminder: "SMS + WhatsApp",
      insurance: "No",
      paymentMethod: "Clinic desk",
      files: "",
      notes: "",
    });
    setToast("Appointment created.");
  }

  function resetFilters() {
    setQuery("");
    setStatusFilter("All");
    setDateFilter("All");
    setDoctorFilter("All");
    setPaymentFilter("All");
    setTreatmentFilter("All");
    setTypeFilter("All");
    setTimeFilter("All");
  }

  return (
    <section className="adm-apt-shell">
      <div className="adm-apt-stat-grid" aria-label="Appointment statistics">
        <AdminAppointmentStat icon={FiCalendar} label="Today's Appointments" trend="+14%" value={String(counts.today)} />
        <AdminAppointmentStat icon={FiClipboard} label="Pending" trend="+8%" value={String(counts.pending)} />
        <AdminAppointmentStat icon={FiBell} label="Confirmed" trend="+21%" value={String(counts.confirmed)} />
        <AdminAppointmentStat icon={FiUserCheck} label="Completed" trend="+11%" value={String(counts.completed)} />
        <AdminAppointmentStat icon={FiXCircle} label="Cancelled" trend="-4%" value={String(counts.cancelled)} />
        <AdminAppointmentStat icon={FiCreditCard} label="Revenue Today" trend="+18%" value={`Rs. ${counts.revenue.toLocaleString("en-IN")}`} />
        <AdminAppointmentStat icon={FiUsers} label="Total Patients" trend="+6%" value={String(counts.patients)} />
        <AdminAppointmentStat icon={FiActivity} label="Avg Waiting Time" trend="-9%" value={`${counts.wait}m`} />
        <AdminAppointmentStat icon={FiPieChart} label="Chair Utilization" trend="+12%" value={`${counts.chairs}%`} />
      </div>

      <div className="adm-apt-layout">
        <div className="adm-apt-main">
          <article className="adm-card adm-apt-control-card">
            <div className="adm-apt-search-row">
              <label className="adm-apt-search">
                <FiSearch aria-hidden="true" />
                <input
                  aria-label="Search appointments"
                  id="adm-appointment-search"
                  onBlur={() => saveSearch(query)}
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") saveSearch(query);
                  }}
                  placeholder="Search patient, phone, appointment ID, treatment, doctor, invoice..."
                  value={query}
                />
                <span>Ctrl K</span>
              </label>
              <button className="adm-secondary-button" type="button" onClick={resetFilters}>
                Reset Filters
              </button>
            </div>

            {query ? (
              <div className="adm-apt-suggestions">
                {suggestions.map((suggestion) => (
                  <button key={suggestion} type="button" onClick={() => setQuery(suggestion)}>
                    {suggestion}
                  </button>
                ))}
              </div>
            ) : (
              <div className="adm-apt-suggestions">
                {recentSearches.map((item) => (
                  <button key={item} type="button" onClick={() => setQuery(item)}>
                    {item}
                  </button>
                ))}
              </div>
            )}

            <div className="adm-apt-filter-grid">
              <AdminAppointmentFilter label="Date" options={["All", "Today", "Tomorrow", "This Week"]} value={dateFilter} onChange={setDateFilter} />
              <AdminAppointmentFilter label="Status" options={["All", "Pending", "Confirmed", "Completed", "Cancelled"]} value={statusFilter} onChange={(value) => setStatusFilter(value as AdminAppointmentStatus | "All")} />
              <AdminAppointmentFilter label="Doctor" options={doctors} value={doctorFilter} onChange={setDoctorFilter} />
              <AdminAppointmentFilter label="Treatment" options={treatments} value={treatmentFilter} onChange={setTreatmentFilter} />
              <AdminAppointmentFilter label="Payment" options={["All", "Paid", "Pending", "Partial", "Insurance"]} value={paymentFilter} onChange={(value) => setPaymentFilter(value as AdminAppointmentPayment | "All")} />
              <AdminAppointmentFilter label="Type" options={["All", "New Visit", "Follow-up", "Emergency", "Consultation"]} value={typeFilter} onChange={(value) => setTypeFilter(value as AdminAppointment["type"] | "All")} />
              <AdminAppointmentFilter label="Time" options={["All", "09", "10", "11", "02", "03"]} value={timeFilter} onChange={setTimeFilter} />
              <label>
                Actions
                <button className="adm-secondary-button" type="button" onClick={resetFilters}>Clear all</button>
              </label>
            </div>

            <div className="adm-apt-view-row" role="tablist" aria-label="Appointment views">
              {([
                ["list", "List View", FiFileText],
                ["calendar", "Calendar View", FiCalendar],
                ["timeline", "Timeline View", FiActivity],
                ["kanban", "Kanban View", FiDatabase],
              ] as Array<[AdminAppointmentView, string, IconType]>).map(([id, label, Icon]) => (
                <button aria-selected={view === id} className={view === id ? "is-active" : ""} key={id} onClick={() => setView(id)} role="tab" type="button">
                  <Icon aria-hidden="true" />
                  {label}
                </button>
              ))}
            </div>
          </article>

          <article className="adm-card adm-apt-board">
            <div className="adm-card-head">
              <div>
                <p className="adm-eyebrow">Appointment Management</p>
                <h2>{filteredAppointments.length} appointments found</h2>
              </div>
              <span className="adm-live-badge"><i />Live syncing</span>
            </div>
            {filteredAppointments.length ? (
              <>
                {view === "list" ? <AdminAppointmentList appointments={filteredAppointments} onAdvance={onAdvance} onDelete={onDelete} onOpen={openDrawer} /> : null}
                {view === "calendar" ? <AdminAppointmentCalendar appointments={filteredAppointments} onOpen={openDrawer} /> : null}
                {view === "timeline" ? <AdminAppointmentTimeline appointments={filteredAppointments} onOpen={openDrawer} /> : null}
                {view === "kanban" ? <AdminAppointmentKanban appointments={filteredAppointments} onOpen={openDrawer} /> : null}
              </>
            ) : (
              <div className="adm-apt-empty">
                <FiCalendar aria-hidden="true" />
                <strong>No appointments found</strong>
                <span>Create a new appointment or reset filters to restore the schedule.</span>
                <button className="adm-primary-button" type="button" onClick={resetFilters}>Reset filters</button>
              </div>
            )}
          </article>
        </div>

        <aside className="adm-apt-side">
          <AdminTodayTimeline />
          <AdminQuickAppointmentForm form={form} onChange={setForm} onCreate={createAppointment} />
          <AdminAppointmentAnalytics appointments={appointments} />
        </aside>
      </div>

      <AdminAppointmentDrawer appointment={selected} open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <div className="adm-apt-fab">
        {fabOpen ? (
          <div className="adm-apt-fab-menu">
            {["New Patient", "New Appointment", "Invoice", "Treatment", "Prescription", "Upload X-Ray"].map((item) => (
              <button key={item} type="button">{item}</button>
            ))}
          </div>
        ) : null}
        <button aria-label="Appointment quick actions" className="adm-apt-fab-button" type="button" onClick={() => setFabOpen((current) => !current)}>
          {fabOpen ? <FiChevronDown aria-hidden="true" /> : <FiPlusCircle aria-hidden="true" />}
        </button>
      </div>
      {toast ? <div className="adm-apt-toast"><FiBell aria-hidden="true" />{toast}</div> : null}
    </section>
  );
}

function AdminAppointmentStat({ icon: Icon, label, trend, value }: { icon: IconType; label: string; trend: string; value: string }) {
  return (
    <article className="adm-apt-stat-card">
      <div>
        <span><Icon aria-hidden="true" /></span>
        <mark>{trend}</mark>
      </div>
      <strong>{value}</strong>
      <p>{label}</p>
      <svg aria-hidden="true" viewBox="0 0 120 34">
        <polyline fill="none" points="0,25 18,19 36,22 54,12 72,16 90,7 120,10" />
      </svg>
    </article>
  );
}

function AdminAppointmentFilter({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (value: string) => void }) {
  return (
    <label>
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

function AdminAppointmentBadge({ kind, value }: { kind: "status" | "payment" | "priority"; value: string }) {
  return <span className={`adm-apt-badge ${kind} ${getStatusClass(value)}`}>{value}</span>;
}

function AdminAppointmentList({
  appointments,
  onAdvance,
  onDelete,
  onOpen,
}: {
  appointments: AdminAppointment[];
  onAdvance: (id: string) => void;
  onDelete: (id: string) => void;
  onOpen: (appointment: AdminAppointment) => void;
}) {
  return (
    <div className="adm-apt-list">
      {appointments.map((appointment) => (
        <article key={appointment.id} onClick={() => onOpen(appointment)}>
          <div className="adm-apt-avatar">{appointment.patient.charAt(0)}</div>
          <div className="adm-apt-card-body">
            <div className="adm-apt-card-headline">
              <strong>{appointment.patient}</strong>
              <AdminAppointmentBadge kind="status" value={appointment.status} />
              <AdminAppointmentBadge kind="payment" value={appointment.payment} />
              <AdminAppointmentBadge kind="priority" value={appointment.priority} />
            </div>
            <p>{appointment.age} yrs &middot; {appointment.gender} &middot; {appointment.phone}</p>
            <div className="adm-apt-card-meta">
              <span><FiSmile aria-hidden="true" />{appointment.treatment}</span>
              <span><FiUserCheck aria-hidden="true" />{appointment.doctor}</span>
              <span><FiCalendar aria-hidden="true" />{appointment.date}</span>
              <span><FiActivity aria-hidden="true" />{appointment.time} &middot; {appointment.duration}</span>
              <span><FiCreditCard aria-hidden="true" />{appointment.invoice}</span>
              <span><FiDatabase aria-hidden="true" />{appointment.chair} &middot; {appointment.type}</span>
            </div>
            <small>{appointment.notes}</small>
          </div>
          <div className="adm-apt-actions" onClick={(event) => event.stopPropagation()}>
            {[
              ["View", FiFileText],
              ["Edit", FiEdit3],
              ["Print", FiPrinter],
              ["Invoice", FiCreditCard],
              ["Prescription", FiClipboard],
              ["WhatsApp", FiMessageCircle],
              ["Call", FiPhone],
              ["Email", FiMail],
              ["Duplicate", FiCopy],
            ].map(([label, Icon]) => (
              <button aria-label={`${label} ${appointment.patient}`} key={String(label)} title={String(label)} type="button" onClick={() => onOpen(appointment)}>
                <Icon aria-hidden="true" />
              </button>
            ))}
            <button type="button" onClick={() => onAdvance(appointment.id)}>Update</button>
            <button type="button" onClick={() => onDelete(appointment.id)}>Delete</button>
          </div>
        </article>
      ))}
    </div>
  );
}

function AdminAppointmentCalendar({ appointments, onOpen }: { appointments: AdminAppointment[]; onOpen: (appointment: AdminAppointment) => void }) {
  const columns = ["Today", "Tomorrow", "This Week", "Follow-up"];
  return (
    <div className="adm-apt-calendar">
      {columns.map((column) => (
        <article key={column}>
          <div><strong>{column}</strong><span>{appointments.filter((appointment) => appointment.date === column || column === "This Week").length}</span></div>
          {appointments
            .filter((appointment) => appointment.date === column || column === "This Week")
            .slice(0, 5)
            .map((appointment) => (
              <button key={appointment.id} type="button" onClick={() => onOpen(appointment)}>
                <b>{appointment.time}</b>
                <span>{appointment.patient}</span>
                <small>{appointment.treatment}</small>
              </button>
            ))}
        </article>
      ))}
    </div>
  );
}

function AdminAppointmentTimeline({ appointments, onOpen }: { appointments: AdminAppointment[]; onOpen: (appointment: AdminAppointment) => void }) {
  return (
    <div className="adm-apt-timeline-view">
      {appointments.map((appointment) => (
        <button key={appointment.id} type="button" onClick={() => onOpen(appointment)}>
          <i />
          <strong>{appointment.time}</strong>
          <span>{appointment.patient}</span>
          <small>{appointment.treatment} &middot; {appointment.status}</small>
        </button>
      ))}
    </div>
  );
}

function AdminAppointmentKanban({ appointments, onOpen }: { appointments: AdminAppointment[]; onOpen: (appointment: AdminAppointment) => void }) {
  const columns: AdminAppointmentStatus[] = ["Pending", "Confirmed", "Completed", "Cancelled"];
  return (
    <div className="adm-apt-kanban">
      {columns.map((status) => (
        <article key={status}>
          <header><AdminAppointmentBadge kind="status" value={status} /><span>{appointments.filter((appointment) => appointment.status === status).length}</span></header>
          {appointments
            .filter((appointment) => appointment.status === status)
            .map((appointment) => (
              <button key={appointment.id} type="button" onClick={() => onOpen(appointment)}>
                <strong>{appointment.patient}</strong>
                <span>{appointment.treatment}</span>
                <small>{appointment.time}</small>
              </button>
            ))}
        </article>
      ))}
    </div>
  );
}

function AdminTodayTimeline() {
  const items = [
    ["09:00", "Cleaning", "Aarav Mehta"],
    ["10:00", "Root Canal", "Rahul Sharma"],
    ["11:30", "Implant", "Manohar Lal"],
    ["12:30", "Lunch", "Clinic break"],
    ["02:00", "Whitening", "Priya Verma"],
    ["03:00", "Extraction", "Neha Kapoor"],
  ];

  return (
    <article className="adm-card adm-apt-today">
      <div className="adm-card-head"><div><p className="adm-eyebrow">Today&apos;s Timeline</p><h2>Chair flow</h2></div><span className="adm-pill">42m left</span></div>
      <div>
        {items.map(([time, label, detail], index) => (
          <section className={index === 1 ? "is-current" : ""} key={`${time}-${label}`}>
            <strong>{time}</strong><span>{label}</span><small>{detail}</small>
          </section>
        ))}
      </div>
    </article>
  );
}

function AdminQuickAppointmentForm({
  form,
  onChange,
  onCreate,
}: {
  form: AdminQuickAppointmentFormState;
  onChange: (form: AdminQuickAppointmentFormState) => void;
  onCreate: () => void;
}) {
  const update = (patch: Partial<typeof form>) => onChange({ ...form, ...patch });
  return (
    <article className="adm-card adm-apt-form-card">
      <div className="adm-card-head"><div><p className="adm-eyebrow">Quick Add Appointment</p><h2>Create a visit</h2></div></div>
      <div className="adm-apt-form-grid">
        <AdminAptInput label="Patient Name" value={form.patient} onChange={(patient) => update({ patient })} />
        <AdminAptInput label="Phone" value={form.phone} onChange={(phone) => update({ phone })} />
        <AdminAptInput label="Email" value={form.email} onChange={(email) => update({ email })} />
        <AdminAptInput label="Treatment" value={form.treatment} onChange={(treatment) => update({ treatment })} />
        <AdminAppointmentFilter label="Doctor" options={["Dr. Lisha", "Dr. HealthyGrinz"]} value={form.doctor} onChange={(doctor) => update({ doctor })} />
        <AdminAptInput label="Date" type="date" value={form.date} onChange={(date) => update({ date })} />
        <AdminAptInput label="Time" type="time" value={form.time} onChange={(time) => update({ time })} />
        <AdminAptInput label="Duration" value={form.duration} onChange={(duration) => update({ duration })} />
        <AdminAppointmentFilter label="Chair Number" options={["Chair 1", "Chair 2", "Chair 3"]} value={form.chair} onChange={(chair) => update({ chair })} />
        <AdminAppointmentFilter label="Priority" options={["Low", "Normal", "High"]} value={form.priority} onChange={(priority) => update({ priority })} />
        <AdminAppointmentFilter label="Status" options={["Pending", "Confirmed", "Completed", "Cancelled"]} value={form.status} onChange={(status) => update({ status: status as AdminAppointmentStatus })} />
        <AdminAppointmentFilter label="Reminder" options={["SMS + WhatsApp", "WhatsApp only", "Email only", "No reminder"]} value={form.reminder} onChange={(reminder) => update({ reminder })} />
        <AdminAppointmentFilter label="Insurance" options={["No", "Yes", "Claim pending"]} value={form.insurance} onChange={(insurance) => update({ insurance })} />
        <AdminAppointmentFilter label="Payment Method" options={["Clinic desk", "UPI", "Card", "Cash", "Insurance"]} value={form.paymentMethod} onChange={(paymentMethod) => update({ paymentMethod })} />
        <AdminAptInput label="Upload Files" value={form.files} onChange={(files) => update({ files })} />
        <label className="adm-apt-span-2">Notes<textarea rows={3} value={form.notes} onChange={(event) => update({ notes: event.target.value })} /></label>
      </div>
      <button className="adm-primary-button" type="button" onClick={onCreate}><FiPlusCircle aria-hidden="true" />Create Appointment</button>
    </article>
  );
}

function AdminAptInput({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return (
    <label>
      {label}
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function AdminAppointmentAnalytics({ appointments }: { appointments: AdminAppointment[] }) {
  const completed = appointments.filter((appointment) => appointment.status === "Completed").length;
  const cancelled = appointments.filter((appointment) => appointment.status === "Cancelled").length;
  const cancellationRate = appointments.length ? Math.round((cancelled / appointments.length) * 100) : 0;
  return (
    <article className="adm-card adm-apt-analytics">
      <div className="adm-card-head"><div><p className="adm-eyebrow">Analytics</p><h2>Clinic signals</h2></div></div>
      {[
        ["Daily Revenue", "Rs. 18,800", "78"],
        ["Weekly Revenue", "Rs. 84,500", "66"],
        ["Appointment Trends", "+18%", "72"],
        ["Popular Treatment", "Root Canal", "58"],
        ["Doctor Performance", "94%", "84"],
        ["Patient Growth", "+12%", "64"],
        ["Cancellation Rate", `${cancellationRate}%`, "18"],
        ["Waiting Time", "11m", "38"],
        ["Chair Utilization", "82%", "82"],
        ["Completed Visits", String(completed), "48"],
      ].map(([label, value, width]) => (
        <div key={label}><span>{label}</span><strong>{value}</strong><i style={{ width: `${width}%` }} /></div>
      ))}
    </article>
  );
}

function AdminAppointmentDrawer({ appointment, open, onClose }: { appointment: AdminAppointment | null; open: boolean; onClose: () => void }) {
  if (!appointment) return null;
  return (
    <div className={`adm-apt-drawer-shell ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <button aria-label="Close appointment details" className="adm-apt-drawer-backdrop" type="button" onClick={onClose} />
      <aside className="adm-apt-drawer" aria-label="Appointment details drawer">
        <div className="adm-card-head">
          <div className="adm-apt-drawer-title"><span>{appointment.patient.charAt(0)}</span><div><p className="adm-eyebrow">Patient Details</p><h2>{appointment.patient}</h2><small>{appointment.id} &middot; {appointment.age} yrs &middot; {appointment.gender}</small></div></div>
          <button className="adm-icon-button" type="button" onClick={onClose}><FiChevronDown aria-hidden="true" /></button>
        </div>
        <div className="adm-apt-profile-grid">
          {[
            ["Phone", appointment.phone],
            ["Email", appointment.email],
            ["Treatment", appointment.treatment],
            ["Doctor", appointment.doctor],
            ["Date", appointment.date],
            ["Time", `${appointment.time} - ${appointment.duration}`],
            ["Chair", appointment.chair],
            ["Invoice", appointment.invoice],
          ].map(([label, value]) => <section key={label}><span>{label}</span><strong>{value}</strong></section>)}
        </div>
        <section className="adm-apt-ai-box"><FiZap aria-hidden="true" /><div><strong>AI Suggestions</strong><p>Check conflict risk, confirm reminder timing, prepare treatment notes, and review payment follow-up before the visit.</p></div></section>
        <section className="adm-apt-workflow">
          <h3>Appointment Workflow</h3>
          {["Appointment Created", "Confirmed", "Patient Checked In", "Treatment Started", "Treatment Completed", "Invoice Generated", "Payment Completed", "Review Requested"].map((step, index) => (
            <div className={index < 3 ? "is-done" : ""} key={step}><span>{index + 1}</span><strong>{step}</strong></div>
          ))}
        </section>
      </aside>
    </div>
  );
}

function ReportsSection() {
  return (
    <section className="adm-widget-grid">
      <AppointmentOverviewChart />
      <RevenueOverviewChart />
      <TopTreatmentsChart />
      <section className="adm-card">
        <div className="adm-card-head">
          <div>
            <p className="adm-eyebrow">Report summary</p>
            <h2>Clinic performance</h2>
          </div>
        </div>
        <div className="adm-metric-list">
          <span><strong>92%</strong> appointment completion rate</span>
          <span><strong>Rs 8.3L</strong> monthly revenue projection</span>
          <span><strong>26%</strong> cleaning treatment share</span>
          <span><strong>4.9/5</strong> patient satisfaction score</span>
        </div>
      </section>
    </section>
  );
}

function AiAssistantSection() {
  const [prompt, setPrompt] = useState("Summarize today's schedule");
  const [answer, setAnswer] = useState("Ask a question to generate an operational summary for the clinic team.");
  const [loading, setLoading] = useState(false);

  async function ask() {
    const cleanPrompt = prompt.trim();
    if (!cleanPrompt) return;

    setLoading(true);
    setAnswer("Generating a live AI response...");

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: cleanPrompt }),
      });
      const data = (await response.json()) as { answer?: string; error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Unable to generate an AI response.");
      }

      setAnswer(data.answer || "The AI response was empty. Please try again.");
    } catch (error) {
      setAnswer(error instanceof Error ? error.message : "The assistant is temporarily unavailable.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="adm-section-grid">
      <article className="adm-card adm-ai-card">
        <div className="adm-card-head">
          <div>
            <p className="adm-eyebrow">AI copilot</p>
            <h2>Operational assistant</h2>
          </div>
          <FiZap aria-hidden="true" />
        </div>
        <div className="adm-ai-input">
          <input value={prompt} onChange={(event) => setPrompt(event.target.value)} aria-label="AI prompt" />
          <button type="button" onClick={() => void ask()} disabled={loading}>
            {loading ? "Thinking..." : "Ask"}
          </button>
        </div>
        <div className="adm-chip-row">
          {aiSuggestions.map((suggestion) => (
            <button key={suggestion} type="button" onClick={() => setPrompt(suggestion)}>
              {suggestion}
            </button>
          ))}
        </div>
      </article>
      <article className="adm-card">
        <div className="adm-card-head">
          <div>
            <p className="adm-eyebrow">Output</p>
            <h2>Assistant response</h2>
          </div>
        </div>
        <p className="adm-ai-output">{answer}</p>
      </article>
    </section>
  );
}

function XraySection() {
  const [fileName, setFileName] = useState("");
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState("Upload an image/report and add notes to prepare an AI-assisted observation checklist.");

  function analyze() {
    if (!fileName && !notes.trim()) {
      setResult("Please upload an X-ray/report or add clinical notes first.");
      return;
    }
    setResult(
      "Observation checklist prepared: verify caries depth, periapical changes, restoration margins, periodontal bone level, and symptoms. This is not a diagnosis; dentist review is required.",
    );
  }

  return (
    <section className="adm-section-grid">
      <article className="adm-card adm-form-card">
        <div className="adm-card-head">
          <div>
            <p className="adm-eyebrow">Upload</p>
            <h2>X-ray analysis</h2>
          </div>
        </div>
        <label>
          X-ray / report file
          <input type="file" accept="image/*,.pdf" onChange={(event) => setFileName(event.target.files?.[0]?.name || "")} />
        </label>
        <label>
          Dentist notes
          <textarea rows={5} value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Add symptoms, tooth number, report context..." />
        </label>
        {fileName ? <span className="adm-pill">Selected: {fileName}</span> : null}
        <button className="adm-primary-button" type="button" onClick={analyze}>Analyze safely</button>
      </article>
      <article className="adm-card">
        <div className="adm-card-head">
          <div>
            <p className="adm-eyebrow">Result</p>
            <h2>Dentist review checklist</h2>
          </div>
        </div>
        <p className="adm-ai-output">{result}</p>
      </article>
    </section>
  );
}

function WebsiteServicesSection({
  content,
  saving,
  onChange,
  onSave,
}: {
  content: SiteContent | null;
  saving: boolean;
  onChange: (content: SiteContent) => void;
  onSave: () => void;
}) {
  const servicesSection = content?.servicesSection || {
    kicker: "Our Services",
    title: "Everything your smile needs, explained simply.",
  };

  function updateServicesSection(patch: Partial<NonNullable<SiteContent["servicesSection"]>>) {
    if (!content) return;
    onChange({
      ...content,
      servicesSection: {
        ...servicesSection,
        ...patch,
      },
    });
  }

  function updateTreatment(index: number, patch: Partial<Treatment>) {
    if (!content) return;
    const treatments = content.treatments.map((treatment, itemIndex) =>
      itemIndex === index
        ? {
            ...treatment,
            ...patch,
            slug: patch.title ? slugify(patch.title) : treatment.slug,
          }
        : treatment,
    );
    onChange({ ...content, treatments });
  }

  function addTreatment() {
    if (!content) return;
    const title = "New Dental Service";
    onChange({
      ...content,
      treatments: [
        ...content.treatments,
        {
          slug: `${slugify(title)}-${content.treatments.length + 1}`,
          title,
          description: "Short patient-friendly description for this service.",
          goodFor: "Patients who need dental care",
          details: "Explain the treatment process, visit duration, and after-care guidance here.",
        },
      ],
    });
  }

  function removeTreatment(index: number) {
    if (!content) return;
    onChange({
      ...content,
      treatments: content.treatments.filter((_, itemIndex) => itemIndex !== index),
    });
  }

  if (!content) {
    return <EmptyState title="Website content unavailable" text="Reload the dashboard after entering the admin password." />;
  }

  return (
    <section className="adm-services-editor">
      <article className="adm-card adm-form-card">
        <div className="adm-card-head">
          <div>
            <p className="adm-eyebrow">Homepage services</p>
            <h2>Edit public section</h2>
          </div>
        </div>
        <label>
          Small label
          <input value={servicesSection.kicker} onChange={(event) => updateServicesSection({ kicker: event.target.value })} />
        </label>
        <label>
          Main heading
          <textarea rows={3} value={servicesSection.title} onChange={(event) => updateServicesSection({ title: event.target.value })} />
        </label>
        <div className="adm-form-actions">
          <button className="adm-secondary-button" type="button" onClick={addTreatment}>
            <FiPlusCircle aria-hidden="true" />
            Add service
          </button>
          <button className="adm-primary-button" type="button" onClick={onSave} disabled={saving}>
            {saving ? "Saving..." : "Save website services"}
          </button>
        </div>
        <p className="adm-helper-text">The homepage shows the first 8 services in the mint card preview.</p>
      </article>

      <article className="adm-card adm-services-list-card">
        <div className="adm-card-head">
          <div>
            <p className="adm-eyebrow">Services catalog</p>
            <h2>{content.treatments.length} services</h2>
          </div>
          <span className="adm-pill">Live website content</span>
        </div>
        <div className="adm-services-list">
          {content.treatments.map((treatment, index) => (
            <article key={`${treatment.slug}-${index}`}>
              <div className="adm-service-number">{index + 1}</div>
              <div className="adm-service-fields">
                <label>
                  Service name
                  <input value={treatment.title} onChange={(event) => updateTreatment(index, { title: event.target.value })} />
                </label>
                <label>
                  Short description
                  <textarea
                    rows={2}
                    value={treatment.description}
                    onChange={(event) => updateTreatment(index, { description: event.target.value })}
                  />
                </label>
                <label>
                  Good for
                  <input value={treatment.goodFor} onChange={(event) => updateTreatment(index, { goodFor: event.target.value })} />
                </label>
                <label>
                  Treatment detail page copy
                  <textarea rows={3} value={treatment.details} onChange={(event) => updateTreatment(index, { details: event.target.value })} />
                </label>
              </div>
              <button className="adm-danger-button" type="button" onClick={() => removeTreatment(index)}>
                Remove
              </button>
            </article>
          ))}
        </div>
      </article>

      <article className="adm-card adm-services-preview-card">
        <p className="clinic-kicker">{servicesSection.kicker}</p>
        <h2>{servicesSection.title}</h2>
        <ul>
          {content.treatments.slice(0, 8).map((treatment) => (
            <li key={treatment.slug}>{treatment.title}</li>
          ))}
        </ul>
      </article>
    </section>
  );
}

function WebsiteHomeSection({
  content,
  saving,
  onChange,
  onSave,
}: {
  content: SiteContent | null;
  saving: boolean;
  onChange: (content: SiteContent) => void;
  onSave: () => void;
}) {
  if (!content) {
    return <EmptyState title="Website content unavailable" text="Reload the dashboard after entering the admin password." />;
  }
  const currentContent = content;

  function updateHero(patch: Partial<SiteContent["hero"]>) {
    onChange({ ...currentContent, hero: { ...currentContent.hero, ...patch } });
  }

  function updateIntro(patch: Partial<SiteContent["intro"]>) {
    onChange({ ...currentContent, intro: { ...currentContent.intro, ...patch } });
  }

  function updateTrustItem(index: number, patch: Partial<SiteContent["trustItems"][number]>) {
    onChange({
      ...currentContent,
      trustItems: currentContent.trustItems.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)),
    });
  }

  function updateConcern(index: number, patch: Partial<SiteContent["concerns"][number]>) {
    onChange({
      ...currentContent,
      concerns: currentContent.concerns.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)),
    });
  }

  return (
    <section className="adm-section-grid">
      <article className="adm-card adm-form-card">
        <div className="adm-card-head">
          <div>
            <p className="adm-eyebrow">Homepage hero</p>
            <h2>Main website copy</h2>
          </div>
        </div>
        <label>
          Location / script text
          <input value={content.hero.location} onChange={(event) => updateHero({ location: event.target.value })} />
        </label>
        <label>
          Hero title
          <textarea rows={3} value={content.hero.title} onChange={(event) => updateHero({ title: event.target.value })} />
        </label>
        <label>
          Hero paragraph
          <textarea rows={4} value={content.hero.copy} onChange={(event) => updateHero({ copy: event.target.value })} />
        </label>
        <label>
          Primary CTA
          <input value={content.hero.primaryCta} onChange={(event) => updateHero({ primaryCta: event.target.value })} />
        </label>
        <label>
          Secondary CTA
          <input value={content.hero.secondaryCta} onChange={(event) => updateHero({ secondaryCta: event.target.value })} />
        </label>
        <button className="adm-primary-button" type="button" onClick={onSave} disabled={saving}>
          {saving ? "Saving..." : "Save homepage"}
        </button>
      </article>

      <article className="adm-card adm-form-card">
        <div className="adm-card-head">
          <div>
            <p className="adm-eyebrow">Intro section</p>
            <h2>Patient guidance block</h2>
          </div>
        </div>
        <label>
          Small label
          <input value={content.intro.kicker} onChange={(event) => updateIntro({ kicker: event.target.value })} />
        </label>
        <label>
          Heading
          <textarea rows={3} value={content.intro.title} onChange={(event) => updateIntro({ title: event.target.value })} />
        </label>
        <label>
          Copy
          <textarea rows={4} value={content.intro.copy} onChange={(event) => updateIntro({ copy: event.target.value })} />
        </label>
        <button className="adm-primary-button" type="button" onClick={onSave} disabled={saving}>
          {saving ? "Saving..." : "Save intro"}
        </button>
      </article>

      <article className="adm-card">
        <div className="adm-card-head">
          <div>
            <p className="adm-eyebrow">Trust bar</p>
            <h2>{content.trustItems.length} website highlights</h2>
          </div>
        </div>
        <div className="adm-services-list">
          {content.trustItems.map((item, index) => (
            <article key={`${item.title}-${index}`}>
              <div className="adm-service-number">{index + 1}</div>
              <div className="adm-service-fields">
                <label>
                  Title
                  <input value={item.title} onChange={(event) => updateTrustItem(index, { title: event.target.value })} />
                </label>
                <label>
                  Text
                  <textarea rows={2} value={item.text} onChange={(event) => updateTrustItem(index, { text: event.target.value })} />
                </label>
              </div>
            </article>
          ))}
        </div>
        <button className="adm-primary-button" type="button" onClick={onSave} disabled={saving}>
          {saving ? "Saving..." : "Save trust bar"}
        </button>
      </article>

      <article className="adm-card">
        <div className="adm-card-head">
          <div>
            <p className="adm-eyebrow">Patient concerns</p>
            <h2>{content.concerns.length} concern cards</h2>
          </div>
        </div>
        <div className="adm-services-list">
          {content.concerns.map((item, index) => (
            <article key={`${item.title}-${index}`}>
              <div className="adm-service-number">{item.icon}</div>
              <div className="adm-service-fields">
                <label>
                  Icon
                  <input value={item.icon} onChange={(event) => updateConcern(index, { icon: event.target.value })} />
                </label>
                <label>
                  Title
                  <input value={item.title} onChange={(event) => updateConcern(index, { title: event.target.value })} />
                </label>
                <label>
                  Text
                  <textarea rows={2} value={item.text} onChange={(event) => updateConcern(index, { text: event.target.value })} />
                </label>
              </div>
            </article>
          ))}
        </div>
        <button className="adm-primary-button" type="button" onClick={onSave} disabled={saving}>
          {saving ? "Saving..." : "Save concerns"}
        </button>
      </article>
    </section>
  );
}

function DoctorContentSection({
  content,
  saving,
  onChange,
  onSave,
}: {
  content: SiteContent | null;
  saving: boolean;
  onChange: (content: SiteContent) => void;
  onSave: () => void;
}) {
  if (!content) {
    return <EmptyState title="Doctor content unavailable" text="Reload the dashboard after entering the admin password." />;
  }
  const currentContent = content;

  function updateDoctor(patch: Partial<SiteContent["doctor"]>) {
    onChange({ ...currentContent, doctor: { ...currentContent.doctor, ...patch } });
  }

  function updateStat(index: number, patch: Partial<SiteContent["doctor"]["stats"][number]>) {
    updateDoctor({
      stats: currentContent.doctor.stats.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)),
    });
  }

  return (
    <section className="adm-section-grid">
      <article className="adm-card adm-form-card">
        <div className="adm-card-head">
          <div>
            <p className="adm-eyebrow">Doctor section</p>
            <h2>Edit public doctor profile</h2>
          </div>
        </div>
        <label>
          Doctor name
          <input value={content.doctor.name} onChange={(event) => updateDoctor({ name: event.target.value })} />
        </label>
        <label>
          Bio
          <textarea rows={5} value={content.doctor.bio} onChange={(event) => updateDoctor({ bio: event.target.value })} />
        </label>
        <label>
          Homepage heading / note
          <textarea rows={3} value={content.doctor.note} onChange={(event) => updateDoctor({ note: event.target.value })} />
        </label>
        <button className="adm-primary-button" type="button" onClick={onSave} disabled={saving}>
          {saving ? "Saving..." : "Save doctor"}
        </button>
      </article>
      <article className="adm-card">
        <div className="adm-card-head">
          <div>
            <p className="adm-eyebrow">Doctor stats</p>
            <h2>{content.doctor.stats.length} profile stats</h2>
          </div>
        </div>
        <div className="adm-services-list">
          {content.doctor.stats.map((item, index) => (
            <article key={`${item.label}-${index}`}>
              <div className="adm-service-number">{index + 1}</div>
              <div className="adm-service-fields">
                <label>
                  Value
                  <input value={item.value} onChange={(event) => updateStat(index, { value: event.target.value })} />
                </label>
                <label>
                  Label
                  <input value={item.label} onChange={(event) => updateStat(index, { label: event.target.value })} />
                </label>
              </div>
            </article>
          ))}
        </div>
        <button className="adm-primary-button" type="button" onClick={onSave} disabled={saving}>
          {saving ? "Saving..." : "Save stats"}
        </button>
      </article>
    </section>
  );
}

function ReviewsContentSection({
  content,
  saving,
  onChange,
  onSave,
}: {
  content: SiteContent | null;
  saving: boolean;
  onChange: (content: SiteContent) => void;
  onSave: () => void;
}) {
  if (!content) return <EmptyState title="Testimonials unavailable" text="Reload the dashboard after entering the admin password." />;
  const currentContent = content;

  function updateReview(index: number, patch: Partial<SiteContent["reviews"][number]>) {
    onChange({ ...currentContent, reviews: currentContent.reviews.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)) });
  }

  return (
    <EditablePairList
      addLabel="Add testimonial"
      description="These testimonials appear on the homepage carousel and Reviews page."
      items={currentContent.reviews}
      primaryKey="name"
      primaryLabel="Patient / category"
      secondaryKey="quote"
      secondaryLabel="Testimonial"
      title="Patient testimonials"
      saving={saving}
      onAdd={() => onChange({ ...currentContent, reviews: [{ name: "New patient", quote: "Add the patient testimonial here." }, ...currentContent.reviews] })}
      onRemove={(index) => onChange({ ...currentContent, reviews: currentContent.reviews.filter((_, itemIndex) => itemIndex !== index) })}
      onSave={onSave}
      onUpdate={updateReview}
    />
  );
}

function FaqContentSection({
  content,
  saving,
  onChange,
  onSave,
}: {
  content: SiteContent | null;
  saving: boolean;
  onChange: (content: SiteContent) => void;
  onSave: () => void;
}) {
  if (!content) return <EmptyState title="FAQs unavailable" text="Reload the dashboard after entering the admin password." />;
  const currentContent = content;

  function updateFaq(index: number, patch: Partial<SiteContent["faqs"][number]>) {
    onChange({ ...currentContent, faqs: currentContent.faqs.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)) });
  }

  return (
    <EditablePairList
      addLabel="Add FAQ"
      description="These questions appear on the public FAQ page."
      items={currentContent.faqs}
      primaryKey="question"
      primaryLabel="Question"
      secondaryKey="answer"
      secondaryLabel="Answer"
      title="Website FAQs"
      saving={saving}
      onAdd={() => onChange({ ...currentContent, faqs: [{ question: "New question", answer: "Add the answer here." }, ...currentContent.faqs] })}
      onRemove={(index) => onChange({ ...currentContent, faqs: currentContent.faqs.filter((_, itemIndex) => itemIndex !== index) })}
      onSave={onSave}
      onUpdate={updateFaq}
    />
  );
}

function EditablePairList<T extends Record<string, string>>({
  addLabel,
  description,
  items,
  primaryKey,
  primaryLabel,
  secondaryKey,
  secondaryLabel,
  title,
  saving,
  onAdd,
  onRemove,
  onSave,
  onUpdate,
}: {
  addLabel: string;
  description: string;
  items: T[];
  primaryKey: keyof T;
  primaryLabel: string;
  secondaryKey: keyof T;
  secondaryLabel: string;
  title: string;
  saving: boolean;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onSave: () => void;
  onUpdate: (index: number, patch: Partial<T>) => void;
}) {
  return (
    <section className="adm-card">
      <div className="adm-card-head">
        <div>
          <p className="adm-eyebrow">Website content</p>
          <h2>{title}</h2>
          <span>{description}</span>
        </div>
        <button className="adm-secondary-button" type="button" onClick={onAdd}>
          <FiPlusCircle aria-hidden="true" />
          {addLabel}
        </button>
      </div>
      <div className="adm-services-list">
        {items.map((item, index) => (
          <article key={`${item[primaryKey]}-${index}`}>
            <div className="adm-service-number">{index + 1}</div>
            <div className="adm-service-fields">
              <label>
                {primaryLabel}
                <input value={item[primaryKey]} onChange={(event) => onUpdate(index, { [primaryKey]: event.target.value } as Partial<T>)} />
              </label>
              <label>
                {secondaryLabel}
                <textarea rows={3} value={item[secondaryKey]} onChange={(event) => onUpdate(index, { [secondaryKey]: event.target.value } as Partial<T>)} />
              </label>
            </div>
            <button className="adm-danger-button" type="button" onClick={() => onRemove(index)}>
              Remove
            </button>
          </article>
        ))}
      </div>
      <button className="adm-primary-button" type="button" onClick={onSave} disabled={saving}>
        {saving ? "Saving..." : "Save changes"}
      </button>
    </section>
  );
}

function GalleryContentSection({
  content,
  saving,
  onChange,
  onSave,
}: {
  content: SiteContent | null;
  saving: boolean;
  onChange: (content: SiteContent) => void;
  onSave: () => void;
}) {
  if (!content) return <EmptyState title="Gallery unavailable" text="Reload the dashboard after entering the admin password." />;
  const currentContent = content;

  return (
    <section className="adm-card">
      <div className="adm-card-head">
        <div>
          <p className="adm-eyebrow">Website gallery</p>
          <h2>{currentContent.gallery.length} gallery cards</h2>
          <span>These items appear on the homepage gallery preview and public Gallery page.</span>
        </div>
        <button className="adm-secondary-button" type="button" onClick={() => onChange({ ...currentContent, gallery: ["New gallery item", ...currentContent.gallery] })}>
          <FiPlusCircle aria-hidden="true" />
          Add gallery item
        </button>
      </div>
      <div className="adm-services-list">
        {currentContent.gallery.map((item, index) => (
          <article key={`${item}-${index}`}>
            <div className="adm-service-number">{index + 1}</div>
            <div className="adm-service-fields">
              <label>
                Gallery title
                <input
                  value={item}
                  onChange={(event) =>
                    onChange({
                      ...currentContent,
                      gallery: currentContent.gallery.map((galleryItem, itemIndex) => (itemIndex === index ? event.target.value : galleryItem)),
                    })
                  }
                />
              </label>
            </div>
            <button className="adm-danger-button" type="button" onClick={() => onChange({ ...currentContent, gallery: currentContent.gallery.filter((_, itemIndex) => itemIndex !== index) })}>
              Remove
            </button>
          </article>
        ))}
      </div>
      <button className="adm-primary-button" type="button" onClick={onSave} disabled={saving}>
        {saving ? "Saving..." : "Save gallery"}
      </button>
    </section>
  );
}

function ContactContentSection({
  content,
  saving,
  darkMode,
  onChange,
  onSave,
  onToggleDarkMode,
}: {
  content: SiteContent | null;
  saving: boolean;
  darkMode: boolean;
  onChange: (content: SiteContent) => void;
  onSave: () => void;
  onToggleDarkMode: () => void;
}) {
  const [whatsapp, setWhatsapp] = useState(true);
  const [email, setEmail] = useState(true);
  const [autoRecall, setAutoRecall] = useState(false);

  if (!content) return <EmptyState title="Settings unavailable" text="Reload the dashboard after entering the admin password." />;
  const currentContent = content;

  function updateContact(patch: Partial<SiteContent["contact"]>) {
    onChange({ ...currentContent, contact: { ...currentContent.contact, ...patch } });
  }

  return (
    <section className="adm-section-grid">
      <article className="adm-card adm-form-card">
        <div className="adm-card-head">
          <div>
            <p className="adm-eyebrow">Clinic profile</p>
            <h2>Website contact settings</h2>
          </div>
        </div>
        <label>
          Contact page title
          <textarea rows={2} value={content.contact.title} onChange={(event) => updateContact({ title: event.target.value })} />
        </label>
        <label>
          Address lines
          <textarea rows={4} value={content.contact.addressLines.join("\n")} onChange={(event) => updateContact({ addressLines: event.target.value.split("\n").filter(Boolean) })} />
        </label>
        <label>
          Phone label
          <input value={content.contact.phone} onChange={(event) => updateContact({ phone: event.target.value })} />
        </label>
        <label>
          Phone href
          <input value={content.contact.phoneHref} onChange={(event) => updateContact({ phoneHref: event.target.value })} />
        </label>
        <label>
          Email
          <input value={content.contact.email} onChange={(event) => updateContact({ email: event.target.value })} />
        </label>
        <label>
          Working hours
          <input value={content.contact.hours} onChange={(event) => updateContact({ hours: event.target.value })} />
        </label>
        <label>
          Google Maps URL
          <input value={content.contact.mapsUrl} onChange={(event) => updateContact({ mapsUrl: event.target.value })} />
        </label>
        <button className="adm-primary-button" type="button" onClick={onSave} disabled={saving}>
          {saving ? "Saving..." : "Save settings"}
        </button>
      </article>
      <article className="adm-card">
        <div className="adm-card-head">
          <div>
            <p className="adm-eyebrow">Preferences</p>
            <h2>Automation toggles</h2>
          </div>
        </div>
        <div className="adm-toggle-list">
          <label><input type="checkbox" checked={darkMode} onChange={onToggleDarkMode} /> Dark mode</label>
          <label><input type="checkbox" checked={whatsapp} onChange={() => setWhatsapp((value) => !value)} /> WhatsApp reminders</label>
          <label><input type="checkbox" checked={email} onChange={() => setEmail((value) => !value)} /> Email notifications</label>
          <label><input type="checkbox" checked={autoRecall} onChange={() => setAutoRecall((value) => !value)} /> Six-month recall automation</label>
        </div>
      </article>
    </section>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function BlogEditorSection({
  blogs,
  saving,
  onChange,
  onSave,
}: {
  blogs: BlogPost[];
  saving: boolean;
  onChange: (blogs: BlogPost[]) => void;
  onSave: () => void;
}) {
  const [activeId, setActiveId] = useState(blogs[0]?.id || "");
  const activeBlog = blogs.find((blog) => blog.id === activeId) || blogs[0] || null;

  useEffect(() => {
    if (!activeId && blogs[0]) setActiveId(blogs[0].id);
    if (activeId && blogs.length && !blogs.some((blog) => blog.id === activeId)) setActiveId(blogs[0].id);
  }, [activeId, blogs]);

  function createBlog() {
    const now = new Date().toISOString();
    const blog: BlogPost = {
      id: createClientId("blog"),
      slug: `new-blog-${Date.now().toString().slice(-5)}`,
      title: "New Dental Blog",
      excerpt: "Write a short summary for patients.",
      content: "Write the full blog content here.\n\nUse clear, patient-friendly language.",
      author: "Dr. Lisha",
      category: "Dental Care",
      coverImage: "",
      published: false,
      createdAt: now,
      updatedAt: now,
    };
    onChange([blog, ...blogs]);
    setActiveId(blog.id);
  }

  function updateBlog(id: string, patch: Partial<BlogPost>) {
    const now = new Date().toISOString();
    onChange(
      blogs.map((blog) =>
        blog.id === id
          ? {
              ...blog,
              ...patch,
              slug: patch.title ? slugify(patch.title) : blog.slug,
              updatedAt: now,
            }
          : blog,
      ),
    );
  }

  function removeBlog(id: string) {
    const nextBlogs = blogs.filter((blog) => blog.id !== id);
    onChange(nextBlogs);
    setActiveId(nextBlogs[0]?.id || "");
  }

  function uploadCover(file: File | undefined, id: string) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => updateBlog(id, { coverImage: String(reader.result || "") });
    reader.readAsDataURL(file);
  }

  return (
    <section className="adm-blog-editor">
      <article className="adm-card adm-blog-list-card">
        <div className="adm-card-head">
          <div>
            <p className="adm-eyebrow">Doctor blogs</p>
            <h2>{blogs.length} posts</h2>
          </div>
          <button className="adm-secondary-button" type="button" onClick={createBlog}>
            <FiPlusCircle aria-hidden="true" />
            New post
          </button>
        </div>
        {blogs.length ? (
          <div className="adm-blog-list">
            {blogs.map((blog) => (
              <button className={activeBlog?.id === blog.id ? "is-active" : ""} key={blog.id} type="button" onClick={() => setActiveId(blog.id)}>
                <strong>{blog.title}</strong>
                <span>{blog.category} · {blog.published ? "Published" : "Draft"}</span>
              </button>
            ))}
          </div>
        ) : (
          <EmptyState title="No blogs yet" text="Create the first doctor blog post for the customer website." />
        )}
      </article>

      {activeBlog ? (
        <article className="adm-card adm-blog-form-card">
          <div className="adm-card-head">
            <div>
              <p className="adm-eyebrow">{activeBlog.published ? "Published blog" : "Draft blog"}</p>
              <h2>Edit post</h2>
            </div>
            <span className="adm-pill">/blog/{activeBlog.slug}</span>
          </div>
          <div className="adm-blog-form-grid">
            <label>
              Blog title
              <input value={activeBlog.title} onChange={(event) => updateBlog(activeBlog.id, { title: event.target.value })} />
            </label>
            <label>
              Category
              <input value={activeBlog.category} onChange={(event) => updateBlog(activeBlog.id, { category: event.target.value })} />
            </label>
            <label>
              Author
              <input value={activeBlog.author} onChange={(event) => updateBlog(activeBlog.id, { author: event.target.value })} />
            </label>
            <label>
              Cover image
              <input type="file" accept="image/*" onChange={(event) => uploadCover(event.target.files?.[0], activeBlog.id)} />
            </label>
          </div>
          <label>
            Short excerpt
            <textarea rows={3} value={activeBlog.excerpt} onChange={(event) => updateBlog(activeBlog.id, { excerpt: event.target.value })} />
          </label>
          <label>
            Blog content
            <textarea rows={12} value={activeBlog.content} onChange={(event) => updateBlog(activeBlog.id, { content: event.target.value })} />
          </label>
          {activeBlog.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="adm-blog-cover-preview" src={activeBlog.coverImage} alt="" />
          ) : null}
          <div className="adm-form-actions">
            <button className="adm-secondary-button" type="button" onClick={() => updateBlog(activeBlog.id, { published: !activeBlog.published })}>
              {activeBlog.published ? "Move to draft" : "Publish"}
            </button>
            <button className="adm-danger-button" type="button" onClick={() => removeBlog(activeBlog.id)}>
              Delete
            </button>
            <button className="adm-primary-button" type="button" onClick={onSave} disabled={saving}>
              {saving ? "Saving..." : "Save blogs"}
            </button>
          </div>
        </article>
      ) : null}
    </section>
  );
}

type BlogCmsStatus = "All" | "Published" | "Draft" | "Scheduled" | "Archived";
type BlogPreviewMode = "desktop" | "tablet" | "mobile";

function getBlogReadTime(blog: BlogPost) {
  const words = blog.content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 180));
}

function getBlogSeoScore(blog: BlogPost) {
  let score = 34;
  if (blog.title.length >= 35 && blog.title.length <= 70) score += 18;
  if (blog.excerpt.length >= 90 && blog.excerpt.length <= 165) score += 18;
  if (blog.slug && blog.slug.length <= 72) score += 10;
  if (blog.coverImage) score += 10;
  if (blog.content.length > 900) score += 10;
  return Math.min(100, score);
}

function getBlogStatus(blog: BlogPost): Exclude<BlogCmsStatus, "All"> {
  if (blog.slug.includes("archived")) return "Archived";
  if (blog.slug.includes("scheduled")) return "Scheduled";
  return blog.published ? "Published" : "Draft";
}

function getBlogMockViews(blog: BlogPost, index: number) {
  return (blog.title.length * 47 + index * 319) % 9200 + 380;
}

function createClientId(prefix: string) {
  const randomPart =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  return `${prefix}-${randomPart}`;
}

function BlogCmsSection({
  blogs,
  saving,
  onChange,
  onSave,
}: {
  blogs: BlogPost[];
  saving: boolean;
  onChange: (blogs: BlogPost[]) => void;
  onSave: () => void;
}) {
  const [activeId, setActiveId] = useState(blogs[0]?.id || "");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<BlogCmsStatus>("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [authorFilter, setAuthorFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [newMenuOpen, setNewMenuOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState<BlogPreviewMode>("desktop");
  const [darkPreview, setDarkPreview] = useState(false);
  const [toast, setToast] = useState("CMS ready. Auto-save watches changes every 5 seconds.");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const fabImageInputRef = useRef<HTMLInputElement | null>(null);
  const fabImportInputRef = useRef<HTMLInputElement | null>(null);
  const uploadTargetIdRef = useRef("");
  const activeBlog = blogs.find((blog) => blog.id === activeId) || blogs[0] || null;

  useEffect(() => {
    if (!activeId && blogs[0]) setActiveId(blogs[0].id);
    if (activeId && blogs.length && !blogs.some((blog) => blog.id === activeId)) setActiveId(blogs[0].id);
  }, [activeId, blogs]);

  useEffect(() => {
    const savedSearches = window.localStorage.getItem("healthygrinz-admin-blog-searches");
    if (savedSearches) setRecentSearches(JSON.parse(savedSearches) as string[]);
  }, []);

  useEffect(() => {
    const shortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        document.getElementById("adm-blog-search")?.focus();
      }
    };
    window.addEventListener("keydown", shortcut);
    return () => window.removeEventListener("keydown", shortcut);
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      if (blogs.length) setToast("Auto-saved draft locally. Use Save CMS to publish changes to the website.");
    }, 5000);
    return () => window.clearTimeout(timeout);
  }, [blogs]);

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = window.setTimeout(() => setToast(""), 3600);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const categories = useMemo(() => ["All", ...Array.from(new Set(blogs.map((blog) => blog.category).filter(Boolean)))], [blogs]);
  const authors = useMemo(() => ["All", ...Array.from(new Set(blogs.map((blog) => blog.author).filter(Boolean)))], [blogs]);

  const filteredBlogs = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const next = blogs.filter((blog) => {
      const searchable = [blog.title, blog.slug, blog.excerpt, blog.content, blog.author, blog.category, getBlogStatus(blog), `seo ${getBlogSeoScore(blog)}`].join(" ").toLowerCase();
      return (
        (!normalized || searchable.includes(normalized)) &&
        (statusFilter === "All" || getBlogStatus(blog) === statusFilter) &&
        (categoryFilter === "All" || blog.category === categoryFilter) &&
        (authorFilter === "All" || blog.author === authorFilter)
      );
    });

    return [...next].sort((a, b) => {
      if (sortBy === "Oldest") return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
      if (sortBy === "Most Viewed") return getBlogMockViews(b, blogs.indexOf(b)) - getBlogMockViews(a, blogs.indexOf(a));
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }, [authorFilter, blogs, categoryFilter, query, sortBy, statusFilter]);

  const suggestions = useMemo(() => {
    const values = blogs.flatMap((blog) => [blog.title, blog.slug, blog.category, blog.author, ...blog.title.split(" ").filter((word) => word.length > 4)]);
    return Array.from(new Set(values)).filter((value) => value.toLowerCase().includes(query.toLowerCase())).slice(0, 6);
  }, [blogs, query]);

  const analytics = useMemo(() => {
    const totalViews = blogs.reduce((sum, blog, index) => sum + getBlogMockViews(blog, index), 0);
    const averageSeo = blogs.length ? Math.round(blogs.reduce((sum, blog) => sum + getBlogSeoScore(blog), 0) / blogs.length) : 0;
    const topBlog = [...blogs].sort((a, b) => getBlogMockViews(b, blogs.indexOf(b)) - getBlogMockViews(a, blogs.indexOf(a)))[0];
    return {
      total: blogs.length,
      published: blogs.filter((blog) => getBlogStatus(blog) === "Published").length,
      draft: blogs.filter((blog) => getBlogStatus(blog) === "Draft").length,
      scheduled: blogs.filter((blog) => getBlogStatus(blog) === "Scheduled").length,
      archived: blogs.filter((blog) => getBlogStatus(blog) === "Archived").length,
      views: totalViews,
      readers: Math.round(totalViews * 0.62),
      readTime: blogs.length ? Math.round(blogs.reduce((sum, blog) => sum + getBlogReadTime(blog), 0) / blogs.length) : 0,
      seo: averageSeo,
      topBlog: topBlog?.title || "Create the first post",
    };
  }, [blogs]);

  function saveSearch(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return;
    const next = [trimmed, ...recentSearches.filter((item) => item !== trimmed)].slice(0, 5);
    setRecentSearches(next);
    window.localStorage.setItem("healthygrinz-admin-blog-searches", JSON.stringify(next));
  }

  function createBlog(template = "New Blog") {
    const now = new Date().toISOString();
    const title = template === "Generate with AI" ? "AI Generated Dental Guide" : template === "Import Markdown" ? "Imported Markdown Blog" : "New Dental Blog";
    const aiContent =
      "AI draft: A patient-friendly guide for HealthyGrinz Dental Clinic.\n\n" +
      "Introduction\nExplain the dental concern in simple language and reassure patients that early care is comfortable, predictable, and effective.\n\n" +
      "Why it matters\nDescribe symptoms, causes, treatment options, and when patients should book an appointment.\n\n" +
      "HealthyGrinz approach\nMention gentle diagnosis, clear treatment planning, digital support, and doctor-reviewed care.\n\n" +
      "FAQ\nQ: Is treatment painful?\nA: Most modern dental treatments are comfortable with proper planning and local anesthesia.\n\n" +
      "CTA\nBook a consultation with HealthyGrinz Dental Clinic for calm, premium dental care.";
    const blog: BlogPost = {
      id: createClientId("blog"),
      slug: slugify(`${title}-${Date.now().toString().slice(-5)}`),
      title,
      excerpt: "Write a short patient-friendly summary for search, social previews, and the blog listing.",
      content: template === "Generate with AI" ? aiContent : "Start writing here.\n\nUse clear sections, practical dental advice, medical review notes, FAQs, and a confident appointment CTA.",
      author: "Dr. Lisha",
      category: "Dental Care",
      coverImage: "",
      published: false,
      createdAt: now,
      updatedAt: now,
    };
    onChange([blog, ...blogs]);
    setActiveId(blog.id);
    setNewMenuOpen(false);
    setToast(`${template} created.`);
    return blog;
  }

  function updateBlog(id: string, patch: Partial<BlogPost>) {
    const now = new Date().toISOString();
    onChange(
      blogs.map((blog) =>
        blog.id === id
          ? {
              ...blog,
              ...patch,
              slug: patch.title ? slugify(patch.title) : patch.slug ? slugify(patch.slug) : blog.slug,
              updatedAt: now,
            }
          : blog,
      ),
    );
  }

  function duplicateBlog(blog: BlogPost) {
    const now = new Date().toISOString();
    const copy = {
      ...blog,
      id: createClientId("blog"),
      slug: `${blog.slug}-copy-${Date.now().toString().slice(-4)}`,
      title: `${blog.title} Copy`,
      published: false,
      createdAt: now,
      updatedAt: now,
    };
    onChange([copy, ...blogs]);
    setActiveId(copy.id);
    setToast("Blog duplicated.");
  }

  function removeBlog(id: string) {
    const nextBlogs = blogs.filter((blog) => blog.id !== id);
    onChange(nextBlogs);
    setActiveId(nextBlogs[0]?.id || "");
    setToast("Blog deleted.");
  }

  function archiveBlog(blog: BlogPost) {
    updateBlog(blog.id, { slug: blog.slug.includes("archived") ? blog.slug.replace("-archived", "") : `${blog.slug}-archived`, published: false });
    setToast("Archive status updated.");
  }

  function uploadCover(file: File | undefined, id: string) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      updateBlog(id, { coverImage: String(reader.result || "") });
      setToast("Cover image uploaded.");
    };
    reader.readAsDataURL(file);
  }

  async function importBlog(file: File | undefined) {
    if (!file) return;
    const now = new Date().toISOString();
    const raw = await file.text();
    const filename = file.name.replace(/\.[^/.]+$/, "");
    const title = filename ? filename.replace(/[-_]+/g, " ") : "Imported Blog";
    const blog: BlogPost = {
      id: createClientId("blog"),
      slug: slugify(`${title}-${Date.now().toString().slice(-5)}`),
      title,
      excerpt: raw.split(/\r?\n/).find((line) => line.trim().length > 24)?.slice(0, 155) || "Imported blog draft ready for editing.",
      content: raw || "Imported file was empty. Add the blog content here.",
      author: "Dr. Lisha",
      category: "Imported",
      coverImage: "",
      published: false,
      createdAt: now,
      updatedAt: now,
    };
    onChange([blog, ...blogs]);
    setActiveId(blog.id);
    setToast(`${file.name} imported.`);
  }

  function applyAiAction(action: string) {
    if (!activeBlog) return;
    const snippets: Record<string, string> = {
      "Generate FAQ": "\n\nFAQ\n\nQ: How often should patients visit?\nA: Most patients benefit from a dental visit every six months, unless the dentist recommends a different plan.",
      "Generate CTA": "\n\nReady for a calmer dental visit? Book an appointment with HealthyGrinz Dental Clinic today.",
      "Generate Summary": "\n\nSummary: This article explains the concern in simple language and helps patients choose timely dental care.",
      "SEO Optimization": "\n\nSEO notes: Add the treatment name, Krishna Nagar, patient benefits, and a clear booking CTA.",
    };
    updateBlog(activeBlog.id, { content: `${activeBlog.content}${snippets[action] || `\n\n${action}: Add a polished, patient-friendly section here.`}` });
    setToast(`${action} added to the draft.`);
  }

  function resetFilters() {
    setQuery("");
    setStatusFilter("All");
    setCategoryFilter("All");
    setAuthorFilter("All");
    setSortBy("Newest");
  }

  function handleFabAction(action: string) {
    if (action === "New Blog") {
      createBlog("New Blog");
      return;
    }

    if (action === "Generate AI Blog") {
      createBlog("Generate with AI");
      return;
    }

    if (action === "Upload Images") {
      const target = activeBlog || createBlog("New Blog");
      uploadTargetIdRef.current = target.id;
      fabImageInputRef.current?.click();
      return;
    }

    if (action === "Import Blog") {
      fabImportInputRef.current?.click();
      return;
    }

    document.getElementById("adm-blog-analytics-panel")?.scrollIntoView({ behavior: "smooth", block: "center" });
    setToast("Analytics panel opened.");
  }

  return (
    <section className="adm-blog-cms">
      <div className="adm-blog-stat-grid">
        <BlogCmsStat icon={FiFileText} label="Total Blogs" value={String(analytics.total)} trend="+12%" />
        <BlogCmsStat icon={FiCheckCircle} label="Published" value={String(analytics.published)} trend="+8%" />
        <BlogCmsStat icon={FiEdit3} label="Draft" value={String(analytics.draft)} trend="+4%" />
        <BlogCmsStat icon={FiClock} label="Scheduled" value={String(analytics.scheduled)} trend="+2%" />
        <BlogCmsStat icon={FiInbox} label="Archived" value={String(analytics.archived)} trend="-1%" />
        <BlogCmsStat icon={FiEye} label="Total Views" value={analytics.views.toLocaleString("en-IN")} trend="+21%" />
        <BlogCmsStat icon={FiUsers} label="Monthly Readers" value={analytics.readers.toLocaleString("en-IN")} trend="+18%" />
        <BlogCmsStat icon={FiBookOpen} label="Avg Read Time" value={`${analytics.readTime}m`} trend="+5%" />
        <BlogCmsStat icon={FiZap} label="SEO Score" value={`${analytics.seo}%`} trend="+9%" />
        <BlogCmsStat icon={FiStar} label="Top Blog" value={analytics.topBlog} trend="Leader" wide />
      </div>

      <article className="adm-card adm-blog-command">
        <div className="adm-blog-search-row">
          <label className="adm-blog-search">
            <FiSearch aria-hidden="true" />
            <input
              aria-label="Search blogs"
              id="adm-blog-search"
              onBlur={() => saveSearch(query)}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") saveSearch(query);
              }}
              placeholder="Search title, slug, keyword, author, category, tag..."
              value={query}
            />
            <span>Ctrl K</span>
          </label>
          <div className="adm-blog-new-wrap">
            <button className="adm-primary-button" type="button" onClick={() => setNewMenuOpen((value) => !value)}>
              <FiPlusCircle aria-hidden="true" />
              New Content
            </button>
            {newMenuOpen ? (
              <div className="adm-blog-new-menu">
                {["New Blog", "Duplicate Existing", "Import Markdown", "Import Word", "Import HTML", "Generate with AI"].map((item) => (
                  <button key={item} type="button" onClick={() => (item === "Duplicate Existing" && activeBlog ? duplicateBlog(activeBlog) : createBlog(item))}>
                    {item}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        <div className="adm-blog-suggestions">
          {(query ? suggestions : recentSearches).map((item) => (
            <button key={item} type="button" onClick={() => setQuery(item)}>
              {item}
            </button>
          ))}
        </div>
        <div className="adm-blog-filter-grid">
          <AdminAppointmentFilter label="Status" options={["All", "Published", "Draft", "Scheduled", "Archived"]} value={statusFilter} onChange={(value) => setStatusFilter(value as BlogCmsStatus)} />
          <AdminAppointmentFilter label="Category" options={categories} value={categoryFilter} onChange={setCategoryFilter} />
          <AdminAppointmentFilter label="Author" options={authors} value={authorFilter} onChange={setAuthorFilter} />
          <AdminAppointmentFilter label="Date Range" options={["All Time", "This Month", "This Quarter", "This Year"]} value="All Time" onChange={() => undefined} />
          <AdminAppointmentFilter label="Sort" options={["Newest", "Oldest", "Most Viewed"]} value={sortBy} onChange={setSortBy} />
          <label>Tags<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="implant, braces, whitening" /></label>
          <label>Doctor<select value={authorFilter} onChange={(event) => setAuthorFilter(event.target.value)}>{authors.map((author) => <option key={author}>{author}</option>)}</select></label>
          <label>Reset<button className="adm-secondary-button" type="button" onClick={resetFilters}>Clear filters</button></label>
        </div>
      </article>

      <div className="adm-blog-workspace">
        <article className="adm-card adm-blog-list-card">
          <div className="adm-card-head">
            <div><p className="adm-eyebrow">Content Library</p><h2>{filteredBlogs.length} CMS entries</h2></div>
            <span className="adm-live-badge"><i />Auto save</span>
          </div>
          {filteredBlogs.length ? (
            <div className="adm-blog-list">
              {filteredBlogs.map((blog, index) => (
                <button className={activeBlog?.id === blog.id ? "is-active" : ""} key={blog.id} type="button" onClick={() => setActiveId(blog.id)}>
                  <span className="adm-blog-thumb">
                    {blog.coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={blog.coverImage} alt="" />
                    ) : (
                      <FiImage aria-hidden="true" />
                    )}
                  </span>
                  <span>
                    <strong>{blog.title}</strong>
                    <small>{blog.category} &middot; {getBlogReadTime(blog)} min read &middot; Updated {formatDistanceToNow(new Date(blog.updatedAt), { addSuffix: true })}</small>
                    <i><AdminAppointmentBadge kind="status" value={getBlogStatus(blog)} /><b>{getBlogMockViews(blog, index).toLocaleString("en-IN")} views</b><b>SEO {getBlogSeoScore(blog)}%</b></i>
                  </span>
                  <span className="adm-blog-card-actions">{[FiEdit3, FiEye, FiCopy, FiInbox, FiShare2, FiLink, FiPieChart].map((Icon, iconIndex) => <Icon key={iconIndex} aria-hidden="true" />)}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="adm-apt-empty"><FiFileText aria-hidden="true" /><strong>No blog entries found</strong><span>Create a new article or reset the filters.</span><button className="adm-primary-button" type="button" onClick={() => createBlog("New Blog")}>Create Blog</button></div>
          )}
        </article>

        {activeBlog ? (
          <article className="adm-card adm-blog-editor-panel">
            <div className="adm-card-head">
              <div><p className="adm-eyebrow">Professional Editor</p><h2>{activeBlog.title || "Untitled blog"}</h2></div>
              <div className="adm-form-actions">
                <button className="adm-secondary-button" type="button" onClick={() => duplicateBlog(activeBlog)}><FiCopy aria-hidden="true" />Duplicate</button>
                <button className="adm-secondary-button" type="button" onClick={() => archiveBlog(activeBlog)}><FiInbox aria-hidden="true" />Archive</button>
                <button className="adm-primary-button" type="button" onClick={onSave} disabled={saving}>{saving ? "Saving..." : "Save CMS"}</button>
              </div>
            </div>
            <div className="adm-blog-form-grid">
              <label>Blog title<input value={activeBlog.title} onChange={(event) => updateBlog(activeBlog.id, { title: event.target.value })} /></label>
              <label>Slug<input value={activeBlog.slug} onChange={(event) => updateBlog(activeBlog.id, { slug: event.target.value })} /></label>
              <label>Category<input value={activeBlog.category} onChange={(event) => updateBlog(activeBlog.id, { category: event.target.value })} /></label>
              <label>Author<input value={activeBlog.author} onChange={(event) => updateBlog(activeBlog.id, { author: event.target.value })} /></label>
            </div>
            <label>Short excerpt<textarea rows={3} value={activeBlog.excerpt} onChange={(event) => updateBlog(activeBlog.id, { excerpt: event.target.value })} /></label>
            <section className="adm-blog-cover-uploader">
              <div><FiUploadCloud aria-hidden="true" /><strong>Cover Image</strong><span>Drag and drop style uploader with preview, alt text, caption, replace, remove, crop, resize, and compression controls.</span></div>
              <input type="file" accept="image/*" onChange={(event) => uploadCover(event.target.files?.[0], activeBlog.id)} />
              {activeBlog.coverImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={activeBlog.coverImage} alt="" />
              ) : null}
              <div className="adm-blog-image-actions">{["Crop", "Resize", "Compress", "Replace", "Remove", "Alt Text", "Caption"].map((item) => <button key={item} type="button" onClick={() => item === "Remove" ? updateBlog(activeBlog.id, { coverImage: "" }) : setToast(`${item} tool ready.`)}>{item}</button>)}</div>
            </section>
            <div className="adm-blog-toolbar" aria-label="Editor toolbar">{["H1", "H2", "List", "Quote", "Code", "Table", "Image", "Video", "Button", "Callout", "Columns", "Rule", "Emoji", "Link", "Mention", "Undo", "Redo"].map((tool) => <button key={tool} type="button" onClick={() => setToast(`${tool} formatting ready.`)}>{tool}</button>)}</div>
            <label>TipTap-style content editor<textarea className="adm-blog-rich-editor" rows={16} value={activeBlog.content} onChange={(event) => updateBlog(activeBlog.id, { content: event.target.value })} /></label>
          </article>
        ) : (
          <article className="adm-card"><EmptyState title="No blog selected" text="Create or select a blog to open the CMS editor." /></article>
        )}

        {activeBlog ? (
          <aside className="adm-blog-side">
            <BlogSeoPanel blog={activeBlog} onUpdate={(patch) => updateBlog(activeBlog.id, patch)} />
            <BlogPublishingPanel blog={activeBlog} saving={saving} onDelete={() => removeBlog(activeBlog.id)} onSave={onSave} onUpdate={(patch) => updateBlog(activeBlog.id, patch)} />
            <BlogAiAssistant onRun={applyAiAction} />
            <BlogPreviewPanel blog={activeBlog} darkPreview={darkPreview} mode={previewMode} onDarkChange={setDarkPreview} onModeChange={setPreviewMode} />
            <BlogRevisionPanel blog={activeBlog} />
            <BlogCommentPanel />
            <BlogAnalyticsPanel blog={activeBlog} index={blogs.findIndex((blog) => blog.id === activeBlog.id)} />
          </aside>
        ) : null}
      </div>

      <input
        ref={fabImageInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(event) => {
          uploadCover(event.target.files?.[0], uploadTargetIdRef.current || activeBlog?.id || "");
          event.target.value = "";
        }}
      />
      <input
        ref={fabImportInputRef}
        type="file"
        accept=".md,.markdown,.txt,.html,.htm,.doc,.docx"
        hidden
        onChange={(event) => {
          void importBlog(event.target.files?.[0]);
          event.target.value = "";
        }}
      />
      <div className="adm-blog-fab">
        {["New Blog", "Generate AI Blog", "Upload Images", "Import Blog", "Analytics"].map((item) => (
          <button key={item} type="button" onClick={() => handleFabAction(item)}>
            {item}
          </button>
        ))}
      </div>
      {toast ? <div className="adm-apt-toast"><FiBell aria-hidden="true" />{toast}</div> : null}
    </section>
  );
}

function BlogCmsStat({ icon: Icon, label, trend, value, wide = false }: { icon: IconType; label: string; trend: string; value: string; wide?: boolean }) {
  return (
    <article className={`adm-blog-stat ${wide ? "is-wide" : ""}`}>
      <div><span><Icon aria-hidden="true" /></span><mark>{trend}</mark></div>
      <strong>{value}</strong>
      <p>{label}</p>
      <svg aria-hidden="true" viewBox="0 0 120 34"><polyline fill="none" points="0,24 16,18 32,22 48,10 64,14 82,7 100,13 120,8" /></svg>
    </article>
  );
}

function BlogSeoPanel({ blog, onUpdate }: { blog: BlogPost; onUpdate: (patch: Partial<BlogPost>) => void }) {
  const seoScore = getBlogSeoScore(blog);
  const scoreTone = seoScore > 78 ? "green" : seoScore > 58 ? "yellow" : "red";
  return (
    <article className="adm-card adm-blog-side-card">
      <div className="adm-card-head"><div><p className="adm-eyebrow">SEO Panel</p><h2>Live score</h2></div><span className={`adm-blog-score ${scoreTone}`}>{seoScore}%</span></div>
      <label>Meta Title<input value={blog.title} onChange={(event) => onUpdate({ title: event.target.value })} /></label>
      <label>Meta Description<textarea rows={3} value={blog.excerpt} onChange={(event) => onUpdate({ excerpt: event.target.value })} /></label>
      <label>Keywords<input value={`${blog.category}, dentist, Krishna Nagar`} onChange={() => undefined} /></label>
      <label>Canonical URL<input value={`https://healthygrinz.com/blog/${blog.slug}`} onChange={() => undefined} /></label>
      <div className="adm-blog-google-preview"><span>Google Preview</span><strong>{blog.title}</strong><small>healthygrinz.com/blog/{blog.slug}</small><p>{blog.excerpt}</p></div>
      <div className="adm-blog-suggestions-list">{["Add local treatment keywords", "Keep title under 70 characters", "Add image alt text", "Include a booking CTA", "Generate FAQ schema"].map((item) => <span key={item}>{item}</span>)}</div>
    </article>
  );
}

function BlogPublishingPanel({ blog, saving, onDelete, onSave, onUpdate }: { blog: BlogPost; saving: boolean; onDelete: () => void; onSave: () => void; onUpdate: (patch: Partial<BlogPost>) => void }) {
  return (
    <article className="adm-card adm-blog-side-card">
      <div className="adm-card-head"><div><p className="adm-eyebrow">Publishing</p><h2>Workflow</h2></div><AdminAppointmentBadge kind="status" value={getBlogStatus(blog)} /></div>
      <div className="adm-blog-publish-grid">
        <button type="button" onClick={() => onUpdate({ published: false })}>Draft</button>
        <button type="button" onClick={() => onUpdate({ slug: blog.slug.includes("scheduled") ? blog.slug : `${blog.slug}-scheduled`, published: false })}>Scheduled</button>
        <button type="button" onClick={() => onUpdate({ published: true, slug: blog.slug.replace("-scheduled", "").replace("-archived", "") })}>Published</button>
        <button type="button" onClick={() => onUpdate({ published: false })}>Private</button>
      </div>
      <label>Publish Date<input type="date" value={format(new Date(blog.updatedAt), "yyyy-MM-dd")} onChange={() => undefined} /></label>
      <label>Publish Time<input type="time" value="10:00" onChange={() => undefined} /></label>
      <div className="adm-toggle-list"><label><input type="checkbox" defaultChecked /> Featured</label><label><input type="checkbox" /> Homepage featured</label><label><input type="checkbox" defaultChecked /> Send notification</label></div>
      <div className="adm-blog-workflow-mini">{["Draft", "SEO Check", "Medical Review", "Doctor Approval", "Publish", "Social Share", "Email Newsletter", "Analytics"].map((step, index) => <span className={index < 3 ? "is-done" : ""} key={step}>{step}</span>)}</div>
      <div className="adm-form-actions"><button className="adm-primary-button" type="button" onClick={onSave} disabled={saving}>{saving ? "Saving..." : "Save"}</button><button className="adm-danger-button" type="button" onClick={onDelete}>Delete</button></div>
    </article>
  );
}

function BlogAiAssistant({ onRun }: { onRun: (action: string) => void }) {
  const actions = ["Generate Blog", "Rewrite", "Improve Grammar", "Simplify", "Professional Tone", "Medical Tone", "SEO Optimization", "Generate FAQ", "Generate Summary", "Generate Conclusion", "Generate CTA", "Translate", "Expand Content", "Shorten Content", "Social Posts", "Email Newsletter", "Generate Keywords", "Generate Tags"];
  return <article className="adm-card adm-blog-side-card adm-blog-ai"><div className="adm-card-head"><div><p className="adm-eyebrow">AI Assistant</p><h2>Writing copilot</h2></div><FiZap aria-hidden="true" /></div><div className="adm-blog-ai-grid">{actions.map((action) => <button key={action} type="button" onClick={() => onRun(action)}>{action}</button>)}</div></article>;
}

function BlogPreviewPanel({ blog, darkPreview, mode, onDarkChange, onModeChange }: { blog: BlogPost; darkPreview: boolean; mode: BlogPreviewMode; onDarkChange: (value: boolean) => void; onModeChange: (mode: BlogPreviewMode) => void }) {
  return (
    <article className="adm-card adm-blog-side-card">
      <div className="adm-card-head"><div><p className="adm-eyebrow">Live Preview</p><h2>Responsive</h2></div></div>
      <div className="adm-blog-preview-tabs">{(["desktop", "tablet", "mobile"] as BlogPreviewMode[]).map((item) => <button className={mode === item ? "is-active" : ""} key={item} type="button" onClick={() => onModeChange(item)}>{item}</button>)}<button type="button" onClick={() => onDarkChange(!darkPreview)}>{darkPreview ? "Light" : "Dark"}</button></div>
      <div className={`adm-blog-preview ${mode} ${darkPreview ? "dark" : ""}`}><small>{blog.category}</small><strong>{blog.title}</strong><p>{blog.excerpt}</p></div>
    </article>
  );
}

function BlogRevisionPanel({ blog }: { blog: BlogPost }) {
  return <article className="adm-card adm-blog-side-card"><div className="adm-card-head"><div><p className="adm-eyebrow">Version History</p><h2>Revisions</h2></div></div><div className="adm-blog-version-list">{["Created", "Edited", "SEO improved", "Medical review", "Published"].map((item, index) => <span key={item}><b>{item}</b><small>{index === 0 ? formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true }) : `${index + 1}h ago`}</small></span>)}</div></article>;
}

function BlogCommentPanel() {
  return <article className="adm-card adm-blog-side-card"><div className="adm-card-head"><div><p className="adm-eyebrow">Comments</p><h2>Moderation</h2></div><span className="adm-pill">3 pending</span></div><div className="adm-blog-comments">{["Approve", "Reject", "Spam", "Pinned", "Reply"].map((item) => <button key={item} type="button">{item}</button>)}</div></article>;
}

function BlogAnalyticsPanel({ blog, index }: { blog: BlogPost; index: number }) {
  const views = getBlogMockViews(blog, Math.max(index, 0));
  return (
    <article className="adm-card adm-blog-side-card" id="adm-blog-analytics-panel">
      <div className="adm-card-head"><div><p className="adm-eyebrow">Analytics</p><h2>Performance</h2></div></div>
      {[["Views", views.toLocaleString("en-IN"), "82"], ["Visitors", Math.round(views * 0.62).toLocaleString("en-IN"), "68"], ["Bounce Rate", "31%", "31"], ["Avg Read Time", `${getBlogReadTime(blog)}m`, "58"], ["Appointments Generated", "17", "47"], ["Conversions", "8.4%", "74"]].map(([label, value, width]) => <div className="adm-blog-analytics-row" key={label}><span>{label}</span><strong>{value}</strong><i style={{ width: `${width}%` }} /></div>)}
    </article>
  );
}

export function AdminDashboard() {
  const [token, setToken] = useState("");
  const [savedToken, setSavedToken] = useState("");
  const [content, setContent] = useState<SiteContent | null>(null);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [submissions, setSubmissions] = useState<Submissions>(emptySubmissions);
  const [status, setStatus] = useState("Enter admin password to load dashboard.");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [ready, setReady] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [activeSection, setActiveSection] = useState<AdminSection>("dashboard");
  const [search, setSearch] = useState("");
  const [patientCreateSignal, setPatientCreateSignal] = useState(0);
  const [records, setRecords] = useState(initialRecords);

  const loadDashboard = useCallback(
    async (authToken = token) => {
      const normalizedToken = authToken.trim();
      setLoading(true);
      setStatus("Loading clinic management dashboard...");

      try {
        const [contentResponse, submissionsResponse] = await Promise.all([
          fetch("/api/admin/content", { headers: { "x-admin-token": normalizedToken } }),
          fetch("/api/admin/submissions", { headers: { "x-admin-token": normalizedToken } }),
        ]);
        const blogsResponse = await fetch("/api/admin/blogs", { headers: { "x-admin-token": normalizedToken } });

        if (!contentResponse.ok || !submissionsResponse.ok || !blogsResponse.ok) {
          throw new Error("Wrong admin password.");
        }

        const nextContent = (await contentResponse.json()) as SiteContent;
        const nextSubmissions = (await submissionsResponse.json()) as Submissions;
        const nextBlogs = (await blogsResponse.json()) as BlogPost[];
        setContent(nextContent);
        setSubmissions(nextSubmissions);
        setBlogs(nextBlogs);
        setSavedToken(normalizedToken);
        window.localStorage.setItem("healthygrinz_admin_token", normalizedToken);
        setReady(true);
        setLastUpdated(new Date());
        setStatus("Dashboard loaded.");
      } catch (error) {
        setStatus(error instanceof Error ? error.message : "Unable to load dashboard.");
        setReady(false);
        setSavedToken("");
        window.localStorage.removeItem("healthygrinz_admin_token");
      } finally {
        setLoading(false);
      }
    },
    [token],
  );

  const saveContent = useCallback(async () => {
    if (!content) return;
    setSaving(true);
    setStatus("Saving website services...");

    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": (savedToken || token).trim(),
        },
        body: JSON.stringify(content),
      });

      if (!response.ok) {
        throw new Error(response.status === 401 ? "Wrong admin password." : "Unable to save website content.");
      }

      const savedContent = (await response.json()) as SiteContent;
      setContent(savedContent);
      setStatus("Website services saved. Refresh the public site to see the latest changes.");
      setLastUpdated(new Date());
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to save website content.");
    } finally {
      setSaving(false);
    }
  }, [content, savedToken, token]);

  const saveBlogs = useCallback(async () => {
    setSaving(true);
    setStatus("Saving blogs...");

    try {
      const response = await fetch("/api/admin/blogs", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": (savedToken || token).trim(),
        },
        body: JSON.stringify(blogs),
      });

      if (!response.ok) {
        throw new Error(response.status === 401 ? "Wrong admin password." : "Unable to save blogs.");
      }

      const savedBlogs = (await response.json()) as BlogPost[];
      setBlogs(savedBlogs);
      setStatus("Blogs saved. Published posts are now visible on the customer website.");
      setLastUpdated(new Date());
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to save blogs.");
    } finally {
      setSaving(false);
    }
  }, [blogs, savedToken, token]);

  useEffect(() => {
    const existing = window.localStorage.getItem("healthygrinz_admin_token");
    if (existing) {
      setSavedToken(existing);
      void loadDashboard(existing);
    }
  }, [loadDashboard]);

  useEffect(() => {
    if (!ready) return undefined;
    const interval = window.setInterval(() => setLastUpdated(new Date()), 60000);
    return () => window.clearInterval(interval);
  }, [ready]);

  const recentAppointments = useMemo(() => buildAppointmentsFromSubmissions(submissions), [submissions]);

  const appointmentRecords = useMemo<AdminRecord[]>(() => {
    const submittedRecords = submissions.appointments.slice(0, 5).map((item, index) => ({
      id: `WEB-${String(index + 1).padStart(3, "0")}`,
      title: item.name,
      subtitle: item.concern || "Website appointment request",
      meta: item.preferredTime || format(new Date(item.createdAt), "dd MMM, hh:mm a"),
      status: "Pending",
      tone: "orange" as const,
    }));

    return [...submittedRecords, ...records.appointments];
  }, [records.appointments, submissions.appointments]);

  function addRecord(section: RecordBackedAdminSection, record: AdminRecord) {
    setRecords((current) => ({
      ...current,
      [section]: [record, ...current[section]],
    }));
    setLastUpdated(new Date());
  }

  function advanceRecord(section: RecordBackedAdminSection, id: string) {
    setRecords((current) => ({
      ...current,
      [section]: current[section].map((record) =>
        record.id === id ? { ...record, status: record.status === "Reviewed" ? "Active" : "Reviewed", tone: "green" } : record,
      ),
    }));
    setLastUpdated(new Date());
  }

  function deleteRecord(section: RecordBackedAdminSection, id: string) {
    setRecords((current) => ({
      ...current,
      [section]: current[section].filter((record) => record.id !== id),
    }));
    setLastUpdated(new Date());
  }

  function handlePrimaryAction() {
    if (activeSection === "dashboard") {
      setActiveSection("appointments");
      return;
    }

    if (activeSection === "patients") {
      setPatientCreateSignal((value) => value + 1);
      setLastUpdated(new Date());
      return;
    }

    if (
      activeSection === "treatments" ||
      activeSection === "about" ||
      activeSection === "doctors" ||
      activeSection === "gallery" ||
      activeSection === "reviews" ||
      activeSection === "faqs" ||
      activeSection === "settings" ||
      activeSection === "blog"
    ) {
      void (activeSection === "blog" ? saveBlogs() : saveContent());
      return;
    }

    if (activeSection === "reports" || activeSection === "ai" || activeSection === "xray") {
      setStatus(`${sectionCopy[activeSection].cta} is ready in this workspace.`);
      setLastUpdated(new Date());
      return;
    }

    if (activeSection === "videos") {
      setStatus("Upload video is ready in the Video Management workspace.");
      setLastUpdated(new Date());
      return;
    }

    addRecord(activeSection, {
      id: `${activeSection.slice(0, 3).toUpperCase()}-${Date.now().toString().slice(-5)}`,
      title: `New ${sectionCopy[activeSection].title} item`,
      subtitle: "Created from the header quick action",
      meta: "Added just now",
      status: "New",
      tone: "indigo",
    });
  }

  function renderActiveSection() {
    if (activeSection === "dashboard") {
      return <DashboardSection appointments={recentAppointments} />;
    }

    if (activeSection === "appointments") {
      return (
        <AdminAppointmentsSection
          records={appointmentRecords}
          search={search}
          onAdd={(record) => addRecord("appointments", record)}
          onAdvance={(id) => advanceRecord("appointments", id)}
          onDelete={(id) => deleteRecord("appointments", id)}
        />
      );
    }

    if (activeSection === "patients") {
      return <AdminPatientsSection globalSearch={search} openCreateSignal={patientCreateSignal} />;
    }

    if (activeSection === "videos") {
      return <AdminVideoManagementSection globalSearch={search} />;
    }

    if (activeSection === "reports") {
      return <ReportsSection />;
    }

    if (activeSection === "treatments") {
      return <WebsiteServicesSection content={content} saving={saving} onChange={setContent} onSave={() => void saveContent()} />;
    }

    if (activeSection === "about") {
      return <WebsiteHomeSection content={content} saving={saving} onChange={setContent} onSave={() => void saveContent()} />;
    }

    if (activeSection === "doctors") {
      return <DoctorContentSection content={content} saving={saving} onChange={setContent} onSave={() => void saveContent()} />;
    }

    if (activeSection === "reviews") {
      return <ReviewsContentSection content={content} saving={saving} onChange={setContent} onSave={() => void saveContent()} />;
    }

    if (activeSection === "faqs") {
      return <FaqContentSection content={content} saving={saving} onChange={setContent} onSave={() => void saveContent()} />;
    }

    if (activeSection === "gallery") {
      return <GalleryContentSection content={content} saving={saving} onChange={setContent} onSave={() => void saveContent()} />;
    }

    if (activeSection === "blog") {
      return <BlogCmsSection blogs={blogs} saving={saving} onChange={setBlogs} onSave={() => void saveBlogs()} />;
    }

    if (activeSection === "ai") {
      return <AiAssistantSection />;
    }

    if (activeSection === "xray") {
      return <XraySection />;
    }

    if (activeSection === "settings") {
      return (
        <ContactContentSection
          content={content}
          saving={saving}
          darkMode={darkMode}
          onChange={setContent}
          onSave={() => void saveContent()}
          onToggleDarkMode={() => setDarkMode((value) => !value)}
        />
      );
    }

    const sectionRecords = records[activeSection];

    return (
      <GenericSection
        section={activeSection}
        records={sectionRecords}
        search={search}
        onAdd={(record) => addRecord(activeSection, record)}
        onAdvance={(id) => advanceRecord(activeSection, id)}
        onDelete={(id) => deleteRecord(activeSection, id)}
      />
    );
  }

  if (!ready) {
    return (
      <AdminLogin
        token={token || savedToken}
        status={status}
        loading={loading}
        onTokenChange={setToken}
        onSubmit={() => void loadDashboard(token || savedToken)}
      />
    );
  }

  return (
    <div className={`adm-root ${darkMode ? "is-dark" : ""}`}>
      <Sidebar
        open={sidebarOpen}
        activeSection={activeSection}
        onClose={() => setSidebarOpen(false)}
        onNavigate={(section) => {
          setActiveSection(section);
          setSearch("");
        }}
      />
      <div className="adm-main">
        <Header
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode((value) => !value)}
          onMenu={() => setSidebarOpen(true)}
          search={search}
          onSearch={setSearch}
          onNavigate={(section) => {
            setActiveSection(section);
            setSearch("");
          }}
        />
        <main className="adm-content">
          <SectionHero section={activeSection} lastUpdated={lastUpdated} onPrimaryAction={handlePrimaryAction} />

          {loading ? <LoadingState /> : null}
          {status !== "Dashboard loaded." ? (
            <p className="adm-inline-status" aria-live="polite">
              {status}
            </p>
          ) : null}
          {renderActiveSection()}
        </main>
      </div>
    </div>
  );
}
