import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import gql from 'graphql-tag';

if (process.env.NODE_ENV === 'development') {
  require('./mocks');
}

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:8080/graphql',
});

const client = new ApolloClient({
  cache,
  link
})

const GET_USER_DETAIL = gql`
  query GetUserDetail {
    user {
      firstName
      lastName
    }
  }
`

client.query({
  query: GET_USER_DETAIL
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
