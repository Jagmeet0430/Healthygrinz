import type { Metadata } from "next";
import { DentMindMarketing } from "@/components/dentmind/DentMindMarketing";

export const metadata: Metadata = {
  title: "DentMind AI | The AI Dental Assistant Platform",
  description:
    "DentMind AI helps dental clinics manage patients, records, X-rays, clinical notes, RAG knowledge, and AI workflows in one premium workspace.",
};

export default function DentMindPage() {
  return <DentMindMarketing />;
}

