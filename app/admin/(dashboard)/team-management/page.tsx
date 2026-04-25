'use client'

import { Container } from 'reactstrap'
import { useTranslation } from 'react-i18next'
import { FaPlus, FaUsers, FaChevronDown } from 'react-icons/fa'
import './teamManagement.scss'

const TeamManagement = () => {
  const { t } = useTranslation()

  const members = [
    { id: 1, name: 'Sarah Chen', email: 's.chen@company.com', role: 'Moderator', reviews: 312, status: 'Active', color: '#1a73e8', initials: 'SC' },
    { id: 2, name: 'Marcus Johnson', email: 'm.johnson@company.com', role: 'Moderator', reviews: 287, status: 'Active', color: '#9c36b5', initials: 'MJ' },
    { id: 3, name: 'Elena Rodriguez', email: 'e.rodriguez@company.com', role: 'Admin', reviews: 245, status: 'Active', color: '#099268', initials: 'ER' },
    { id: 4, name: 'James Wilson', email: 'j.wilson@company.com', role: 'Moderator', reviews: 198, status: 'Active', color: '#f08c00', initials: 'JW' },
    { id: 5, name: 'Amy Park', email: 'a.park@company.com', role: 'Viewer', reviews: null, status: 'Invited', color: '#11a8bb', initials: 'AP' },
  ]

  const roles = [
    { key: 'super_admin', class: 'super-admin', desc: 'full_access_billing_api_keys_team_management' },
    { key: 'admin', class: 'admin', desc: 'moderation_settings_team_compliance_frameworks' },
    { key: 'moderator', class: 'moderator', desc: 'queue_review_escalations_analytics' },
    { key: 'viewer', class: 'viewer', desc: 'read_only_access_to_analytics_and_audit_trail' },
  ]

  return (
    <Container fluid className="team-management-container">
      <div className="status-header">
        <div className="header-left">
          <h2>{t('team_management')}</h2>
          <p>{t('manage_roles_access_and_moderator_assignments')}</p>
        </div>
        <div className="header-right">
          <button className="invite-btn">
            <FaPlus /> {t('invite_member')}
          </button>
          <div className="operational-status">
            <span className="dot"></span>
            {t('all_systems_operational')}
          </div>
        </div>
      </div>

      <div className="role-cards-grid">
        {roles.map((role) => (
          <div key={role.key} className={`role-card ${role.class}`}>
            <div className="role-header">
              <span className="icon-circle"></span>
              {t(role.key)}
            </div>
            <div className="role-desc">{t(role.desc)}</div>
          </div>
        ))}
      </div>

      <div className="team-list-section">
        <div className="list-header">
          <h3>
            <FaUsers className="icon" />
            {t('team_members_count', { count: 5 })}
          </h3>
        </div>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>{t('member')}</th>
                <th>{t('email')}</th>
                <th>{t('role')}</th>
                <th>{t('reviews_today')}</th>
                <th>{t('status')}</th>
                <th>{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id}>
                  <td>
                    <div className="member-info">
                      <div className="avatar" style={{ backgroundColor: member.color }}>
                        {member.initials}
                      </div>
                      <span className="name">{member.name}</span>
                    </div>
                  </td>
                  <td className="email-cell">{member.email}</td>
                  <td>
                    <span className={`role-badge ${member.role.toLowerCase()}`}>
                      {t(member.role.toLowerCase())}
                    </span>
                  </td>
                  <td className="text-center font-weight-bold">
                    {member.reviews !== null ? member.reviews : '—'}
                  </td>
                  <td>
                    <span className={`status-pill ${member.status.toLowerCase()}`}>
                      {t(member.status.toLowerCase())}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <span className="change-role">
                      {t('change_role')} <FaChevronDown size={10} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  )
}

export default TeamManagement
