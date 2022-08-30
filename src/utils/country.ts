import axios from 'axios'

export async function fetchCountry() {
  const fileds = 'name,languages,flags,population,region'
  const res = await axios.get(
    `https://restcountries.com/v2/all?fields=${fileds}`
  )
  return res
}
