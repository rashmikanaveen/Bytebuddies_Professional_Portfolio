import type { LoanRecord } from '@/features/loans/types'

type DocumentsSectionProps = {
  loan: LoanRecord
}

function DocumentsSection({ loan }: DocumentsSectionProps) {
  return (
    <article className="surface-card">
      <h2>Documents</h2>
      <ul className="dashboard-list">
        {loan.documents.map((documentName) => (
          <li key={documentName} className="dashboard-list-row">
            <span>{documentName}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default DocumentsSection
