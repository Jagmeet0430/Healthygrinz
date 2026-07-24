"use client";

import Image from "next/image";
import { CalendarCheck, X } from "lucide-react";
import { memo, useEffect, useRef, useState } from "react";
import { MobileNavItem } from "./MobileNavItem";

export type MobileMenuLink = {
  href: string;
  label: string;
  primary?: boolean;
};

type MobileMenuProps = {
  open: boolean;
  links: MobileMenuLink[];
  onClose: () => void;
};

const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function MobileMenuComponent({ open, links, onClose }: MobileMenuProps) {
  const [mounted, setMounted] = useState(open);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      setMounted(true);
      return undefined;
    }

    const timeout = window.setTimeout(() => setMounted(false), 300);
    return () => window.clearTimeout(timeout);
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 40);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector) || []);
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [onClose, open]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[130] md:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className={`absolute inset-0 bg-[#17101F]/55 backdrop-blur-[2px] transition-opacity duration-300 ease-in-out ${open ? "opacity-100" : "opacity-0"}`}
        aria-hidden="true"
      />

      <div
        aria-modal="true"
        className={`absolute right-0 top-0 flex h-full w-[min(92vw,430px)] max-w-[430px] flex-col rounded-l-2xl bg-white shadow-2xl shadow-black/25 transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}
        id="healthy-grins-mobile-menu"
        ref={dialogRef}
        role="dialog"
      >
        <div className="flex items-start justify-between border-b border-[#D8D0E8]/70 px-6 py-6">
          <div>
            <Image src="/assets/reference/logo-primary-453657.png" alt="Healthy Grins Dental Clinic" width={1379} height={913} className="h-auto w-32" />
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.24em] text-[#4B3F72]/70">Dental Clinic</p>
          </div>
          <button
            aria-label="Close mobile navigation"
            className="grid h-12 w-12 place-items-center rounded-2xl bg-[#F6F4FA] text-[#4B3F72] shadow-sm transition-colors duration-200 ease-in-out hover:bg-[#D8D0E8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4B3F72]"
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
          >
            <X aria-hidden="true" className="h-7 w-7" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-2 overflow-y-auto px-5 py-6" aria-label="Mobile navigation">
          {links.map((link) => (
            <MobileNavItem key={link.label} href={link.href} label={link.label} primary={link.primary} onNavigate={onClose} />
          ))}
        </nav>

        <div className="border-t border-[#D8D0E8]/70 bg-[#F6F4FA] px-6 py-5">
          <a
            className="flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-[#4B3F72] px-5 text-base font-bold text-white shadow-lg shadow-[#4B3F72]/20 transition-colors duration-200 ease-in-out hover:bg-[#453657] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4B3F72]"
            href="#contact-form"
            onClick={onClose}
          >
            <CalendarCheck aria-hidden="true" className="h-5 w-5" />
            Book Appointment
          </a>
        </div>
      </div>
    </div>
  );
}

export const MobileMenu = memo(MobileMenuComponent);
