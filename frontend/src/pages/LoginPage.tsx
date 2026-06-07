import { Link } from 'react-router-dom'
import brandLogo from '@/assets/newlogo.svg'

const heroImageUrl =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB3qAl0UIJEsC8TEfeIzj47jD5xvi35jLMdspx7d62DLnNWMMm77An2kRAqtrfwTFm1OWfVg77ZlgraPeB0p8QkImiEhi9mIng0kxcylhx3EDN92q4c9LAzsl6ii2Bltda-8qa-d4CawLntggIDgvQKV7R6o6u_LuDEiK6CGRX2s8QZj8sh-hHEfmMQZM5ZYuTiyq3cNW0EPrjqn21kRpfV9pXM-iE9LP7v-4KNmREURng0aNkids7TbuAr4DaDKEUAKvkzDeAwpyQ'

function LoginPage() {
  return (
    <div className="login-shell">
      <aside className="login-hero" aria-hidden="true">
        <img
          src={heroImageUrl}
          alt="Sustainable energy landscape"
          className="login-hero-image"
        />
        <div className="login-hero-overlay" />
        <div className="login-hero-content">
          <p className="login-hero-kicker">GreenFlow Initiative</p>
          <h1 className="login-hero-title">
            Powering a sustainable future through responsible finance.
          </h1>
          <p className="login-hero-copy">
            Institutional-grade terminal for tracking ecological KPIs and
            managing green capital investments.
          </p>
        </div>
      </aside>

      <section className="login-page">
        <div className="login-card">
          <img src={brandLogo} alt="GreenFlow Engine" className="login-logo" />
          <p className="eyebrow">Secure Institutional Access</p>
          <h2 className="login-heading">GreenFlow Engine</h2>
          <p className="login-copy">
            Sign in to continue to the commercial lending sustainability
            console.
          </p>

          <form
            className="login-form"
            noValidate
            onSubmit={(event) => event.preventDefault()}
          >
            <label htmlFor="email">Corporate Email</label>
            <input id="email" type="email" placeholder="name@institution.lk" />

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
      </section>
    </div>
  )
}

export default LoginPage
