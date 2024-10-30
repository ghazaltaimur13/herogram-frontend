import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import ROUTES from './constants/RoutesConstants';
import './App.css';
import { AuthGuard, UnAuthGuard } from '../src/router/RouteGuard';
import withLoading from './components/hocs/withLoading.hoc';

const LoginPage = React.lazy(() => import('./pages/LoginPage/LoginPage'));
const Login = withLoading(LoginPage);

const UploadPage = React.lazy(() => import('./pages/UploadData/UploadPage'));
const Upload = withLoading(UploadPage);

const SignupPage = React.lazy(() => import('./pages/SignupPage/SignupPage'));
const Signup = withLoading(SignupPage);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* protected routes */}
        <Route element={<AuthGuard />}>
          <Route index path={ROUTES.DASHBOARD} element={<Upload />} />
        </Route>

        {/* public routes access if not authorized */}
        <Route element={<UnAuthGuard />}>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.SIGNUP} element={<Signup />} />
        </Route>

        <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
