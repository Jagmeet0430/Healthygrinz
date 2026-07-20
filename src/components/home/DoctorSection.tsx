import type { SiteContent } from "@/lib/content";

type DoctorSectionProps = {
  doctor: SiteContent["doctor"];
};

export function DoctorSection({ doctor }: DoctorSectionProps) {
  return (
    <section className="doctor-band" id="doctor" aria-labelledby="doctor-title">
      <div className="doctor-copy">
        <p className="section-kicker">Our doctor</p>
        <h2 id="doctor-title">{doctor.name}</h2>
        <p>{doctor.bio}</p>
        <p>{doctor.note}</p>
      </div>
      <div className="doctor-panel" aria-label="Clinic values">
        {doctor.stats.map((stat) => (
          <div key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
