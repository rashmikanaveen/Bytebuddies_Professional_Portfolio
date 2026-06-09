import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ApplicantApplyWorkspace from '@/features/applicant/apply/components/ApplicantApplyWorkspace'
import LoanStatusPill from '@/features/loans/components/LoanStatusPill'
import {
  getLoanDetailFormAnswers,
  loanDetailDocuments,
  loanDetailProofFiles,
} from '@/features/loans/mock/loanDetailFormData'
import { useApplicationsApi } from '@/lib/api/hooks/useApplicationsApi'
import type { ApiApplicationRecord } from '@/lib/api/types'

function LoanDetailPage() {
  const { loanId = '' } = useParams()
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
      setActionMessage('Application approved successfully.')
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

  const prefilledAnswers = getLoanDetailFormAnswers(application)

  return (
    <section className="loan-detail-page-layout">
      <div className="loan-detail-grid">
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
        <article className="surface-card loan-detail-status-card">
          <h2>Status</h2>
          <LoanStatusPill status={application.status} />
          <p>Current application status</p>
          <button
            type="button"
            className="primary-btn loan-detail-approve-btn"
            onClick={handleApprove}
            disabled={isApproving || application.status === 'OFFICER_APPROVED'}
          >
            {application.status === 'OFFICER_APPROVED' ? 'Approved' : 'Approve for Officer'}
          </button>
          {actionMessage ? <p>{actionMessage}</p> : null}
        </article>
        <article className="surface-card">
          <h2>Documents</h2>
          <ul className="dashboard-list">
            {loanDetailDocuments.map((documentName) => (
              <li key={documentName} className="dashboard-list-row">
                <span>{documentName}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>

      <ApplicantApplyWorkspace
        title="Submitted Loan Application"
        description={`Application #${application.application_id} is shown below using the same field structure as the applicant submission form. Values are prefilled from a frontend hardcoded snapshot until full response data is available.`}
        initialAnswers={prefilledAnswers}
        readOnly
        readOnlyProofFiles={loanDetailProofFiles}
      />
    </section>
  )
}

export default LoanDetailPage
