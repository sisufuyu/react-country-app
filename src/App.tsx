import React from 'react'

import { useAppSelector } from './redux/hooks'
import Routes from './Routes'
import './App.css'

export default function App() {
  const theme = useAppSelector((state) => state.UI.defaultTheme)

  return (
    <div className="App" data-theme={theme}>
      <Routes />
    </div>
  )
}
