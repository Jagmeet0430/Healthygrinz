import type { Metadata } from "next";
import { AdminShell } from "@/components/dentmind-admin/AdminShell";

export const metadata: Metadata = {
  title: "DentMind AI Admin Panel",
  description:
    "Enterprise DentMind AI admin control plane for clinics, AI operations, subscriptions, security, and system health.",
};

export default function DentMindAdminPage() {
  return <AdminShell />;
}

