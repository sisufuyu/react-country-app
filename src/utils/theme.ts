import { Theme } from '../types'

export const themeList = Object.values(Theme)

export function addCSS(href: string) {
  const link = document.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('href', href)
  const headElement = document.querySelector('head')
  headElement?.appendChild(link)
}

export function deleteCSS(href: string) {
  const link = document.querySelectorAll("link[rel='stylesheet']")
  const headElement = document.querySelector('head')
  for (let i = 0; i < link.length; i++) {
    if (link[i].getAttribute('href') === href) {
      headElement?.removeChild(link[i])
    }
  }
}

export function removeAllCSS() {
  themeList.forEach((theme) => deleteCSS(`styles/themes/${theme}_theme.css`))
}

// function assertNever(value: never): never {
//   throw new Error(`unexpected value: ${JSON.stringify(value)}`)
// }

export function initGlobalStyle(theme: Theme) {
  console.log('add theme', theme)
  removeAllCSS()
  addCSS(`styles/themes/${theme}_theme.css`)
}
