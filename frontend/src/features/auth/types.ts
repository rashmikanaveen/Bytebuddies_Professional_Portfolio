export type UserRole = 'loan_officer' | 'manager' | 'admin' | 'applicant'

export type LoginFormValues = {
  email: string
  password: string
  role: UserRole
}

export type LoginFormErrors = Partial<Record<keyof LoginFormValues, string>>
