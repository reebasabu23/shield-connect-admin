'use client'

import Header from '../components/header'
import Sidebar from '../components/sidebar'
import Footer from '../components/footer'
import { useEffect } from 'react'
import { useAppDispatch } from '@/lib/redux/hooks'
import { setSidebarToggle } from '@/lib/redux/reducers/layoutSlice'
import { useLanguageInitializer } from '@/lib/hooks/useLanguageInitializer'

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const dispatch = useAppDispatch()
  const isLanguageReady = useLanguageInitializer()

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      dispatch(setSidebarToggle(width < 1184))
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [dispatch])

  if (!isLanguageReady) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Loading...</div>
      </div>
    )
  }

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
