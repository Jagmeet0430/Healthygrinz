"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { SiteContent } from "@/lib/content";

const links = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/#doctor", label: "Doctor" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

type HeaderProps = {
  contact: SiteContent["contact"];
};

export function Header({ contact }: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="nav" aria-label="Primary navigation">
        <Link className="brand" href="/" aria-label="Healthy Grins home">
          <Image
            className="brand-logo"
            src="/images/healthy-grins-logo.svg"
            alt="Healthy Grins"
            width={198}
            height={62}
            priority
          />
        </Link>

        <button
          className="nav-toggle"
          type="button"
          aria-controls="nav-links"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Open menu</span>
          <span />
          <span />
          <span />
        </button>

        <div className={`nav-links ${open ? "is-open" : ""}`.trim()} id="nav-links">
          {links.map((link) => (
            <Link href={link.href} key={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <a className="nav-call" href={`tel:${contact.phoneHref}`} onClick={() => setOpen(false)}>
            Call now
          </a>
          <Link className="nav-login" href="/admin" onClick={() => setOpen(false)}>
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
}
