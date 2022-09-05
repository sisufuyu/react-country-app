import React from 'react'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { addCountry } from '../../redux/slices/countrySlice'
import './AddCountryButton.scss'

export default function AddCountryButton({ name }: { name: string }) {
  const dispatch = useAppDispatch()
  const inCart = useAppSelector((state) => state.country.inCart)

  function handleAddClick() {
    dispatch(addCountry({ name }))
  }

  function checkInCart(name: string) {
    return inCart.some((cart) => cart.name === name)
  }

  return (
    <button
      type="button"
      className="add-country-btn"
      onClick={handleAddClick}
      disabled={checkInCart(name)}
    >
      ADD
    </button>
  )
}
