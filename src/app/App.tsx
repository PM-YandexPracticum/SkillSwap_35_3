import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import {
  routeConfig,
  modalRoutesConfig
} from './providers/router/config/routeConfig';
import { AppLayout } from './AppLayout';
import { FullScreenModal } from '@/shared/ui';

import './styles/index.css';

const LoginPage = () => (
  <div style={{ padding: '40px' }}>Содержимое страницы логина</div>
);
const RegistrationPage = () => (
  <div style={{ padding: '40px' }}>Содержимое страницы регистрации</div>
);

export const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const background = location.state && location.state.background;

  useEffect(() => {
    if (background) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [background]);

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
