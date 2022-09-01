import React from 'react'
import { useParams } from 'react-router-dom'

import Header from '../Components/Header'
import Detail from '../Components/Detail'

export default function Country() {
  const { name } = useParams<{ name: string }>()

  return (
    <>
      <Header />
      <Detail name={name} />
    </>
  )
}
