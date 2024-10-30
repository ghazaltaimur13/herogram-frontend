import { Outlet } from 'react-router-dom';
import * as S from './MainLayout.styles';

export default function MainLayout() {
  return (
    <S.AuthLayoutContainer justifyContent="center" alignItems="center">
        <Outlet />
    </S.AuthLayoutContainer>
  );
}
