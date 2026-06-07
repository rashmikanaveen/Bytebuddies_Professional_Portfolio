import LoanFilters from '@/features/loans/components/LoanFilters'
import LoansTable from '@/features/loans/components/LoansTable'
import { useLoanTableState } from '@/features/loans/hooks/useLoanTableState'
import { officerLoans } from '@/features/loans/mock/loanData'

function LoansListPlaceholder() {
  const {
    search,
    setSearch,
    status,
    setStatus,
    sortKey,
    setSortKey,
    statusFilterOptions,
    filteredLoans,
  } = useLoanTableState(officerLoans)

  return (
    <section className="loan-workspace">
      <LoanFilters
        search={search}
        status={status}
        sortKey={sortKey}
        statusFilterOptions={statusFilterOptions}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onSortChange={setSortKey}
      />
      <LoansTable loans={filteredLoans} />
    </section>
  )
}

export default LoansListPlaceholder
