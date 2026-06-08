import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { getDefaultRouteForRole, getSessionRole } from '@/features/auth/session'
import type { UserRole } from '@/features/auth/types'

type RequireRoleProps = {
  allowedRoles: UserRole[]
  children: ReactNode
}

function RequireRole({ allowedRoles, children }: RequireRoleProps) {
  const role = getSessionRole()

  if (!role) {
    return <Navigate to="/login" replace />
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to={getDefaultRouteForRole(role)} replace />
  }

  return <>{children}</>
}

export default RequireRole
