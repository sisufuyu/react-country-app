import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpLong } from '@fortawesome/free-solid-svg-icons'

import { useAppSelector } from '../../redux/hooks'
import TableRow from './TableRow'
import './Main.scss'

export default function Main() {
  const { countryList, isLoading } = useAppSelector((state) => state.country)
  const tableExist = countryList.length > 1

  return (
    <main className="main">
      {isLoading && <h1 className="loading-text">Loading...</h1>}
      {tableExist && (
        <table className="country-table">
          <thead>
            <tr>
              <th className="country-table-head">Flag</th>
              <th className="country-table-head">
                <span className="thead-text">Name</span>
                <FontAwesomeIcon
                  icon={faUpLong}
                  className="sort-name-icon-up icon"
                />
              </th>
              <th className="country-table-head">Languages</th>
              <th className="country-table-head">Population</th>
              <th className="country-table-head">Region</th>
              <th className="country-table-head"></th>
            </tr>
          </thead>
          <tbody>
            {countryList.map((country) => (
              <TableRow key={country.name} country={country} />
            ))}
          </tbody>
        </table>
      )}
    </main>
  )
}
