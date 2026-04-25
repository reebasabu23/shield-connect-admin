import { Form, Formik, type FormikHelpers } from 'formik'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import mutations from '@/lib/api/mutations'
import { ROUTES, STORAGE_KEYS } from '@/lib/constants'
import { SolidButton } from '@/app/components/button/SolidButton'
import { OTPInput } from '@/app/components/formFields'
import type { OtpPayload } from '@/lib/types/auth'
import { getStorage } from '@/lib/utils'
import { toaster } from '@/lib/utils/custom-functions'
import { otpSchema } from '@/lib/utils/validation-schemas'
import ResendOtp from './ResendOtp'
import { useOtpCooldown } from './useOtpCooldown'

const VerifyOtpForm = () => {
  const storage = getStorage()
  const router = useRouter()
  const navigate = (path: any) => router.push(path)
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(''))

  const forgotPasswordEmail = storage.getItem(STORAGE_KEYS.FORGOT_PASSWORD_EMAIL) || null
  const { mutate: verifyOtp, isPending } = mutations.useVerifyOtp()

  const { resendDisabled, coolDown, handleResendOtp, resendOtpLoading } = useOtpCooldown(forgotPasswordEmail)

  const handleSubmit = async (values: OtpPayload, _formikHelpers: FormikHelpers<OtpPayload>) => {
    if (!forgotPasswordEmail) {
      toaster('error', 'Email not found. Please restart the password reset process.')
      router.push(ROUTES.FORGOT_PASSWORD)
      return
    }

    verifyOtp(
      {
        identifier: forgotPasswordEmail,
        otp: values.otp,
      },
      {
        onSuccess: () => {
          storage.setItem(STORAGE_KEYS.OTP_TOKEN, values.otp)
          router.push(ROUTES.SET_NEW_PASSWORD)
          toaster('success', 'Otp verified successfully')
        },
      },
    )
  }

  return (
    <Formik initialValues={{ otp: '' }} validationSchema={otpSchema} onSubmit={handleSubmit}>
      {({ setFieldValue }) => (
        <Form className="otp-form">
          <OTPInput
            val={otpValues}
            setVal={(val) => {
              setOtpValues(val)
              setFieldValue('otp', val.join(''))
            }}
            submitForm={(values, helpers) => handleSubmit(values, helpers)}
          />

          <ResendOtp
            resendDisabled={resendDisabled}
            coolDown={coolDown}
            resendOtpLoading={resendOtpLoading}
            onResendOtp={handleResendOtp}
          />

          <SolidButton loading={isPending} title="verify" type="submit" color="primary" className="w-100 Login-btn" />
        </Form>
      )}
    </Formik>
  )
}

export default VerifyOtpForm
