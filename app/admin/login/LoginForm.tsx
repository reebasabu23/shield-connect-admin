import { Form, Formik } from 'formik'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { queries } from '@/lib/api'
import post from '@/lib/api/post'
import { ROUTES, URL_KEYS } from '@/lib/constants'
import { useAppDispatch } from '@/lib/redux/hooks'
import { loginSuccess } from '@/lib/redux/reducers/authSlice'
import { SolidButton } from '@/app/components/button/SolidButton'
import TextInput from '@/app/components/formFields/TextInput'
import type { LoginPayload } from '@/lib/types/auth'
import { getParam } from '@/lib/utils'
import { toaster } from '@/lib/utils/custom-functions'
import { loginValidationSchema } from '@/lib/utils/validation-schemas'
import LoginTable from './Login'

const LoginForm = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const navigate = (path: any) => router.push(path)
  const returnUrl = getParam('returnUrl')
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)

  const { data: demoData } = queries.useGetDemoStatus()
  const isDemoMode = demoData?.demo === true

  const handleSubmit = async (values: LoginPayload) => {
    try {
      setLoading(true)
      const result = await post(URL_KEYS.Auth.Login, values)
      dispatch(loginSuccess(result))
      setLoading(false)
      router.push(returnUrl ? returnUrl : ROUTES.DASHBOARD)
      toaster('success', 'Login successful.')
    } catch {
      setLoading(false)
    }
  }

  return (
    <Formik
      initialValues={{
        identifier: '',
        password: '',
      }}
      validationSchema={loginValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <>
          <Form className="login-form">
            <TextInput
              label="Email Or Phone"
              iconProps={{ iconId: 'stroke-email', className: 'form-icon' }}
              name="identifier"
              type="text"
              placeholder="Enter email or phone"
            />
            <TextInput
              iconProps={{ iconId: 'stroke-Verification', className: 'form-icon' }}
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
            />
            <div className="forgot-pass">
              <Link href={ROUTES.FORGOT_PASSWORD} className="small forgot-link">
                {t('forgot_password')}?
              </Link>
            </div>
            <SolidButton title="Login" type="submit" color="primary" className="w-100 Login-btn" loading={loading} />
          </Form>

          <div className="auth-footer">
            <p>Don't have an account? <Link href={ROUTES.LOGIN}>Sign Up</Link></p>
          </div>

          {isDemoMode && <LoginTable setFieldValue={setFieldValue} />}
        </>
      )}
    </Formik>
  )
}

export default LoginForm
