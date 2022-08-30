import React from 'react'
import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from './redux/hooks'
import { fetchCountryData } from './redux/slices/countrySlice'
import Routes from './Routes'
import './App.css'

export default function App() {
  const dispatch = useAppDispatch()
  const theme = useAppSelector((state) => state.UI.defaultTheme)

  useEffect(() => {
    dispatch(fetchCountryData())
  }, [])

  return (
    <div className="App" data-theme={theme}>
      <Routes />
    </div>
  )
}
