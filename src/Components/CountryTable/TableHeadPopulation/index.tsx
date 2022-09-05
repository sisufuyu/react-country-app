import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

import { useAppDispatch } from '../../../redux/hooks'
import { orderCountriesByPopulation } from '../../../redux/slices/countrySlice'

export default function TableHeadPopulation() {
  const [listOpen, setListOpen] = useState(false)
  const dispatch = useAppDispatch()

  function ToggleList() {
    setListOpen(!listOpen)
  }

  function handleOrderPopulation(order: string) {
    dispatch(orderCountriesByPopulation(order))
  }

  return (
    <th className="country-table-head table-head-population">
      <div onClick={ToggleList}>
        <span className="thead-text">Population</span>
        <FontAwesomeIcon
          icon={faCaretDown}
          className="sort-name-icon-up icon"
        />
      </div>
      <ul className={`order-list ${listOpen ? '' : 'hide'}`}>
        <li className="order-text">ORDER</li>
        <li
          className="order-list-item active"
          onClick={() => handleOrderPopulation('asc')}
        >
          Small to Large
        </li>
        <li
          className="order-list-item"
          onClick={() => handleOrderPopulation('desc')}
        >
          Large to Small
        </li>
      </ul>
    </th>
  )
}
