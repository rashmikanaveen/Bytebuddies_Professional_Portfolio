import { useEffect, useState } from 'react'
import LoansTable from '@/features/loans/components/LoansTable'
import { useApplicationsApi } from '@/lib/api/hooks/useApplicationsApi'
import type { ApiApplicationRecord } from '@/lib/api/types'

function LoansListPlaceholder() {
  const { listApplications, loading, error } = useApplicationsApi()
  const [applications, setApplications] = useState<ApiApplicationRecord[]>([])
  const [isInitialLoading, setIsInitialLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const loadApplications = async () => {
      try {
        const records = await listApplications()

        if (isMounted) {
          setApplications(records)
        }
      } catch {
        // The hook already stores the error state for display.
      } finally {
        if (isMounted) {
          setIsInitialLoading(false)
        }
      }
    }

    void loadApplications()

    return () => {
      isMounted = false
    }
  }, [listApplications])

  if ((loading || isInitialLoading) && applications.length === 0) {
    return (
      <section className="loan-workspace">
        <div className="surface-card">
          <h2>Applications</h2>
          <p>Loading applications...</p>
        </div>
      </section>
    )
  }

  if (error && applications.length === 0) {
    return (
      <section className="loan-workspace">
        <div className="surface-card">
          <h2>Applications</h2>
          <p>{error}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="loan-workspace">
      <LoansTable loans={applications} />
    </section>
  )
}

export default LoansListPlaceholder
