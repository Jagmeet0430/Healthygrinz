import type { SiteContent } from "@/lib/content";

const OPENAI_API_URL = "https://api.openai.com/v1/responses";

type ResponseContent = {
  type?: string;
  text?: string;
};

type ResponseOutput = {
  type?: string;
  content?: ResponseContent[];
};

type OpenAIResponse = {
  output_text?: string;
  output?: ResponseOutput[];
  error?: { message?: string };
};

export function getAiModel() {
  return process.env.OPENAI_MODEL || "gpt-5.4-mini";
}

export function hasOpenAIKey() {
  return Boolean(process.env.OPENAI_API_KEY);
}

export function getClinicKnowledge(content: SiteContent) {
  return [
    `Clinic: Healthy Grins Dental Clinic`,
    `Location: ${content.hero.location}`,
    `Doctor: ${content.doctor.name}`,
    `Doctor bio: ${content.doctor.bio}`,
    `Clinic note: ${content.doctor.note}`,
    `Phone: ${content.contact.phone}`,
    `Email: ${content.contact.email}`,
    `Address: ${content.contact.addressLines.join(", ")}`,
    `Hours: ${content.contact.hours}`,
    `Treatments: ${content.treatments
      .map((item) => `${item.title} - ${item.description} Good for: ${item.goodFor}. Details: ${item.details}`)
      .join(" | ")}`,
    `FAQs: ${content.faqs.map((item) => `${item.question} ${item.answer}`).join(" | ")}`,
  ].join("\n");
}

export function extractOutputText(payload: OpenAIResponse) {
  if (payload.output_text) return payload.output_text;

  return (
    payload.output
      ?.flatMap((item) => item.content || [])
      .map((item) => item.text || "")
      .filter(Boolean)
      .join("\n")
      .trim() || ""
  );
}

export async function createOpenAIResponse(body: Record<string, unknown>) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }

  const response = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const payload = (await response.json()) as OpenAIResponse;

  if (!response.ok) {
    throw new Error(payload.error?.message || "OpenAI request failed.");
  }

  const text = extractOutputText(payload);
  if (!text) {
    throw new Error("The AI response was empty.");
  }

  return text;
}

