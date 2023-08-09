// import '@/styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apollo'
import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState || {})

  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <title>Teste Férias</title>
      </Head>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  )
}
