import { ApolloProvider } from '@apollo/client/react';
import { RouterProvider } from 'react-router-dom';

import { router } from './routes';
import { apolloClient } from './shared/lib/apollo/client';

export function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}