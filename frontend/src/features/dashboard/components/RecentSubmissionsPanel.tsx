import { recentSubmissions } from '@/features/dashboard/mock/dashboardData'

function RecentSubmissionsPanel() {
  return (
    <article className="surface-card dashboard-panel">
      <h2>Recent Submissions</h2>
      <ul className="dashboard-list">
        {recentSubmissions.map((item) => (
          <li key={item.id} className="dashboard-list-row">
            <div>
              <p className="dashboard-list-title">{item.company}</p>
              <p className="dashboard-list-meta">
                {item.id} · {item.sector}
              </p>
            </div>
            <p className="dashboard-score-pill">{item.score}</p>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default RecentSubmissionsPanel
