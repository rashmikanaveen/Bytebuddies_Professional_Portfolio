import KpiCard from '@/features/dashboard/components/KpiCard'
import { dashboardKpis } from '@/features/dashboard/mock/dashboardData'

function KpiGrid() {
  return (
    <section className="kpi-grid">
      {dashboardKpis.map((kpi) => (
        <KpiCard
          key={kpi.label}
          label={kpi.label}
          value={kpi.value}
          tone={kpi.tone}
        />
      ))}
    </section>
  )
}

export default KpiGrid
