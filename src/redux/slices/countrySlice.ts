import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

import { fetchCountry } from '../../utils/country'

export interface Country {
  flags: {
    png: string
  }
  name: string
  languages: [
    {
      name: string
    }
  ]
  population: number
  region: string
}

export const fetchCountryData = createAsyncThunk(
  'country/fetchCountryData',
  async () => {
    const res = await fetchCountry()
    return res.data
  }
)

export interface CountryState {
  countryList: Country[]
  isLoading: boolean
}

const initialState: CountryState = {
  countryList: [
    {
      flags: {
        png: '',
      },
      name: '',
      languages: [
        {
          name: '',
        },
      ],
      population: 0,
      region: '',
    },
  ],
  isLoading: false,
}

export const CountrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountryData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCountryData.fulfilled, (state, action) => {
        state.countryList = action.payload
        state.isLoading = false
      })
  },
})

export default CountrySlice.reducer
