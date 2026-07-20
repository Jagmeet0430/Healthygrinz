import { getWhatsappUrl, type SiteContent } from "@/lib/content";

type MobileBottomBarProps = {
  contact: SiteContent["contact"];
};

export function MobileBottomBar({ contact }: MobileBottomBarProps) {
  return (
    <div className="mobile-bottom-bar" aria-label="Quick contact actions">
      <a href={`tel:${contact.phoneHref}`}>Call</a>
      <a
        href={getWhatsappUrl(contact.phoneHref)}
        target="_blank"
        rel="noreferrer"
      >
        WhatsApp
      </a>
      <a href="/booking">Book</a>
    </div>
  );
}
