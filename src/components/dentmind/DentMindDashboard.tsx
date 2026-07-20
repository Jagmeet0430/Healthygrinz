import { aiSignals, dashboardNav, patientRows } from "@/data/dentmind";

export function DentMindDashboard() {
  return (
    <main className="dm-app-shell">
      <aside className="dm-sidebar">
        <div className="dm-brand dm-dashboard-brand">
          <span className="dm-brand-mark">D</span>
          <span>
            <strong>DentMind AI</strong>
            <small>Krishna Nagar Clinic</small>
          </span>
        </div>
        <nav aria-label="DentMind dashboard navigation">
          {dashboardNav.map((item) => (
            <a className={item === "Dashboard" ? "is-active" : ""} href={`#${item.toLowerCase().replaceAll(" ", "-")}`} key={item}>
              {item}
            </a>
          ))}
        </nav>
      </aside>

      <section className="dm-workspace">
        <header className="dm-topbar">
          <div>
            <p className="dm-kicker">AI command center</p>
            <h1>Good morning, Dr. Lisha.</h1>
          </div>
          <label className="dm-command">
            <span>Search</span>
            <input placeholder="Search patients, records, X-rays, protocols..." />
          </label>
        </header>

        <div className="dm-dashboard-grid">
          <section className="dm-dashboard-card dm-hero-card">
            <div>
              <p className="dm-kicker">Today</p>
              <h2>12 appointments, 3 AI-ready reports, 2 high-priority reviews.</h2>
              <p>Review clinical suggestions before chair time and approve notes after each consultation.</p>
            </div>
            <div className="dm-orbit" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </section>

          <section className="dm-dashboard-card">
            <h2>AI signals</h2>
            <div className="dm-signal-grid">
              {aiSignals.map((signal) => (
                <article className={`dm-signal ${signal.tone}`} key={signal.label}>
                  <strong>{signal.value}</strong>
                  <span>{signal.label}</span>
                </article>
              ))}
            </div>
          </section>

          <section className="dm-dashboard-card dm-patient-table">
            <div className="dm-card-head">
              <h2>Priority patients</h2>
              <button type="button">Filter</button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Concern</th>
                  <th>Risk</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {patientRows.map((patient) => (
                  <tr key={patient.name}>
                    <td>{patient.name}</td>
                    <td>{patient.concern}</td>
                    <td>
                      <span className={`dm-risk dm-risk-${patient.risk.toLowerCase()}`}>{patient.risk}</span>
                    </td>
                    <td>{patient.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="dm-dashboard-card dm-xray-review">
            <div className="dm-card-head">
              <h2>X-ray analysis</h2>
              <span>AI suggestion only</span>
            </div>
            <div className="dm-xray-panel">
              <div className="dm-xray-large">
                <span className="dm-box dm-box-one" />
                <span className="dm-box dm-box-two" />
              </div>
              <ul>
                <li>Possible distal caries indicator - 72%</li>
                <li>Bone level asymmetry - 64%</li>
                <li>Verify with clinical exam and original radiograph</li>
              </ul>
            </div>
          </section>

          <section className="dm-dashboard-card dm-rag-card">
            <h2>RAG answer with citations</h2>
            <p>Question: What protocol should we follow for severe gum bleeding?</p>
            <div className="dm-source-chunk">
              <strong>Clinic SOP - Periodontal Triage, p.4</strong>
              <span>Probe depth, bleeding index, plaque score, radiograph review, and medical history verification.</span>
            </div>
            <div className="dm-source-chunk">
              <strong>Research Notes - Gingival Bleeding, p.12</strong>
              <span>Assess medication history, pregnancy status, systemic disease indicators, and oral hygiene pattern.</span>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

