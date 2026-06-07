export type LoanStatus =
  | 'PENDING_REVIEW'
  | 'IN_VERIFICATION'
  | 'SCORED'
  | 'APPROVED'
  | 'FLAGGED'

export type LoanRecord = {
  id: string
  borrower: string
  sector: string
  amountLkr: number
  status: LoanStatus
  updatedAt: string
  greenScore: number
  verificationFlags: number
  documents: string[]
}
