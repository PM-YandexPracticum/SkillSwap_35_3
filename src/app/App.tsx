import { Routes, Route } from 'react-router-dom';
/* import { routeConfig } from './providers/router/config/routeConfig'; */
import { HomePage, Error404Page, Error500Page } from '@/pages';
import { Header, Footer } from '@/widgets';

import './styles/index.css';

export const App = () => {
  return (
    <div className='app'>
      <Header />
      <main className='main-content'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='*' element={<Error404Page />} />
          <Route path='/500' element={<Error500Page />} />
          {/*
          {routeConfig.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))} 
          */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
};
