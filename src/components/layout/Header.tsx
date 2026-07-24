"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import type { SiteContent } from "@/lib/content";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
const links = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/#doctor", label: "Doctor" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/doctor-videos", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

type HeaderProps = {
  contact: SiteContent["contact"];
};

export function Header({ contact }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    function close(e: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", close);

    return () => document.removeEventListener("mousedown", close);
  }, []);

  const handleLogout = async () => {
    if (!supabase) return;

    await supabase.auth.signOut();

    window.location.href = "/";
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

        {/* Logo */}

        <Link href="/">
          <Image
            src="/images/healthy-grins-logo.svg.jpeg"
            alt="Healthy Grins"
            width={170}
            height={60}
            className="w-28 md:w-40 h-auto"
            priority
          />
        </Link>

        {/* Desktop Menu */}

        <div className="hidden md:flex items-center gap-8">

          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-semibold text-gray-700 hover:text-purple-700"
            >
              {link.label}
            </Link>
          ))}

          <a
            href={`tel:${contact.phoneHref}`}
            className="rounded-full bg-gradient-to-r from-[#5E4D96] to-[#7B61FF] px-8 py-4 text-white font-semibold shadow-xl"
          >
            Call now
          </a>

          {!user ? (
            <Link
              href="/login"
              className="rounded-full border px-8 py-4 font-semibold"
            >
              Login
            </Link>
          ) : (
            <div className="relative" ref={profileRef}>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  setProfileOpen(!profileOpen);
  }}  className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#5E4D96] to-[#7B61FF] text-xl font-bold text-white shadow-xl"
              >
                {user.email?.charAt(0).toUpperCase()}
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-4 w-80 overflow-hidden rounded-3xl bg-white shadow-2xl border">

                  <div className="bg-gradient-to-r from-[#5E4D96] to-[#7B61FF] p-7 text-center text-white">

                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-3xl font-bold text-purple-700">
                      {user.email?.charAt(0).toUpperCase()}
                    </div>

                    <h3 className="mt-4 text-xl font-bold">
                      {user.email?.split("@")[0]}
                    </h3>

                    <p className="text-sm opacity-90 break-all">
                      {user.email}
                    </p>

                  </div>

                  <div className="space-y-2 p-4">

                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        router.push("/profile");
                      }}
                      className="block w-full rounded-xl px-4 py-3 text-left hover:bg-gray-100"
                    >
                       👤 My Profile
                    </button>

                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        router.push("/appointments");
                      }}
                      className="block w-full rounded-xl px-4 py-3 text-left hover:bg-gray-100"
                    >
                      📅 My Appointments
                    </button>

                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        router.push("/reports");
                      }}
                      className="block w-full rounded-xl px-4 py-3 text-left hover:bg-gray-100"
                    >
                      📄 Reports
                    </button>

                    <hr />

                    <button
                      onClick={handleLogout}
                      className="w-full rounded-xl bg-red-500 py-3 text-white font-semibold hover:bg-red-600"
                    >
                      Logout
                    </button>

                  </div>

                </div>
              )}
            </div>
          )}

        </div>

        {/* Mobile Right Side */}

        <div className="flex items-center gap-3 md:hidden">

          {user && (
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-[#5E4D96] to-[#7B61FF] text-white font-bold"
            >
              {user.email?.charAt(0).toUpperCase()}
            </button>
          )}

          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>
      </nav>

      {/* Mobile Menu */}

      {menuOpen && (
        <div className="space-y-5 bg-white px-6 py-6 shadow-xl md:hidden">

          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block font-semibold"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <a
            href={`tel:${contact.phoneHref}`}
            className="block rounded-xl bg-purple-700 py-3 text-center text-white"
          >
            Call now
          </a>

          {!user && (
            <Link
              href="/login"
              className="block rounded-xl border py-3 text-center"
            >
              Login
            </Link>
          )}
        </div>
      )}

      {/* Mobile Profile Card */}

      {user && profileOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/30 pt-24 md:hidden"
        onClick={() => setProfileOpen(false)}

        
        >

          <div 
            className="absolute left-1/2 top-24 w-[92%] max-w-sm -translate-x-1/2 overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >







          

            <div className="bg-gradient-to-r from-[#5E4D96] to-[#7B61FF] p-7 text-center text-white">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-3xl font-bold text-purple-700">
                {user.email?.charAt(0).toUpperCase()}
              </div>

              <h3 className="mt-4 text-xl font-bold">
                {user.email?.split("@")[0]}
              </h3>

              <p className="break-all text-sm">
                {user.email}
              </p>

            </div>

            <div className="space-y-2 p-5">

            <button
              onClick={() => {
               alert("Profile clicked");
              }}
              className="block w-full rounded-xl p-3 text-left hover:bg-gray-100"
            >
              👤 My Profile
            </button>

             <button
                onClick={() => {
                  setProfileOpen(false);
                  router.push("/appointments");
                }}
                className="block w-full rounded-xl p-3 text-left hover:bg-gray-100"
                >
                 📅 My Appointments
              </button>

              <button
                onClick={() => {
                  setProfileOpen(false);
                  router.push("/reports");
                }}
                className="block w-full rounded-xl p-3 text-left hover:bg-gray-100"
              >
                📄 Reports
              </button>

              <hr />

              <button
                onClick={handleLogout}
                className="w-full rounded-xl bg-red-500 py-3 text-white font-semibold"
              >
                Logout
              </button>

            </div>

          </div>

        </div>
      )}
    </header>
  );
}
