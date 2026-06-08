export type UserRole = 'loan_officer' | 'manager' | 'admin' | 'applicant'

export type LoginFormValues = {
  email: string
  password: string
  role: UserRole
}

export type RegisterFormValues = {
  name: string
  email: string
  password: string
  role: UserRole
  profileImageUrl?: string
}

export type SessionUser = {
  name: string
  email: string
  role: UserRole
  profileImageUrl?: string
}

export type LoginFormErrors = Partial<Record<keyof LoginFormValues, string>>

export type RegisterFormErrors = Partial<
  Record<keyof RegisterFormValues, string>
>
