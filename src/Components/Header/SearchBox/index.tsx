import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { searchCountries } from '../../../redux/slices/countrySlice'
import './SearchBox.scss'

export default function SearchBox() {
  const dispatch = useAppDispatch()
  const keyword = useAppSelector((state) => state.country.keyword)

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    dispatch(searchCountries(target.value))
  }

  return (
    <div className="search-box">
      <FontAwesomeIcon icon={faSearch} className="icon search-icon" />
      <input
        type="text"
        placeholder="Search..."
        value={keyword}
        onChange={handleChange}
        className="searcg-box-input"
      />
    </div>
  )
}
