import { useTranslation } from 'react-i18next'
import { STORAGE_KEYS } from '@/lib/constants'
import { getStorage, truncateEmail } from '@/lib/utils'
import AuthWrapper from '../widgets/AuthWrapper'
import VerifyOtpForm from './VerifyOtpForm'

const VerifyOtp = () => {
  const storage = getStorage()
  const { t } = useTranslation()
  const forgotPasswordEmail = storage.getItem(STORAGE_KEYS.FORGOT_PASSWORD_EMAIL) || null
  return (
    <AuthWrapper showBackBtn>
      <div className="content-title">
        <h3>{t('enter_otp_to_continue')}</h3>
      </div>
      <p>
        {t('a_code_has_been_sent_to')} {truncateEmail(forgotPasswordEmail)}
      </p>
      <VerifyOtpForm />
    </AuthWrapper>
  )
}

export default VerifyOtp
