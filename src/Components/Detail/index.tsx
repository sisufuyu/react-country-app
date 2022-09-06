import React, { useEffect, useMemo } from 'react'

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { Country, fetchCountryThunk } from '../../redux/slices/countrySlice'
import { formatNumber, concatLangs, concatCurrencies } from '../../utils/ui'
import AddCountryButton from '../AddCountryButton'
import './Detail.scss'

export default function Detail({ name }: { name: string }) {
  const country = useAppSelector(
    (state) =>
      state.country.countryList.find((c) => c.name === name) ||
      state.country.currentCountry
  )
  const { isLoading, error } = useAppSelector((state) => state.country)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!country) {
      dispatch(fetchCountryThunk(name))
    }
  }, [])

  function displayCountry(country: Country) {
    if (!country) return null

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

  const displayCountryMemo = useMemo(
    () => displayCountry(country as Country),
    [country]
  )

  return (
    <div className="country-detail">
      {(error || !country) && <p className="error">{error}</p>}
      {isLoading && <h1 className="loading-text">Loading...</h1>}
      {displayCountryMemo}
    </div>
  )
}
