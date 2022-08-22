import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PrivateScreen = ({ history }) => {
  const [error, setError] = useState('');
  const [privateData, setPrivateData] = useState('');

  useEffect(() => {
    // If there is nothing in the local storage (i.e., if there is no 'authToken' in local sotrage),
    // then redirect to login route
    // otherwise...
    if (!localStorage.getItem('authToken')) {
      history.push('/login');
    }

    // ...if user IS logged in, then fetch private data (use 'async' because this is an Axios request)
    const fetchPrivateData = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          // Authorization token:
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      };

      try {
        const { data } = await axios.get('/api/private', config);
        setPrivateData(data.data);
      } catch (error) {
        // If there is an error when requesting, remove the item
        localStorage.removeItem('authToken');
        setError('You are not authorized please login');
      }
    };

    // Call the function
    fetchPrivateData();
  }, [history]);

  // Logout button handler
  const logoutHandler = () => {
    // Remove the 'authToken' from local storage
    localStorage.removeItem('authToken');

    // Redirect to login
    history.push('/login');
  };

  // Once the page is loaded, do a check:
  // if there is an error, then respond with a span and an error message;
  // otherwise, return the private data
  return error ? (
    <span className='error-message'>{error}</span>
  ) : (
    <>
      <div style={{ background: 'green', color: '#ffffff' }}>{privateData}</div>
      <button onClick={logoutHandler}>Logout</button>
    </>
  );
};

export default PrivateScreen;
