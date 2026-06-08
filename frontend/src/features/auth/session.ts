import type { SessionUser, UserRole } from '@/features/auth/types'

const AUTH_ROLE_KEY = 'greenflow.auth.role'
const AUTH_USER_KEY = 'greenflow.auth.user'

export function setSessionRole(role: UserRole) {
  localStorage.setItem(AUTH_ROLE_KEY, role)
}

export function setSessionUser(user: SessionUser) {
  setSessionRole(user.role)
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
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

export function getSessionUser(): SessionUser | null {
  const raw = localStorage.getItem(AUTH_USER_KEY)

  if (!raw) {
    return null
  }

  try {
    const parsed = JSON.parse(raw) as Partial<SessionUser>

    if (
      !parsed.name ||
      !parsed.email ||
      !parsed.role ||
      (parsed.role !== 'loan_officer' &&
        parsed.role !== 'manager' &&
        parsed.role !== 'admin' &&
        parsed.role !== 'applicant')
    ) {
      return null
    }

    return {
      name: parsed.name,
      email: parsed.email,
      role: parsed.role,
      profileImageUrl: parsed.profileImageUrl,
    }
  } catch {
    return null
  }
}

export function clearSessionUser() {
  localStorage.removeItem(AUTH_USER_KEY)
  clearSessionRole()
}

export function getDefaultRouteForRole(role: UserRole): string {
  if (role === 'loan_officer') return '/officer/dashboard'
  if (role === 'manager') return '/officer/reports'
  if (role === 'admin') return '/officer/admin/weights'
  return '/applicant/status'
}
