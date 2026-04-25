import { useTranslation } from 'react-i18next'
import { FaShieldAlt, FaRegCommentDots, FaRegImage, FaFilter, FaSyncAlt, FaChevronDown } from 'react-icons/fa'
import { Button } from 'reactstrap'

const AllTab = () => {
  const { t } = useTranslation()

  const queueItems = [
    {
      id: 'post-007',
      user: 'SkyRunner',
      risk: 0.87,
      tags: ['GROOMING', 'TRUST_BUILDING'],
      type: 'text',
      content: "You seem so mature for your age. I've never met anyone who understands me like you do. Can we talk somewhere more private?",
      timestamp: '1/15/2025, 8:45:00 PM',
      riskLevel: 'high'
    },
    {
      id: 'post-008',
      user: 'CoralBee',
      risk: 0.71,
      tags: ['NUDITY', 'BORDERLINE'],
      type: 'image',
      content: '[Image — 1.4 MB JPEG — borderline nudity classification. Face age estimation: undetermined.]',
      timestamp: '1/15/2025, 8:41:00 PM',
      riskLevel: 'medium'
    },
    {
      id: 'post-009',
      user: 'TigerFox',
      risk: 0.63,
      tags: ['SELF_HARM', 'DISTRESS'],
      type: 'text',
      content: "I've been feeling really down lately and I don't know how to go on anymore. Nobody understands me.",
      timestamp: '1/15/2025, 8:38:00 PM',
      riskLevel: 'medium'
    }
  ]

  return (
    <div className="all-queue-tab">
      <div className="status-header">
        <div className="header-left">
          <h2>{t('moderation_queue')}</h2>
          <p>{t('human_in_the_loop_review_subtitle')}</p>
        </div>
        <div className="header-actions">
          <Button color="light" className="btn-filter">
            <FaFilter /> {t('filter')}
          </Button>
          <Button color="primary" className="btn-refresh">
            <FaSyncAlt /> {t('refresh')}
          </Button>
          <div className="operational-status">
            <span className="dot"></span>
            {t('all_systems_operational')}
          </div>
        </div>
      </div>

      <div className="guarantee-banner">
        <div className="banner-icon">
          <FaShieldAlt />
        </div>
        <div className="banner-content">
          <h4>{t('human_in_the_loop_guarantee')}</h4>
          <p>{t('human_in_the_loop_description')}</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card pending-review">
          <span className="value">4</span>
          <span className="label">{t('pending_review')}</span>
        </div>
        <div className="stat-card reviewed-today">
          <span className="value">0</span>
          <span className="label">{t('reviewed_today')}</span>
        </div>
        <div className="stat-card escalations-count">
          <span className="value">2</span>
          <span className="label">{t('escalations')}</span>
        </div>
      </div>

      <div className="queue-list">
        {queueItems.map((item) => (
          <div key={item.id} className="queue-card">
            <div className="card-main">
              <div className="type-icon">
                {item.type === 'text' ? <FaRegCommentDots /> : <FaRegImage />}
              </div>
              <div className="item-details">
                <div className="item-meta">
                  <span className="post-id">{item.id}</span>
                  <span className="username">{item.user}</span>
                  <span className={`risk-badge ${item.riskLevel}`}>
                    Risk {item.risk}
                  </span>
                  {item.tags.map(tag => (
                    <span key={tag} className="tag-badge">{tag}</span>
                  ))}
                </div>
                <div className="item-content">
                  {item.content}
                </div>
                <div className="item-footer">
                  <span className="timestamp">{item.timestamp}</span>
                </div>
                <div className="item-actions">
                  <Button color="success" className="btn-approve">{t('approve')}</Button>
                  <Button color="danger" className="btn-reject">{t('reject')}</Button>
                  <Button color="warning" className="btn-escalate">{t('escalate')}</Button>
                  <a href="#history" className="view-history">{t('view_history')}</a>
                </div>
              </div>
              <div className="card-toggle">
                <FaChevronDown />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllTab
