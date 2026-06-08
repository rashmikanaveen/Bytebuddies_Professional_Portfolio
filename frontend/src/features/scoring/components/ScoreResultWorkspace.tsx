import GradeBadge from '@/features/scoring/components/GradeBadge'
import MetricContributionTable from '@/features/scoring/components/MetricContributionTable'
import PassFailGate from '@/features/scoring/components/PassFailGate'
import PillarScoreBars from '@/features/scoring/components/PillarScoreBars'
import ScoreGauge from '@/features/scoring/components/ScoreGauge'
import { getScoreResult } from '@/features/scoring/mock/scoreResultData'

type ScoreResultWorkspaceProps = {
  submissionId: string
}

function ScoreResultWorkspace({ submissionId }: ScoreResultWorkspaceProps) {
  const result = getScoreResult(submissionId)

  return (
    <section className="score-result-layout">
      <article className="surface-card">
        <h2>Submission {result.submissionId}</h2>
        <p>
          Final sustainability score, grade, and contribution breakdown after
          verification.
        </p>
      </article>

      <div className="score-result-overview-grid">
        <ScoreGauge score={result.score} />
        <GradeBadge grade={result.grade} />
        <PassFailGate status={result.gateStatus} reason={result.gateReason} />
      </div>

      <PillarScoreBars pillars={result.pillars} />
      <MetricContributionTable rows={result.metricBreakdown} />
    </section>
  )
}

export default ScoreResultWorkspace
