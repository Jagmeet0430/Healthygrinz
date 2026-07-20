# DentMind AI Admin Panel Architecture

This document defines the first DentMind AI admin module: the platform control plane for clinics, subscriptions, AI operations, security, and infrastructure health.

## 1. Folder Structure

```txt
src/
  app/
    dentmind/
      admin/
        page.tsx
  components/
    dentmind-admin/
      AdminShell.tsx
      AdminKpiGrid.tsx
      AdminAnalyticsPanel.tsx
      AdminCopilot.tsx
      AdminManagementTables.tsx
      AdminSystemHealth.tsx
  data/
    dentmind-admin.ts
docs/
  dentmind-ai/
    admin-panel.md
```

Future backend structure:

```txt
services/api/app/modules/admin/
  routes.py
  service.py
  repository.py
  schemas.py
  permissions.py
```

## 2. Admin Architecture

The admin panel is a multi-tenant platform control plane. It must support platform admins, support teams, billing operators, security reviewers, and ML operators.

Major domains:

- SaaS metrics
- Clinic management
- Doctor and patient oversight
- Subscriptions and payments
- AI model operations
- RAG document operations
- X-ray inference monitoring
- Voice session monitoring
- Security center
- Audit logs
- Support tickets
- System health
- Feature flags

## 3. Navigation Flow

Primary shell:

```txt
Topbar
  Workspace switcher
  Search everywhere
  Command palette
  Notification center
  Theme toggle
  Profile menu

Sidebar
  Dashboard
  AI Analytics
  Clinics
  Doctors
  Patients
  Appointments
  Medical Records
  X-Ray AI
  Voice Assistant
  AI Chat
  Knowledge Base
  Reports
  Billing
  Security
  Integrations
  System Health
  Settings
```

## 4. UI Wireframe

```txt
┌──────────────────────────────────────────────────────────────┐
│ Topbar: Workspace | Search | Ctrl K | Alerts | Theme | User │
├───────────────┬──────────────────────────────────────────────┤
│ Sidebar       │ KPI cards                                    │
│ Dashboard     │ Clinics | Doctors | Patients | Revenue       │
│ Clinics       ├─────────────────────┬────────────────────────┤
│ AI Ops        │ Revenue chart       │ AI copilot             │
│ Billing       ├─────────────────────┴────────────────────────┤
│ Security      │ Clinics table | AI usage | system health     │
└───────────────┴──────────────────────────────────────────────┘
```

## 5. Component Hierarchy

```txt
DentMindAdminPage
  AdminShell
    AdminSidebar
    AdminTopbar
    AdminKpiGrid
    AdminAnalyticsPanel
    AdminCopilot
    AdminManagementTables
    AdminSystemHealth
```

## 6. Dashboard Layout

The first implementation module includes:

- Collapsible-style sidebar visual foundation
- Topbar with command/search/workspace affordances
- KPI cards for SaaS, AI, storage, and infrastructure
- Revenue and AI usage chart approximations
- Clinic management table
- AI operations table
- System health cards
- Admin AI Copilot insight panel

## 7. Database Schema

Core admin entities:

```sql
platform_admin_events (
  id uuid primary key,
  actor_id uuid not null,
  organization_id uuid,
  action text not null,
  target_type text not null,
  target_id uuid,
  metadata jsonb not null default '{}',
  created_at timestamptz not null
);

subscriptions (
  id uuid primary key,
  organization_id uuid not null,
  plan text not null,
  status text not null,
  mrr_cents integer not null,
  stripe_customer_id text,
  stripe_subscription_id text,
  current_period_end timestamptz
);

ai_usage_events (
  id uuid primary key,
  organization_id uuid not null,
  user_id uuid,
  provider text not null,
  model text not null,
  feature text not null,
  input_tokens integer,
  output_tokens integer,
  cost_cents integer,
  latency_ms integer,
  created_at timestamptz not null
);

system_health_snapshots (
  id uuid primary key,
  service text not null,
  status text not null,
  latency_ms integer,
  cpu_percent numeric,
  memory_percent numeric,
  created_at timestamptz not null
);
```

## 8. API Design

```txt
GET /admin/overview
GET /admin/kpis
GET /admin/clinics
GET /admin/ai-usage
GET /admin/system-health
GET /admin/audit-logs
POST /admin/copilot/query
PATCH /admin/clinics/{clinic_id}/plan
PATCH /admin/clinics/{clinic_id}/suspend
POST /admin/feature-flags
```

## 9. State Management

Client state:

- Sidebar collapsed state
- Theme
- Command palette open state
- Active filters
- Pinned widgets

Server state:

- KPIs
- Tables
- Charts
- Notifications
- Audit log stream

Recommended implementation:

- React Query for server data
- Zustand for shell preferences
- URL search params for filters

## 10. Authentication Flow

```txt
Email / SSO login
  -> MFA challenge
  -> Organization selection
  -> Role and permission hydration
  -> Admin shell
```

## 11. RBAC

Roles:

- `platform_owner`
- `platform_admin`
- `support_admin`
- `billing_admin`
- `security_admin`
- `ml_ops_admin`
- `read_only_auditor`

Permission examples:

- `clinics.read`
- `clinics.suspend`
- `billing.refund`
- `ai.models.update`
- `security.audit.read`
- `feature_flags.write`

## 12. Admin Dashboard UI

The current module implements the premium static admin shell at `/dentmind/admin`. It is intentionally front-end complete and ready to connect to the API layer above.

