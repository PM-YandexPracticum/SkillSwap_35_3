import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { routeConfig } from './providers/router/config/routeConfig';
import { Header, Footer } from '@/widgets';

import './styles/index.css';

export const App = () => {
  return (
    <div className='app'>
      <Header />
      <main className='main-content'>
        <Suspense fallback={<div>Загрузка страницы...</div>}>
          <Routes>
            {routeConfig.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};
