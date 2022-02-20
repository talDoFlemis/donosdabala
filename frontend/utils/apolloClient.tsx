import { ApolloClient, InMemoryCache } from "@apollo/client"

const apolloClient = new ApolloClient({
  uri: process.env.STRAPI_DB_URL,
  cache: new InMemoryCache(),
})

export default apolloClient
