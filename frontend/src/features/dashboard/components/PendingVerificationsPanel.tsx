import { pendingVerifications } from '@/features/dashboard/mock/dashboardData'

function PendingVerificationsPanel() {
  return (
    <article className="surface-card dashboard-panel">
      <h2>Pending Verifications</h2>
      <ul className="dashboard-list">
        {pendingVerifications.map((item) => (
          <li key={item.id} className="dashboard-list-row">
            <div>
              <p className="dashboard-list-title">{item.borrower}</p>
              <p className="dashboard-list-meta">{item.id}</p>
            </div>
            <div className="dashboard-list-right">
              <span>{item.fields} fields</span>
              <span>{item.due}</span>
            </div>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default PendingVerificationsPanel
