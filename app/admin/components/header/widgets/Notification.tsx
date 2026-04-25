import { useState, useEffect } from 'react'
import Link from 'next/link'
import SvgIcon from '@/app/components/icons/SvgIcon'
import { queries } from '@/lib/api'

const Notification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { data: reportsData } = queries.useGetReportedAccounts({ status: 'pending' })
  const allPendingReports = reportsData?.userReports || []
  const totalPendingCount = reportsData?.total || 0

  const [lastSeenId, setLastSeenId] = useState(() => {
    return Number(localStorage.getItem('lastSeenReportId') || 0)
  })

  const newReports = allPendingReports.filter((report) => report.id > lastSeenId)
  const newNotificationsCount = newReports.length

  const handleMouseEnter = () => {
    const currentMaxId = allPendingReports.length > 0 
      ? Math.max(...allPendingReports.map(r => r.id)) 
      : lastSeenId

    if (currentMaxId > lastSeenId) {
      setLastSeenId(currentMaxId)
      localStorage.setItem('lastSeenReportId', currentMaxId.toString())
    }
  }

  return (
    <li className="onhover-dropdown notification-nav" onMouseEnter={handleMouseEnter}>
      <div className="notification-box" onClick={() => setDropdownOpen(!dropdownOpen)}>
        <SvgIcon iconId="notification" />
        {newNotificationsCount > 0 && (
          <span className="badge rounded-pill badge-secondary">{newNotificationsCount}</span>
        )}
      </div>
      <div className={`onhover-show-div notification-dropdown ${dropdownOpen ? 'active' : ''}`}>
        <h6 className="f-18 mb-0 dropdown-title">Notifications</h6>
        <ul>
          {newReports.length > 0 ? (
            newReports.slice(0, 5).map((report) => (
              <li key={report.id} className="b-l-primary border-4">
                <Link href="/reported_accounts" onClick={() => setDropdownOpen(false)}>
                  <p>
                    <strong>{report.reporter?.name || 'User'}</strong> reported{' '}
                    <strong>{report.reported_user?.name || report.name || 'someone'}</strong>
                  </p>
                  <span>{report.reason}</span>
                </Link>
              </li>
            ))
          ) : (
            <li className="b-l-primary border-4">
              <p>No new reports since last check</p>
            </li>
          )}
          {newReports.length > 5 && (
            <li className="text-center">
              <p className="f-w-500">+{newReports.length - 5} more new reports</p>
            </li>
          )}
          <hr />
          <li>
            <Link className="f-w-700" href="/reported_accounts" onClick={() => setDropdownOpen(false)}>
              Check all reports
            </Link>
          </li>
        </ul>
      </div>
    </li>
  )
}

export default Notification
