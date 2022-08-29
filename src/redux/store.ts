import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit'

import UIReducer, { setTheme } from './slices/ui'
import { initGlobalStyle } from '../utils/theme'

const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  actionCreator: setTheme,
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState() as RootState
    // after setting theme, change global style
    initGlobalStyle(state.UI.defaultTheme)
  },
})

const store = configureStore({
  reducer: {
    UI: UIReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
