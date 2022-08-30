import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import UIReducer from './slices/UISlice'
import countryReducer from './slices/countrySlice'

const store = configureStore({
  reducer: {
    UI: UIReducer,
    country: countryReducer,
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
