import React from 'react'

import { useAppSelector } from '../../redux/hooks'
import { formatNumber } from '../../utils/country'
import './Detail.scss'

interface Language {
  name: string
}

interface Currency {
  name: string
  symbol: string
}

const concatLangs = (langs: Language[]): string => {
  let str = ''
  langs.forEach((lang, index) => {
    if (index === 0) {
      str = lang.name
    } else {
      str += ', ' + lang.name
    }
  })
  return str
}

const concatCurrencies = (currs: Currency[]): string => {
  let str = ''
  currs.forEach((curr, index) => {
    if (index === 0) {
      str = `${curr.name} (${curr.symbol})`
    } else {
      str += `, ${curr.name} (${curr.symbol})`
    }
  })
  return str
}

export default function Detail({ name }: { name: string }) {
  const country = useAppSelector((state) =>
    state.country.countryList.find((c) => c.name === name)
  )

  if (!country) {
    return (
      <p className="country-detail-error">
        Oops, cannot find the country. Please try again!
      </p>
    )
  }

  return (
    <div className="country-detail-container">
      <article className="country-indo-container">
        <h1 className="title">{country.name}</h1>
        <p className="country-info">Name: {country.name}</p>
        <p className="country-info">Capital: {country.capital}</p>
        <p className="country-info">Region: {country.region}</p>
        <p className="country-info">
          Population: {formatNumber(country.population)}
        </p>
        <p className="country-info">
          Languages: {concatLangs(country.languages)}
        </p>
        <p className="country-info">
          Currencies: {concatCurrencies(country.currencies)}
        </p>
        <p className="country-info">
          Timezones: {country.timezones.join(', ')}
        </p>
      </article>
      <article className="country-flag-container">
        <img src={country.flags.png} className="country-flag" />
      </article>
    </div>
  )
}
