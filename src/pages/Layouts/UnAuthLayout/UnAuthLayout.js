import { Outlet } from 'react-router-dom';
import * as S from './UnAuthLayout.styles';

export default function UnauthLayout() {
  return (
    <S.UnauthLayoutContainer justifyContent="center" alignItems="center">
        <Outlet />
    </S.UnauthLayoutContainer>
  );
}
