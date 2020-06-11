import React from 'react';
import { render, waitForElementToBeRemoved } from '@testing-library/react';
import App from './App';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from './client';
import { graphql, server } from './testServer';
import userEvent from '@testing-library/user-event';

describe('App', () => {
  it('renders notice if fileSet is true', async () => {
    server.use(
      graphql.query('Build', (req, res, ctx) => {
        return res(
          ctx.data({
            build: {
              id: 1,
              fileSet: true,
              __typename: 'BuildType',
            },
          }),
        );
      }),
    );
    
    const { getByText, queryByText, debug } = render(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>,
    );
    
    await waitForElementToBeRemoved(() => queryByText(/Loading/i));
    debug();
    
    const upload = getByText(/Build file has been set/i);
    expect(upload).toBeInTheDocument();
  });
  
  it('renders upload input if fileSet is false', async () => {
    const { getByLabelText, queryByText } = render(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>,
    );
    
    await waitForElementToBeRemoved(() => queryByText(/Loading/i));
    
    const upload = getByLabelText(/Upload file/i);
    expect(upload).toBeInTheDocument();
  });
  
  it('can upload the file', async () => {
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    
    const { getByLabelText, queryByText, getByText, debug } = render(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>,
    );
    
    await waitForElementToBeRemoved(() => queryByText(/Loading/i));
    
    const input = getByLabelText(/Upload file/i);
    debug()
    userEvent.upload(input, file);
    debug()
    
    await waitForElementToBeRemoved(() => queryByText(/File upload loading/i));
    
    debug()
    expect(getByText(/Build file has been set/i)).toBeInTheDocument();
  });
});
