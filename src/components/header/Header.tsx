import { memo } from 'react';
import style from './Header.module.scss';
import { Link } from 'react-router-dom';

interface HeaderProps {
  isAuth: boolean;
  logout: () => void;
}
const Header = ({ isAuth, logout }: HeaderProps) => {
  return (
    <div className={style.Header}>
      <Link to='/' className={style.HeaderLogo}>
        Main
      </Link>

      {isAuth ? (
        <div className={style.LeftLinks}>
          <Link to='/create-product'>Create</Link>
          <button onClick={logout}>logout</button>
        </div>
      ) : (
        <Link to='/login'>Login</Link>
      )}
    </div>
  );
};

export default memo(Header);
