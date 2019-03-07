import ApolloClient from "apollo-client";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";

const URL = "localhost:8080";

const httpLink = createHttpLink({
  uri: `http://${URL}`
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // again this is not how I would want to do this.
  const token = localStorage.getItem("catJWT");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
