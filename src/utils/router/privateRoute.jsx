import { Outlet, Navigate } from 'react-router-dom';
import { Header } from '../../components/Header';

const PrivateRoute = () => {
  const isAuth = () => {
    const token = localStorage.getItem('access_token');

    return token ? true : false;
  };

  const res = (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );

  return isAuth() ? res : <Navigate to='/login' />;
};

export default PrivateRoute;
