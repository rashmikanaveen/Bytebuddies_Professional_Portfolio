import { Link, useLocation } from 'react-router-dom'
import SectionCard from '@/components/ui/SectionCard'

type ScoringLocationState = {
  approvedApplication?: {
    application_id: number
    business_name: string
    industry: string
    loan_amount: number
    status: string
  }
  scoringDraft?: {
    applicationId: number
    businessName: string
    status: string
    estimatedGreenScore: number
    grade: string
    riskBand: string
  }
}

function ScoringWorkspacePlaceholder() {
  const { state } = useLocation()
  const scoringState = state as ScoringLocationState | null
  const application = scoringState?.approvedApplication
  const scoringDraft = scoringState?.scoringDraft

  if (application && scoringDraft) {
    return (
      <section className="scoring-ready-layout">
        <article className="surface-card">
          <p className="eyebrow">Ready for scoring</p>
          <h2>{application.business_name}</h2>
          <p className="dashboard-list-meta">
            Application #{application.application_id} · {application.industry}
          </p>
          <div className="scoring-dummy-grid">
            <div>
              <p className="card-label">Loan Amount</p>
              <p className="card-value">
                LKR {application.loan_amount.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="card-label">Estimated Green Score</p>
              <p className="card-value success">
                {scoringDraft.estimatedGreenScore}
              </p>
            </div>
            <div>
              <p className="card-label">Dummy Grade</p>
              <p className="card-value">{scoringDraft.grade}</p>
            </div>
          </div>
        </article>
        <article className="surface-card">
          <h2>Scoring Brief</h2>
          <ul className="dashboard-list">
            <li className="dashboard-list-row">
              <span>Status</span>
              <strong>{scoringDraft.status}</strong>
            </li>
            <li className="dashboard-list-row">
              <span>Risk Band</span>
              <strong>{scoringDraft.riskBand}</strong>
            </li>
            <li className="dashboard-list-row">
              <span>Data Source</span>
              
            </li>
          </ul>
          <div className="dashboard-actions">
            <Link
              className="secondary-btn"
              to={`/officer/scoring/submissions/${application.application_id}/esg`}
            >
              Open ESG Submission
            </Link>
          </div>
        </article>
      </section>
    )
  }

  return (
    <SectionCard
      title="Green Scoring"
      description="Use scoring routes to access ESG submission, verification, and result workflows."
    />
  )
}

export default ScoringWorkspacePlaceholder
