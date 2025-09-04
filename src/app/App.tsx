import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Suspense, useEffect } from 'react';
import {
  routeConfig,
  modalRoutesConfig
} from './providers/router/config/routeConfig';
import {
  selectIsAuthenticated,
  selectAuthUser
} from '@/features/auth/selectors/authSelectors';
import {
  initializeLikes,
  clearAllLikes
} from '@/features/favorites/slices/likeSlice';
import { loadLikesFromStorage } from '@/features/favorites/middleware/likesMiddleware';
import { AppLayout } from './AppLayout';
import { FullScreenModal } from '@/shared/ui';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';

import './styles/index.css';

export const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectAuthUser);

  const background = location.state && location.state.background;

  useEffect(() => {
    if (background) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [background]);

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      const likes = loadLikesFromStorage(user.id);
      dispatch(initializeLikes(likes));
    } else {
      dispatch(clearAllLikes());
    }
  }, [isAuthenticated, user?.id, dispatch]);

  const handleCloseModal = () => {
    navigate(-1);
  };

  return (
    <Suspense fallback={<div>Загрузка страницы...</div>}>
      <Routes location={background || location}>
        <Route path='/' element={<AppLayout />}>
          {routeConfig.map(({ path, element, children }) => (
            <Route key={path} path={path} element={element}>
              {children &&
                children.map((child) => (
                  <Route
                    key={child.path || 'index'}
                    index={child.index}
                    path={child.path}
                    element={child.element}
                  />
                ))}
            </Route>
          ))}
          {modalRoutesConfig.map(({ path, element }) => (
            <Route key={`page-${path}`} path={path} element={element} />
          ))}
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/login'
            element={
              <FullScreenModal isOpen={true} onClose={handleCloseModal}>
                <LoginPage />
              </FullScreenModal>
            }
          />
          <Route
            path='/register'
            element={
              <FullScreenModal isOpen={true} onClose={handleCloseModal}>
                <RegisterPage
                  handleClose={handleCloseModal}
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
              </FullScreenModal>
            }
          />
        </Routes>
      )}
    </Suspense>
  );
};
