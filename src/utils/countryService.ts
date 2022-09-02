import axios from 'axios'

export interface Language {
  name: string
}

export interface Currency {
  name: string
  symbol: string
}

export function formatNumber(num: number) {
  if (num <= 1000) {
    return num
  }

  let left = num
  let str = ''
  let remainder = 0

  while (left > 1000) {
    remainder = left % 1000
    str = `,${remainder}${str}`
    left = Math.floor(left / 1000)
    if (left <= 1000) {
      return `${left}${str}`
    }
  }
}

export const concatLangs = (langs: Language[]): string => {
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

export const concatCurrencies = (currs: Currency[]): string => {
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

export async function fetchCountries() {
  const fileds =
    'name,capital,languages,flags,population,region,timezones,currencies'
  const res = await axios.get(
    `https://restcountries.com/v2/all?fields=${fileds}`
  )
  return res
}

export async function fetchCountry(name: string) {
  const fileds =
    'name,capital,languages,flags,population,region,timezones,currencies'
  const res = await axios.get(
    `https://restcountries.com/v2/name/${name}?fullText=true&fields=${fileds}`
  )
  return res
}
