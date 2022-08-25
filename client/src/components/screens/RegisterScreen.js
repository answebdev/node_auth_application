import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './RegisterScreen.css';

const RegisterScreen = ({ history }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // If the password does not match the 'confirmPassword', then we get an error
    if (password !== confirmPassword) {
      // Set password back to nothing:
      setPassword('');
      setConfirmPassword('');

      // Run a 'setTimeout' to remove the error after 5 seconds so it doesn't just stay there the whole time
      setTimeout(() => {
        setError('');
      }, 5000);
      return setError('Passwords do not match');
    }

    try {
      // Note: 'username', 'email', 'password' are the same values as what is used in our API
      const { data } = await axios.post(
        '/api/auth/register',
        { username, email, password },
        config
      );

      // Once we sync this, we will get our token
      localStorage.setItem('authToken', data.token);

      // Redirect
      // history.pushState('/');
      navigate('/');
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  return (
    <div className='register-screen'>
      <form onSubmit={registerHandler} className='register-screen__form'>
        <h3 className='register-screen__title'>Register</h3>

        {/* If there is an error, create a span and log that error: */}
        {error && <span className='error-message'>{error}</span>}
        <div className='form-group'>
          <label htmlFor='name'>Username:</label>
          <input
            id='name'
            type='text'
            placeholder='Enter Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email:</label>
          <input
            id='email'
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password:</label>
          <input
            id='password'
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='confirmpassword'>Confirm Password:</label>
          <input
            id='confirmpassword'
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button className='btn btn-primary' type='submit'>
          Register
        </button>

        <span className='register-screen__subtext'>
          Already have an account? <Link to='/login'>Login</Link>
        </span>
      </form>
    </div>
  );
};

export default RegisterScreen;
