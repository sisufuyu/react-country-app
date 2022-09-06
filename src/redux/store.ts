import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import UIReducer from './slices/UISlice'
import countryReducer from './slices/countrySlice'
import cartReducer from './slices/cartSlice'

const store = configureStore({
  reducer: {
    UI: UIReducer,
    country: countryReducer,
    cart: cartReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
export default store
