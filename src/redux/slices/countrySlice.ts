import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { fetchCountries, fetchCountry } from '../../utils/countryService'

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

export const fetchCountriesThunk = createAsyncThunk(
  'country/fetchCountries',
  async () => {
    const res = await fetchCountries()
    return res.data
  }
)

export const fetchCountryThunk = createAsyncThunk(
  'country/fetchCountry',
  async (name: string) => {
    const res = await fetchCountry(name)
    return res.data[0]
  }
)

export interface CountryState {
  countryList: Country[]
  isLoading: boolean
  error: string
  filteredList: Country[]
  currentCountry: Country | null
}

const initialState: CountryState = {
  countryList: [],
  isLoading: false,
  error: '',
  filteredList: [],
  currentCountry: null,
}

export const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    searchCountries: (state, action: PayloadAction<string>) => {
      const keyword = action.payload.toLocaleLowerCase()
      const list = state.countryList.filter((country) =>
        country.name.toLocaleLowerCase().startsWith(keyword)
      )
      state.filteredList = list
    },
    orderCountriesByName: (state, action: PayloadAction<string>) => {
      const order = action.payload
      const list = [...state.filteredList]
      list.sort(function (a, b) {
        return a.name.localeCompare(b.name)
      })
      if (order === 'desc') {
        list.reverse()
      }
      state.filteredList = list
    },
    orderCountriesByPopulation: (state, action: PayloadAction<string>) => {
      const order = action.payload
      const list = [...state.filteredList]
      if (order === 'asc') {
        list.sort(function (a, b) {
          return a.population - b.population
        })
      } else if (order === 'desc') {
        list.sort(function (a, b) {
          return b.population - a.population
        })
      }
      state.filteredList = list
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountriesThunk.pending, (state) => {
        state.isLoading = true
        state.error = ''
      })
      .addCase(fetchCountriesThunk.fulfilled, (state, action) => {
        state.countryList = action.payload
        state.filteredList = action.payload
        state.isLoading = false
        state.error = ''
      })
      .addCase(fetchCountriesThunk.rejected, (state) => {
        state.isLoading = false
        state.error = 'Something wrong happened, please try again!'
      })
      .addCase(fetchCountryThunk.pending, (state) => {
        state.isLoading = true
        state.error = ''
      })
      .addCase(fetchCountryThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentCountry = action.payload
        state.error = ''
      })
      .addCase(fetchCountryThunk.rejected, (state) => {
        state.isLoading = false
        state.error = 'Oops, cannot find the country, please try again!'
      })
  },
})

export const {
  searchCountries,
  orderCountriesByName,
  orderCountriesByPopulation,
} = countrySlice.actions
export default countrySlice.reducer
