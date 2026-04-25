import { Form, Formik, type FormikHelpers } from 'formik'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/lib/constants'
import { SolidButton } from '@/app/components/button/SolidButton'
import { toaster } from '@/lib/utils/custom-functions'
import { emailSchema } from '@/lib/utils/validation-schemas'
import type { EmailPayload } from '@/lib/types/auth'
import { useAppDispatch } from '@/lib/redux/hooks'
import { setForgotPasswordEmail } from '@/lib/redux/reducers/authSlice'
import mutations from '@/lib/api/mutations'
import { TextInput } from '@/app/components/formFields'

const ForgotPasswordForm = () => {
  const { mutate: requestPin, isPending } = mutations.useRequestForgotPassword()
  const router = useRouter()
  const navigate = (path: any) => router.push(path)
  const dispatch = useAppDispatch()
  const handleSubmit = async (values: EmailPayload, { resetForm }: FormikHelpers<EmailPayload>) => {
    requestPin(
      { identifier: values?.email },
      {
        onSuccess: () => {
          dispatch(setForgotPasswordEmail(values.email))
          toaster('success', 'Otp sent successfully')
          router.push(ROUTES.VERIFY_OTP)
          resetForm()
        },
      },
    )
  }

  return (
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={emailSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="login-form">
          <TextInput
            label="email_address"
            containerClass="login-input email-input"
            iconProps={{ iconId: 'stroke-email', className: 'form-icon' }}
            name="email"
            type="email"
            placeholder="example@mail.com"
          />
          <SolidButton loading={isPending} title="send" type="submit" color="primary" className="w-100 Login-btn" />
        </Form>
      )}
    </Formik>
  )
}
export default ForgotPasswordForm
