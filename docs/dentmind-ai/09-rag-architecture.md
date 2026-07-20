# 09. RAG Architecture

RAG is required for document-grounded answers with citations.

## Ingestion Pipeline

```txt
Upload
  -> Virus scan
  -> File type validation
  -> Text extraction
  -> OCR if needed
  -> Chunking
  -> Metadata enrichment
  -> Embeddings
  -> Vector storage
  -> Source status: ready
```

Supported source types:

- PDF
- DOCX
- TXT
- Markdown
- Clinic SOP
- Treatment protocol
- Research paper
- Dental book excerpt
- Future: DICOM metadata

## Query Pipeline

```txt
User query
  -> Intent classifier
  -> Permission filter
  -> Hybrid search
  -> Reranking
  -> Context window builder
  -> Grounded answer
  -> Citation extraction
  -> Source chunk display
```

## Grounding Rules

- RAG chatbot answers only from uploaded documents.
- If sources are insufficient, it must say it does not know.
- Every answer must include citations.
- Show page number and source title when available.
- Store source chunk IDs used in each answer.

## Vector Database Abstraction

```txt
VectorStore
  upsert_chunks()
  search()
  hybrid_search()
  delete_source()
```

Adapters:

- Qdrant
- Pinecone
- FAISS for local development
- pgvector for smaller deployments

## Chunking Strategy

- Default chunk size: 800 tokens
- Overlap: 120 tokens
- Preserve headings
- Preserve page numbers
- Metadata: organization, source, patient, document type, date, page

