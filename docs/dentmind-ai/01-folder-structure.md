# 01. Folder Structure

The platform should be organized as a production monorepo so frontend, backend, workers, infrastructure, and shared contracts can evolve independently.

```txt
dentmind-ai/
  apps/
    web/
      app/
        (marketing)/
        (auth)/
        (dashboard)/
        api/
      components/
        ai/
        analytics/
        appointments/
        auth/
        billing/
        charts/
        clinic/
        dashboard/
        documents/
        layout/
        patients/
        records/
        settings/
        shared/
        xray/
      config/
      hooks/
      lib/
      providers/
      stores/
      styles/
      tests/
      types/
    admin/
      app/
      components/
      lib/
      tests/
  services/
    api/
      app/
        core/
        db/
        modules/
          analytics/
          appointments/
          audit/
          auth/
          billing/
          clinics/
          documents/
          patients/
          rag/
          reports/
          users/
          xray/
        workers/
        tests/
      alembic/
      pyproject.toml
    ai-worker/
      pipelines/
      providers/
      rag/
      vision/
      voice/
      tests/
  packages/
    contracts/
      openapi/
      schemas/
      zod/
    design-system/
    eslint-config/
    tsconfig/
  infra/
    docker/
    nginx/
    terraform/
    aws/
    monitoring/
  docs/
    architecture/
    compliance/
    product/
    runbooks/
  scripts/
```

## App Responsibilities

`apps/web` handles the public SaaS site, authenticated doctor workspace, patient records, AI chat, voice assistant, uploads, and dashboards.

`services/api` handles FastAPI APIs, authentication, RBAC, database access, billing webhooks, audit logging, and orchestration.

`services/ai-worker` handles slower AI work: embeddings, OCR, report summarization, X-ray analysis jobs, document ingestion, and RAG indexing.

`packages/contracts` keeps API schemas shared between TypeScript and Python.

`infra` contains Docker, NGINX, AWS, observability, and deployment assets.

