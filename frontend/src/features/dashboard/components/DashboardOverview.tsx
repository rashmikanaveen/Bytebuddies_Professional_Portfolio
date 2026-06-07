import KpiGrid from '@/features/dashboard/components/KpiGrid'
import PendingVerificationsPanel from '@/features/dashboard/components/PendingVerificationsPanel'
import QuickActionsPanel from '@/features/dashboard/components/QuickActionsPanel'
import RecentSubmissionsPanel from '@/features/dashboard/components/RecentSubmissionsPanel'
import TrendPanel from '@/features/dashboard/components/TrendPanel'

function DashboardOverview() {
  return (
    <section className="dashboard-layout">
      <KpiGrid />
      <TrendPanel />
      <PendingVerificationsPanel />
      <RecentSubmissionsPanel />
      <QuickActionsPanel />
    </section>
  )
}

export default DashboardOverview
