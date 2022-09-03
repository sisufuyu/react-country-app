export interface Language {
  name: string
}

export interface Currency {
  name: string
  symbol: string
}

export function formatNumber(num: number) {
  let str = String(num)
  let subStr = ''
  while (str.length > 0) {
    if (subStr) subStr = str.slice(-3) + ',' + subStr
    else subStr = str.slice(-3)
    str = str.slice(0, -3)
  }
  return subStr
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
