import React, { useState } from 'react'

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { Country, fetchCountryThunk } from '../../redux/slices/countrySlice'
import {
  formatNumber,
  concatLangs,
  concatCurrencies,
} from '../../utils/countryService'
import AddCountryButton from '../AddCountryButton'
import './Detail.scss'

export default function Detail({ name }: { name: string }) {
  const country = useAppSelector(
    (state) =>
      state.country.countryList.find((c) => c.name === name) ||
      state.country.currentCountry
  )
  const [error, setError] = useState(false)
  const dispatch = useAppDispatch()

  function displayCountry(country: Country) {
    const {
      name,
      capital,
      region,
      population,
      languages,
      currencies,
      timezones,
      flags,
    } = country

    return (
      <div className="country-detail-container">
        <article className="country-info-container">
          <h1 className="title">{name}</h1>
          <div className="country-info">
            <p>Name: {name}</p>
            <p>Capital: {capital}</p>
            <p>Region: {region}</p>
            <p>Population: {formatNumber(population)}</p>
            <p>Languages: {concatLangs(languages)}</p>
            <p>Currencies: {concatCurrencies(currencies)}</p>
            <p>Timezones: {timezones.join(', ')}</p>
          </div>
          <AddCountryButton name={name} />
        </article>
        <article className="country-flag-container">
          <img src={flags.png} className="country-flag" />
        </article>
      </div>
    )
  }

  if (!country) {
    // console.log('try fetch again')
    dispatch(fetchCountryThunk(name))
      .unwrap()
      .catch(() => {
        setError(true)
      })
  }

  return (
    <div className="country-detail">
      {country && displayCountry(country)}
      {(error || !country) && (
        <p className="country-detail-error">
          Oops, cannot find the country, please try again!
        </p>
      )}
    </div>
  )
}
