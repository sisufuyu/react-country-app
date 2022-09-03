import axios from 'axios'

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
