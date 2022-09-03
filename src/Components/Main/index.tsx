import React from 'react'

import { useAppSelector } from '../../redux/hooks'
import { CountryTable } from '../CountryTable'
import './Main.scss'

export default function Main() {
  const { isLoading, error } = useAppSelector((state) => state.country)

  return (
    <main className="main">
      {error && <p className="error">{error}</p>}
      {isLoading && <h1 className="loading-text">Loading...</h1>}
      <CountryTable />
    </main>
  )
}
