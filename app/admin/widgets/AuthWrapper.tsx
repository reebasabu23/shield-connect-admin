import { Container, Row, Col } from 'reactstrap'
import { Image } from '@/app/components/image'
import type { AuthWrapperProps } from '@/lib/types/auth'
import SvgIcon from '@/app/components/icons/SvgIcon'
import { useRouter } from 'next/navigation'

const AuthWrapper = ({ children, showBackBtn = false }: AuthWrapperProps) => {
  const router = useRouter()
  const navigate = (path: any) => router.push(path)
  const handleBack = () => {
    const segments = location.pathname.split('/').filter(Boolean)
    if (segments.length > 1) {
      segments.pop()
      router.push('/' + segments.join('/'))
    } else {
      router.push('/')
    }
  }

  return (
    <div className="login-wrapper">
      <div className="card-flex">
        <div className="login-card">
          <div className="logo">
            {showBackBtn && (
              <div className="back-btn-badge" onClick={handleBack} style={{ cursor: 'pointer', position: 'absolute', left: '20px', top: '20px' }}>
                <SvgIcon iconId="back-arrow-icon" />
              </div>
            )}
            <div className="d-flex align-items-center justify-content-center gap-2">
              <Image src="/logos/iconshield-logo.png" alt="ShieldConnect Logo" style={{ height: '48px', width: 'auto' }} />
              <span style={{ fontSize: '24px', fontWeight: 700, color: '#2C3E50' }}>ShieldConnect</span>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthWrapper
