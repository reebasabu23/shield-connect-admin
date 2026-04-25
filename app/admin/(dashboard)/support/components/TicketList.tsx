'use client'

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardBody, Input, Nav, NavItem, NavLink, Badge } from 'reactstrap'
import { Search } from 'react-feather'

const TicketList = () => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('All')

  const tickets = [
    {
      id: 'TKT-2026-00041',
      status: t('pending'),
      statusKey: 'pending',
      statusColor: 'warning',
      tags: ['API Bug'],
      priority: t('priority_high'),
      priorityColor: 'danger',
      title: 'grooming-score returning 0.00 on all requests',
      updated: 'Mar 21, 2026 — 09:02 UTC',
      messages: 4,
    },
    {
      id: 'TKT-2026-00038',
      status: t('resolved_tickets').split(' ')[0],
      statusKey: 'resolved',
      statusColor: 'success',
      tags: ['Compliance'],
      title: 'COPPA compliance export format question',
      updated: 'Mar 19, 2026 — 10:15 UTC',
      messages: 3,
    },
    {
      id: 'TKT-2026-00035',
      status: t('resolved_tickets').split(' ')[0],
      statusKey: 'resolved',
      statusColor: 'success',
      tags: ['Webhooks'],
      title: 'Webhook delivery failing — 401 on our endpoint',
      updated: 'Mar 14, 2026 — 11:55 UTC',
      messages: 3,
    },
    {
      id: 'TKT-2026-00031',
      status: t('open_tickets').split(' ')[0],
      statusKey: 'open',
      statusColor: 'primary',
      tags: ['Enterprise'],
      title: 'Request for enterprise custom category training',
      updated: 'Mar 11, 2026 — 09:30 UTC',
      messages: 2,
    },
  ]

  const tabs = [
    { name: 'All', label: t('all_count', { count: 4 }) },
    { name: 'Open', label: t('open_count', { count: 1 }) },
    { name: 'Pending', label: t('pending_count', { count: 1 }) },
    { name: 'Resolved', label: t('resolved_count', { count: 2 }) },
  ]

  return (
    <Card className="border-0 shadow-sm" style={{ borderRadius: '15px' }}>
      <CardBody className="p-0">
        <div className="p-4 d-flex align-items-center border-bottom">
          <div className="position-relative flex-grow-1">
            <Search className="position-absolute text-muted" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px' }} />
            <Input 
              type="text" 
              placeholder={t('search_tickets')}
              className="ps-5 border-0 bg-light" 
              style={{ borderRadius: '10px' }}
            />
          </div>
          <Nav pills className="ms-3 flex-nowrap">
            {tabs.map((tab) => (
              <NavItem key={tab.name}>
                <NavLink
                  className={`px-3 py-2 small fw-medium border-0 ${activeTab === tab.name ? 'active bg-primary' : 'text-muted'}`}
                  href="#"
                  onClick={(e) => { e.preventDefault(); setActiveTab(tab.name); }}
                  style={{ borderRadius: '10px' }}
                >
                  {tab.label}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
        </div>

        <div className="ticket-items">
          {tickets.map((ticket, i) => (
            <div key={i} className="p-4 border-bottom d-flex align-items-start justify-content-between hover-bg-light transition-all" style={{ cursor: 'pointer' }}>
              <div className="flex-grow-1">
                <div className="d-flex align-items-center mb-2 gap-2">
                  <span className="small text-muted fw-medium">{ticket.id}</span>
                  <Badge color="" className={`bg-soft-${ticket.statusColor} text-${ticket.statusColor} rounded-pill px-2 py-1 small`}>
                    {ticket.status}
                  </Badge>
                  {ticket.tags.map((tag, j) => (
                    <Badge key={j} color="light" className="text-muted rounded-pill px-2 py-1 small">
                      {tag}
                    </Badge>
                  ))}
                  {ticket.priority && (
                    <span className="small text-warning fw-bold">
                      <span className="me-1">•</span> {ticket.priority}
                    </span>
                  )}
                </div>
                <h6 className="mb-1 fw-bold">{ticket.title}</h6>
                <p className="mb-0 small text-muted">Updated {ticket.updated}</p>
              </div>
              <div className="text-end d-flex align-items-center gap-2">
                <span className="small text-muted">{ticket.messages} msg</span>
                <i className="fa fa-angle-right text-muted" />
              </div>
            </div>
          ))}
        </div>
      </CardBody>

      <style jsx>{`
        .bg-soft-primary { background-color: rgba(43, 95, 96, 0.1); }
        .bg-soft-warning { background-color: rgba(255, 184, 0, 0.1); }
        .bg-soft-success { background-color: rgba(35, 159, 103, 0.1); }
        .bg-soft-danger { background-color: rgba(235, 54, 103, 0.1); }
        .hover-bg-light:hover { background-color: #f8f9fa; }
        .transition-all { transition: all 0.2s ease-in-out; }
      `}</style>
    </Card>
  )
}

export default TicketList
