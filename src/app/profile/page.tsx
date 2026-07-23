"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState<any>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    if (!supabase) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    setUser(user);

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (data) {
      setName(data.name || "");
      setPhone(data.phone || "");
      setDob(data.dob || "");
      setAddress(data.address || "");
    } else {
      setName(user.email?.split("@")[0] || "");
    }

    setLoading(false);
  };

  const saveProfile = async () => {
    if (!supabase || !user) return;

    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      email: user.email,
      name,
      phone,
      dob,
      address,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Profile updated successfully.");
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl">

        <div className="bg-gradient-to-r from-[#5E4D96] to-[#7B61FF] p-10 text-white">

          <div className="flex items-center gap-6">

            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-4xl font-bold text-purple-700">
              {name.charAt(0).toUpperCase()}
            </div>

            <div>
              <h1 className="text-3xl font-bold">{name}</h1>
              <p>{user.email}</p>
            </div>

          </div>

        </div>

        <div className="grid gap-8 p-10 md:grid-cols-2">

          <div>
            <label className="font-semibold">
              Full Name
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="font-semibold">
              Email
            </label>

            <input
              value={user.email}
              readOnly
              className="mt-2 w-full rounded-xl border bg-gray-100 p-3"
            />
          </div>

          <div>
            <label className="font-semibold">
              Phone Number
            </label>

            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-2 w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="font-semibold">
              Date of Birth
            </label>

            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="mt-2 w-full rounded-xl border p-3"
            />
          </div>

          <div className="md:col-span-2">
            <label className="font-semibold">
              Address
            </label>

            <textarea
              rows={4}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-2 w-full rounded-xl border p-3"
            />
          </div>

        </div>

        <div className="border-t p-8">

          <button
            onClick={saveProfile}
            className="rounded-xl bg-gradient-to-r from-[#5E4D96] to-[#7B61FF] px-8 py-3 font-semibold text-white"
          >
            Save Changes
          </button>

        </div>

      </div>

    </main>
  );
}