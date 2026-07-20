import type { Metadata } from "next";
import { DentMindDashboard } from "@/components/dentmind/DentMindDashboard";

export const metadata: Metadata = {
  title: "DentMind AI Dashboard",
  description: "DentMind AI dashboard shell for patients, X-ray analysis, RAG chat, voice notes, and clinic analytics.",
};

export default function DentMindDashboardPage() {
  return <DentMindDashboard />;
}

