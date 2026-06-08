import type { LoanStatus } from '@/features/loans/types'
import AppSelect from '@/components/ui/AppSelect'

type LoanFiltersProps = {
  search: string
  status: LoanStatus | 'ALL'
  sortKey: 'updatedAt' | 'amountLkr' | 'greenScore'
  statusFilterOptions: Array<LoanStatus | 'ALL'>
  onSearchChange: (value: string) => void
  onStatusChange: (value: LoanStatus | 'ALL') => void
  onSortChange: (value: 'updatedAt' | 'amountLkr' | 'greenScore') => void
}

function LoanFilters({
  search,
  status,
  sortKey,
  statusFilterOptions,
  onSearchChange,
  onStatusChange,
  onSortChange,
}: LoanFiltersProps) {
  return (
    <div className="loan-filters">
      <input
        className="loan-filter-input"
        type="search"
        value={search}
        placeholder="Search by borrower, loan id, sector"
        onChange={(event) => onSearchChange(event.target.value)}
      />

      <AppSelect
        className="loan-filter-input"
        value={status}
        onChange={(event) =>
          onStatusChange(event.target.value as LoanStatus | 'ALL')
        }
      >
        {statusFilterOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </AppSelect>

      <AppSelect
        className="loan-filter-input"
        value={sortKey}
        onChange={(event) =>
          onSortChange(
            event.target.value as 'updatedAt' | 'amountLkr' | 'greenScore',
          )
        }
      >
        <option value="updatedAt">Sort by Updated Date</option>
        <option value="amountLkr">Sort by Loan Amount</option>
        <option value="greenScore">Sort by Green Score</option>
      </AppSelect>
    </div>
  )
}

export default LoanFilters
