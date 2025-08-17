import { Routes, Route } from 'react-router-dom';

import { routeConfig } from './providers/router/config/routeConfig';

// import './styles/index.css';

export const App = () => {
  return (
    <div className='app'>
      {/*<Header /> */}
      <main className='main-content'>
        <Routes>
          {routeConfig.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element} // пока undefined
            />
          ))}
        </Routes>
      </main>
      {/* <Footer /> */}
    </div>
  );
};
