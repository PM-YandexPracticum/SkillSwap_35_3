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

import './styles/index.css';
import { fetchUsers } from '@/entities/User/thunks/usersThunks';
import { fetchSkills } from '@/entities/Skill/thunks/skillsThunk';
import { useAppDispatch } from '@/app/store';

const RegistrationPage = () => (
  <div style={{ padding: '40px' }}>Содержимое страницы регистрации</div>
);

export const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchSkills());
  }, [dispatch]);

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
                <RegistrationPage />
              </FullScreenModal>
            }
          />
        </Routes>
      )}
    </Suspense>
  );
};
