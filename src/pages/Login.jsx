import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import signIn from '../assets/img/auth/sign-in.png';

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const postLogin = async () => {
    try {
      const { data } = await axios.post(`https://front-test.hex.team/api/login`, {
        username: login,
        password: password,
      });

      if (data.access_token) {
        localStorage.setItem('access_token', data.access_token);

        navigate('/');
      }
    } catch (error) {
      if (error.response.data.detail === 'login and password do not match') {
        setError('Не верный логин или пароль');
      }
    }
  };

  const postRegister = async () => {
    try {
      const { data } = await axios.post(
        `https://front-test.hex.team/api/register?username=${login}&password=${password}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (data.username) {
        postLogin();
      }
    } catch (error) {
      if (error.response.data.detail.includes('already exists')) {
        setError(`Пользователь ${login} уже существует`);
      }
    }
  };

  return (
    <div className='form-container'>
      <p className='title'>HexShorter</p>
      <div className='login_wrapper'>
        <img className='login_img' src={signIn} />
        <div className='form'>
          <input className='input' value={login} onChange={(e) => setLogin(e.target.value)} placeholder='Email' />
          <input
            className='input password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Пароль'
          ></input>

          {error && <div className='form_error'>{error}</div>}

          <button className='form-btn' disabled={login === '' || password === ''} onClick={postLogin}>
            Войти
          </button>
          <button className='form-btn' disabled={login === '' || password === ''} onClick={postRegister}>
            Регистрация
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
