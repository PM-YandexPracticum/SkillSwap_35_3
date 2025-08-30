import { type RouteProps, Navigate } from 'react-router-dom';
import { lazy } from 'react';
import { pathConstants } from '@/shared/lib/constants/paths';

const HomePage = lazy(() => import('@/pages/HomePage'));
const ErrorPage = lazy(() => import('@/pages/ErrorPage'));

// const LoginPage = lazy (() => import ('@pages/LoginPage'));
// const RegistrationPage = lazy(() => import('@/pages/RegistrationPage'));
// const CardDetailPage = lazy(() => import('@/pages/CardDetailedPage'));
// const ProfilePage = lazy(() => import('@/pages/ProfilePage'));

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

export const routeConfig: RouteProps[] = [
  {
    path: pathConstants.MAIN,
    element: <HomePage />
  },
  {
    path: pathConstants.REGISTER,
    element: <Placeholder />
  },
  {
    path: pathConstants.LOGIN,
    element: <Placeholder />
  },
  {
    path: pathConstants.CARD,
    element: <Placeholder />
  },
  {
    path: pathConstants.PROFILE,
    element: <Placeholder />
  },
  {
    path: pathConstants.ERROR_PAGE,
    element: <ErrorPage />
  },
  {
    path: pathConstants.NOT_FOUND,
    element: <Navigate to='/error/404' replace />
  }
];
