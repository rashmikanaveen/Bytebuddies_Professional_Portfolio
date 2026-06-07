type GradeBadgeProps = {
  grade: 'A' | 'B' | 'C' | 'D'
}

function GradeBadge({ grade }: GradeBadgeProps) {
  return (
    <article className="surface-card">
      <h2>Grade</h2>
      <p className={`grade-badge grade-${grade}`}>Grade {grade}</p>
      <p className="dashboard-list-meta">
        {grade === 'A'
          ? 'Excellent green credit profile'
          : grade === 'B'
            ? 'Strong sustainability performance'
            : grade === 'C'
              ? 'Moderate sustainability risk'
              : 'High sustainability risk'}
      </p>
    </article>
  )
}

export default GradeBadge
