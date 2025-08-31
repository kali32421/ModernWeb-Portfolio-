import { useLayoutEffect } from 'react'

import RenderFooter from '@components/footer'
import '@styles/global.scss'
import debounce from 'lodash.debounce'
import { ThemeProvider } from 'next-themes'
import Router from 'next/router'
import nprogress from 'nprogress'
import '../styles/terrarian.css'

const start = debounce(nprogress.start, 500)
Router.events.on('routeChangeStart', start)
Router.events.on('routeChangeComplete', () => {
  start.cancel()
  nprogress.done()
  window.scrollTo(0, 0)
})
Router.events.on('routeChangeError', () => {
  start.cancel()
  nprogress.done()
})

const MyApp = ({ Component, pageProps }) => {
  useLayoutEffect(() => {
    document.addEventListener('keydown', function(event) {
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault()
      }
    })
  }, [])
  return (
    <ThemeProvider defaultTheme="system">
      <Component {...pageProps} />
      <RenderFooter />
    </ThemeProvider>
  )
}
export default MyApp
