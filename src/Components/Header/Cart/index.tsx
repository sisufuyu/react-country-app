import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faTrashCan } from '@fortawesome/free-solid-svg-icons'

import { useAppSelector, useAppDispatch } from '../../../redux/hooks'
import { deleteCountry } from '../../../redux/slices/cartSlice'
import './Cart.scss'

export default function Cart() {
  const inCart = useAppSelector((state) => state.cart.inCart)
  const dispatch = useAppDispatch()
  const [cartOpen, setCartOpen] = useState(false)

  function HandleDeleteClick(name: string) {
    dispatch(deleteCountry(name))
  }

  return (
    <div className="cart">
      <div
        className="cart-icon-container"
        onClick={() => setCartOpen(!cartOpen)}
      >
        <FontAwesomeIcon icon={faCartShopping} className="icon cart-icon" />
        <div className="cart-number">{inCart.length}</div>
      </div>
      <ul className={`cart-list ${cartOpen ? 'active' : ''}`}>
        {inCart.map((country) => (
          <li key={country.name} className="cart-list-item">
            <Link to={`/country/${country.name}`}>{country.name}</Link>
            <FontAwesomeIcon
              icon={faTrashCan}
              className="icon delete-icon"
              onClick={() => HandleDeleteClick(country.name)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
