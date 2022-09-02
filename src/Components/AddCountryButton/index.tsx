import React from 'react'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { addCountry } from '../../redux/slices/countrySlice'
import './AddCountryButton.scss'

export default function AddCountryButton({ name }: { name: string }) {
  const dispatch = useAppDispatch()
  const inCart = useAppSelector((state) => state.country.inCart)

  function handleAddClick(name: string) {
    dispatch(addCountry({ name }))
  }

  function checkInCart(name: string) {
    return inCart.find((cart) => cart.name === name) ? true : false
  }

  return (
    <button
      type="button"
      className="add-country-btn"
      onClick={() => handleAddClick(name)}
      disabled={checkInCart(name)}
    >
      ADD
    </button>
  )
}
