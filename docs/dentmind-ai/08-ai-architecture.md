# 08. AI Architecture

DentMind AI should use a provider-abstracted AI layer so clinics can start with OpenAI and later add Gemini, Claude, or local Ollama models.

## AI Services

```txt
AI Gateway
  |
  |-- Chat Orchestrator
  |-- RAG Orchestrator
  |-- Voice Orchestrator
  |-- X-Ray Vision Orchestrator
  |-- Notes Generator
  |-- Treatment Plan Assistant
  |-- Prescription Assistant
  |-- Analytics Insight Generator
```

## Provider Abstraction

```txt
ModelProvider
  generate_text()
  stream_text()
  analyze_image()
  transcribe_audio()
  synthesize_speech()
  create_embeddings()
```

Adapters:

- OpenAI
- Gemini
- Claude
- Ollama local

## Clinical Safety Layer

Every clinical AI output passes through:

1. Input validation
2. PHI access check
3. Prompt policy injection
4. Retrieval grounding when required
5. Output schema validation
6. Safety disclaimer insertion
7. Audit logging
8. Doctor verification state

## X-Ray AI

Initial production architecture:

- Upload image
- Normalize image
- Run vision model for structured findings
- Optional specialized dental CV model later
- Return finding list, confidence, explanation, and suggested verification
- Store overlays as metadata

Future model path:

- Train/fine-tune detection model for bounding boxes
- Add DICOM parsing
- Add segmentation and heatmap visualization
- Add dentist feedback loop for model evaluation

## Voice Assistant

Flow:

```txt
Microphone
  -> streaming transcription
  -> intent detection
  -> clinical note builder
  -> doctor review
  -> save SOAP note
```

Outputs:

- Transcript
- Visit summary
- SOAP note
- Follow-up tasks
- Patient instructions

