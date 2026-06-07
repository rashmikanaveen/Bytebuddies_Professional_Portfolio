const sampleRequests = [
  {
    reference: 'GL-2026-0041',
    submittedOn: '2026-06-02',
    status: 'Under Review',
    stage: 'Officer Verification',
  },
  {
    reference: 'GL-2026-0033',
    submittedOn: '2026-05-16',
    status: 'Approved',
    stage: 'Scored',
  },
]

function ApplicantStatusPage() {
  return (
    <section className="surface-card">
      <h2>My Loan Requests</h2>
      <p>
        Track verification progress and final lending decision for each request.
      </p>

      <div className="status-table-wrap">
        <table className="status-table">
          <thead>
            <tr>
              <th>Reference</th>
              <th>Submitted</th>
              <th>Status</th>
              <th>Current Stage</th>
            </tr>
          </thead>
          <tbody>
            {sampleRequests.map((item) => (
              <tr key={item.reference}>
                <td>{item.reference}</td>
                <td>{item.submittedOn}</td>
                <td>{item.status}</td>
                <td>{item.stage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default ApplicantStatusPage
