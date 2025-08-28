import React from 'react';
import { useSelector } from '@/app/store';
import { RootState } from '@/app/store';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  component: React.ReactNode;
  onlyUnAuth?: boolean; // по умолчанию false
};

const ProtectedRoute = ({
  component,
  onlyUnAuth = false
}: ProtectedRouteProps): React.ReactNode => {
  const selectedUser = useSelector((state: RootState) => state.users.selected);
  const isLoading = useSelector((state: RootState) => state.users.isLoading);
  const location = useLocation();

  if (isLoading) {
    return null; // Прелоадер?
  }

  // Если маршрут для авторизованных, а пользователь не авторизован — редирект на /login
  if (!onlyUnAuth && !selectedUser) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  // Если маршрут только для неавторизованных, а пользователь авторизован — редирект на предыдущий или /
  if (onlyUnAuth && selectedUser) {
    const { from } = location.state ?? { from: { pathname: '/' } };
    return <Navigate to={from} replace />;
  }

  // Иначе показываем компонент
  return <>{component}</>;
};

export default ProtectedRoute;

// Обертка для маршрутов, доступных только авторизованным пользователям
export const OnlyAuth = ProtectedRoute;

// Обертка для маршрутов, доступных только неавторизованным
export const OnlyUnAuth = ({
  component
}: {
  component: React.ReactNode;
}): React.ReactElement => <ProtectedRoute onlyUnAuth component={component} />;
