import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { Country } from './countrySlice'

type inCartProps = Pick<Country, 'name'>

export interface CartState {
  inCart: inCartProps[]
}

const initialState: CartState = {
  inCart: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCountry: (state, action: PayloadAction<inCartProps>) => {
      const countryExist = state.inCart.find(
        (c) => c.name === action.payload.name
      )
      if (!countryExist) {
        state.inCart = [...state.inCart, action.payload]
      }
    },
    deleteCountry: (state, action: PayloadAction<string>) => {
      state.inCart = state.inCart.filter((c) => c.name !== action.payload)
    },
  },
})

export const { addCountry, deleteCountry } = cartSlice.actions
export default cartSlice.reducer
