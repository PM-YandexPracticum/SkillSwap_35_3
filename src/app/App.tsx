import { Routes, Route } from 'react-router-dom';
import { routeConfig } from './providers/router/config/routeConfig';
import { Header, Footer } from '@/widgets';

import './styles/index.css';

export const App = () => {
  return (
    <div className='app'>
      <Header />
      <main className='main-content'>
        <Routes>
          {routeConfig.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </main>
      <Footer />
    </div>
  );
};
