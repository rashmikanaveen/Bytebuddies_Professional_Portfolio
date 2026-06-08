import type { PillarScore } from '@/features/scoring/types'

type PillarScoreBarsProps = {
  pillars: PillarScore[]
}

function PillarScoreBars({ pillars }: PillarScoreBarsProps) {
  return (
    <article className="surface-card">
      <h2>E / S / G Sub-scores</h2>
      <div className="pillar-bars">
        {pillars.map((pillar) => (
          <div key={pillar.pillar} className="pillar-row">
            <p>{pillar.pillar}</p>
            <div className="pillar-track" aria-hidden="true">
              <div
                className="pillar-fill"
                style={{
                  width: `${Math.max(0, Math.min(100, pillar.score))}%`,
                }}
              />
            </div>
            <strong>{pillar.score}</strong>
          </div>
        ))}
      </div>
    </article>
  )
}

export default PillarScoreBars
