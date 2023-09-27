import { useLoginMutation } from 'services/auth/authApi';
import LoginForm from '../components/login-form/LoginForm';
import { memo, useCallback, useEffect, useState } from 'react';
import { AuthData } from 'types';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { checkAuth } from 'features/user/authSlice';

const Login = () => {
  const [userData, setUserData] = useState<AuthData>({ username: 'mor_2314', password: '83r5^_' });
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, []);
  useEffect(() => {
    if (isAuth) {
      navigate(location.state || '/');
    }
  }, [isAuth]);
  const [error, setError] = useState('');
  const [login, result] = useLoginMutation();

  const handleLogin = useCallback(() => {
    login(userData);
  }, [userData]);

  useEffect(() => {
    if (result.status === 'rejected') {
      //   @ts-ignore
      setError(result.error!.data);
    } else if (result.status === 'fulfilled') {
      document.cookie = `token=${result?.data?.token}`;
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
  }, [result.status, navigate, isAuth]);

  return (
    <div>
      <LoginForm userData={userData} onChange={setUserData} submit={handleLogin} error={error} />
    </div>
  );
};

export default memo(Login);
