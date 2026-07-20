import type { AppointmentPayload, ContactPayload } from "@/lib/validations";

export async function sendAppointmentEmail(payload: AppointmentPayload) {
  if (!process.env.CONTACT_TO_EMAIL) {
    return { sent: false, reason: "CONTACT_TO_EMAIL is not configured." };
  }

  console.info("Appointment request", payload);
  return { sent: true };
}

export async function sendContactEmail(payload: ContactPayload) {
  if (!process.env.CONTACT_TO_EMAIL) {
    return { sent: false, reason: "CONTACT_TO_EMAIL is not configured." };
  }

  console.info("Contact enquiry", payload);
  return { sent: true };
}
