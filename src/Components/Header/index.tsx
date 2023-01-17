import React from 'react'
import { Link } from 'react-router-dom'

import Menu from './Menu'
import SearchBox from './SearchBox'
import Cart from './Cart'
import './Header.scss'

export default function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <Menu />
        <Link to="/" className="header-title">
          <img
            src={process.env.PUBLIC_URL + '/logo64.png'}
            className="header-logo"
          />
          Countries
        </Link>
        <SearchBox />
      </div>
      <div className="header-right">
        <Cart />
      </div>
    </header>
  )
}
