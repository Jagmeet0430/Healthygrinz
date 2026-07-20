export const dentMindMetrics = [
  { label: "Hours saved weekly", value: "14+", detail: "Per doctor through notes, summaries, and triage support" },
  { label: "Faster record search", value: "8x", detail: "Across reports, protocols, visits, and patient history" },
  { label: "AI response guardrails", value: "100%", detail: "Clinical verification, citations, and audit trails by design" },
];

export const dentMindFeatures = [
  {
    title: "AI dental co-pilot",
    text: "Ask clinical questions, summarize patient context, draft SOAP notes, and prepare exam checklists with safety boundaries.",
    tag: "Clinical AI",
  },
  {
    title: "Grounded RAG knowledge",
    text: "Upload SOPs, research papers, protocols, and dental books. Answers cite source chunks instead of guessing.",
    tag: "Citations",
  },
  {
    title: "X-ray intelligence",
    text: "Review panoramic, bitewing, and CBCT screenshots with finding lists, confidence scores, and visual overlays.",
    tag: "Vision",
  },
  {
    title: "Voice-first notes",
    text: "Dictate during consultation and convert conversations into structured summaries, tasks, and patient instructions.",
    tag: "Voice",
  },
  {
    title: "Smart appointment AI",
    text: "Spot no-show risk, recommend scheduling windows, and automate reminders for better chair utilization.",
    tag: "Ops",
  },
  {
    title: "Clinic analytics",
    text: "Understand revenue, patient retention, treatment mix, appointment trends, and AI-powered opportunities.",
    tag: "Insights",
  },
];

export const dentMindWorkflow = [
  "Import patients, appointments, documents, X-rays, and clinic protocols.",
  "DentMind extracts text, indexes records, builds embeddings, and labels metadata.",
  "Doctors ask natural questions through chat, voice, or patient context panels.",
  "AI returns grounded suggestions, citations, red flags, and next-step checklists.",
  "The doctor verifies, edits, approves, and saves the final clinical artifact.",
];

export const dentMindTestimonials = [
  {
    quote:
      "DentMind turns scattered patient records into a clinical workspace that feels instantly searchable and ready before the patient sits down.",
    name: "Dr. Aarya Mehta",
    role: "Multi-chair dental clinic owner",
  },
  {
    quote:
      "The value is not just AI answers. It is workflow confidence: citations, audit logs, role permissions, and doctor verification.",
    name: "Karan Shah",
    role: "Healthcare operations consultant",
  },
];

export const dentMindPricing = [
  {
    name: "Starter",
    price: "$149",
    text: "For single clinics beginning with AI notes, patient search, and assistant chat.",
    features: ["1 clinic", "3 users", "AI chat", "Patient records", "Basic uploads"],
  },
  {
    name: "Professional",
    price: "$399",
    text: "For growing clinics that need RAG, X-ray review, analytics, and automations.",
    features: ["3 clinics", "15 users", "RAG knowledge base", "X-ray AI", "Voice notes", "Analytics"],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    text: "For groups needing SSO, custom AI providers, audit exports, and compliance workflows.",
    features: ["Unlimited clinics", "RBAC", "Custom models", "Dedicated support", "Security review"],
  },
];

export const dashboardNav = [
  "Dashboard",
  "Patients",
  "Appointments",
  "Medical Records",
  "X-Ray Analysis",
  "Treatment Plans",
  "AI Chat",
  "Voice Assistant",
  "Reports",
  "Analytics",
  "Settings",
  "Billing",
  "API Keys",
  "Audit Logs",
  "Admin",
];

export const patientRows = [
  { name: "Mira Kapoor", concern: "Gum bleeding", risk: "Medium", status: "Needs perio exam" },
  { name: "Arjun Rao", concern: "Molar pain", risk: "High", status: "X-ray review ready" },
  { name: "Neha Singh", concern: "Aligner follow-up", risk: "Low", status: "Treatment on track" },
];

export const aiSignals = [
  { label: "RAG citations", value: "12", tone: "positive" },
  { label: "X-ray findings", value: "4", tone: "warning" },
  { label: "SOAP drafts", value: "9", tone: "positive" },
  { label: "No-show risk", value: "18%", tone: "neutral" },
];

