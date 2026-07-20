import { NextResponse } from "next/server";
import { sendAppointmentEmail } from "@/lib/email";
import { addAppointmentSubmission } from "@/lib/submissions";
import { saveAppointment } from "@/lib/supabase";
import { validateAppointment } from "@/lib/validations";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const validation = validateAppointment(body);

  if (!validation.ok) {
    return NextResponse.json({ errors: validation.errors }, { status: 400 });
  }

  try {
    const [storage, email] = await Promise.all([
      saveAppointment(validation.data),
      sendAppointmentEmail(validation.data),
      addAppointmentSubmission(validation.data),
    ]);

    return NextResponse.json({ ok: true, storage, email });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to submit appointment request." }, { status: 500 });
  }
}
