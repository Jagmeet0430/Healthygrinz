"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const { error } = await signIn(email, password);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl grid md:grid-cols-2">

        {/* Left Section */}

        <div className="bg-gradient-to-br from-[#5E4D96] to-[#2F2A5A] p-12 text-white flex flex-col justify-center">

          <h1 className="text-5xl font-extrabold mb-6">
            HealthyGrinz
          </h1>

          <h2 className="text-3xl font-bold mb-4">
            Welcome Back 👋
          </h2>

          <p className="text-lg text-purple-100 leading-8">
            Access your appointments, AI smile analysis,
            treatment history and dental reports securely.
          </p>

          <div className="mt-12 space-y-4 text-lg">
            <p>🦷 AI Smile Analysis</p>
            <p>📅 Book Appointment</p>
            <p>📄 Dental Reports</p>
            <p>🤖 AI Dental Assistant</p>
          </div>
        </div>

        {/* Right Section */}

        <div className="p-10 md:p-14">

          <div className="flex justify-between items-center">

            <h2 className="text-4xl font-bold text-gray-900">
              Sign In
            </h2>

            <Link
              href="/"
              className="text-purple-700 hover:underline"
            >
              Home
            </Link>

          </div>

          <p className="mt-3 text-gray-500">
            Login to your HealthyGrinz account
          </p>

          <form
            onSubmit={handleLogin}
            className="mt-10 space-y-6"
          >

            <div>

              <label className="font-medium">
                Email Address
              </label>

              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                required
              />

            </div>

            <div>

              <label className="font-medium">
                Password
              </label>

              <div className="relative mt-2">

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-14 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3 text-sm text-purple-700"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

            </div>

            <div className="flex justify-between items-center text-sm">

              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember me
              </label>

              <Link
                href="#"
                className="text-purple-700 hover:underline"
              >
                Forgot Password?
              </Link>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-[#5E4D96] to-[#7B61FF] py-3 text-lg font-semibold text-white hover:opacity-90"
            >
              {loading ? "Signing In..." : "Login"}
            </button>

            <p className="text-center text-gray-600">

              Don't have an account?{" "}

              <Link
                href="/register"
                className="font-semibold text-purple-700 hover:underline"
              >
                Register
              </Link>

            </p>

          </form>

        </div>

      </div>
    </main>
  );
}