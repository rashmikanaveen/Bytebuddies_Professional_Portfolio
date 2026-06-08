import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts'

type BreakdownSlice = {
  name: string
  value: number
}

type ApplicantBreakdownChartProps = {
  values: BreakdownSlice[]
}

const palette = ['var(--primary)', 'var(--secondary)', 'var(--tertiary)']

function ApplicantBreakdownChart({ values }: ApplicantBreakdownChartProps) {
  return (
    <div
      className="applicant-chart-wrap"
      aria-label="Applicant E S G breakdown chart"
    >
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={values}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={88}
            innerRadius={52}
            paddingAngle={4}
          >
            {values.map((slice, index) => (
              <Cell key={slice.name} fill={palette[index % palette.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ApplicantBreakdownChart
