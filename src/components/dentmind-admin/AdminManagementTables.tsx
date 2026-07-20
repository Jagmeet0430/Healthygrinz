import { adminAiOperations, adminClinics } from "@/data/dentmind-admin";

export function AdminManagementTables() {
  return (
    <section className="dma-table-grid">
      <article className="dma-panel dma-table-panel">
        <div className="dma-panel-head">
          <div>
            <p className="dma-kicker">Clinic management</p>
            <h2>Clinics requiring attention</h2>
          </div>
          <button type="button">Export CSV</button>
        </div>
        <div className="dma-table-scroll">
          <table>
            <thead>
              <tr>
                <th>Clinic</th>
                <th>Plan</th>
                <th>Doctors</th>
                <th>Patients</th>
                <th>Revenue</th>
                <th>AI usage</th>
                <th>Last login</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {adminClinics.map((clinic) => (
                <tr key={clinic.name}>
                  <td>{clinic.name}</td>
                  <td>{clinic.plan}</td>
                  <td>{clinic.doctors}</td>
                  <td>{clinic.patients}</td>
                  <td>{clinic.revenue}</td>
                  <td>{clinic.aiUsage}</td>
                  <td>{clinic.lastLogin}</td>
                  <td>
                    <span>{clinic.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <article className="dma-panel dma-table-panel">
        <div className="dma-panel-head">
          <div>
            <p className="dma-kicker">AI management</p>
            <h2>Model operations</h2>
          </div>
          <button type="button">Tune models</button>
        </div>
        <div className="dma-ai-ops-list">
          {adminAiOperations.map((operation) => (
            <div key={operation.feature}>
              <strong>{operation.feature}</strong>
              <span>{operation.provider}</span>
              <span>{operation.latency}</span>
              <span>{operation.accuracy}</span>
              <em>{operation.status}</em>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

