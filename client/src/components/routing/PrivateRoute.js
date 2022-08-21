import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      // Spread everything we get from this route:
      {...rest}
      render={(props) =>
        // If the 'authToken' is in the local storage (i.e., if a user is logged in), render the Component;
        // otherwise, redirect to the login page.
        localStorage.getItem('authToken') ? (
          <Component {...props} />
        ) : (
          <Redirect to='/login' />
        )
      }
    />
  );
};

export default PrivateRoute;
