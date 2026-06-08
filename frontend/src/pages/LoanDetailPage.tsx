import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useApplicationsApi } from '@/lib/api/hooks/useApplicationsApi'
import type { ApiApplicationRecord } from '@/lib/api/types'

const fallbackDocuments = [
  'Energy Audit 2025.pdf',
  'ESG Policy.pdf',
  'Carbon Disclosure.xlsx',
]

function LoanDetailPage() {
  const { loanId = '' } = useParams()
  const { getApplication, loading, error } = useApplicationsApi()
  const [application, setApplication] = useState<ApiApplicationRecord | null>(null)
  const [isInitialLoading, setIsInitialLoading] = useState(true)

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
        <p>{application.status}</p>
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
