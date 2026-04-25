'use client'

import { useTranslation } from 'react-i18next'
import AuthWrapper from '../widgets/AuthWrapper'
import LoginForm from './LoginForm'

const Login = () => {
  const { t } = useTranslation()
  return (
    <AuthWrapper>
      <div className="content-title">
        <h3>Protecting every connection and dignity</h3>
        <p>Welcome to the Admin & Moderation Dashboard, please login to your account.</p>
      </div>
      <LoginForm />
    </AuthWrapper>
  )
}

export default Login
