import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { fetchCountriesThunk } from '../../redux/slices/countrySlice'
import TableRow from './TableRow'
import TableHeadName from './TableHeadName'
import TableHeadPopulation from './TableHeadPopulation'
import './CountryTable.scss'

export function CountryTable() {
  const dispatch = useAppDispatch()
  const { countryList, keyword, filteredList } = useAppSelector(
    (state) => state.country
  )

  const displayList = keyword ? filteredList : countryList
  const tableExist = displayList.length >= 1

  useEffect(() => {
    dispatch(fetchCountriesThunk())
  }, [])

  return (
    <table className="country-table">
      <thead>
        <tr>
          <th className="country-table-head">Flag</th>
          <TableHeadName />
          <th className="country-table-head">Languages</th>
          <TableHeadPopulation />
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
  )
}
