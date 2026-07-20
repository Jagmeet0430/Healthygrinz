import type { SiteContent } from "@/lib/content";

type TrustBarProps = {
  items: SiteContent["trustItems"];
};

export function TrustBar({ items }: TrustBarProps) {
  return (
    <section className="notice-band" aria-label="Clinic highlights">
      {items.map((item) => (
        <div className="notice-item" key={item.title}>
          <strong>{item.title}</strong>
          <span>{item.text}</span>
        </div>
      ))}
    </section>
  );
}
