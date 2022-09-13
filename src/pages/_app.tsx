import { ApolloClient,InMemoryCache,ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import Layout from 'src/components/Layout';

const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache
});

function MyApp({Component,pageProps}:AppProps) {
  return(
    <ApolloProvider client={client}>
      <Layout><Component {...pageProps} /></Layout>
    </ApolloProvider>
  )
}

export default MyApp;