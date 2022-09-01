import axios from 'axios'

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

export async function fetchCountry() {
  const fileds =
    'name,capital,languages,flags,population,region,timezones,currencies'
  const res = await axios.get(
    `https://restcountries.com/v2/all?fields=${fileds}`
  )
  return res
}
