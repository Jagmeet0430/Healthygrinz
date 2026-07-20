# 07. API Architecture

The backend should use FastAPI with modular routers, SQLAlchemy, Alembic migrations, Pydantic schemas, JWT auth, and RBAC dependencies.

## API Modules

```txt
/auth
  POST /login
  POST /logout
  POST /refresh
  POST /otp
  POST /mfa/verify

/organizations
  GET /current
  POST /onboarding
  PATCH /settings

/patients
  GET /
  POST /
  GET /{patient_id}
  PATCH /{patient_id}
  GET /{patient_id}/timeline

/appointments
  GET /
  POST /
  PATCH /{appointment_id}
  POST /{appointment_id}/reminders

/documents
  POST /signed-upload
  POST /complete-upload
  GET /
  GET /{document_id}
  POST /{document_id}/extract

/ai/chat
  POST /stream
  POST /ask

/ai/rag
  POST /sources
  POST /query
  GET /sources

/ai/xray
  POST /analyze
  GET /runs/{run_id}

/ai/voice
  POST /transcribe
  POST /notes

/analytics
  GET /overview
  GET /appointments
  GET /revenue

/billing
  GET /plans
  POST /checkout
  POST /webhook

/admin
  GET /organizations
  GET /users
  GET /audit-logs
```

## API Patterns

- REST for CRUD.
- Server-sent events or WebSocket for streaming AI responses.
- Signed upload URLs for files.
- Background jobs for OCR, embeddings, and X-ray analysis.
- Idempotency keys for billing and upload completion.
- Request IDs across API, worker, and logs.

## Security Middleware

- JWT verification
- Organization resolution
- RBAC checks
- Rate limiting
- Request size limits
- Audit event writer
- CORS allowlist
- Security headers

