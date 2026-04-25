'use client'

import { useState, useEffect } from 'react'
import { Container, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import { useTranslation } from 'react-i18next'
import { useRouter, usePathname, useParams, useSearchParams } from 'next/navigation'
import { ROUTES } from '@/lib/constants'
import EscalationsTab from './EscalationsTab'
import ApprovedTab from './ApprovedTab'
import RejectedTab from './RejectedTab'
import AllTab from './AllTab'
import './queue.scss'

const Queue = () => {
  const { t } = useTranslation()
  const pathname = usePathname()
  const router = useRouter()
  const navigate = (path: any) => router.push(path)
  const [activeTab, setActiveTab] = useState('1')

  useEffect(() => {
    if (pathname === ROUTES.ALL_QUEUE || pathname === ROUTES.QUEUE) {
      setActiveTab('1')
    } else if (pathname === ROUTES.APPROVED) {
      setActiveTab('2')
    } else if (pathname === ROUTES.REJECTED) {
      setActiveTab('3')
    } else if (pathname === ROUTES.ESCALATIONS) {
      setActiveTab('4')
    } else {
      setActiveTab('1')
    }
  }, [pathname])

  const toggle = (tab: string, path: string) => {
    if (activeTab !== tab) {
      setActiveTab(tab)
      router.push(path)
    }
  }

  return (
    <Container fluid className="queue-container">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={activeTab === '1' ? 'active' : ''}
            onClick={() => toggle('1', ROUTES.ALL_QUEUE)}
          >
            {t('all')}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === '2' ? 'active' : ''}
            onClick={() => toggle('2', ROUTES.APPROVED)}
          >
            {t('approved')}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === '3' ? 'active' : ''}
            onClick={() => toggle('3', ROUTES.REJECTED)}
          >
            {t('rejected')}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === '4' ? 'active' : ''}
            onClick={() => toggle('4', ROUTES.ESCALATIONS)}
          >
            {t('escalations')}
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <AllTab />
        </TabPane>
        <TabPane tabId="2">
          <ApprovedTab />
        </TabPane>
        <TabPane tabId="3">
          <RejectedTab />
        </TabPane>
        <TabPane tabId="4">
          <EscalationsTab />
        </TabPane>
      </TabContent>
    </Container>
  )
}

export default Queue
