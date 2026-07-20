import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileBottomBar } from "@/components/layout/MobileBottomBar";
import { AIWidget } from "@/components/ai/AIWidget";
import { getSiteContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function CustomerLayout({ children }: { children: React.ReactNode }) {
  const content = await getSiteContent();

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header contact={content.contact} />
      <main id="main">{children}</main>
      <Footer />
      <AIWidget />
      <MobileBottomBar contact={content.contact} />
    </>
  );
}
