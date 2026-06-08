import RoleSelector from '@/features/auth/components/RoleSelector'
import { useRegisterForm } from '@/features/auth/hooks/useRegisterForm'
import type { RegisterFormValues } from '@/features/auth/types'

type RegisterFormProps = {
  onSuccess: (values: RegisterFormValues) => void
}

function RegisterForm({ onSuccess }: RegisterFormProps) {
  const { values, errors, updateField, submit } = useRegisterForm({ onSuccess })

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
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          className={`login-input ${errors.name ? 'login-input-error' : ''}`}
          type="text"
          placeholder="Nadeesha Fernando"
          value={values.name}
          onChange={(event) => updateField('name', event.target.value)}
        />
        {errors.name ? <p className="login-error">{errors.name}</p> : null}
      </div>

      <div className="login-form-row">
        <label htmlFor="email">Email</label>
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
          placeholder="Create password"
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

      <div className="login-form-row">
        <label htmlFor="profile-image-url">Profile Image URL (Optional)</label>
        <input
          id="profile-image-url"
          className={`login-input ${errors.profileImageUrl ? 'login-input-error' : ''}`}
          type="url"
          placeholder="https://example.com/avatar.jpg"
          value={values.profileImageUrl ?? ''}
          onChange={(event) =>
            updateField('profileImageUrl', event.target.value)
          }
        />
        {errors.profileImageUrl ? (
          <p className="login-error">{errors.profileImageUrl}</p>
        ) : null}
      </div>

      <button type="submit" className="primary-btn">
        Create Account
      </button>
    </form>
  )
}

export default RegisterForm
