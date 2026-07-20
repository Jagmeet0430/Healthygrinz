import { NextResponse } from "next/server";
import { createOpenAIResponse, getAiModel, getClinicKnowledge, hasOpenAIKey } from "@/lib/ai";
import { getSiteContent } from "@/lib/content";

const MAX_FILE_BYTES = 12 * 1024 * 1024;

function toBase64(buffer: ArrayBuffer) {
  return Buffer.from(buffer).toString("base64");
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const note = String(formData.get("note") || "").trim();
  const file = formData.get("file");

  if (!note && !(file instanceof File)) {
    return NextResponse.json({ error: "Add a clinical question, report text, or upload a file." }, { status: 400 });
  }

  if (file instanceof File && file.size > MAX_FILE_BYTES) {
    return NextResponse.json({ error: "Please upload a file smaller than 12 MB." }, { status: 400 });
  }

  if (!hasOpenAIKey()) {
    return NextResponse.json({
      result:
        "The AI Lab is installed, but live report review needs OPENAI_API_KEY in .env.local. After that, the doctor can upload an X-ray image/PDF or paste report text for structured suggestions.",
      setupRequired: true,
    });
  }

  const content = await getSiteContent();
  const parts: Array<Record<string, string>> = [
    {
      type: "input_text",
      text: [
        `Clinic knowledge:\n${getClinicKnowledge(content)}`,
        `Doctor's question or report notes:\n${note || "No additional note provided."}`,
      ].join("\n\n"),
    },
  ];

  if (file instanceof File && file.size > 0) {
    const base64 = toBase64(await file.arrayBuffer());

    if (file.type.startsWith("image/")) {
      parts.push({
        type: "input_image",
        image_url: `data:${file.type};base64,${base64}`,
        detail: "high",
      });
    } else {
      parts.push({
        type: "input_file",
        filename: file.name || "uploaded-report",
        file_data: base64,
      });
    }
  }

  try {
    const result = await createOpenAIResponse({
      model: process.env.OPENAI_REPORT_MODEL || getAiModel(),
      instructions: [
        "You are a dental clinical decision support assistant for a licensed dentist.",
        "Analyze uploaded dental X-rays, report files, and notes cautiously. State visible observations, uncertainties, likely clinical questions to verify, and suggested next steps.",
        "Do not produce a final diagnosis, treatment plan, prescription, or guarantee. The dentist must interpret the original records and examine the patient.",
        "Use this structure: Summary, Observations, Possible considerations, Questions for patient/exam, Suggested next steps, Urgent red flags, Limitations.",
        "Mention image/report quality limitations when relevant.",
      ].join("\n"),
      input: [
        {
          role: "user",
          content: parts,
        },
      ],
    });

    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to review the report." },
      { status: 500 },
    );
  }
}

