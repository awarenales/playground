// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { Suspense } from 'react'

import '../styles/globals.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Suspense fallback="Carregando...">
        <Component {...pageProps} />
      </Suspense>
    </ChakraProvider>
  )
}
