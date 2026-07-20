import { adminAiCosts, adminChartBars } from "@/data/dentmind-admin";

export function AdminAnalyticsPanel() {
  return (
    <section className="dma-panel dma-analytics-panel">
      <div className="dma-panel-head">
        <div>
          <p className="dma-kicker">Analytics</p>
          <h2>Revenue and AI usage are compounding.</h2>
        </div>
        <select aria-label="Analytics range" defaultValue="30d">
          <option value="7d">7 days</option>
          <option value="30d">30 days</option>
          <option value="90d">90 days</option>
        </select>
      </div>

      <div className="dma-chart" aria-label="Revenue trend chart">
        {adminChartBars.map((height, index) => (
          <span key={`${height}-${index}`} style={{ height: `${height}px` }} />
        ))}
      </div>

      <div className="dma-ai-cost-grid">
        {adminAiCosts.map((item) => (
          <article key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <small>{item.cost} estimated cost</small>
          </article>
        ))}
      </div>
    </section>
  );
}

