import { type RouteObject, Navigate } from 'react-router-dom';
import { lazy } from 'react';
import { OnlyAuth, OnlyUnAuth } from '../ProtectedRoute';
import { pathConstants } from '@/shared/lib/constants/paths';

const HomePage = lazy(() => import('@/pages/HomePage'));
const ErrorPage = lazy(() => import('@/pages/ErrorPage'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
// const RegistrationPage = lazy(() => import('@/pages/RegistrationPage'));
// const CardDetailPage = lazy(() => import('@/pages/CardDetailedPage'));
// const ProfileFavoritesPage = lazy (() => import('@/pages/ProfileFavoritesPage));

const placeholderStyles: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '300px',
  width: '100%',
  margin: '50px 0px',
  backgroundColor: '#f7f7f7',
  border: '2px dashed #cccccc',
  borderRadius: '12px',
  color: '#888888',
  fontSize: '1.25rem',
  fontWeight: 500,
  textAlign: 'center',
  userSelect: 'none'
};

const Placeholder = () => (
  <div style={placeholderStyles}>Страница в разработке</div>
);

export const routeConfig: RouteObject[] = [
  {
    path: pathConstants.MAIN,
    element: <HomePage />
  },
  {
    path: pathConstants.CARD_DETAIL,
    element: <Placeholder />
  },
  {
    path: pathConstants.ERROR_PAGE,
    element: <ErrorPage />
  },
  {
    path: pathConstants.PROFILE,
    element: <OnlyAuth component={<ProfilePage />} />,
    children: [
      {
        index: true,
        element: <Placeholder /> // Заменить на реальную страницу
      },
      {
        path: pathConstants.PROFILE_APPLICATIONS,
        element: <Placeholder /> // Заменить на реальную страницу
      },
      {
        path: pathConstants.PROFILE_EXCHANGES,
        element: <Placeholder /> // Заменить на реальную страницу
      },
      {
        path: pathConstants.PROFILE_FAVORITES,
        element: <Placeholder /> // Заменить на реальную страницу
      },
      {
        path: pathConstants.PROFILE_SKILLS,
        element: <Placeholder /> // Заменить на реальную страницу
      }
    ]
  },
  {
    path: pathConstants.NOT_FOUND,
    element: <Navigate to='/error/404' replace />
  }
];

export const modalRoutesConfig: RouteObject[] = [
  {
    path: pathConstants.LOGIN,
    element: <OnlyUnAuth component={<LoginPage padded={true} />} />
  },
  {
    path: pathConstants.REGISTER,
    element: <OnlyUnAuth component={<Placeholder />} /> // Заменить на реальную страницу
  }
];
