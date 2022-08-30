import React from 'react'
import { useParams } from 'react-router-dom'

import Header from '../Components/Header'

export default function Country() {
  const { name } = useParams<{ name: string }>()

  return (
    <>
      <Header />
      <h2>{name}</h2>
    </>
  )
}
