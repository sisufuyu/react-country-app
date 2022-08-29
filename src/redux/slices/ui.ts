import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { Theme } from '../../types'

export interface UIState {
  defaultTheme: Theme
}

const initialState: UIState = {
  defaultTheme: Theme.Purple,
}

export const UISlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.defaultTheme = action.payload
    },
  },
})

export const { setTheme } = UISlice.actions
export default UISlice.reducer
