import { ROUTES } from '@/lib/constants'
import type { MenuItem } from '@/lib/types/layout'

export const SidebarMenuList: MenuItem[] = [
  {
    title: 'dashboard',
    Items: [
      {
        title: 'overview',
        id: 1,
        icon: 'home',
        type: 'link',
        path: ROUTES.DASHBOARD,
      },
    ],
  },
  {
    title: 'moderation',
    Items: [
      {
        title: 'queue',
        id: 100,
        icon: 'task',
        type: 'sub',
        path: ROUTES.ALL_QUEUE,
        Items: [
          {
            title: 'escalations',
            id: 101,
            icon: 'error',
            type: 'link',
            path: ROUTES.ESCALATIONS,
            badge: 'badge badge-danger',
            badgeName: '2',
          },
          {
            title: 'approved',
            id: 102,
            icon: 'check',
            type: 'link',
            path: ROUTES.APPROVED,
          },
          {
            title: 'rejected',
            id: 103,
            icon: 'close',
            type: 'link',
            path: ROUTES.REJECTED,
          },
        ],
      },
    ],
  },
  {
    title: 'insights',
    Items: [
      {
        title: 'analytics',
        id: 150,
        icon: 'charts',
        type: 'link',
        path: ROUTES.ANALYTICS,
      },
    ],
  },
  {
    title: 'user_management',
    Items: [
      {
        title: 'all_users',
        id: 2,
        icon: 'user',
        type: 'link',
        path: ROUTES.USERS,
      },
      {
        title: 'all_groups',
        id: 3,
        icon: 'project-users',
        type: 'link',
        path: ROUTES.GROUPS,
      },
      {
        title: 'reported_accounts',
        id: 4,
        icon: 'reports',
        type: 'link',
        path: ROUTES.REPORTED_ACCOUNTS,
      },
    ],
  },
  {
    title: 'administration',
    Items: [
      {
        title: 'team_management',
        id: 200,
        icon: 'user',
        type: 'link',
        path: ROUTES.TEAM_MANAGEMENT,
      },
    ],
  },
  {
    title: 'configuration',
    Items: [
      {
        title: 'auto_moderation',
        id: 300,
        icon: 'sidebar-status',
        type: 'link',
        path: ROUTES.AUTO_MODERATION,
      },
      {
        title: 'support',
        id: 301,
        icon: 'support-tickets',
        type: 'link',
        path: ROUTES.SUPPORT,
      },
      {
        title: 'email_configuration',
        id: 10,
        icon: 'email',
        type: 'link',
        path: ROUTES.EMAIL_CONFIGURATION,
      },
    ],
  },
  {
    title: 'content',
    Items: [
      {
        title: 'faqs',
        id: 6,
        icon: 'error',
        type: 'link',
        path: ROUTES.MANAGE_FAQS,
      },
      {
        title: 'chat_wallpapers',
        id: 7,
        icon: 'chat-wallpaper',
        type: 'link',
        path: ROUTES.CHAT_WALLPAPERS,
      },
      {
        title: 'stickers',
        id: 8,
        icon: 'smile',
        type: 'link',
        path: ROUTES.STICKERS,
      },
    ],
  },
  {
    title: 'communication',
    Items: [
      {
        title: 'announcements',
        id: 5,
        icon: 'broadcast',
        type: 'link',
        path: ROUTES.ANNOUNCEMENTS,
        iconClass: 'announcements-icon',
      },
    ],
  },
  {
    title: 'system_settings',
    Items: [
      {
        title: 'general_settings',
        id: 11,
        icon: 'setting',
        type: 'link',
        path: ROUTES.GENERAL_SETTINGS,
      },
      {
        title: 'sms_gateways',
        id: 12,
        icon: 'sms-icon',
        type: 'link',
        path: ROUTES.SMS_GATEWAYS,
      },
      {
        title: 'media_chat_settings',
        id: 15,
        icon: 'custom-sms',
        type: 'link',
        path: ROUTES.MEDIA_SETTINGS,
      },
      {
        title: 'report_settings',
        id: 16,
        icon: 'coming-soon',
        type: 'sub',
        path: ROUTES.REPORT_SETTINGS,
      },
    ],
  },
]
