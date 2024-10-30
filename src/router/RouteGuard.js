import ROUTES from '../constants/RoutesConstants';
import MainLayout from '../pages/Layouts/MainLayout/MainLayout';
import UnauthLayout from '../pages/Layouts/UnAuthLayout/UnAuthLayout';
import {
  selectIsAuthenticated,
} from '../store/features/baseSlice'
import { useAppSelector } from '../store/hooks';
import { Navigate, useLocation } from 'react-router-dom';

export function AuthGuard() {
  const location = useLocation();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <MainLayout />;
}

export function UnAuthGuard() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} />;
  }

  return <UnauthLayout />;
}
