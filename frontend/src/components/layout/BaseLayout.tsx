import {
  BarChart3,
  ClipboardList,
  FilePlus2,
  Gauge,
  LayoutDashboard,
  LogOut,
  PanelLeft,
  Sparkles,
  Shield,
} from 'lucide-react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useMemo } from 'react'
import brandLogo from '@/assets/newlogo.svg'
import {
  clearSessionUser,
  getSessionRole,
  getSessionUser,
} from '@/features/auth/session'
import type { UserRole } from '@/features/auth/types'

type AppRole = 'officer' | 'applicant'

type BaseLayoutProps = {
  role: AppRole
}

const officerNavItems = [
  { to: '/officer/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/officer/loans', label: 'Loan Applications', icon: PanelLeft },
  { to: '/officer/scoring', label: 'Green Scoring', icon: Gauge },
]

const managerNavItems = [
  ...officerNavItems,
  { to: '/officer/reports', label: 'Reports', icon: BarChart3 },
]

const adminNavItems = [
  ...managerNavItems,
  { to: '/officer/admin/weights', label: 'Admin Weights', icon: Shield },
]

const applicantNavItems = [
  { to: '/applicant/apply', label: 'Apply for Loan', icon: FilePlus2 },
  { to: '/applicant/status', label: 'Request Status', icon: ClipboardList },
  { to: '/applicant/score', label: 'Green Score', icon: Sparkles },
]

function BaseLayout({ role }: BaseLayoutProps) {
  const isOfficerShell = role === 'officer'
  const navigate = useNavigate()
  const location = useLocation()
  const sessionRole = getSessionRole()
  const sessionUser = getSessionUser()

  const navItems = useMemo(() => {
    if (role === 'applicant') {
      return applicantNavItems
    }

    if (sessionRole === 'admin') {
      return adminNavItems
    }

    if (sessionRole === 'manager') {
      return managerNavItems
    }

    return officerNavItems
  }, [role, sessionRole])

  const pageTitle = useMemo(() => {
    const path = location.pathname

    if (path === '/officer/dashboard') return 'Dashboard'
    if (path === '/officer/loans') return 'Loan Applications'
    if (path.startsWith('/officer/loans/')) return 'Loan Application Detail'
    if (path === '/officer/scoring') return 'Green Scoring'
    if (path.includes('/scoring/submissions/') && path.endsWith('/esg')) {
      return 'ESG Submission'
    }
    if (
      path.includes('/scoring/submissions/') &&
      path.endsWith('/verification')
    ) {
      return 'Verification Panel'
    }
    if (path.includes('/scoring/submissions/') && path.endsWith('/result')) {
      return 'Green Score Result'
    }
    if (path === '/officer/reports') return 'Reports'
    if (path === '/officer/admin/weights') return 'Admin AHP Weights'
    if (path === '/applicant/apply') return 'New Loan Application'
    if (path === '/applicant/status') return 'Application Status'
    if (path === '/applicant/score') return 'Green Score'

    return isOfficerShell
      ? 'Credit Risk and Sustainability'
      : 'Loan Request and ESG Progress'
  }, [isOfficerShell, location.pathname])

  const userDisplayName = sessionUser?.name ?? 'Guest User'

  const roleValue: UserRole =
    sessionUser?.role ?? (isOfficerShell ? 'loan_officer' : 'applicant')

  const roleDisplay =
    roleValue === 'admin'
      ? 'Admin'
      : roleValue === 'manager'
        ? 'Manager'
        : roleValue === 'loan_officer'
          ? 'Loan Officer'
          : 'Applicant'

  const nameParts = userDisplayName.trim().split(/\s+/)
  const initials =
    nameParts.length === 1
      ? nameParts[0].slice(0, 2).toUpperCase()
      : `${nameParts[0][0] ?? ''}${nameParts[1][0] ?? ''}`.toUpperCase()

  useEffect(() => {
    document.title = `${pageTitle} | GreenFlow Engine`
  }, [pageTitle])

  const currentDate = useMemo(
    () =>
      new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(new Date()),
    [],
  )

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <img src={brandLogo} className="brand-logo" alt="GreenFlow Engine" />
          <div>
            <p className="brand-title">Green Scoring</p>
            <p className="brand-subtitle">
              {isOfficerShell ? 'Institutional Console' : 'Applicant Portal'}
            </p>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Primary Navigation">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive ? 'nav-link nav-link-active' : 'nav-link'
              }
            >
              <Icon size={18} aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="logout-btn"
          onClick={() => {
            clearSessionUser()
            navigate('/login', { replace: true })
          }}
        >
          <LogOut size={16} aria-hidden="true" />
          Sign Out
        </button>
      </aside>

      <div className="main-pane">
        <header className="topbar">
          <div>
            <p className="topbar-label">Commercial Bank ESG Platform</p>
            <h1 className="topbar-title">{pageTitle}</h1>
          </div>
          <div className="topbar-right">
            <div className="topbar-date">{currentDate}</div>
            <div className="user-chip">
              <span className="user-avatar" aria-hidden="true">
                {initials}
              </span>
              <div className="user-chip-meta">
                <p className="user-chip-name">{userDisplayName}</p>
                <p className="user-chip-role">{roleDisplay}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default BaseLayout
