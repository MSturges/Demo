import ApolloClient from "apollo-boost";

const URL = "localhost:8080";

export const client = new ApolloClient({
  uri: `http://${URL}`
});
