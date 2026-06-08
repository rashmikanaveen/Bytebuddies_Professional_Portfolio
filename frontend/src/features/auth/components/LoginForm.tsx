import RoleSelector from '@/features/auth/components/RoleSelector'
import { useLoginForm } from '@/features/auth/hooks/useLoginForm'
import type { LoginFormValues } from '@/features/auth/types'

type LoginFormProps = {
  onSuccess: (values: LoginFormValues) => void
}

function LoginForm({ onSuccess }: LoginFormProps) {
  const { values, errors, updateField, submit } = useLoginForm({ onSuccess })

  return (
    <form
      className="login-form"
      noValidate
      onSubmit={(event) => {
        event.preventDefault()
        submit()
      }}
    >
      <div className="login-form-row">
        <label htmlFor="email">Corporate Email</label>
        <input
          id="email"
          className={`login-input ${errors.email ? 'login-input-error' : ''}`}
          type="email"
          placeholder="name@institution.lk"
          value={values.email}
          onChange={(event) => updateField('email', event.target.value)}
        />
        {errors.email ? <p className="login-error">{errors.email}</p> : null}
      </div>

      <div className="login-form-row">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          className={`login-input ${errors.password ? 'login-input-error' : ''}`}
          type="password"
          placeholder="Enter password"
          value={values.password}
          onChange={(event) => updateField('password', event.target.value)}
        />
        {errors.password ? (
          <p className="login-error">{errors.password}</p>
        ) : null}
      </div>

      <RoleSelector
        value={values.role}
        error={errors.role}
        onChange={(nextRole) => updateField('role', nextRole)}
      />

      <button type="submit" className="primary-btn">
        Sign In
      </button>
    </form>
  )
}

export default LoginForm
