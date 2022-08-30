import React from 'react'
import { useEffect } from 'react'

import { initGlobalStyle } from './utils/theme'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { fetchCountryData } from './redux/slices/countrySlice'

import Routes from './Routes'

export default function App() {
  const dispatch = useAppDispatch()
  const theme = useAppSelector((state) => state.UI.defaultTheme)

  useEffect(() => {
    dispatch(fetchCountryData())
  }, [])

  useEffect(() => {
    initGlobalStyle(theme)
  }, [theme])

  return (
    <>
      <Routes />
    </>
  )
}
