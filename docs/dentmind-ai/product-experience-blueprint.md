# DentMind AI Product Experience Blueprint

This document defines the full DentMind AI experience before further implementation. It is the product, UX, visual, motion, and AI interaction source of truth.

## 1. Customer Analysis

### Primary Customers

Clinic owners:

- Want higher revenue, fewer missed appointments, better patient retention, less admin overhead.
- Fear expensive software that staff will not adopt.
- Fear AI making unsafe claims or creating liability.
- Need proof within 10 seconds that DentMind saves time and reduces operational chaos.

Doctors:

- Want fewer clicks, faster context, better documentation, and clinical clarity.
- Fear tools that interrupt patient care.
- Need today’s appointments, pending reports, relevant risks, and AI support in one view.

Clinic staff:

- Want scheduling, patient communication, reports, invoices, and reminders to be simple.
- Fear complexity and mistakes in patient records.
- Need clear next actions and fewer screens.

Patients:

- Want confidence, comfort, transparency, reminders, reports, and easy booking.
- Fear confusing treatment plans and hidden costs.
- Need reassurance and plain-language communication.

### First 10 Seconds

Every first screen must answer:

- What is this?
- Why should I trust it?
- How does it save time?
- Is AI clinically safe?
- What should I do next?

The answer should be visual first, text second.

## 2. Information Architecture

```txt
DentMind AI
  Marketing Experience
    Product Story
    AI Demo
    Trust and Compliance
    Clinical Workflow
    Pricing
    Demo Request

  Doctor Portal
    Today
    Patients
    Appointments
    Patient Timeline
    X-Ray AI
    Reports
    Voice Notes
    Treatment Plans
    Prescriptions
    AI Chat

  Clinic Admin Portal
    Clinic Overview
    Staff
    Schedule
    Billing
    Patient Communications
    Analytics
    Settings

  Platform Admin Portal
    Global Dashboard
    Clinics
    Doctors
    Patients
    AI Operations
    RAG Operations
    Billing
    Support
    Security
    System Health
    Feature Flags

  Patient Portal
    Book Appointment
    Treatment Timeline
    Reports
    Invoices
    Medication Reminders
    Chat
```

## 3. User Journey

### Clinic Owner Journey

1. Arrives on DentMind AI marketing page.
2. Sees hero: "AI operating system for modern dental clinics."
3. Watches live workflow: patient, report, X-ray, AI note, doctor verification.
4. Sees quantified outcomes: time saved, record search speed, AI safety guardrails.
5. Reviews compliance/security.
6. Opens interactive dashboard preview.
7. Requests private demo.

Emotional arc:

```txt
Curious -> impressed -> reassured -> confident -> ready to book demo
```

### Doctor Journey

1. Opens Today dashboard.
2. Sees upcoming appointments and patient readiness score.
3. Opens patient context.
4. AI highlights risks, history, pending reports, and X-rays.
5. Doctor uses voice to capture consultation.
6. AI drafts SOAP note and treatment suggestion.
7. Doctor verifies and saves.

Emotional arc:

```txt
Busy -> oriented -> supported -> in control -> faster documentation
```

### Patient Journey

1. Books appointment.
2. Receives reminders and preparation notes.
3. Views treatment timeline.
4. Gets reports and instructions in plain language.
5. Receives medication reminders and follow-up prompts.

Emotional arc:

```txt
Anxious -> informed -> comfortable -> compliant -> loyal
```

## 4. Screen Flow

```txt
Marketing Home
  -> Interactive Product Demo
  -> Pricing
  -> Book Demo

Book Demo
  -> Lead Capture
  -> Confirmation
  -> Sales Follow-up

Doctor Login
  -> Today
  -> Patient Timeline
  -> AI Consultation
  -> Note Approval

Clinic Admin Login
  -> Clinic Dashboard
  -> Staff / Billing / Analytics

Platform Admin Login
  -> Global Mission Control
  -> Clinics / AI Ops / Security / System Health

Patient Link
  -> Appointment / Timeline / Reports / Invoice
```

## 5. Navigation

### Marketing Navigation

- Product
- AI Workflows
- Security
- Pricing
- Dashboard Preview
- Request Demo

### Doctor Navigation

Doctor navigation should be task-first:

- Today
- Patients
- X-rays
- Reports
- Voice Notes
- AI Chat
- Treatment Plans
- Prescriptions

### Admin Navigation

Admin navigation should be command-center-first:

- Dashboard
- AI Analytics
- Clinics
- Doctors
- Patients
- Subscriptions
- Knowledge Base
- X-Ray AI
- Voice AI
- Security
- Support
- System Health

## 6. Design Language

DentMind should feel:

- Clinical but not sterile.
- Futuristic but not gimmicky.
- Premium but not decorative.
- Intelligent but not overwhelming.

### Layout Rules

- One dominant idea per viewport.
- Large typography for strategic moments.
- Dense layouts only inside operational dashboards.
- Avoid card spam: combine panels, timelines, data strips, spatial canvases, and progressive drawers.
- Use glass only where it creates depth and hierarchy.

### Visual Motifs

- Neural glow rings around AI moments.
- Soft clinical grids for record/X-ray areas.
- Command surfaces inspired by Raycast.
- Timeline ribbons for patient history.
- Mission-control panels for admin.

## 7. Color System

### Marketing / Product

- Deep royal purple: `#2F2A5A`
- Medium purple: `#5E4D96`
- Slate text: `#556070`
- White cards: `#FFFFFF`
- Light border: `#ECECEC`
- Soft background: `#FAF9FD`

### Enterprise Admin

- Primary: `#2563EB`
- Secondary: `#0EA5E9`
- Accent: `#06B6D4`
- Success: `#10B981`
- Warning: `#F59E0B`
- Danger: `#EF4444`
- Background: `#09090B`
- Cards: `#18181B`
- Text: `#FAFAFA`
- Muted: `#A1A1AA`

### Clinical Safety Colors

- Verified: green
- Needs review: amber
- Urgent: red
- AI draft: blue
- Cited source: cyan

## 8. Typography

Recommended hierarchy:

- Hero display: 64-96px, tight line-height.
- Section headings: 40-64px.
- Dashboard headings: 28-44px.
- Panel headings: 18-24px.
- Body: 15-18px.
- Operational metadata: 12-13px uppercase.

Typography behavior:

- Use large type for product storytelling.
- Use compact type for clinical/workflow density.
- Use tabular numbers in dashboards.
- Avoid negative letter spacing.

## 9. Motion System

Motion should explain state, not decorate.

### Motion Types

- Entrance: fade + 12px vertical lift.
- Hover: 2-5px elevation, border glow.
- Loading: skeleton shimmer, not spinners by default.
- AI thinking: soft pulse with text streaming.
- Voice: waveform bars linked to listening state.
- X-ray review: finding overlays fade in sequentially.
- RAG: citations slide in after answer chunk.
- Dashboard live updates: number count-up with subtle flash.

### Timing

- Micro interactions: 150-220ms.
- Page transitions: 260-360ms.
- AI streaming: progressive content reveal.
- Reduced motion: disable parallax, floating, and continuous animations.

## 10. Component Library

Core components:

- AppShell
- FloatingNav
- Sidebar
- Topbar
- CommandPalette
- WorkspaceSwitcher
- SearchEverywhere
- NotificationCenter
- ThemeToggle
- GlassPanel
- MetricPanel
- LiveChart
- Timeline
- AIInsight
- AIComposer
- CitationCard
- SourceChunk
- XRayViewer
- HeatmapOverlay
- VoiceWaveform
- UploadDropzone
- ReportSummary
- PatientRiskBadge
- EmptyState
- ErrorState
- SkeletonBlock
- AuditTimeline
- BillingPlanCard

## 11. Dashboard Experience

### Admin Dashboard

Question answered:

"Is the business healthy right now?"

Above the fold:

- Revenue health
- Clinic health
- AI usage
- System status
- Security alerts
- Churn risk
- Admin AI Copilot

Dashboard should feel alive:

- Live activity feed
- Status pulses
- Animated charts
- Real-time notifications
- AI-generated insight cards

### Doctor Dashboard

Question answered:

"What do I need to handle today?"

Above the fold:

- Today’s appointments
- Patients needing review
- Pending X-rays
- Pending reports
- Voice note shortcut
- AI consultation button

## 12. Landing Experience

The landing page is an Apple-style product story.

Sequence:

1. Hero: DentMind AI as the AI operating system for dental clinics.
2. Live product demo: patient, X-ray, RAG, voice notes.
3. Outcome metrics: saved hours, faster search, safer AI.
4. Workflow: upload -> analyze -> verify -> save.
5. Trust: security, citations, doctor verification.
6. Pricing: clear path to demo.
7. FAQ: reduce fear.

Each section should answer one question.

## 13. Doctor Portal

### Core Screens

- Today
- Patient profile
- Medical history
- X-ray analysis
- Voice notes
- Clinical notes
- Treatment plan
- Prescription assistant
- AI chat

### Patient Profile Layout

```txt
Patient Header
  risk badges, next appointment, active treatment

Left Column
  summary, alerts, AI insights

Main Timeline
  visits, notes, reports, X-rays, prescriptions

Right Rail
  AI actions, pending tasks, citations
```

## 14. Admin Portal

### Core Screens

- Mission Control
- Clinics
- Doctors
- Patients
- AI Operations
- RAG Operations
- X-Ray AI
- Voice AI
- Billing
- Security
- Support
- System Health
- Feature Flags

### Admin AI Copilot

Should answer:

- Revenue this week.
- Clinics likely to churn.
- AI cost anomalies.
- Inactive doctors.
- Highest AI usage clinics.
- Unusual traffic spikes.
- Support ticket summaries.

## 15. AI Interaction System

AI should be contextual everywhere.

### AI Surfaces

- Global command copilot.
- Patient context assistant.
- X-ray analysis assistant.
- Report summarizer.
- Voice note generator.
- Billing insight assistant.
- Admin business intelligence assistant.
- Patient plain-language assistant.

### AI Output Rules

- Always show confidence where relevant.
- Always show citations for RAG.
- Always show "doctor verification required" for clinical suggestions.
- Separate observation from recommendation.
- Show what data was used.
- Allow edit, approve, reject, and audit.

### Clinical AI Pattern

```txt
Observation
  What the AI noticed

Considerations
  Possible clinical paths

Verify
  Exams/questions required

Next Step
  Safe action suggestion

Sources
  Citations or uploaded record references
```

## 16. Empty States

Empty states must teach and convert.

Examples:

- No patients: "Import your first patient list and DentMind will build searchable timelines."
- No X-rays: "Upload an X-ray to see AI findings with doctor verification."
- No knowledge base: "Add SOPs or PDFs so RAG answers can cite your own protocols."
- No voice notes: "Start dictating visits and convert them to SOAP notes."

Each empty state includes:

- Clear title.
- One-sentence value.
- Primary action.
- Optional example.

## 17. Error States

Error states must preserve trust.

Rules:

- Explain what failed.
- Explain whether patient data is safe.
- Give recovery action.
- Provide support path.
- Avoid scary stack traces in UI.

Examples:

- Upload failed.
- AI provider unavailable.
- Report extraction failed.
- Citation source missing.
- Permission denied.
- Payment failed.

## 18. Loading Experience

Loading should feel intelligent.

Patterns:

- Skeleton timeline for patient profile.
- X-ray analysis progress stages.
- RAG indexing pipeline steps.
- Voice transcription waveform.
- Dashboard data shimmer.
- AI answer streaming.

Avoid generic spinners except for tiny controls.

## 19. Responsive Behaviour

Desktop:

- Full command center.
- Sidebar + topbar.
- Multi-panel layouts.
- Keyboard shortcuts.

Tablet:

- Collapsible sidebar.
- Two-column operational panels.
- Sticky AI actions.

Mobile:

- Bottom task navigation.
- One primary action per screen.
- AI assistant as persistent floating action.
- Tables become summaries/timelines.

## 20. Build Gate

No next module should start until these decisions are accepted:

- Product positioning.
- Portal structure.
- Color systems.
- AI safety interaction model.
- Admin and doctor dashboard intent.
- Empty/loading/error state patterns.

Recommended next module after approval:

**Doctor Today Dashboard** because it proves DentMind understands real daily dental work.

