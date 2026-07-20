import { promises as fs } from "fs";
import path from "path";

export type Treatment = {
  slug: string;
  title: string;
  description: string;
  goodFor: string;
  details: string;
};

export type SiteContent = {
  hero: {
    location: string;
    title: string;
    copy: string;
    primaryCta: string;
    secondaryCta: string;
    facts: Array<{ label: string; value: string }>;
  };
  intro: {
    kicker: string;
    title: string;
    copy: string;
  };
  trustItems: Array<{ title: string; text: string }>;
  concerns: Array<{ icon: string; title: string; text: string }>;
  servicesSection?: {
    kicker: string;
    title: string;
  };
  treatments: Treatment[];
  doctor: {
    name: string;
    bio: string;
    note: string;
    stats: Array<{ value: string; label: string }>;
  };
  reviews: Array<{ name: string; quote: string }>;
  faqs: Array<{ question: string; answer: string }>;
  gallery: string[];
  contact: {
    title: string;
    addressLines: string[];
    phone: string;
    phoneHref: string;
    email: string;
    hours: string;
    mapsUrl: string;
  };
};

const contentPath = path.join(process.cwd(), "src", "data", "site-content.json");

export async function getSiteContent(): Promise<SiteContent> {
  const raw = await fs.readFile(contentPath, "utf8");
  return JSON.parse(raw) as SiteContent;
}

export async function saveSiteContent(content: SiteContent) {
  await fs.writeFile(contentPath, `${JSON.stringify(content, null, 2)}\n`, "utf8");
  return content;
}

export function getWhatsappUrl(phoneHref: string) {
  return `https://wa.me/${phoneHref.replace(/[^\d]/g, "")}?text=${encodeURIComponent(
    "Hello Healthy Grins, I want to book a dental appointment.",
  )}`;
}
