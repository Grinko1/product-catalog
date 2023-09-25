import { Navigate, Outlet } from 'react-router-dom';
import Header from '../../components/header/Header';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { memo, useCallback } from 'react';
import { logout } from 'features/user/authSlice';

interface PrivateLayoutProps {
  // children:ReactNode
}
const PrivateLayout = ({}: PrivateLayoutProps) => {
  const {isAuth, loading} = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const logoutHandler = useCallback(() => {
    dispatch(logout());
  }, []);

  return (
    <div>
      <Header isAuth={isAuth} logout={logoutHandler} />
      { (isAuth === true && loading===false)  ? <Outlet /> : <Navigate to='/login' /> }
    </div>
  );
};

export default memo(PrivateLayout);
