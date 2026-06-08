type KpiTone = 'success' | 'warning' | undefined

type KpiCardProps = {
  label: string
  value: string
  tone?: KpiTone
}

function KpiCard({ label, value, tone }: KpiCardProps) {
  return (
    <article className="surface-card stat-card">
      <p className="card-label">{label}</p>
      <p className={`card-value ${tone ? tone : ''}`}>{value}</p>
    </article>
  )
}

export default KpiCard
