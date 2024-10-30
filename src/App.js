import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import ROUTES from './constants/RoutesConstants';
import './App.css';
import { AuthGuard, UnAuthGuard } from '../src/router/RouteGuard';
import LoginPage from './pages/LoginPage/LoginPage';
import UploadPage from './pages/UploadData/UploadPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* protected routes */}
        <Route element={<AuthGuard />}>
          <Route index path={ROUTES.DASHBOARD} element={<UploadPage />} />
        </Route>

        {/* public routes access if not authorized */}
        <Route element={<UnAuthGuard />}>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        </Route>

        <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
