const ConfigDB = {
  settings: {
    layoutType: 'ltr',
    sidebar: {
      type: 'compact-wrapper',
      iconType: 'stroke',
    },
  },
  color: {
    primaryColor: '#2b5f60',
    secondaryColor: '#c06240',
    mixBackgroundLayout: typeof window !== 'undefined' ? localStorage.getItem('mode') || 'light' : 'light',
  },
}

export default ConfigDB
