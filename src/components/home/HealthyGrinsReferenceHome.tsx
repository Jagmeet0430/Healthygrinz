"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Mail, MapPin, Phone, UserCircle, X } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { HamburgerButton } from "@/components/home/mobile-nav/HamburgerButton";
import { MobileMenu, type MobileMenuLink } from "@/components/home/mobile-nav/MobileMenu";

const servicesLeft = [
  {
    title: "Teeth Whitening",
    text: "Teeth whitening is a dental procedure that removes stains and discoloration from your teeth and makes them appear brighter with the help of agents.",
  },
  {
    title: "Tooth Extraction",
    text: "Tooth extraction is a dental procedure that involves the removal of a tooth from its socket in the jawbone, often performed when a tooth is damaged beyond repair or poses a risk to oral health.",
  },
  {
    title: "Dental Cleaning & Polishing",
    text: "The teeth cleaning procedure also known as Oral Prophylaxis, often performed by dentists, is a routine practice that involves the removal of plaque, stains, and tartar from the teeth's surfaces. This procedure not only enhances the aesthetic appeal of a person's smile but also contributes to their oral and systemic health.",
  },
  {
    title: "Root Canal Treatment",
    text: "RCT is a treatment for the infected pulp of a tooth that is intended to result in the elimination of infection and the protection of the decontaminated tooth from future microbial invasion. It is a routine procedure for a deeply carious and a painful tooth in order to save the natural tooth. It involves meticulous cleaning, shaping and sealing of root canals followed by required filling in the decontaminated area.",
  },
];

const servicesRight = [
  {
    title: "Crowns and Bridges",
    text: "Crowns are caps placed over decayed or root canal treated tooth to restore their shape, size, appearance and function. Crowns are also provided for aesthetic purposes. They can be made of porcelain, metal, or combination of both.\n\nBridges are used to replace one or more missing teeth. They consist one or more artificial teeth held in place by Crowns on the adjacent natural teeth.",
  },
  {
    title: "Dental Filling",
    text: "Dental Filling is a procedure used to restore a damaged tooth. The process involves removing the decayed area, cleaning it, and filling the space with a material which include composite resin and Glass ionomers.\n\nFilling help prevent further decay by sealing off area.",
  },
  {
    title: "Children's Hygiene",
    text: "Involves an initial dental hygiene examination to clean and assess teeth for plaque, stain and tartar, followed by education on proper brushing techniques, the role of fluoride, healthy eating habits, and the benefits of professional fluoride treatments or sealants. Also cater the need to treat the Carious milk tooth/teeth with proper habit management and interventional procedures like extraction and root canal treatment.",
  },
  {
    title: "Dentures",
    text: "Removable/fixed complete and partial dentures help replace missing teeth and rehabilitate partially and completely edentulous arch/arches to function and balance.",
  },
];

const testimonials = [
  {
    name: "Manohar Lal",
    quote: "I had very smooth procedure, dr lisha made me feel comfortable.\nDr Lisha show genuine care and give the best advice possible....",
  },
  {
    name: "Healthy Grins patient",
    quote: "The appointment felt calm, clear, and reassuring.",
  },
  {
    name: "Family dental visit",
    quote: "Good experience for a child dental visit. The doctor was patient and explained brushing care clearly.",
  },
];

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Grins Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
];

const mobileNavLinks: MobileMenuLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "/about" },
  { label: "Services", href: "#services" },
  { label: "Treatments", href: "/treatments" },
  { label: "Smile Gallery", href: "/gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Our Doctors", href: "#doctor" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "#contact" },
];

export function HealthyGrinsReferenceHome() {
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [testimonial, setTestimonial] = useState(0);
  const [status, setStatus] = useState("");
  const activeTestimonial = testimonials[testimonial];
  const mapSrc = useMemo(
    () => `https://maps.google.com/maps?q=${encodeURIComponent("Healthy Grins Dental Clinic Krishna Nagar Delhi")}&output=embed`,
    [],
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTestimonial((index) => (index + 1) % testimonials.length);
    }, 5600);
    return () => window.clearInterval(interval);
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const firstName = String(form.get("firstName") || "").trim();
    const lastName = String(form.get("lastName") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const message = String(form.get("message") || "").trim();

    if (!firstName || !lastName || !phone || !message) {
      setStatus("Please fill all required fields.");
      return;
    }

    const text = `Hello Healthy Grins, I am ${firstName} ${lastName}. Phone: ${phone}. Message: ${message}`;
    window.open(`https://wa.me/919821127942?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setStatus("Opening WhatsApp with your message.");
  }

  return (
    <div className="hg-reference-home">
      <header className="hg-ref-header" id="home">
        <Link className="hg-ref-logo" href="#home" aria-label="Healthy Grins home">
          <Image src="/assets/reference/logo-primary-453657.png" alt="Healthy Grins" width={1379} height={913} priority />
        </Link>
        <div className="hg-ref-header-actions">
          <Link href="/login" aria-label="Log in">
            <UserCircle aria-hidden="true" />
            <span>Log In</span>
          </Link>
          <button className="hg-ref-desktop-menu-button" type="button" onClick={() => setDesktopMenuOpen(true)} aria-label="Open navigation menu">
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
          <HamburgerButton expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen(true)} />
        </div>
      </header>

      <nav className={desktopMenuOpen ? "hg-ref-menu hg-ref-desktop-menu is-open" : "hg-ref-menu hg-ref-desktop-menu"} aria-label="Homepage navigation">
        <button type="button" onClick={() => setDesktopMenuOpen(false)} aria-label="Close navigation menu">
          <X aria-hidden="true" />
        </button>
        {navLinks.map((link) => (
          <Link key={link.label} href={link.href} onClick={() => setDesktopMenuOpen(false)}>
            {link.label}
          </Link>
        ))}
      </nav>

      <MobileMenu open={mobileMenuOpen} links={mobileNavLinks} onClose={() => setMobileMenuOpen(false)} />

      <section className="hg-ref-hero" aria-labelledby="hg-ref-title">
        <Image src="/images/healthy-grins-hero-hd.png" alt="Smiling Healthy Grins patient" fill priority sizes="100vw" />
        <div className="hg-ref-hero-copy">
          <h1 id="hg-ref-title">
            <span className="hg-ref-title-main">HEALTHY GRINS</span>
            <span className="hg-ref-title-sub">Dental Clinic</span>
          </h1>
          <p>Crafting Radiant Smiles with Care</p>
          <a className="hg-ref-button" href="#contact-form">Book Now</a>
        </div>
        <div className="hg-ref-mobile-hero-image">
          <Image src="/assets/reference/hero-smile-mobile-hd.png" alt="Smiling Healthy Grins patient" fill priority sizes="100vw" />
          <a className="hg-ref-mobile-book" href="#contact-form">Book Now</a>
        </div>
      </section>

      <section className="hg-ref-services" id="services" aria-labelledby="hg-services-title">
        <h2 id="hg-services-title">Our<br />Services</h2>
        <div className="hg-ref-orange-panel" aria-hidden="true" />
        <div className="hg-ref-services-card">
          <div>
            {servicesLeft.map((service) => (
              <article key={service.title}>
                <h3>{service.title}</h3>
                {service.text.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </article>
            ))}
          </div>
          <div>
            {servicesRight.map((service) => (
              <article key={service.title}>
                <h3>{service.title}</h3>
                {service.text.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </article>
            ))}
          </div>
          <a className="hg-ref-button hg-ref-appointment" href="#contact-form">Make an Appointement</a>
        </div>
      </section>

      <section className="hg-ref-doctor" id="doctor" aria-labelledby="hg-doctor-title">
        <h2 id="hg-doctor-title">Our Doctor</h2>
        <div className="hg-ref-doctor-card">
          <Image src="/assets/reference/doctor-reference.png" alt="Dr. Lisha" width={304} height={248} />
          <div>
            <h3>Dr. Lisha</h3>
            <p className="hg-ref-doctor-role">Dental Surgeon, BDS</p>
            <p>
              She has Completed her Bachelors in Dental Surgery from Sudha Rustagi Dental College, Faridabad (Haryana) and is having an Experience of over 6years in providing high quality Dental Care and Aesthetics treatments.
            </p>
          </div>
          <Link className="hg-ref-button" href="/about">More About Us</Link>
        </div>
      </section>

      <section className="hg-ref-testimonials" id="testimonials" aria-labelledby="hg-testimonials-title">
        <h2 id="hg-testimonials-title">Patients<br />Recommending</h2>
        <div className="hg-ref-purple-panel" aria-hidden="true" />
        <article className="hg-ref-testimonial-card">
          <h3>{activeTestimonial.name}</h3>
          {activeTestimonial.quote.split("\n").map((line) => <p key={line}>{line}</p>)}
          <div className="hg-ref-dots" aria-label="Choose testimonial">
            {testimonials.map((item, index) => (
              <button
                key={item.name}
                type="button"
                className={index === testimonial ? "is-active" : ""}
                onClick={() => setTestimonial(index)}
                aria-label={`Show testimonial from ${item.name}`}
                aria-current={index === testimonial}
              />
            ))}
          </div>
        </article>
      </section>

      <section className="hg-ref-contact-wrap" id="contact" aria-labelledby="hg-contact-title">
        <div className="hg-ref-contact-shell">
          <div className="hg-ref-contact-panel">
            <div className="hg-ref-contact-copy">
              <h2 id="hg-contact-title">Contact Us</h2>
              <address>
                <p><MapPin aria-hidden="true" /> <span>F-15/10 Shop No.6,<br />Lala Hans Raj Mahajan Road,<br />Krishna Nagar, Delhi-110051</span></p>
                <p><Mail aria-hidden="true" /> <a href="mailto:healthygrinsbylisha@gmail.com">healthygrinsbylisha@gmail.com</a></p>
                <p><Phone aria-hidden="true" /> <a href="tel:+919821127942">+91 9821127942</a></p>
                <p><FaWhatsapp aria-hidden="true" /> <a href="https://wa.me/919821127942" target="_blank" rel="noreferrer">Chat with Us</a></p>
              </address>
            </div>

            <form className="hg-ref-contact-form" id="contact-form" onSubmit={handleSubmit}>
              <h3>Contact Form</h3>
              <label htmlFor="firstName">First Name *</label>
              <input id="firstName" name="firstName" required />
              <label htmlFor="lastName">Last Name *</label>
              <input id="lastName" name="lastName" required />
              <label htmlFor="phone">Phone *</label>
              <input id="phone" name="phone" required inputMode="tel" />
              <label htmlFor="message">Your Message</label>
              <textarea id="message" name="message" required />
              <button type="submit">Submit</button>
              <p aria-live="polite">{status}</p>
            </form>
          </div>

          <div className="hg-ref-map-panel">
            <iframe
              title="Healthy Grins Dental Clinic map"
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <footer className="hg-ref-footer">
        <div className="hg-ref-footer-main">
          <nav aria-label="Footer site links">
            <h2>Site Links</h2>
            <Link href="#home">Home</Link>
            <Link href="/gallery">Grins Gallery</Link>
            <Link href="/about">About</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="#contact">Contact</Link>
            <Link href="/blog">Blog</Link>
          </nav>
          <div>
            <h2>Healthy Grins<br />Dental Clinic</h2>
            <h3>Clinic Hours</h3>
            <p>Mon-Sat: <span>10am to 02pm</span></p>
            <p><span>05pm to 08pm</span></p>
            <p>Sun: <span>By Appointment Only</span></p>
            <a href="tel:+919821127942"><Phone aria-hidden="true" /> +91 9821127942</a>
            <a href="https://wa.me/919821127942" target="_blank" rel="noreferrer"><FaWhatsapp aria-hidden="true" /> Chat with us</a>
          </div>
          <div>
            <Image src="/assets/reference/logo-primary-453657.png" alt="Healthy Grins Dental Clinic" width={1379} height={913} />
            <div className="hg-ref-socials">
              <span aria-label="Facebook"><FaFacebookF aria-hidden="true" /></span>
              <span aria-label="Twitter X"><FaXTwitter aria-hidden="true" /></span>
              <span aria-label="LinkedIn"><FaLinkedinIn aria-hidden="true" /></span>
              <span aria-label="Instagram"><FaInstagram aria-hidden="true" /></span>
            </div>
          </div>
        </div>
        <div className="hg-ref-copyright">© 2025 by Healthy Grins. Powered and secured by Healthy Grins.</div>
      </footer>
    </div>
  );
}
