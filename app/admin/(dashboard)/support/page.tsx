'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Col, Container, Row, Button } from 'reactstrap'
import SupportStats from './components/SupportStats'
import TicketList from './components/TicketList'
import SupportSidebar from './components/SupportSidebar'
import { PlusCircle } from 'react-feather'

const SupportPage = () => {
  const { t } = useTranslation()

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-4 pb-2">
        <div>
          <h3 className="fw-bold mb-1">{t('support_center')}</h3>
          <p className="text-muted mb-0">{t('get_help_track_tickets_and_find_documentation')}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <Button color="primary" className="px-4 py-2 d-flex align-items-center gap-2 border-0 shadow-sm" style={{ borderRadius: '10px' }}>
            <PlusCircle size={18} />
            <span>{t('new_ticket')}</span>
          </Button>
          <div className="bg-white px-3 py-2 border rounded-pill d-flex align-items-center gap-2 shadow-sm">
            <div className="bg-success rounded-circle" style={{ width: '8px', height: '8px' }}></div>
            <span className="small fw-bold text-dark">{t('all_systems_operational')}</span>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <SupportStats />

      {/* Main Content Section */}
      <Row>
        <Col xl="8" lg="7">
          <TicketList />
        </Col>
        <Col xl="4" lg="5">
          <SupportSidebar />
        </Col>
      </Row>

      <style jsx global>{`
        body { background-color: #f8f9fa; }
        .bg-light { background-color: #f8f9fa !important; }
        .text-primary { color: #D42554 !important; }
        .bg-primary { 
          background: linear-gradient(135deg, #D42554 0%, #EB3667 100%) !important; 
          border: none !important;
        }
        .btn-primary { 
          background: linear-gradient(135deg, #D42554 0%, #EB3667 100%) !important; 
          border: none !important;
          transition: all 0.3s ease;
        }
        .btn-primary:hover {
          opacity: 0.9;
          transform: translateY(-1px);
          box-shadow: 0 5px 15px rgba(212, 37, 84, 0.3) !important;
        }
      `}</style>
    </Container>
  )
}

export default SupportPage
