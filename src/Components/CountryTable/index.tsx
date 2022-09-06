import React, { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { Country, fetchCountriesThunk } from '../../redux/slices/countrySlice'
import TableRow from './TableRow'
import TableHeadName from './TableHeadName'
import TableHeadPopulation from './TableHeadPopulation'
import './CountryTable.scss'

function sliceData(data: Country[], page: number, rowsPerPage: number) {
  const start = (page - 1) * rowsPerPage
  const end = page * rowsPerPage
  return {
    start: start + 1,
    end,
    sliceList: data.slice(start, end),
  }
}

export function CountryTable() {
  const dispatch = useAppDispatch()
  const { filteredList } = useAppSelector((state) => state.country)
  const [page, setPage] = useState(1)
  const totalLength = filteredList.length

  const tableExist = totalLength >= 1

  useEffect(() => {
    if (!tableExist) {
      dispatch(fetchCountriesThunk())
    }
  }, [])

  const rowsPerPage = 10
  const pages = Math.ceil(totalLength / rowsPerPage)
  const { start, end, sliceList } = sliceData(filteredList, page, rowsPerPage)

  const changePage = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    setPage(Number(target.value))
  }

  return (
    <div>
      <table className="country-table">
        <thead>
          <tr>
            <th className="country-table-head table-head-flag">Flag</th>
            <TableHeadName />
            <th className="country-table-head table-head-languages">
              Languages
            </th>
            <TableHeadPopulation />
            <th className="country-table-head table-head-region">Region</th>
            <th className="country-table-head table-head-button"></th>
          </tr>
        </thead>
        {sliceList && (
          <tbody>
            {sliceList.map((country) => (
              <TableRow country={country} key={country.name} />
            ))}
          </tbody>
        )}
      </table>
      <div>
        showing {start} to {end} of {totalLength}
        Page
        <input
          type="number"
          min="1"
          max={pages}
          value={page}
          onChange={changePage}
        />
      </div>
    </div>
  )
}
