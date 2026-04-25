import { AlignCenter } from 'react-feather'
import Link from 'next/link'
import { ImageBaseUrl, ROUTES } from '@/lib/constants'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { setSidebarToggle } from '@/lib/redux/reducers/layoutSlice'
import { Image } from '@/app/components/image'
import SvgIcon from '@/app/components/icons/SvgIcon'

const LogoWrapper = () => {
  const dispatch = useAppDispatch()
  const { logo_light_url, logo_dark_url, sidebar_logo_url } = useAppSelector((state) => state.setting)

  return (
    <>
      <div className="logo-wrapper">
        <Link href={ROUTES.HOME}>
          <Image
            className="img-fluid w-40 for-light"
            src={`/logos/iconshield-logo.png`}
            alt="logo"
          />
          <Image
            className="img-fluid w-40 for-dark"
            src={`/logos/iconshield-logo.png`}
            alt="logo_dark"
          />
        </Link>
        <div className="back-btn" onClick={() => dispatch(setSidebarToggle())}>
          <SvgIcon className='back-btn-sidebar' iconId="cheveron-right" />
        </div>
        <div className="toggle-sidebar" onClick={() => dispatch(setSidebarToggle())}>
          <AlignCenter className="status_toggle middle sidebar-toggle" />
        </div>
      </div>
      <div className="logo-icon-wrapper">
        <Link href={ROUTES.HOME}>
          <Image
            className="img-fluid"
            src={`/logos/iconshield-logo.png`}
            alt="logo-icon"
          />
        </Link>
        <div className="toggle-sidebar" onClick={() => dispatch(setSidebarToggle())}>
          <AlignCenter className="status_toggle middle sidebar-toggle" />
        </div>
      </div>
    </>
  )
}

export default LogoWrapper
