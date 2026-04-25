'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardBody, Col, Row } from 'reactstrap'

const SupportStats = () => {
  const { t } = useTranslation()

  const stats = [
    {
      title: t('open_tickets'),
      count: 1,
      color: 'primary',
      bgColor: 'rgba(43, 95, 96, 0.05)',
    },
    {
      title: t('pending_tickets'),
      count: 1,
      color: 'warning',
      bgColor: 'rgba(255, 184, 0, 0.05)',
    },
    {
      title: t('resolved_tickets'),
      count: 2,
      color: 'success',
      bgColor: 'rgba(35, 159, 103, 0.05)',
    },
    {
      title: t('total_tickets'),
      count: 4,
      color: 'secondary',
      bgColor: 'rgba(89, 102, 122, 0.05)',
    },
  ]

  return (
    <Row>
      {stats.map((stat, i) => (
        <Col xl="3" sm="6" key={i} className="mb-4">
          <Card className="border-0 shadow-sm" style={{ backgroundColor: stat.bgColor, borderRadius: '15px' }}>
            <CardBody className="p-4">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h2 className={`mb-1 fw-bold text-${stat.color}`}>{stat.count}</h2>
                  <p className="mb-0 text-muted small">{stat.title}</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default SupportStats
