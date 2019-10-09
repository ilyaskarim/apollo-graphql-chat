import ApolloClient from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getMainDefinition } from 'apollo-utilities';

export const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql", // use https for secure endpoint
});

// Create a WebSocket link:
export const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000/subscriptions", // use wss for a secure endpoint
  options: {
    reconnect: true
  }
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
export const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

// Instantiate client
export const client = new ApolloClient({
  link,
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache()
})