import React from 'react'

import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { addCountry } from '../../../redux/slices/countrySlice'
import { Country } from '../../../redux/slices/countrySlice'
import { formatNumber } from '../../../utils/country'
import './TableRow.scss'

export default function TableRow({ country }: { country: Country }) {
  const dispatch = useAppDispatch()
  const inCart = useAppSelector((state) => state.country.inCart)

  function hanldeRowClick(event: React.MouseEvent, name: string) {
    event.stopPropagation()
    window.location.href = `/country/${name}`
  }

  function handleAddClick(event: React.MouseEvent, name: string) {
    event.stopPropagation()
    dispatch(addCountry({ name }))
  }

  function checkInCart(name: string) {
    return inCart.find((cart) => cart.name === name) ? true : false
  }

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
          onClick={(event) => handleAddClick(event, country.name)}
          disabled={checkInCart(country.name)}
        >
          ADD
        </button>
      </td>
    </tr>
  )
}
