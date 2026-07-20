# 10. Deployment Architecture

DentMind AI should be AWS-ready with Dockerized services and environment-based configuration.

## Production Topology

```txt
CloudFront
  -> AWS WAF
  -> ALB / NGINX
     -> Next.js Web
     -> FastAPI API
     -> Celery Workers
        -> PostgreSQL RDS
        -> Redis ElastiCache
        -> S3 Private Buckets
        -> Qdrant/Pinecone
        -> OpenAI/Gemini/Claude APIs
```

## Containers

- `web`: Next.js
- `api`: FastAPI
- `worker`: Celery worker
- `scheduler`: Celery beat
- `nginx`: reverse proxy
- `postgres`: local development
- `redis`: local development
- `qdrant`: local development

## Environments

- Local
- Preview
- Staging
- Production

## CI/CD

Pipeline:

1. Typecheck
2. Lint
3. Unit tests
4. Integration tests
5. Build Docker images
6. Run database migration check
7. Deploy preview
8. E2E smoke tests
9. Promote to production

## Observability

- Structured logs
- Request IDs
- AI run traces
- Worker job metrics
- Error tracking
- Uptime monitoring
- Audit export

## Compliance Posture

HIPAA-ready and GDPR-ready architecture requires:

- Signed BAAs with infrastructure and AI providers where applicable
- Encryption at rest and in transit
- Private upload storage
- Role-based access
- Audit logs
- Data retention controls
- Export and deletion workflows
- Incident response runbook

