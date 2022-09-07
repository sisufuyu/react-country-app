import React, { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import { useAppDispatch } from '../../../redux/hooks'
import { searchCountries } from '../../../redux/slices/countrySlice'
import './SearchBox.scss'

export default function SearchBox() {
  const dispatch = useAppDispatch()
  const timerID = useRef<NodeJS.Timeout | null>(null)

  const debounce = (callback: () => void, delay: number) => {
    if (timerID.current) clearTimeout(timerID.current)
    timerID.current = setTimeout(callback, delay)
  }

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    debounce(() => dispatch(searchCountries(target.value)), 200)
  }

  return (
    <div className="search-box">
      <FontAwesomeIcon icon={faSearch} className="icon search-icon" />
      <input
        type="text"
        placeholder="Search..."
        onChange={handleChange}
        className="search-box-input"
      />
    </div>
  )
}
