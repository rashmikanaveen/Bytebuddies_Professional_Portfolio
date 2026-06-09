import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LoanStatusPill from '@/features/loans/components/LoanStatusPill'
import { useApplicationsApi } from '@/lib/api/hooks/useApplicationsApi'
import type { ApiApplicationRecord } from '@/lib/api/types'

const fallbackDocuments = [
  'Energy Audit 2025.pdf',
  'ESG Policy.pdf',
  'Carbon Disclosure.xlsx',
]

const approvedStatuses = new Set(['OFFICER_APPROVED', 'APPROVED'])

function LoanDetailPage() {
  const { loanId = '' } = useParams()
  const navigate = useNavigate()
  const { getApplication, approveApplication, loading, error } = useApplicationsApi()
  const [application, setApplication] = useState<ApiApplicationRecord | null>(null)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [isApproving, setIsApproving] = useState(false)
  const [actionMessage, setActionMessage] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadApplication = async () => {
      const applicationId = Number(loanId)

      if (!Number.isInteger(applicationId)) {
        if (isMounted) {
          setIsInitialLoading(false)
        }
        return
      }

      try {
        const record = await getApplication(applicationId)

        if (isMounted) {
          setApplication(record)
        }
      } catch {
        // The hook already stores the error state for display.
      } finally {
        if (isMounted) {
          setIsInitialLoading(false)
        }
      }
    }

    void loadApplication()

    return () => {
      isMounted = false
    }
  }, [getApplication, loanId])

  const navigateToScoring = (approvedApplication: ApiApplicationRecord) => {
    navigate('/officer/scoring', {
      state: {
        approvedApplication,
        scoringDraft: {
          applicationId: approvedApplication.application_id,
          businessName: approvedApplication.business_name,
          status: 'READY_FOR_SCORING',
          estimatedGreenScore: 82,
          grade: 'A',
          riskBand: 'Low',
        },
      },
    })
  }

  const handleApprove = async () => {
    if (!application) {
      return
    }

    const confirmed = window.confirm(
      `Approve application #${application.application_id} for ${application.business_name}?`,
    )

    if (!confirmed) {
      return
    }

    setIsApproving(true)
    setActionMessage(null)

    try {
      const updatedApplication = await approveApplication(application.application_id)
      setApplication(updatedApplication)
      setActionMessage('Application approved successfully. Preparing scoring workspace...')
      await new Promise((resolve) => {
        window.setTimeout(resolve, 2000)
      })
      navigateToScoring(updatedApplication)
    } catch {
      // The hook already stores the error state for display.
    } finally {
      setIsApproving(false)
    }
  }

  if ((loading || isInitialLoading) && !application) {
    return (
      <section className="surface-card">
        <h2>Application Detail</h2>
        <p>Loading application...</p>
      </section>
    )
  }

  if (error && !application) {
    return (
      <section className="surface-card">
        <h2>Application Detail</h2>
        <p>{error}</p>
      </section>
    )
  }

  if (!application) {
    return (
      <section className="surface-card">
        <h2>Application Detail</h2>
        <p>No matching application was found for this reference.</p>
      </section>
    )
  }

  const isApprovedApplication = approvedStatuses.has(application.status)

  return (
    <section className="loan-detail-grid">
      <article className="surface-card">
        <h2>Borrower</h2>
        <p>{application.business_name}</p>
        <p className="dashboard-list-meta">User ID: {application.user_id}</p>
      </article>
      <article className="surface-card">
        <h2>Application Profile</h2>
        <p>Application ID: {application.application_id}</p>
        <p>Industry: {application.industry}</p>
        <p>Loan Amount (LKR): {application.loan_amount.toLocaleString()}</p>
      </article>
      <article className="surface-card">
        <h2>Status</h2>
        <LoanStatusPill status={application.status} />
        <p>Current application status</p>
        {isApprovedApplication ? (
          <button
            type="button"
            className="table-link-btn"
            onClick={() => navigateToScoring(application)}
          >
            Open Scoring
          </button>
        ) : (
          <button
            type="button"
            className="table-link-btn"
            onClick={handleApprove}
            disabled={isApproving || application.status !== 'SUBMITTED'}
          >
            {isApproving ? (
              <span className="approval-loading-label">
                <span className="approval-spinner" aria-hidden="true" />
                Approving
              </span>
            ) : (
              'Approve for Officer'
            )}
          </button>
        )}
        {actionMessage ? <p>{actionMessage}</p> : null}
      </article>
      <article className="surface-card">
        <h2>Documents</h2>
        <ul className="dashboard-list">
          {fallbackDocuments.map((documentName) => (
            <li key={documentName} className="dashboard-list-row">
              <span>{documentName}</span>
            </li>
          ))}
        </ul>
      </article>
    </section>
  )
}

export default LoanDetailPage
