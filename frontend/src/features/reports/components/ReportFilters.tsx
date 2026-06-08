type ReportFiltersProps = {
  startDate: string
  endDate: string
  onStartDateChange: (value: string) => void
  onEndDateChange: (value: string) => void
}

function ReportFilters({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: ReportFiltersProps) {
  return (
    <article className="surface-card">
      <h2>Report Filters</h2>
      <div className="reports-filter-grid">
        <div className="form-row">
          <label htmlFor="report-start-date">Start Date</label>
          <input
            id="report-start-date"
            type="date"
            value={startDate}
            onChange={(event) => onStartDateChange(event.target.value)}
          />
        </div>

        <div className="form-row">
          <label htmlFor="report-end-date">End Date</label>
          <input
            id="report-end-date"
            type="date"
            value={endDate}
            onChange={(event) => onEndDateChange(event.target.value)}
          />
        </div>

        <div className="reports-actions">
          <button type="button" className="secondary-btn">
            Apply Range
          </button>
          <button type="button" className="primary-btn report-export-btn">
            Export Current View
          </button>
        </div>
      </div>
    </article>
  )
}

export default ReportFilters
