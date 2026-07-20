import { adminKpis } from "@/data/dentmind-admin";

export function AdminKpiGrid() {
  return (
    <section className="dma-kpi-grid" aria-label="Platform statistics">
      {adminKpis.map((kpi) => (
        <article className={`dma-kpi-card dma-tone-${kpi.tone}`} key={kpi.label}>
          <span>{kpi.label}</span>
          <strong>{kpi.value}</strong>
          <small>{kpi.delta}</small>
        </article>
      ))}
    </section>
  );
}

