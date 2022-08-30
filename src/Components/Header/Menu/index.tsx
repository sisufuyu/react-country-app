import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { Theme, setTheme } from '../../../redux/slices/UISlice'
import './Menu.scss'

export default function Menu() {
  const [menuOpen, setMenuOpen] = useState(false)
  const dispatch = useAppDispatch()
  const defaultTheme = useAppSelector((state) => state.UI.defaultTheme)
  const themeList = ['purple', 'blue', 'green', 'red']

  const handleThemeClick = (theme: Theme) => {
    dispatch(setTheme(theme))
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <div className="menu">
      <div className="menu-icon-container" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} className="icon menu-icon" />
      </div>
      <ul className={`menu-list ${menuOpen ? 'active' : ''}`}>
        {themeList.map((theme) => {
          return (
            <li
              className={`menu-list-item ${theme} ${
                theme === defaultTheme ? 'active-theme' : ''
              }`}
              key={theme}
              onClick={() => handleThemeClick(theme as Theme)}
            >
              <div className="theme-circle"></div>
              <span className="theme-text">{theme}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
