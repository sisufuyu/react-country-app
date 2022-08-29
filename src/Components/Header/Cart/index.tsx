import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

import './Cart.scss'

export default function Cart() {
  return (
    <div className="cart">
      <div className="cart-icon-container">
        <FontAwesomeIcon icon={faCartShopping} className="icon cart-icon" />
      </div>
      <div className="cart-number">0</div>
    </div>
  )
}
