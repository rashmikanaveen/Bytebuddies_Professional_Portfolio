import type { UserRole } from '@/features/auth/types'

const AUTH_ROLE_KEY = 'greenflow.auth.role'

export function setSessionRole(role: UserRole) {
  localStorage.setItem(AUTH_ROLE_KEY, role)
}

export function getSessionRole(): UserRole | null {
  const value = localStorage.getItem(AUTH_ROLE_KEY)

  if (
    value === 'loan_officer' ||
    value === 'manager' ||
    value === 'admin' ||
    value === 'applicant'
  ) {
    return value
  }

  return null
}

export function clearSessionRole() {
  localStorage.removeItem(AUTH_ROLE_KEY)
}

export function getDefaultRouteForRole(role: UserRole): string {
  if (role === 'loan_officer') return '/officer/dashboard'
  if (role === 'manager') return '/officer/reports'
  if (role === 'admin') return '/officer/admin/weights'
  return '/applicant/status'
}
