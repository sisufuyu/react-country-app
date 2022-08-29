import React from 'react'

import Menu from './Menu'
import SearchBox from './SearchBox'
import Cart from './Cart'
import './Header.scss'

export default function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <Menu />
        <h1 className="header-title">Countries</h1>
        <SearchBox />
      </div>
      <div className="header-right">
        <Cart />
      </div>
    </header>
  )
}
