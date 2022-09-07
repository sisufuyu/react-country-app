import React from 'react'

import TableRow from '../TableRow'
import TableHeadName from '../TableHeadName'
import TableHeadPopulation from '../TableHeadPopulation'
import { Country } from '../../../redux/slices/countrySlice'

export default function Table({ data }: { data: Country[] }) {
  return (
    <table className="country-table">
      <thead>
        <tr>
          <th className="country-table-head table-head-flag">Flag</th>
          <TableHeadName />
          <th className="country-table-head table-head-languages">Languages</th>
          <TableHeadPopulation />
          <th className="country-table-head table-head-region">Region</th>
          <th className="country-table-head table-head-button"></th>
        </tr>
      </thead>
      <tbody>
        {data.map((country) => (
          <TableRow country={country} key={country.name} />
        ))}
      </tbody>
    </table>
  )
}
