import type { CSSProperties } from 'react'

type ScoreGaugeProps = {
  score: number
}

function ScoreGauge({ score }: ScoreGaugeProps) {
  const boundedScore = Math.max(0, Math.min(100, score))

  return (
    <article className="surface-card score-gauge-card">
      <h2>Green Score</h2>
      <div
        className="score-gauge-shell"
        aria-label={`Green score ${boundedScore}`}
      >
        <div
          className="score-gauge-fill"
          style={{ '--score-fill': `${boundedScore}%` } as CSSProperties}
        />
        <p className="score-gauge-value">{boundedScore}</p>
      </div>
      <p className="dashboard-list-meta">Scale: 0 (low) to 100 (high)</p>
    </article>
  )
}

export default ScoreGauge
