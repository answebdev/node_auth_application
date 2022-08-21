import { Navigate, Route } from 'react-router-dom';

// See: https://bobbyhadz.com/blog/react-export-redirect-was-not-found-in-react-router-dom

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
          // <Redirect to='/login' />
          <Navigate to='/login' />
        )
      }
    />
  );
};

export default PrivateRoute;
