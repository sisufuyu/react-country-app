import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export enum Theme {
  Purple = 'purple',
  Blue = 'blue',
  Green = 'green',
  Red = 'red',
}

export interface UIState {
  defaultTheme: Theme
}

const initialState: UIState = {
  defaultTheme:
    (localStorage.getItem('country-app-theme') as Theme) || Theme.Purple,
}

export const UISlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.defaultTheme = action.payload
      localStorage.setItem('country-app-theme', action.payload)
    },
  },
})

export const { setTheme } = UISlice.actions
export default UISlice.reducer
