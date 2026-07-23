"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, signOut } from "@/lib/supabase";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    async function checkUser() {
      const user = await getCurrentUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      setUserEmail(user.email || "");
      setLoading(false);
    }

    checkUser();
  }, [router]);

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-6">

          <div>
            <h1 className="text-2xl font-bold text-purple-700">
              HealthyGrinz Dashboard
            </h1>

            <p className="text-gray-500">
              {userEmail}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>

        </div>
      </header>

      <section className="max-w-7xl mx-auto p-8">

        <h2 className="text-3xl font-bold mb-8">
          Welcome 👋
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <Link href="/booking" className="bg-white rounded-xl shadow p-6">
            Book Appointment
          </Link>

          <Link href="/appointments" className="bg-white rounded-xl shadow p-6">
            My Appointments
          </Link>

          <Link href="/reports" className="bg-white rounded-xl shadow p-6">
            Reports
          </Link>

          <Link href="/profile" className="bg-white rounded-xl shadow p-6">
            Profile
          </Link>

        </div>

      </section>

    </main>
  );
}