import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './LoginScreen.css';

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Check that the user cannot get to this route if already logged in.
  // Once the user is logged in, we don't want them to go the login or register page.
  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      history.push('/');
    }
  }, [history]);

  // Since we're going to be doing an Axios request here, this needs to be an 'async' function -
  // then use the 'await' down below in the Axios Post requests (in the try/catch)
  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      // Note: 'email' and 'password' are the same values as what is used in our API
      const { data } = await axios.post(
        '/api/auth/login',
        { email, password },
        config
      );

      // Once we sync this, we will get our token
      localStorage.setItem('authToken', data.token);

      // Redirect
      // history.push('/');

      navigate('/');
    } catch (error) {
      setError(error.response.data.error); // This line is giving error in console when logging in
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  return (
    <div className='login-screen'>
      <form onSubmit={loginHandler} className='login-screen__form'>
        <h3 className='login-screen__title'>Login</h3>
        {/* If there is an error, create a span and log that error: */}
        {error && <span className='error-message'>{error}</span>}
        <div className='form-group'>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            required
            id='email'
            placeholder='Email address'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            tabIndex={1}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>
            Password:{' '}
            <Link
              to='/forgotpassword'
              className='login-screen__forgotpassword'
              tabIndex={4}
            >
              Forgot Password?
            </Link>
          </label>
          <input
            type='password'
            required
            id='password'
            autoComplete='true'
            placeholder='Enter password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            tabIndex={2}
          />
        </div>
        <button type='submit' className='btn btn-primary' tabIndex={3}>
          Login
        </button>

        <span className='login-screen__subtext'>
          Don't have an account? <Link to='/register'>Register</Link>
        </span>
      </form>
    </div>
  );
};

export default LoginScreen;
