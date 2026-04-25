'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardBody } from 'reactstrap'
import { Clock, Book, ExternalLink, Zap, Shield, Share2, Users, Video } from 'react-feather'

const SupportSidebar = () => {
  const { t } = useTranslation()

  return (
    <div className="support-sidebar">
      {/* Response Times Card */}
      <Card className="border-0 shadow-sm mb-4" style={{ backgroundColor: 'rgba(212, 37, 84, 0.05)', borderRadius: '15px' }}>
        <CardBody className="p-4">
          <div className="d-flex align-items-center mb-4 text-primary">
            <Clock className="me-2" size={18} />
            <h6 className="mb-0 fw-bold">{t('response_times')}</h6>
          </div>
          <div className="response-list">
            {[
              { label: t('urgent'), time: '< 2 hours', color: 'text-primary' },
              { label: t('priority_high'), time: '< 4 hours', color: 'text-danger' },
              { label: t('priority_normal'), time: '1 business day', color: 'text-warning' },
              { label: t('priority_low'), time: '2 business days', color: 'text-muted' },
            ].map((item, i) => (
              <div key={i} className="d-flex justify-content-between align-items-center mb-3 small">
                <span className={`fw-medium ${item.color}`}>{item.label}</span>
                <span className="text-muted fw-medium">{item.time}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-top">
            <p className="small mb-1 text-muted">Emergency (CSAM or legal hold):</p>
            <a href="mailto:legal@roseshield.app" className="small fw-bold text-primary text-decoration-none">legal@roseshield.app</a>
          </div>
        </CardBody>
      </Card>

      {/* Quick Docs Card */}
      <Card className="border-0 shadow-sm" style={{ borderRadius: '15px' }}>
        <CardBody className="p-4">
          <div className="d-flex align-items-center mb-4 text-muted">
            <Book className="me-2" size={18} />
            <h6 className="mb-0 fw-bold">{t('quick_docs')}</h6>
          </div>
          <div className="docs-list">
            {[
              { title: t('quickstart_guide'), desc: t('get_up_and_running_in_15_minutes'), icon: Zap, iconColor: 'text-primary' },
              { title: t('safety_models_reference'), desc: t('grooming_score_age_estimate_csam'), icon: Shield, iconColor: 'text-info' },
              { title: t('webhook_configuration'), desc: t('events_signatures_retries'), icon: Share2, iconColor: 'text-warning' },
              { title: t('law_enforcement_api'), desc: t('ncmec_reporting_evidence_preservation'), icon: Users, iconColor: 'text-danger' },
              { title: t('video_moderation'), desc: t('real_time_and_batch_processing'), icon: Video, iconColor: 'text-success' },
            ].map((item, i) => (
              <div key={i} className="d-flex align-items-start gap-3 mb-4 pb-1">
                <div className={`p-2 rounded-circle bg-light ${item.iconColor}`}>
                  <item.icon size={16} />
                </div>
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="mb-0 small fw-bold">{item.title}</h6>
                    <ExternalLink size={14} className="text-muted" style={{ opacity: 0.5 }} />
                  </div>
                  <p className="mb-0 x-small text-muted" style={{ fontSize: '11px' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <style jsx>{`
        .x-small { font-size: 11px; }
      `}</style>
    </div>
  )
}

export default SupportSidebar
