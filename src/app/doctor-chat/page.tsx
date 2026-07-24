import type { Metadata } from "next";
import { DoctorChatWorkspace } from "@/components/doctor-chat/DoctorChatWorkspace";

export const metadata: Metadata = {
  title: "Doctor Chat | HealthyGrinz",
  description: "Secure HealthyGrinz doctor consultation workspace for patient messages, reports, prescriptions, invoices, and AI summaries.",
};

export default function DoctorChatPage() {
  return <DoctorChatWorkspace />;
}
