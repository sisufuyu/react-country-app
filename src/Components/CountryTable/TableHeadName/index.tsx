import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

import { useAppDispatch } from '../../../redux/hooks'
import { orderCountriesByName } from '../../../redux/slices/countrySlice'

export default function TableHeadName() {
  const [listOpen, setListOpen] = useState(false)
  const dispatch = useAppDispatch()

  function handleOrderName(order: string) {
    dispatch(orderCountriesByName(order))
  }

  return (
    <th className="country-table-head table-head-name">
      <div onClick={() => setListOpen(!listOpen)}>
        <span className="thead-text">Name</span>
        <FontAwesomeIcon
          icon={faCaretDown}
          className="sort-name-icon-up icon"
        />
      </div>
      <ul className={`order-list ${listOpen ? '' : 'hide'}`}>
        <li className="order-text">ORDER</li>
        <li
          className="order-list-item active"
          onClick={() => handleOrderName('asc')}
        >
          A to Z
        </li>
        <li className="order-list-item" onClick={() => handleOrderName('desc')}>
          Z to A
        </li>
      </ul>
    </th>
  )
}
