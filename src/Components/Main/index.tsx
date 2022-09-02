import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpLong } from '@fortawesome/free-solid-svg-icons'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { fetchCountriesThunk } from '../../redux/slices/countrySlice'
import TableRow from './TableRow'
import './Main.scss'

export default function Main() {
  const dispatch = useAppDispatch()
  const { countryList, isLoading, error, keyword, filteredList } =
    useAppSelector((state) => state.country)

  const displayList = keyword ? filteredList : countryList
  const tableExist = displayList.length >= 1

  useEffect(() => {
    dispatch(fetchCountriesThunk())
  }, [])

  return (
    <main className="main">
      {error && <p className="error">{error}</p>}
      {isLoading && <h1 className="loading-text">Loading...</h1>}
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
        {tableExist && (
          <tbody>
            {displayList.map((country) => (
              <TableRow country={country} key={country.name} />
            ))}
          </tbody>
        )}
      </table>
    </main>
  )
}
