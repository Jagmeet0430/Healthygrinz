import { promises as fs } from "fs";
import path from "path";
import type { AppointmentPayload, ContactPayload } from "@/lib/validations";

export type StoredAppointment = AppointmentPayload & {
  id: string;
  createdAt: string;
};

export type StoredContact = ContactPayload & {
  id: string;
  createdAt: string;
};

export type Submissions = {
  appointments: StoredAppointment[];
  contacts: StoredContact[];
};

const submissionsPath = path.join(process.cwd(), "src", "data", "submissions.json");

export async function getSubmissions(): Promise<Submissions> {
  const raw = await fs.readFile(submissionsPath, "utf8");
  return JSON.parse(raw) as Submissions;
}

async function saveSubmissions(submissions: Submissions) {
  await fs.writeFile(submissionsPath, `${JSON.stringify(submissions, null, 2)}\n`, "utf8");
}

export async function addAppointmentSubmission(payload: AppointmentPayload) {
  const submissions = await getSubmissions();
  const appointment = {
    ...payload,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  submissions.appointments.unshift(appointment);
  await saveSubmissions(submissions);
  return appointment;
}

export async function addContactSubmission(payload: ContactPayload) {
  const submissions = await getSubmissions();
  const contact = {
    ...payload,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  submissions.contacts.unshift(contact);
  await saveSubmissions(submissions);
  return contact;
}
