import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

type TrendPoint = {
  period: string
  loanVolume: number
  verificationQueue: number
  scoringThroughput: number
}

const trendSeries: TrendPoint[] = [
  {
    period: 'Jan',
    loanVolume: 88,
    verificationQueue: 14,
    scoringThroughput: 52,
  },
  {
    period: 'Feb',
    loanVolume: 94,
    verificationQueue: 16,
    scoringThroughput: 57,
  },
  {
    period: 'Mar',
    loanVolume: 102,
    verificationQueue: 12,
    scoringThroughput: 61,
  },
  {
    period: 'Apr',
    loanVolume: 108,
    verificationQueue: 18,
    scoringThroughput: 65,
  },
  {
    period: 'May',
    loanVolume: 116,
    verificationQueue: 11,
    scoringThroughput: 70,
  },
  {
    period: 'Jun',
    loanVolume: 122,
    verificationQueue: 9,
    scoringThroughput: 74,
  },
]

function PortfolioTrendChart() {
  return (
    <div
      className="dashboard-chart-wrap"
      aria-label="Portfolio trend analytics chart"
    >
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={trendSeries}>
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis dataKey="period" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="loanVolume"
            stroke="var(--primary)"
            strokeWidth={2}
            dot={false}
            name="Loan Volume"
          />
          <Line
            type="monotone"
            dataKey="verificationQueue"
            stroke="var(--tertiary)"
            strokeWidth={2}
            dot={false}
            name="Verification Queue"
          />
          <Line
            type="monotone"
            dataKey="scoringThroughput"
            stroke="var(--secondary)"
            strokeWidth={2}
            dot={false}
            name="Scoring Throughput"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PortfolioTrendChart
