import { ChevronDown, LogIn } from 'react-feather'
import Link from 'next/link'
import { queries } from '@/lib/api'
import { Href } from '@/lib/constants'
import { ProfileHeaderData } from '@/lib/data/layout/Header'
import { useAppDispatch } from '@/lib/redux/hooks'
import { logout } from '@/lib/redux/reducers/authSlice'
import { Avatar } from '@/app/components/image'
import { ConfirmModal } from '@/app/components/modal'
import { useState } from 'react'

const Profile = () => {
  const { data } = queries.useGetUserDetails()
  const [open, setOpen] = useState(false)

  const confirmLogout = () => {
    dispatch(logout())
    setOpen(false)
  }

  const dispatch = useAppDispatch()
  return (
    <>
      <li className="profile-nav onhover-dropdown pe-0 py-0">
        <div className="d-flex align-items-center profile-media">
          <Avatar data={{ avatar: data?.user?.avatar || null }} name={{ name: data?.user?.name }} height={38} width={38} />
          <div className="flex-grow-1 ms-2">
            <div className="d-flex align-items-center gap-2">
              <span className="fw-600 mb-0" style={{ fontSize: '14px', whiteSpace: 'nowrap' }}>{data?.user?.name}</span>
              <span className="text-muted d-flex align-items-center gap-1" style={{ fontSize: '11px', whiteSpace: 'nowrap' }}>
                Admin <ChevronDown size={12} />
              </span>
            </div>
          </div>
        </div>

        <ul className="profile-dropdown onhover-show-div">
          {ProfileHeaderData.map((item) => (
            <li key={item.id}>
              <Link href={item.link}>
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </Link>
            </li>
          ))}
          <li>
            <Link href={Href} onClick={() => setOpen((pre) => !pre)}>
              <span>
                <LogIn />
              </span>
              <span>Log out</span>
            </Link>
          </li>
        </ul>
      </li>
      <ConfirmModal
        isOpen={open}
        onClose={() => {
          setOpen(false)
        }}
        onConfirm={confirmLogout}
        title="Logout"
        subtitle={`Are you sure you want to logout?`}
        confirmText="Logout"
        cancelText="Cancel"
        variant="danger"
        showIcon={true}
        iconId="logout"
      />
    </>
  )
}

export default Profile
