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
  UserCircle2,
} from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { useMemo } from 'react'

type AppRole = 'officer' | 'applicant'

type BaseLayoutProps = {
  role: AppRole
}

const officerNavItems = [
  { to: '/officer/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/officer/loans', label: 'Loan Applications', icon: PanelLeft },
  { to: '/officer/scoring', label: 'Green Scoring', icon: Gauge },
  { to: '/officer/reports', label: 'Reports', icon: BarChart3 },
  { to: '/officer/admin/weights', label: 'Admin Weights', icon: Shield },
]

const applicantNavItems = [
  { to: '/applicant/apply', label: 'Apply for Loan', icon: FilePlus2 },
  { to: '/applicant/status', label: 'Request Status', icon: ClipboardList },
  { to: '/applicant/score', label: 'Green Score', icon: Sparkles },
]

function BaseLayout({ role }: BaseLayoutProps) {
  const isOfficer = role === 'officer'
  const navItems = isOfficer ? officerNavItems : applicantNavItems

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
          <div className="brand-mark">GS</div>
          <div>
            <p className="brand-title">Green Scoring</p>
            <p className="brand-subtitle">
              {isOfficer ? 'Institutional Console' : 'Applicant Portal'}
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

        <button type="button" className="logout-btn">
          <LogOut size={16} aria-hidden="true" />
          Sign Out
        </button>
      </aside>

      <div className="main-pane">
        <header className="topbar">
          <div>
            <p className="topbar-label">Commercial Bank ESG Platform</p>
            <h1 className="topbar-title">
              {isOfficer
                ? 'Credit Risk and Sustainability'
                : 'Loan Request and ESG Progress'}
            </h1>
          </div>
          <div className="topbar-right">
            <div className="topbar-date">{currentDate}</div>
            <div className="user-chip">
              <UserCircle2 size={18} aria-hidden="true" />
              {isOfficer ? 'Loan Officer' : 'Applicant User'}
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
