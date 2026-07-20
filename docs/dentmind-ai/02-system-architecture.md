# 02. System Architecture

DentMind AI should be built as a secure multi-tenant SaaS platform.

```txt
Browser
  |
  | HTTPS
  v
Next.js Web App
  |
  | REST / streaming / signed uploads
  v
FastAPI Gateway
  |
  |---------------- PostgreSQL
  |---------------- Redis
  |---------------- Object Storage
  |---------------- Vector DB
  |---------------- Celery Workers
  |---------------- AI Providers
```

## Core Tenancy Model

Every business object belongs to an `organization_id`.

Users may belong to multiple organizations through memberships. Permissions are resolved through roles:

- `owner`
- `clinic_admin`
- `doctor`
- `assistant`
- `billing_admin`
- `support`
- `platform_admin`

## Major Product Domains

- Marketing website
- Authentication and onboarding
- Clinic workspace
- Patient management
- Appointment intelligence
- Medical records
- Upload center
- AI chat
- RAG knowledge base
- X-ray analysis
- Clinical notes
- Voice assistant
- Analytics
- Billing
- Audit logs
- Platform admin

## Reliability Principles

- All AI jobs are asynchronous when they can take more than a few seconds.
- Uploads go directly to object storage through signed URLs.
- API writes emit audit events.
- AI outputs are stored as clinical-support artifacts, never as final diagnosis.
- Sensitive uploads use private buckets and short-lived signed access.

