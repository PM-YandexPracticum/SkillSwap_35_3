import { Routes, Route, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import {
  routeConfig,
  modalRoutesConfig
} from './providers/router/config/routeConfig';
import { AppLayout } from './AppLayout';

import './styles/index.css';

export const App = () => {
  const location = useLocation();

  const background = location.state && location.state.background;

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

      {/* {background && (
        <Routes>
          <Route path='/login' element={<LoginPage isModal />} />
          <Route path='/register' element={<RegistrationPage isModal />} />
        </Routes>
      )} */}
    </Suspense>
  );
};
