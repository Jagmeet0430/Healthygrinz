import { NextResponse } from "next/server";
import { createOpenAIResponse, getAiModel, getClinicKnowledge, hasOpenAIKey } from "@/lib/ai";
import { getSiteContent } from "@/lib/content";

const MAX_MESSAGE_LENGTH = 1600;

export async function POST(request: Request) {
  const { message } = (await request.json().catch(() => ({}))) as { message?: string };
  const cleanMessage = String(message || "").trim().slice(0, MAX_MESSAGE_LENGTH);

  if (!cleanMessage) {
    return NextResponse.json({ error: "Please enter a question." }, { status: 400 });
  }

  if (!hasOpenAIKey()) {
    return NextResponse.json({
      answer:
        "AI is ready in the interface, but the server needs OPENAI_API_KEY in .env.local before I can answer live clinic questions.",
      setupRequired: true,
    });
  }

  const content = await getSiteContent();
  const knowledge = getClinicKnowledge(content);
  const vectorStoreId = process.env.OPENAI_VECTOR_STORE_ID;

  try {
    const answer = await createOpenAIResponse({
      model: getAiModel(),
      ...(vectorStoreId
        ? {
            tools: [
              {
                type: "file_search",
                vector_store_ids: [vectorStoreId],
              },
            ],
          }
        : {}),
      instructions: [
        "You are the Healthy Grins Dental Clinic customer assistant.",
        "Use the provided clinic knowledge first. If vector store search is available, use it for clinic document retrieval.",
        "Answer in a warm, concise, reassuring style for dental patients.",
        "Do not diagnose, prescribe medication, or claim certainty from symptoms. Encourage booking with the dentist for clinical decisions.",
        "For severe swelling, facial trauma, uncontrolled bleeding, fever with dental pain, trouble breathing or swallowing, advise urgent care immediately.",
        "End with one practical next step when appropriate.",
      ].join("\n"),
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `Clinic knowledge:\n${knowledge}\n\nPatient question:\n${cleanMessage}`,
            },
          ],
        },
      ],
    });

    return NextResponse.json({ answer });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to generate an answer." },
      { status: 500 },
    );
  }
}

