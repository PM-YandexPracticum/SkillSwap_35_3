import { jsx as _jsx } from "react/jsx-runtime";
import { Routes, Route } from 'react-router-dom';
import { routeConfig } from './providers/router/config/routeConfig';
// import './styles/index.css';
export const App = () => {
    return (_jsx("div", { className: 'app', children: _jsx("main", { className: 'main-content', children: _jsx(Routes, { children: routeConfig.map((route) => (_jsx(Route, { path: route.path, element: route.element }, route.path))) }) }) }));
};
