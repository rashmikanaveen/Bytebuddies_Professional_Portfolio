import { Link, useNavigate } from 'react-router-dom'
import brandLogo from '@/assets/newlogo.svg'
import RegisterForm from '@/features/auth/components/RegisterForm'
import { setSessionUser } from '@/features/auth/session'
import type { RegisterFormValues } from '@/features/auth/types'
import { useAuthApi } from '@/lib/api/hooks'

function RegisterPage() {
  const navigate = useNavigate()
  const { register, loading, error } = useAuthApi()

  async function handleRegisterSuccess(values: RegisterFormValues) {
    const result = await register(values)

    setSessionUser(result.user)
    navigate('/applicant/status', { replace: true })
  }

  return (
    <section className="login-page">
      <div className="login-card">
        <img src={brandLogo} alt="GreenFlow Engine" className="login-logo" />
        <p className="eyebrow">New Workspace Access</p>
        <h2 className="login-heading">Create Account</h2>
        <p className="login-copy">
          Register to access the GreenFlow lending sustainability platform.
        </p>

        {error ? <p className="login-error">{error}</p> : null}

        <RegisterForm
          onSuccess={(values) => {
            void handleRegisterSuccess(values)
          }}
        />

        {loading ? (
          <p className="dashboard-list-meta">Creating account...</p>
        ) : null}

        <p className="dashboard-list-meta">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </section>
  )
}

export default RegisterPage
