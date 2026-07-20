import { adminCopilotSuggestions, adminNotifications } from "@/data/dentmind-admin";

export function AdminCopilot() {
  return (
    <aside className="dma-panel dma-copilot">
      <div className="dma-panel-head">
        <div>
          <p className="dma-kicker">Admin AI copilot</p>
          <h2>Ask the business anything.</h2>
        </div>
        <span className="dma-live-pill">Live</span>
      </div>

      <div className="dma-copilot-thread">
        <article>
          <span>Copilot insight</span>
          <p>
            Pearl Family Dental shows activation risk: low AI usage, delayed onboarding, and two unresolved support
            tickets. Recommend success outreach within 24 hours.
          </p>
        </article>
      </div>

      <div className="dma-suggestion-grid">
        {adminCopilotSuggestions.map((suggestion) => (
          <button type="button" key={suggestion}>
            {suggestion}
          </button>
        ))}
      </div>

      <div className="dma-notification-list">
        <strong>Realtime alerts</strong>
        {adminNotifications.map((notification) => (
          <p key={notification}>{notification}</p>
        ))}
      </div>
    </aside>
  );
}

