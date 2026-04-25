import type { WidgetData } from '@/lib/types/dashboard'

export const WidgetList: WidgetData[] = [
  { id: 1, key: 'totalUsers', imgSrc: '/svg/1.svg', label: 'Total Users', styleClass: 'style-1' },
  { id: 2, key: 'totalCalls', imgSrc: '/svg/2.svg', label: 'Total Calls', styleClass: 'style-2' },
  { id: 3, key: 'totalGroups', imgSrc: '/svg/3.svg', label: 'Total Groups', styleClass: 'style-3' },
  { id: 4, key: 'newUsersThisWeek', imgSrc: '/svg/4.svg', label: 'This Week’s Users', styleClass: 'style-4' },
  { id: 5, key: 'totalMediaShared', imgSrc: '/svg/5.svg', label: 'Media Shared', styleClass: 'style-5' },
  { id: 6, key: 'totalFileShared', imgSrc: '/svg/6.svg', label: 'Files Shared', styleClass: 'style-6' },
  { id: 7, key: 'totalPendingReports', imgSrc: '/svg/7.svg', label: 'Pending Reports', styleClass: 'style-7' },
  { id: 8, key: 'totalBlockedUsers', imgSrc: '/svg/8.svg', label: 'Blocked Users', styleClass: 'style-8' },
]
