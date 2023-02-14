import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
  ApolloLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
let token = localStorage.getItem("token");

const httpLink = new HttpLink({
  uri: "https://fsjaq6oup7.execute-api.us-east-1.amazonaws.com/dev/",
});

const authLink = new ApolloLink((o, f) => {
  o.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : null,
    },
  }));

  return f(o);
});
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
}).concat(authLink);

const client = new ApolloClient({
  link: from([authLink, httpLink, errorLink]),
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
