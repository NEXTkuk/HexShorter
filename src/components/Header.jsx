import { Link, useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  return (
    <header className='elem-blur'>
      <div className='container'>
        <div className='b-head'>
          <Link to='/' className='logo'>
            HexShorter
          </Link>

          <div className='user-settings'>
            <div className='elem-enter-buttons btn__sign-in'>
              <div onClick={logout}>Выйти</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
