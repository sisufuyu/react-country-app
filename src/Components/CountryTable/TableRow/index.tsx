import React from 'react'
import { Link } from 'react-router-dom'

import { Country } from '../../../redux/slices/countrySlice'
import { formatNumber } from '../../../utils/ui'
import AddCountryButton from '../../AddCountryButton'

export default function TableRow({ country }: { country: Country }) {
  const { name, region, population, languages, flags } = country

  return (
    <tr key={name} className="country-table-row">
      <td className="country-flag">
        <img src={flags.png} className="country-flag-img" />
        <Link to={`/country/${name}`} className="row-link"></Link>
      </td>
      <td className="country-name">
        {name}
        <Link to={`/country/${name}`} className="row-link"></Link>
      </td>
      <td className="country-languages">
        <ul className="country-languages-list">
          {languages.map((lang) => (
            <li key={lang.name} className="country-languages-item">
              {lang.name}
            </li>
          ))}
        </ul>
        <Link to={`/country/${name}`} className="row-link"></Link>
      </td>
      <td className="country-population">
        {formatNumber(population)}
        <Link to={`/country/${name}`} className="row-link"></Link>
      </td>
      <td className="country-region">
        {region}
        <Link to={`/country/${name}`} className="row-link"></Link>
      </td>
      <td className="country-btn">
        <AddCountryButton name={name} />
      </td>
    </tr>
  )
}
