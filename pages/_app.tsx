// pages/_app.js
import { ChakraProvider } from "@chakra-ui/react"
import type { AppProps } from "next/app"

import "../styles/globals.css"

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
