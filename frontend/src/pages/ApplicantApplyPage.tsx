function ApplicantApplyPage() {
  return (
    <section className="surface-card">
      <h2>New Loan Application</h2>
      <p>
        Submit loan details with ESG evidence files. Upload support for PDF,
        JPG, and PNG will be connected to backend services in the next phase.
      </p>

      <form className="applicant-form" noValidate>
        <div className="form-row">
          <label htmlFor="company-name">Company Name</label>
          <input
            id="company-name"
            type="text"
            placeholder="Example Holdings Ltd"
          />
        </div>

        <div className="form-row">
          <label htmlFor="loan-amount">Requested Loan Amount</label>
          <input id="loan-amount" type="number" placeholder="25000000" />
        </div>

        <div className="form-row">
          <label htmlFor="loan-purpose">Purpose</label>
          <textarea
            id="loan-purpose"
            rows={4}
            placeholder="Describe how this loan supports operations and sustainability goals"
          />
        </div>

        <div className="form-row">
          <label htmlFor="supporting-files">
            Supporting Reports / Documents
          </label>
          <input
            id="supporting-files"
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
          />
        </div>

        <button type="button" className="primary-btn">
          Submit Application
        </button>
      </form>
    </section>
  )
}

export default ApplicantApplyPage
