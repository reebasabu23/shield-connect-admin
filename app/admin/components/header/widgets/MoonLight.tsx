import { useEffect, useState } from 'react'
import SvgIcon from '@/app/components/icons/SvgIcon'

const MoonLight = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('mode') === 'dark-only')

  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove('light-only')
      document.body.classList.add('dark-only')
    } else {
      document.body.classList.remove('dark-only')
      document.body.classList.add('light-only')
    }
  }, [darkMode])

  const DarkModeHandler = (isDark: boolean) => {
    const newMode = !isDark
    setDarkMode(newMode)
    localStorage.setItem('mode', newMode ? 'dark-only' : 'light-only')
  }

  return (
    <li>
      <div className={`mode ${darkMode ? 'active' : ''}`} onClick={() => DarkModeHandler(darkMode)}>
        <SvgIcon iconId="moon" />
      </div>
    </li>
  )
}

export default MoonLight
