import { AlignCenter } from 'react-feather'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import { Col } from 'reactstrap'
import { setSidebarToggle } from '@/lib/redux/reducers/layoutSlice'
import { Image } from '@/app/components/image'
import { useAppSelector } from '@/lib/redux/hooks'
import { ImageBaseUrl } from '@/lib/constants'

const SidebarLogo = () => {
  const dispatch = useDispatch()
  const { logo_light_url, logo_dark_url } = useAppSelector((state) => state.setting)

  return (
    <Col xs="auto" className="header-logo-wrapper p-0">
      <div className="logo-wrapper">
        <Link href={`/`}>
          <Image
            className="img-fluid for-light"
            src={` /logos/iconshield-logo.png`}
            alt="logo"
            height={30}
            width={102}
          />
          <Image
            className="img-fluid for-dark"
            src={`/logos/iconshield-logo.png`}
            alt="logo_dark"
            height={30}
            width={102}
          />
        </Link>
      </div>
      <div className="toggle-sidebar" onClick={() => dispatch(setSidebarToggle())}>
        <AlignCenter className="status_toggle middle sidebar-toggle" />
      </div>
    </Col>
  )
}

export default SidebarLogo
