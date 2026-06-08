import PortfolioTrendChart from '@/features/dashboard/components/PortfolioTrendChart'

function TrendPanel() {
  return (
    <article className="surface-card dashboard-panel dashboard-trend-panel">
      <h2>Portfolio Trend</h2>
      <p>
        Loan volume, verification queue depth, and scoring throughput trends.
      </p>
      <PortfolioTrendChart />
    </article>
  )
}

export default TrendPanel
