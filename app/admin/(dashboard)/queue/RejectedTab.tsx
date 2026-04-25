import { useTranslation } from 'react-i18next'
import { FaTimesCircle, FaFilter } from 'react-icons/fa'

const RejectedTab = () => {
  const { t } = useTranslation()

  const data = [
    { id: 'post-001', alias: 'ShadowUser', reason: 'GROOMING · SECRECY', type: 'TEXT', risk: '0.97', date: '1/15/2025, 8:31 PM' },
    { id: 'post-002', alias: 'AnonymousX', reason: 'SEXTORTION', type: 'TEXT', risk: '0.99', date: '1/15/2025, 8:14 PM' },
    { id: 'post-004', alias: 'NightHawk', reason: 'CSAM RISK', type: 'IMAGE', risk: '0.91', date: '1/15/2025, 7:55 PM' },
    { id: 'post-005', alias: 'CoralBee', reason: 'ISOLATION TACTICS', type: 'TEXT', risk: '0.88', date: '1/15/2025, 7:41 PM' }
  ]

  return (
    <div className="rejected-tab">
      <div className="status-header">
        <div className="header-left">
          <h2>{t('rejected_content')}</h2>
          <p>{t('content_rejected_by_moderators')}</p>
        </div>
        <div className="operational-status">
          <span className="dot"></span>
          {t('all_systems_operational')}
        </div>
      </div>

      <div className="rejected-stats-bar">
        <div className="count-pill rejected">
          <FaTimesCircle />
          {t('rejected_today', { count: 4 })}
        </div>
        <button className="filter-btn">
          <FaFilter />
          {t('filter')}
        </button>
      </div>

      <div className="table-section">
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>{t('post_id')}</th>
                <th>{t('child_alias')}</th>
                <th>{t('reason')}</th>
                <th>{t('type')}</th>
                <th>{t('risk_score')}</th>
                <th>{t('rejected_at')}</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td className="text-muted">{item.id}</td>
                  <td><strong>{item.alias}</strong></td>
                  <td className="text-danger-bold">{item.reason}</td>
                  <td className="text-muted small">{item.type}</td>
                  <td className="text-danger-bold">{item.risk}</td>
                  <td className="text-muted small">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default RejectedTab
