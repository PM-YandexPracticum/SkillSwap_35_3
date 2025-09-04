import { type RouteObject, Navigate } from 'react-router-dom';
import { lazy } from 'react';
import { OnlyAuth, OnlyUnAuth } from '../ProtectedRoute';
import { pathConstants } from '@/shared/lib/constants/paths';
import ProfileForm from '@/features/auth/ProfileForm/ProfileForm';

const HomePage = lazy(() => import('@/pages/HomePage'));
const ErrorPage = lazy(() => import('@/pages/ErrorPage'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const ProfileFavoritesPage = lazy(() => import('@/pages/ProfileFavoritesPage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
// const RegistrationPage = lazy(() => import('@/pages/RegistrationPage'));
const CardDetailPage = lazy(() => import('@/pages/CardDetailPage'));
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
    element: <CardDetailPage />
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
        element: <ProfileForm />
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
        element: <ProfileFavoritesPage />
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
    element: (
      <OnlyUnAuth
        component={
          <RegistrationPage
            handleClose={() => console.log(1)}
            formData={{
              email: '',
              password: '',
              name: '',
              gender: 'default',
              date: '',
              city: '',
              skills: [],
              subSkills: '',
              abilityTitle: '',
              abilityOption: '',
              subAbilityOption: '',
              description: '',
              files: [],
              avatar: ''
            }}
            city={[
              { value: 'spb', label: 'Санкт-Петербург' },
              { value: 'samara', label: 'Самара' },
              { value: 'saratov', label: 'Саратов' }
            ]}
            gender={[
              { value: 'default', label: 'Не указан' },
              { value: 'male', label: 'Мужской' },
              { value: 'female', label: 'Женский' }
            ]}
            skills={[
              { value: '1', label: 'Бизнес и карьера' },
              { value: '2', label: 'Творчество и искусство' },
              { value: '3', label: 'Иностранные языки' },
              { value: '4', label: 'Здоровье и лайфстайл' },
              { value: '5', label: 'Дом и уют' }
            ]}
            subSkills={[
              { value: '1', label: 'Рисование и иллюстрация' },
              { value: '2', label: 'Фотография' },
              { value: '3', label: 'Видеомонтаж' },
              { value: '4', label: 'Музыка и звук' },
              { value: '5', label: 'Актёрское мастерство' },
              { value: '6', label: 'Креативное письмо' },
              { value: '7', label: 'Арт-терапия' },
              { value: '8', label: 'Декор и DIY' }
            ]}
          />
        }
      />
    ) // Заменить на реальную страницу
  }
];
