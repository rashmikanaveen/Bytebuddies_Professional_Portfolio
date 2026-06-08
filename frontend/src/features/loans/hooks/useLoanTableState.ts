import { useMemo, useState } from 'react'
import type { LoanRecord, LoanStatus } from '@/features/loans/types'

type SortKey = 'updatedAt' | 'amountLkr' | 'greenScore'

const statusFilterOptions: Array<LoanStatus | 'ALL'> = [
  'ALL',
  'PENDING_REVIEW',
  'IN_VERIFICATION',
  'SCORED',
  'APPROVED',
  'FLAGGED',
]

export function useLoanTableState(loans: LoanRecord[]) {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<LoanStatus | 'ALL'>('ALL')
  const [sortKey, setSortKey] = useState<SortKey>('updatedAt')

  const filteredLoans = useMemo(() => {
    const bySearch = loans.filter((loan) => {
      const query = search.trim().toLowerCase()
      if (!query) {
        return true
      }

      return (
        loan.borrower.toLowerCase().includes(query) ||
        loan.id.toLowerCase().includes(query) ||
        loan.sector.toLowerCase().includes(query)
      )
    })

    const byStatus =
      status === 'ALL'
        ? bySearch
        : bySearch.filter((loan) => loan.status === status)

    return [...byStatus].sort((a, b) => {
      if (sortKey === 'updatedAt') {
        return b.updatedAt.localeCompare(a.updatedAt)
      }

      return b[sortKey] - a[sortKey]
    })
  }, [loans, search, status, sortKey])

  return {
    search,
    setSearch,
    status,
    setStatus,
    sortKey,
    setSortKey,
    statusFilterOptions,
    filteredLoans,
  }
}
