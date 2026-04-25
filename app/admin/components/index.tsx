import { useRouter, usePathname, useParams, useSearchParams } from 'next/navigation'
import Header from './header'
import Sidebar from './sidebar'
import Footer from './footer'

const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="page-wrapper compact-wrapper">
      <Header />
      <div className="page-body-wrapper">
        <Sidebar />
        <div className="page-body">
          {children}
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
