import { createBrowserRouter, Navigate } from 'react-router-dom';

import { CharacterDetailPage } from '../pages/CharacterDetailPage';
import { CharactersListPage } from '../pages/CharactersListPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { MainLayout } from '../shared/layouts/MainLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="/characters" replace /> },
      {
        path: 'characters',
        element: <CharactersListPage />,
        children: [{ path: ':id', element: <CharacterDetailPage /> }],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
