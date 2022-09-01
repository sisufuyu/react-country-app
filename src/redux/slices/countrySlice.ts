import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { fetchCountry } from '../../utils/country'

export interface Country {
  name: string
  capital: string
  region: string
  population: number
  timezones: string[]
  flags: {
    png: string
  }
  currencies: [
    {
      name: string
      symbol: string
    }
  ]
  languages: [
    {
      name: string
    }
  ]
}

interface inCartProps {
  name: string
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
  inCart: inCartProps[]
}

const initialState: CountryState = {
  countryList: [
    {
      name: '',
      capital: '',
      region: '',
      population: 0,
      timezones: [''],
      flags: {
        png: '',
      },
      currencies: [
        {
          name: '',
          symbol: '',
        },
      ],
      languages: [
        {
          name: '',
        },
      ],
    },
  ],
  isLoading: false,
  inCart: [],
}

export const CountrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    addCountry: (state, action: PayloadAction<inCartProps>) => {
      const countryExist = state.inCart.find(
        (c) => c.name === action.payload.name
      )
      if (!countryExist) {
        state.inCart.push(action.payload)
      }
    },
    deleteCountry: (state, action: PayloadAction<string>) => {
      const index = state.inCart.findIndex((c) => c.name === action.payload)
      if (index >= 0) {
        state.inCart.splice(index, 1)
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountryData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCountryData.fulfilled, (state, action) => {
        state.countryList = action.payload
        state.isLoading = false
      })
      .addCase(fetchCountryData.rejected, (state) => {
        state.isLoading = false
        console.log('fetch data error')
      })
  },
})

export const { addCountry, deleteCountry } = CountrySlice.actions
export default CountrySlice.reducer
