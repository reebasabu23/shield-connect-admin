import { Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { ROUTES, STORAGE_KEYS } from '@/lib/constants'
import { SolidButton } from '@/app/components/button/SolidButton'
import { TextInput } from '@/app/components/formFields'
import { getStorage } from '@/lib/utils'
import { toaster } from '@/lib/utils/custom-functions'
import { confirmPasswordSchema } from '@/lib/utils/validation-schemas'
import { useAppDispatch } from '@/lib/redux/hooks'
import mutations from '@/lib/api/mutations'
import type { ResetPasswordFormValues } from '@/lib/types/auth'
import { clearForgotPasswordEmail } from '@/lib/redux/reducers/authSlice'

const NewPasswordForm = () => {
  const storage = getStorage()
  const router = useRouter()
  const navigate = (path: any) => router.push(path)
  const dispatch = useAppDispatch()
  const { mutate: resetPassword, isPending } = mutations.useResetPassword()

  const handleSubmit = (values: ResetPasswordFormValues) => {
    const email = storage.getItem(STORAGE_KEYS.FORGOT_PASSWORD_EMAIL)
    const otp = storage.getItem(STORAGE_KEYS.OTP_TOKEN)
    if (!otp || !email) {
      toaster('error', 'Invalid OTP or email. Please try again.')
      return
    }
    resetPassword(
      {
        otp: otp,
        new_password: values.password,
        identifier: email,
      },
      {
        onSuccess: () => {
          toaster('success', 'Password reset successfully. You can now login.')
          dispatch(clearForgotPasswordEmail())
          router.push(ROUTES.LOGIN)
        },
      },
    )
  }
  return (
    <Formik
      initialValues={{
        password: '',
        confirm_password: '',
      }}
      validationSchema={confirmPasswordSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="login-form">
          <TextInput
            label="new_password"
            iconProps={{ iconId: 'stroke-Verification', className: 'form-icon' }}
            name="password"
            placeholder="*********"
            type="password"
          />
          <TextInput
            label="confirm_password"
            iconProps={{ iconId: 'stroke-Verification', className: 'form-icon' }}
            name="confirm_password"
            placeholder="*********"
            type="password"
          />
          <SolidButton title="submit" type="submit" color="primary" className=" w-100 Login-btn" loading={isPending} />
        </Form>
      )}
    </Formik>
  )
}

export default NewPasswordForm
