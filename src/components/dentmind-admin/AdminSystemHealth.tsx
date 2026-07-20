import { adminHealth } from "@/data/dentmind-admin";

export function AdminSystemHealth() {
  return (
    <section className="dma-panel dma-health-panel">
      <div className="dma-panel-head">
        <div>
          <p className="dma-kicker">System monitoring</p>
          <h2>Infrastructure health</h2>
        </div>
        <span className="dma-live-pill">6 services</span>
      </div>
      <div className="dma-health-grid">
        {adminHealth.map((item) => (
          <article className={item.status === "Degraded" ? "is-warning" : ""} key={item.service}>
            <span>{item.service}</span>
            <strong>{item.metric}</strong>
            <small>{item.detail}</small>
            <em>{item.status}</em>
          </article>
        ))}
      </div>
    </section>
  );
}

