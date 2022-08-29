import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import './SearchBox.scss'

export default function SearchBox() {
  return (
    <div className="search-box">
      <FontAwesomeIcon icon={faSearch} className="icon search-icon" />
      <input type="text" placeholder="Search..." className="searcg-box-input" />
    </div>
  )
}
