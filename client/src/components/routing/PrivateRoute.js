// ALTERNATE CODE - TRY THIS:

// import { Navigate } from 'react-router-dom';

// // Scroll down to 'bilaalsblog' post: https://stackoverflow.com/questions/69923420/how-to-use-private-route-in-react-router-domv6

// const PrivateRoute = ({ children }) => {
//   const isAuthenticated = true;

//   if (isAuthenticated) {
//     return children;
//   }

//   return <Navigate to='/login' />;
// };

// export default PrivateRoute;

// ==================================================================================================

// ORIGNAL CODE FROM TUTORIAL WITH REACT 18 UPDATES - NOT WORKING: '/' PAGE EMPTY
// import { Redirect, Route } from 'react-router-dom';

// import { Navigate, Route } from 'react-router-dom';

// // See: https://bobbyhadz.com/blog/react-export-redirect-was-not-found-in-react-router-dom

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   return (
//     <Route
//       // Spread everything we get from this route:
//       {...rest}
//       render={(props) =>
//         // If the 'authToken' is in the local storage (i.e., if a user is logged in), render the Component;
//         // otherwise, redirect to the login page.
//         localStorage.getItem('authToken') ? (
//           <Component {...props} />
//         ) : (
//           // <Redirect to='/login' />
//           <Navigate to='/login' />
//         )
//       }
//     />
//   );
// };

// export default PrivateRoute;

// ==================================================================================================

// TRY THIS:

// Source: https://stackoverflow.com/questions/69864165/error-privateroute-is-not-a-route-component-all-component-children-of-rou

// This works - when you go to '/' without logging in, it redirects to '/login'.

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const auth = localStorage.getItem('authToken'); // determine if authorized, from context or however you're doing it

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return auth ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
