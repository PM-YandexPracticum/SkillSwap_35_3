import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App';
// import { store } from './store';

// import './styles/index.css';

const rootElement = document.getElementById('root')!;

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <Provider store={store}> */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
