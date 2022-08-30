import {
  configureStore,
  createListenerMiddleware,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit'

import UIReducer, { setTheme } from './slices/UISlice'
import { initGlobalStyle } from '../utils/theme'
import countryReducer from './slices/countrySlice'

const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  actionCreator: setTheme,
  effect: async (action, listenerApi) => {
    const state = (await listenerApi.getState()) as RootState
    // after setting theme, change global style
    // initGlobalStyle(state.UI.defaultTheme as string)
  },
})

const store = configureStore({
  reducer: {
    UI: UIReducer,
    country: countryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
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
