const React = require("react");
const { AuthProvider } = require("./auth-context");
const {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} = require("@apollo/client");
const fetch = require("isomorphic-fetch");

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://gatsby-faunadb.netlify.app/.netlify/functions/graphql",
    fetch,
  }),
});
module.exports = ({ element }) => (
  <AuthProvider>
    <ApolloProvider client={client}>{element}</ApolloProvider>
  </AuthProvider>
);
