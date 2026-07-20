# 06. Database Schema

PostgreSQL is the source of truth. Vector data can live in Qdrant/Pinecone or PostgreSQL with pgvector for smaller deployments.

## Core Tables

```sql
organizations (
  id uuid primary key,
  name text not null,
  slug text unique not null,
  plan text not null,
  created_at timestamptz not null
);

users (
  id uuid primary key,
  email text unique not null,
  name text not null,
  avatar_url text,
  mfa_enabled boolean not null default false,
  created_at timestamptz not null
);

memberships (
  id uuid primary key,
  organization_id uuid references organizations(id),
  user_id uuid references users(id),
  role text not null,
  status text not null,
  created_at timestamptz not null
);

patients (
  id uuid primary key,
  organization_id uuid references organizations(id),
  full_name text not null,
  phone text,
  email text,
  date_of_birth date,
  gender text,
  tags text[] not null default '{}',
  medical_alerts jsonb not null default '[]',
  created_at timestamptz not null
);

appointments (
  id uuid primary key,
  organization_id uuid references organizations(id),
  patient_id uuid references patients(id),
  doctor_id uuid references users(id),
  status text not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  no_show_risk numeric,
  notes text
);

medical_records (
  id uuid primary key,
  organization_id uuid references organizations(id),
  patient_id uuid references patients(id),
  type text not null,
  title text not null,
  body text,
  created_by uuid references users(id),
  created_at timestamptz not null
);

documents (
  id uuid primary key,
  organization_id uuid references organizations(id),
  patient_id uuid references patients(id),
  filename text not null,
  mime_type text not null,
  storage_key text not null,
  status text not null,
  extracted_text text,
  metadata jsonb not null default '{}',
  created_at timestamptz not null
);

ai_runs (
  id uuid primary key,
  organization_id uuid references organizations(id),
  patient_id uuid references patients(id),
  user_id uuid references users(id),
  run_type text not null,
  model text not null,
  input_hash text not null,
  output jsonb not null,
  safety_flags jsonb not null default '[]',
  created_at timestamptz not null
);

audit_logs (
  id uuid primary key,
  organization_id uuid references organizations(id),
  actor_id uuid references users(id),
  action text not null,
  entity_type text not null,
  entity_id uuid,
  ip_address inet,
  metadata jsonb not null default '{}',
  created_at timestamptz not null
);
```

## AI/RAG Tables

```sql
knowledge_sources (
  id uuid primary key,
  organization_id uuid references organizations(id),
  title text not null,
  source_type text not null,
  document_id uuid references documents(id),
  status text not null,
  created_at timestamptz not null
);

knowledge_chunks (
  id uuid primary key,
  organization_id uuid references organizations(id),
  source_id uuid references knowledge_sources(id),
  chunk_index int not null,
  text text not null,
  page_number int,
  token_count int,
  metadata jsonb not null default '{}'
);
```

## Indexing Requirements

- Index every table by `organization_id`.
- Use full-text search on patients, documents, and records.
- Encrypt sensitive fields at rest where required.
- Store raw uploads in private object storage, not directly in PostgreSQL.

