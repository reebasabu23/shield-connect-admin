'use client'

import { useState } from 'react'
import { Container } from 'reactstrap'
import { useTranslation } from 'react-i18next'
import { FaSave, FaShieldAlt, FaKeyboard, FaImage, FaGlobe, FaCogs, FaUsers, FaLock, FaBolt, FaExclamationTriangle, FaHeart, FaUserSlash, FaBiohazard, FaVenusMars, FaIdCard, FaExclamationCircle, FaUserInjured, FaSkullCrossbones } from 'react-icons/fa'
import './autoModeration.scss'

const AutoModeration = () => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('text')
  const [threshold, setThreshold] = useState(90)

  const rules = [
    { id: 'profanity', name: 'profanity', desc: 'profanity_desc', severity: 'medium', icon: <FaKeyboard /> },
    { id: 'harassment', name: 'harassment', desc: 'harassment_desc', severity: 'high', icon: <FaUserSlash /> },
    { id: 'violent_threats', name: 'violent_threats', desc: 'violent_threats_desc', severity: 'critical', icon: <FaExclamationTriangle /> },
    { id: 'self_harm', name: 'self_harm', desc: 'self_harm_desc', severity: 'critical', icon: <FaHeart /> },
    { id: 'grooming', name: 'grooming', desc: 'grooming_desc', severity: 'critical', icon: <FaBiohazard /> },
    { id: 'sexual_content', name: 'sexual_content', desc: 'sexual_content_desc', severity: 'high', icon: <FaVenusMars /> },
    { id: 'personal_info', name: 'personal_info_pii', desc: 'personal_info_desc', severity: 'high', icon: <FaIdCard /> },
    { id: 'hate_speech', name: 'hate_speech', desc: 'hate_speech_desc', severity: 'high', icon: <FaExclamationCircle /> },
    { id: 'graphic_violence', name: 'graphic_violence', desc: 'graphic_violence_desc', severity: 'high', icon: <FaUserInjured /> },
    { id: 'extremism', name: 'extremism', desc: 'extremism_desc', severity: 'critical', icon: <FaSkullCrossbones /> },
  ]

  const languages = [
    { code: 'US', name: 'English', active: true },
    { code: 'ES', name: 'Spanish', active: true },
    { code: 'FR', name: 'French', active: true },
    { code: 'DE', name: 'German', active: true },
    { code: 'IT', name: 'Italian', active: true },
    { code: 'PT', name: 'Portuguese', active: true },
    { code: 'NL', name: 'Dutch', active: true },
    { code: 'PL', name: 'Polish', active: true },
    { code: 'RU', name: 'Russian', active: true },
    { code: 'UA', name: 'Ukrainian', active: true },
    { code: 'CN', name: 'Chinese (Simplified)', active: true },
    { code: 'TW', name: 'Chinese (Traditional)', active: true },
    { code: 'JP', name: 'Japanese', active: false },
    { code: 'KR', name: 'Korean', active: false },
  ]

  return (
    <Container fluid className="auto-moderation-container">
      <div className="status-header">
        <div className="header-left">
          <h2>{t('auto_moderation')}</h2>
          <p>{t('configure_ai_assisted_content_moderation_rules')}</p>
        </div>
        <div className="header-right">
          <button className="save-btn">
            <FaSave /> {t('save_changes')}
          </button>
          <div className="operational-status">
            <span className="dot"></span>
            {t('all_systems_operational')}
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card text">
          <div className="icon-box"><FaKeyboard /></div>
          <div className="stat-content">
            <span className="value">10/12</span>
            <span className="label">{t('active_text_rules')}</span>
          </div>
        </div>
        <div className="stat-card image">
          <div className="icon-box"><FaImage /></div>
          <div className="stat-content">
            <span className="value">6/9</span>
            <span className="label">{t('active_image_rules')}</span>
          </div>
        </div>
        <div className="stat-card lang">
          <div className="icon-box"><FaGlobe /></div>
          <div className="stat-content">
            <span className="value">12</span>
            <span className="label">{t('languages_active')}</span>
          </div>
        </div>
        <div className="stat-card mode">
          <div className="icon-box"><FaCogs /></div>
          <div className="stat-content">
            <span className="value">{t('hybrid')}</span>
            <span className="label">{t('moderation_mode')}</span>
          </div>
        </div>
      </div>

      <div className="guarantee-banner">
        <div className="banner-left">
          <FaShieldAlt className="icon" />
          <div className="text">
            <h4>{t('human_in_the_loop_guarantee')}</h4>
            <p>{t('ai_pre_screens_content_final_decisions_human')}</p>
          </div>
        </div>
        <div className="active-toggle">
          <span className="dot"></span>
          {t('active')}
        </div>
      </div>

      <div className="main-config-grid">
        <div className="left-panel">
          <div className="config-card">
            <div className="section-title">
              <FaCogs /> {t('moderation_mode')}
            </div>
            
            <div className="mode-option">
              <div className="mode-icon"><FaUsers /></div>
              <div className="mode-info">
                <div className="mode-header">
                  <h5>{t('manual_review')}</h5>
                  <span className="percentage">100% human oversight</span>
                </div>
                <p>{t('manual_review_desc')}</p>
              </div>
            </div>

            <div className="mode-option selected">
              <div className="mode-icon" style={{color: '#1a73e8'}}><FaBolt /></div>
              <div className="mode-info">
                <div className="mode-header">
                  <h5>{t('hybrid')}</h5>
                  <span className="recommended-badge">{t('recommended')}</span>
                </div>
                <div className="mode-type">{t('ai_assisted_recommended')}</div>
                <p>{t('hybrid_desc')}</p>
              </div>
            </div>

            <div className="mode-option">
              <div className="mode-icon"><FaLock /></div>
              <div className="mode-info">
                <div className="mode-header">
                  <h5>{t('auto')}</h5>
                </div>
                <div className="mode-type">{t('low_risk_content_only')}</div>
                <p>{t('auto_desc')}</p>
              </div>
            </div>

            <div className="language-support">
              <div className="section-title">
                <FaGlobe /> {t('language_support')}
              </div>
              <div className="header-row">
                <span className="count">12 / 40</span>
              </div>
              <div className="lang-grid">
                {languages.map(lang => (
                  <div key={lang.code} className={`lang-chip ${lang.active ? 'active' : ''}`}>
                    <span className="code">{lang.code}</span>
                    <span className="name">{lang.name}</span>
                  </div>
                ))}
              </div>
              <div className="footer-actions">
                <span>{t('select_all')}</span>
                <span className="clear">{t('clear')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="right-panel">
          <div className="config-card rules-config">
            <div className="tabs">
              <div className={`tab ${activeTab === 'text' ? 'active' : ''}`} onClick={() => setActiveTab('text')}>
                {t('text')}
                <span className="count">10/12 rules</span>
              </div>
              <div className={`tab ${activeTab === 'image' ? 'active' : ''}`} onClick={() => setActiveTab('image')}>
                {t('image')}
                <span className="count">6/9 rules</span>
              </div>
              <div className={`tab ${activeTab === 'video' ? 'active' : ''}`} onClick={() => setActiveTab('video')}>
                {t('video')}
                <span className="count">Growth+</span>
              </div>
            </div>

            <div className="threshold-box">
              <div className="header">
                <h5><FaCogs /> {t('auto_flag_threshold')}</h5>
                <span className="value">{threshold}%</span>
              </div>
              <div className="slider-wrap">
                <input 
                  type="range" 
                  min="50" 
                  max="99" 
                  value={threshold} 
                  onChange={(e) => setThreshold(parseInt(e.target.value))}
                />
                <div className="labels">
                  <span>50% — {t('sensitive')}</span>
                  <span>99% — {t('strict')}</span>
                </div>
              </div>
            </div>

            <div className="rules-list">
              {rules.map(rule => (
                <div key={rule.id} className="rule-item">
                  <div className="rule-info">
                    <div className="icon">{rule.icon}</div>
                    <div className="content">
                      <div className="name-wrap">
                        <h6>{t(rule.name)}</h6>
                        <span className={`severity ${rule.severity}`}>{t(rule.severity)}</span>
                      </div>
                      <p>{t(rule.desc)}</p>
                    </div>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default AutoModeration
