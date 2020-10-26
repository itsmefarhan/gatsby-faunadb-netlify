const React = require("react");
const { AuthProvider } = require("./auth-context");
const {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} = require("@apollo/client");
const fetch = require("isomorphic-fetch");
const { setContext } = require("apollo-link-context");
const netlifyIdentitfy = require("netlify-identity-widget");

const authLink = setContext((_, { headers }) => {
  const user = netlifyIdentitfy.currentUser();
  const token = user.token.access_token;
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const httpLink = new HttpLink({
  uri: "https://gatsby-faunadb.netlify.app/.netlify/functions/graphql",
  fetch,
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});
module.exports = ({ element }) => (
  <AuthProvider>
    <ApolloProvider client={client}>{element}</ApolloProvider>
  </AuthProvider>
);
