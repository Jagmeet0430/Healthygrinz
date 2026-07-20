export const adminNavGroups = [
  {
    title: "Command",
    items: ["Dashboard", "AI Analytics", "Clinics", "Doctors", "Patients", "Appointments", "Treatments"],
  },
  {
    title: "Clinical AI",
    items: ["Medical Records", "X-Ray AI", "Voice Assistant", "AI Chat", "Knowledge Base", "Reports"],
  },
  {
    title: "Revenue",
    items: ["Invoices", "Subscriptions", "Payments", "Plans", "Marketing", "Support Tickets"],
  },
  {
    title: "Platform",
    items: [
      "Notifications",
      "Audit Logs",
      "Security",
      "Integrations",
      "API Keys",
      "Feature Flags",
      "ML Models",
      "Storage",
      "Database",
      "Backups",
      "Users",
      "Roles",
      "Permissions",
      "Activity",
      "System Health",
      "Settings",
    ],
  },
];

export const adminKpis = [
  { label: "Total clinics", value: "248", delta: "+18 this month", tone: "blue" },
  { label: "Doctors", value: "1,924", delta: "+7.8% growth", tone: "cyan" },
  { label: "Patients", value: "186K", delta: "32K active", tone: "green" },
  { label: "Today's appointments", value: "4,812", delta: "91% confirmed", tone: "amber" },
  { label: "MRR", value: "$128K", delta: "+12.4% MoM", tone: "green" },
  { label: "ARR", value: "$1.54M", delta: "Enterprise pipeline +$420K", tone: "blue" },
  { label: "AI queries today", value: "92K", delta: "p95 1.2s latency", tone: "cyan" },
  { label: "Uploaded reports", value: "18.7K", delta: "2.1TB encrypted", tone: "purple" },
];

export const adminChartBars = [42, 58, 54, 66, 72, 64, 81, 88, 84, 92, 96, 104];

export const adminAiCosts = [
  { label: "RAG searches", value: "38K", cost: "$214" },
  { label: "X-ray inference", value: "7.8K", cost: "$492" },
  { label: "Voice sessions", value: "12K", cost: "$188" },
  { label: "SOAP notes", value: "22K", cost: "$136" },
];

export const adminClinics = [
  {
    name: "Apex Dental Studio",
    plan: "Enterprise",
    doctors: 42,
    patients: "18.2K",
    revenue: "$18,400",
    aiUsage: "High",
    lastLogin: "4 min ago",
    status: "Healthy",
  },
  {
    name: "SmileWorks Mumbai",
    plan: "Professional",
    doctors: 16,
    patients: "8.9K",
    revenue: "$6,900",
    aiUsage: "Medium",
    lastLogin: "18 min ago",
    status: "Review billing",
  },
  {
    name: "Northline Ortho",
    plan: "Professional",
    doctors: 21,
    patients: "12.4K",
    revenue: "$9,800",
    aiUsage: "High",
    lastLogin: "1 hr ago",
    status: "Healthy",
  },
  {
    name: "Pearl Family Dental",
    plan: "Starter",
    doctors: 5,
    patients: "2.1K",
    revenue: "$1,200",
    aiUsage: "Low",
    lastLogin: "2 days ago",
    status: "Activation risk",
  },
];

export const adminAiOperations = [
  { feature: "RAG chatbot", provider: "OpenAI", latency: "840ms", accuracy: "97.2%", status: "Optimal" },
  { feature: "X-ray analysis", provider: "Vision stack", latency: "2.4s", accuracy: "91.8%", status: "Doctor review" },
  { feature: "Voice notes", provider: "Realtime", latency: "420ms", accuracy: "95.1%", status: "Optimal" },
  { feature: "No-show model", provider: "Internal ML", latency: "110ms", accuracy: "88.7%", status: "Training" },
];

export const adminHealth = [
  { service: "API", status: "Operational", metric: "99.99%", detail: "p95 142ms" },
  { service: "Postgres", status: "Operational", metric: "41%", detail: "CPU load" },
  { service: "Redis", status: "Operational", metric: "11ms", detail: "Queue latency" },
  { service: "Workers", status: "Degraded", metric: "82%", detail: "OCR queue high" },
  { service: "Vector DB", status: "Operational", metric: "64GB", detail: "Index size" },
  { service: "GPU", status: "Operational", metric: "57%", detail: "Inference load" },
];

export const adminCopilotSuggestions = [
  "Which clinics are at churn risk this week?",
  "Summarize AI cost drivers by provider.",
  "Find inactive doctors with high patient load.",
  "Generate a board-ready growth report.",
];

export const adminNotifications = [
  "OCR worker queue exceeded 80% capacity.",
  "Pearl Family Dental has not completed onboarding.",
  "Enterprise plan upgrade requested by Northline Ortho.",
];

