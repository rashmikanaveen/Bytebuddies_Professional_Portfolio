import { Link } from 'react-router-dom'

function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-card">
        <p className="eyebrow">Secure Access</p>
        <h1>Institutional Green Scoring Platform</h1>
        <p className="login-copy">
          Sign in to continue to the commercial lending sustainability console.
        </p>

        <form className="login-form" noValidate>
          <label htmlFor="email">Work Email</label>
          <input id="email" type="email" placeholder="name@bank.com" />

          <label htmlFor="password">Password</label>
          <input id="password" type="password" placeholder="Enter password" />

          <button type="button" className="primary-btn">
            Sign In
          </button>
        </form>

        <p className="login-footnote">
          Demo account route access:{' '}
          <Link to="/officer/dashboard">Loan Officer</Link> |{' '}
          <Link to="/applicant/status">Applicant User</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
