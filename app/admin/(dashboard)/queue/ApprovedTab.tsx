import { useTranslation } from 'react-i18next'
import { FaCheckCircle, FaFilter } from 'react-icons/fa'

const ApprovedTab = () => {
  const { t } = useTranslation()

  const data = [
    { id: 'post-011', alias: 'SunflowerKid', categories: 'SAFE', type: 'TEXT', confidence: '98%', date: '1/15/2025, 7:00 PM' },
    { id: 'post-012', alias: 'BlueSky42', categories: 'SAFE', type: 'IMAGE', confidence: '95%', date: '1/15/2025, 6:58 PM' },
    { id: 'post-013', alias: 'StarGazer', categories: 'SAFE', type: 'TEXT', confidence: '99%', date: '1/15/2025, 6:53 PM' },
    { id: 'post-014', alias: 'RiverFlow', categories: 'SAFE', type: 'TEXT', confidence: '97%', date: '1/15/2025, 6:49 PM' },
    { id: 'post-015', alias: 'MoonBeam', categories: 'SAFE', type: 'IMAGE', confidence: '96%', date: '1/15/2025, 6:44 PM' }
  ]

  return (
    <div className="approved-tab">
      <div className="status-header">
        <div className="header-left">
          <h2>{t('approved_content')}</h2>
          <p>{t('content_approved_by_moderators_today')}</p>
        </div>
        <div className="operational-status">
          <span className="dot"></span>
          {t('all_systems_operational')}
        </div>
      </div>

      <div className="approved-stats-bar">
        <div className="count-pill">
          <FaCheckCircle />
          {t('approved_today', { count: 5 })}
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
                <th>{t('categories')}</th>
                <th>{t('type')}</th>
                <th>{t('confidence')}</th>
                <th>{t('approved_at')}</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td className="text-muted">{item.id}</td>
                  <td><strong>{item.alias}</strong></td>
                  <td>
                    <span className="badge-status safe">{item.categories}</span>
                  </td>
                  <td className="text-muted small">{item.type}</td>
                  <td className="text-success-bold">{item.confidence}</td>
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

export default ApprovedTab
