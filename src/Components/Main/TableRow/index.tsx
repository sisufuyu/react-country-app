import React from 'react'
import { Link } from 'react-router-dom'

import { Country } from '../../../redux/slices/countrySlice'
import './TableRow.scss'

function formatNumber(num: number) {
  if (num <= 1000) {
    return num
  }

  let left = num
  let str = ''
  let remainder = 0

  while (left > 1000) {
    remainder = left % 1000
    str = `,${remainder}${str}`
    left = Math.floor(left / 1000)
    if (left <= 1000) {
      return `${left}${str}`
    }
  }
}

function hanldeRowClick(event: React.MouseEvent, name: string) {
  event.stopPropagation()
  window.location.href = `/country/${name}`
}

function handleAddClick(event: React.MouseEvent) {
  event.stopPropagation()
  console.log('click add button')
}

export default function TableRow({ country }: { country: Country }) {
  return (
    <tr
      key={country.name}
      className="country-table-row"
      onClick={(event) => hanldeRowClick(event, country.name)}
    >
      <td className="country-flag">
        <img src={country.flags.png} className="country-flag-img" />
      </td>
      <td className="country-name">{country.name}</td>
      <td className="country-languages">
        <ul className="country-languages-list">
          {country.languages.map((lang) => (
            <li key={lang.name} className="country-languages-item">
              {lang.name}
            </li>
          ))}
        </ul>
      </td>
      <td className="country-population">{formatNumber(country.population)}</td>
      <td className="country-region">{country.region}</td>
      <td>
        <button
          type="button"
          className="add-country-btn"
          onClick={handleAddClick}
        >
          ADD
        </button>
      </td>
    </tr>
  )
}
