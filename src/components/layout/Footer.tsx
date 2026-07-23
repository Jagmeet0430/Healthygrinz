import Image from "next/image";
import Link from "next/link";
import { getSiteContent, getWhatsappUrl } from "@/lib/content";

export async function Footer() {
  const content = await getSiteContent();

  return (
    <footer className="site-footer">
      <div>
        <strong>Site Links</strong>
        <Link href="/">Home</Link>
        <Link href="/#services">Services</Link>
        <Link href="/#doctor">Doctor</Link>
        <Link href="/#reviews">Reviews</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/#contact">Contact</Link>
      </div>
      <div className="footer-links">
        <strong>Clinic Info</strong>
        <span>{content.contact.addressLines.join(", ")}</span>
        <a href={`tel:${content.contact.phoneHref}`}>{content.contact.phone}</a>
        <a href={`mailto:${content.contact.email}`}>{content.contact.email}</a>
      </div>
      <div className="footer-brand">
        <Image src="/images/healthy-grins-logo.svg.jpeg" alt="Healthy Grins" width={180} height={56} />
        <span>Follow us for smile care tips and clinic updates.</span>
        <div className="social-links">
          <a href={getWhatsappUrl(content.contact.phoneHref)} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
            <span aria-hidden="true">W</span>
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Open Instagram">
            <span aria-hidden="true">I</span>
          </a>
        </div>
      </div>
      <p className="footer-bottom">&copy; {new Date().getFullYear()} Healthy Grins Dental Clinic. All rights reserved.</p>
    </footer>
  );
}
