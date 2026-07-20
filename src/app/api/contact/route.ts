import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";
import { addContactSubmission } from "@/lib/submissions";
import { saveContactSubmission } from "@/lib/supabase";
import { validateContact } from "@/lib/validations";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const validation = validateContact(body);

  if (!validation.ok) {
    return NextResponse.json({ errors: validation.errors }, { status: 400 });
  }

  try {
    const [storage, email] = await Promise.all([
      saveContactSubmission(validation.data),
      sendContactEmail(validation.data),
      addContactSubmission(validation.data),
    ]);

    return NextResponse.json({ ok: true, storage, email });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to submit contact request." }, { status: 500 });
  }
}
