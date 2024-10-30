import { Outlet } from 'react-router-dom';
import * as S from './MainLayout.styles';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router for navigation
import { setAccessToken } from '../../../store/features/baseSlice';
import { useAppDispatch } from '../../../store/hooks';

export default function MainLayout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(setAccessToken(null));
    navigate('/login'); // Redirect to login page after logout
  };
  return (
    <S.AuthLayoutContainer justifyContent="center" alignItems="center">
        <AppBar position="static">
            <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Herogram Test
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
                Logout
            </Button>
            </Toolbar>
        </AppBar>
        <Outlet />
    </S.AuthLayoutContainer>
  );
}