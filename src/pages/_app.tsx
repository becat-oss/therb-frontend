import { ApolloClient,InMemoryCache,ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/dist/next-server/lib/router/router';

const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache
});

function MyApp({Component,pageProps}:AppProps) {
  return(
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp;