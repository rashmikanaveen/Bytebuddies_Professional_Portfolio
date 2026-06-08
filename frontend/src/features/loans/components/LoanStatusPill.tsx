type LoanStatusPillProps = {
  status: string
}

function getStatusStyle(status: string) {
  switch (status) {
    case 'SUBMITTED':
      return {
        color: '#4b5563',
        backgroundColor: '#f3f4f6',
        borderColor: '#d1d5db',
      }
    case 'OFFICER_APPROVED':
      return {
        color: '#2e7d32',
        backgroundColor: '#e8f5e9',
        borderColor: '#81c784',
      }
    case 'PENDING_REVIEW':
      return {
        color: '#8b5e00',
        backgroundColor: '#fff4cc',
        borderColor: '#f0d36d',
      }
    case 'IN_VERIFICATION':
      return {
        color: '#1d4ed8',
        backgroundColor: '#dbeafe',
        borderColor: '#93c5fd',
      }
    case 'SCORED':
    case 'APPROVED':
      return {
        color: '#047857',
        backgroundColor: '#d1fae5',
        borderColor: '#6ee7b7',
      }
    case 'FLAGGED':
      return {
        color: '#b91c1c',
        backgroundColor: '#fee2e2',
        borderColor: '#fca5a5',
      }
    default:
      return {
        color: '#374151',
        backgroundColor: '#e5e7eb',
        borderColor: '#d1d5db',
      }
  }
}

function LoanStatusPill({ status }: LoanStatusPillProps) {
  return (
    <span
      className={`loan-status-pill loan-status-${status}`}
      style={getStatusStyle(status)}
    >
      {status}
    </span>
  )
}

export default LoanStatusPill
