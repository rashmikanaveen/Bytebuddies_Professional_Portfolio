import ReportFilters from '@/features/reports/components/ReportFilters'
import ReportsTable from '@/features/reports/components/ReportsTable'
import { useReportsFilter } from '@/features/reports/hooks/useReportsFilter'

function ReportsWorkspace() {
  const { startDate, endDate, setStartDate, setEndDate, filtered } =
    useReportsFilter()

  return (
    <section className="reports-layout">
      <article className="surface-card">
        <h2>Performance and Compliance Reports</h2>
        <p>
          Filter generated reports by date range and export current views for
          governance and audit workflows.
        </p>
      </article>

      <ReportFilters
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />

      <ReportsTable rows={filtered} />
    </section>
  )
}

export default ReportsWorkspace
