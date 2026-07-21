"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import type { IconType } from "react-icons";
import {
  FiActivity,
  FiBell,
  FiCalendar,
  FiChevronDown,
  FiClipboard,
  FiCreditCard,
  FiDatabase,
  FiDollarSign,
  FiFileText,
  FiHelpCircle,
  FiHome,
  FiImage,
  FiInbox,
  FiMenu,
  FiMessageCircle,
  FiMoon,
  FiPackage,
  FiPieChart,
  FiPlusCircle,
  FiSearch,
  FiSettings,
  FiSmile,
  FiStar,
  FiSun,
  FiType,
  FiUserCheck,
  FiUsers,
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
  | "reviews"
  | "blog"
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
  { id: "billing", label: "Billing & Payments", icon: FiCreditCard },
  { id: "reports", label: "Reports", icon: FiPieChart },
  { id: "ai", label: "AI Assistant", icon: FiZap },
  { id: "xray", label: "X-Ray Analysis", icon: FiImage },
  { id: "records", label: "Medical Records", icon: FiDatabase },
  { id: "prescription", label: "Prescription", icon: FiClipboard },
  { id: "inventory", label: "Inventory", icon: FiPackage },
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

const initialRecords: Record<Exclude<AdminSection, "dashboard" | "treatments" | "reports" | "ai" | "xray" | "blog" | "settings">, AdminRecord[]> = {
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
  section: Exclude<AdminSection, "dashboard" | "reports" | "ai" | "xray" | "settings">;
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
      id: crypto.randomUUID(),
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

function SettingsSection({ darkMode, onToggleDarkMode }: { darkMode: boolean; onToggleDarkMode: () => void }) {
  const [whatsapp, setWhatsapp] = useState(true);
  const [email, setEmail] = useState(true);
  const [autoRecall, setAutoRecall] = useState(false);

  return (
    <section className="adm-section-grid">
      <article className="adm-card adm-form-card">
        <div className="adm-card-head">
          <div>
            <p className="adm-eyebrow">Clinic profile</p>
            <h2>Core settings</h2>
          </div>
        </div>
        <label>
          Clinic name
          <input defaultValue="Healthy Grins Dental Clinic" />
        </label>
        <label>
          Support email
          <input defaultValue="healthygrinsbylisha@gmail.com" />
        </label>
        <label>
          Working hours
          <input defaultValue="Mon-Sat 10am-2pm, 5pm-8pm" />
        </label>
        <button className="adm-primary-button" type="button">Save settings</button>
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
  const [records, setRecords] = useState(initialRecords);

  const loadDashboard = useCallback(
    async (authToken = token) => {
      setLoading(true);
      setStatus("Loading clinic management dashboard...");

      try {
        const [contentResponse, submissionsResponse] = await Promise.all([
          fetch("/api/admin/content", { headers: { "x-admin-token": authToken } }),
          fetch("/api/admin/submissions", { headers: { "x-admin-token": authToken } }),
        ]);
        const blogsResponse = await fetch("/api/admin/blogs", { headers: { "x-admin-token": authToken } });

        if (!contentResponse.ok || !submissionsResponse.ok || !blogsResponse.ok) {
          throw new Error("Wrong admin password.");
        }

        const nextContent = (await contentResponse.json()) as SiteContent;
        const nextSubmissions = (await submissionsResponse.json()) as Submissions;
        const nextBlogs = (await blogsResponse.json()) as BlogPost[];
        setContent(nextContent);
        setSubmissions(nextSubmissions);
        setBlogs(nextBlogs);
        setSavedToken(authToken);
        window.localStorage.setItem("healthygrinz_admin_token", authToken);
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
          "x-admin-token": savedToken || token,
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
          "x-admin-token": savedToken || token,
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

  function addRecord(section: Exclude<AdminSection, "dashboard" | "treatments" | "reports" | "ai" | "xray" | "blog" | "settings">, record: AdminRecord) {
    setRecords((current) => ({
      ...current,
      [section]: [record, ...current[section]],
    }));
    setLastUpdated(new Date());
  }

  function advanceRecord(section: Exclude<AdminSection, "dashboard" | "treatments" | "reports" | "ai" | "xray" | "blog" | "settings">, id: string) {
    setRecords((current) => ({
      ...current,
      [section]: current[section].map((record) =>
        record.id === id ? { ...record, status: record.status === "Reviewed" ? "Active" : "Reviewed", tone: "green" } : record,
      ),
    }));
    setLastUpdated(new Date());
  }

  function deleteRecord(section: Exclude<AdminSection, "dashboard" | "treatments" | "reports" | "ai" | "xray" | "blog" | "settings">, id: string) {
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

    if (activeSection === "treatments" || activeSection === "blog") {
      void (activeSection === "treatments" ? saveContent() : saveBlogs());
      return;
    }

    if (activeSection === "reports" || activeSection === "ai" || activeSection === "xray" || activeSection === "settings") {
      setStatus(`${sectionCopy[activeSection].cta} is ready in this workspace.`);
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

    if (activeSection === "reports") {
      return <ReportsSection />;
    }

    if (activeSection === "treatments") {
      return <WebsiteServicesSection content={content} saving={saving} onChange={setContent} onSave={() => void saveContent()} />;
    }

    if (activeSection === "blog") {
      return <BlogEditorSection blogs={blogs} saving={saving} onChange={setBlogs} onSave={() => void saveBlogs()} />;
    }

    if (activeSection === "ai") {
      return <AiAssistantSection />;
    }

    if (activeSection === "xray") {
      return <XraySection />;
    }

    if (activeSection === "settings") {
      return <SettingsSection darkMode={darkMode} onToggleDarkMode={() => setDarkMode((value) => !value)} />;
    }

    const sectionRecords = activeSection === "appointments" ? appointmentRecords : records[activeSection];

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
