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

interface inCartProps {
  name: string
}

export const fetchCountriesThunk = createAsyncThunk(
  'country/fetchCountries',
  async () => {
    const res = await fetchCountries()
    return res.data
  }
)

export const fetchCountryThunk = createAsyncThunk(
  'country/fetchCountryThunk',
  async (name: string) => {
    // console.log('fetch country thunk')
    const res = await fetchCountry(name)
    return res.data[0]
  }
)

export interface CountryState {
  countryList: Country[]
  isLoading: boolean
  inCart: inCartProps[]
  error: string
  keyword: string
  filteredList: Country[]
  currentCountry: Country | null
}

// const initialCountry: Country = {
//   name: '',
//   capital: '',
//   region: '',
//   population: 0,
//   timezones: [''],
//   flags: {
//     png: '',
//   },
//   currencies: [
//     {
//       name: '',
//       symbol: '',
//     },
//   ],
//   languages: [
//     {
//       name: '',
//     },
//   ]
// }

const initialState: CountryState = {
  countryList: [],
  isLoading: false,
  inCart: [],
  error: '',
  keyword: '',
  filteredList: [],
  currentCountry: null,
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
    searchCountries: (state, action: PayloadAction<string>) => {
      const keyword = action.payload.toLocaleLowerCase()
      state.keyword = keyword
      const list = state.countryList.filter(
        (country) => country.name.toLocaleLowerCase().indexOf(keyword) !== -1
      )
      state.filteredList = list
    },
    orderCountriesByName: (state, action: PayloadAction<string>) => {
      const order = action.payload
      if (order === 'asc') {
        state.countryList.sort(function (a, b) {
          return a.name.localeCompare(b.name)
        })
      } else if (order === 'desc') {
        state.countryList.sort(function (a, b) {
          return a.name.localeCompare(b.name)
        })
        state.countryList.reverse()
      }
    },
    orderCountriesByPopulation: (state, action: PayloadAction<string>) => {
      const order = action.payload
      if (order === 'asc') {
        state.countryList.sort(function (a, b) {
          return a.population - b.population
        })
      } else if (order === 'desc') {
        state.countryList.sort(function (a, b) {
          return b.population - a.population
        })
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountriesThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCountriesThunk.fulfilled, (state, action) => {
        state.countryList = action.payload
        state.isLoading = false
      })
      .addCase(fetchCountriesThunk.rejected, (state) => {
        state.isLoading = false
        state.error = 'Something wrong happened, please try again!'
      })
      .addCase(fetchCountryThunk.fulfilled, (state, action) => {
        state.currentCountry = action.payload
      })
  },
})

export const {
  addCountry,
  deleteCountry,
  searchCountries,
  orderCountriesByName,
  orderCountriesByPopulation,
} = CountrySlice.actions
export default CountrySlice.reducer
