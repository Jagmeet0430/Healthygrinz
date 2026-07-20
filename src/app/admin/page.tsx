import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin",
  description: "Manage Healthy Grins website content and customer enquiries.",
};

export default function AdminPage() {
  return <AdminDashboard />;
}
