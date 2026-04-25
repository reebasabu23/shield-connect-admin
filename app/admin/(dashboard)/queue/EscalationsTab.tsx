import { useTranslation } from 'react-i18next'
import { FaShieldAlt, FaRegClock } from 'react-icons/fa'

const EscalationsTab = () => {
  const { t } = useTranslation()

  const escalations = [
    {
      id: 'ESC-post-003',
      alias: 'GreenLeaf',
      reason: 'Immediate welfare concern — self-harm indicators detected',
      severity: 'Critical',
      date: '1/15/2025, 8:20:00 PM',
      status: 'Under Review'
    },
    {
      id: 'ESC-post-006',
      alias: 'JusticeSeeker',
      reason: 'Urgent: Child reporting suspicious adult contact with grooming indicators',
      severity: 'Critical',
      date: '1/15/2025, 11:15:00 PM',
      status: 'Under Review'
    }
  ]

  return (
    <div className="escalations-tab">
      <div className="status-header">
        <div className="header-left">
          <h2>{t('escalation_queue')}</h2>
          <p>{t('cases_requiring_senior_review_or_law_enforcement_referral')}</p>
        </div>
        <div className="operational-status">
          <span className="dot"></span>
          {t('all_systems_operational')}
        </div>
      </div>

      <div className="escalation-alert">
        <div className="alert-icon">
          <FaShieldAlt />
        </div>
        <div className="alert-content">
          <h4>{t('escalated_cases_requires_senior_review')}</h4>
          <p>{t('escalations_description')}</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card active-esc">
          <span className="value">2</span>
          <span className="label">{t('active_escalations')}</span>
        </div>
        <div className="stat-card critical-esc">
          <span className="value">2</span>
          <span className="label">{t('critical_severity')}</span>
        </div>
        <div className="stat-card pending-esc">
          <span className="value">2</span>
          <span className="label">{t('pending_review')}</span>
        </div>
      </div>

      <div className="table-section">
        <div className="table-header">
          <h3>{t('escalation_queue')}</h3>
          <p>{t('le_portal_view')}</p>
        </div>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>{t('escalation_id')}</th>
                <th>{t('child_alias')}</th>
                <th>{t('escalation_reason')}</th>
                <th>{t('severity')}</th>
                <th>{t('escalated_at')}</th>
                <th>{t('status')}</th>
              </tr>
            </thead>
            <tbody>
              {escalations.map((esc) => (
                <tr key={esc.id}>
                  <td>{esc.id}</td>
                  <td><strong>{esc.alias}</strong></td>
                  <td>{esc.reason}</td>
                  <td>
                    <span className="badge-status critical">{esc.severity}</span>
                  </td>
                  <td>{esc.date}</td>
                  <td>
                    <span className="badge-status under-review">{t('under_review')}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="case-details-section">
        <h3>{t('case_details')}</h3>
        <div className="case-banner">
          <div className="case-info">
            <FaShieldAlt />
            <h4>ESC-post-003</h4>
            <span className="severity-pill">Critical</span>
          </div>
          <div className="case-time">
            <FaRegClock />
            1/15/2025, 8:20:00 PM
          </div>
        </div>
        <div className="case-content">
          <div className="row">
            <div className="col-md-6">
              <label className="text-muted small text-uppercase font-weight-bold">{t('child_alias')}</label>
              <h5 className="font-weight-bold">GreenLeaf</h5>
            </div>
            <div className="col-md-4">
              <label className="text-muted small text-uppercase font-weight-bold">{t('risk_score')}</label>
              <h5 className="text-danger-bold">0.98</h5>
            </div>
            <div className="col-md-2">
              <label className="text-muted small text-uppercase font-weight-bold">{t('status')}</label>
              <div><span className="badge-status under-review">{t('under_review')}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EscalationsTab
