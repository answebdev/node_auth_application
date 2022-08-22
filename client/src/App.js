import { Routes, Route } from 'react-router-dom';

// Routing
// import PrivateRoute from './components/routing/PrivateRoute';

// Screens
import PrivateScreen from './components/screens/PrivateScreen';
import LoginScreen from './components/screens/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen.js';
import ForgotPasswordScreen from './components/screens/ForgotPasswordScreen';
import ResetPasswordScreen from './components/screens/ResetPasswordScreen';

// Routing: React 18 Version (wrap App with 'BrowserRouter' in 'index.js' as well)
const App = () => {
  return (
    <div className='App'>
      <Routes>
        {/* You need to be logged in before you can visit the home route ('/'): */}
        <Route exact path='/' element={<PrivateScreen />} />
        <Route exact path='/login' element={<LoginScreen />} />
        <Route exact path='/register' element={<RegisterScreen />} />
        <Route
          exact
          path='/forgotpassword'
          element={<ForgotPasswordScreen />}
        />
        <Route
          exact
          path='/passwordreset/:resetToken'
          element={<ResetPasswordScreen />}
        />
      </Routes>
    </div>
  );
};

export default App;

// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// // Routing
// import PrivateRoute from './components/routing/PrivateRoute';

// // Screens
// import PrivateScreen from './components/screens/PrivateScreen';
// import LoginScreen from './components/screens/LoginScreen';
// import RegisterScreen from './components/screens/RegisterScreen.js';
// import ForgotPasswordScreen from './components/screens/ForgotPasswordScreen';
// import ResetPasswordScreen from './components/screens/ResetPasswordScreen';

// const App = () => {
//   return (
//     <Router>
//       <div className='app'>
//         <Switch>
//           <PrivateRoute exact path='/' component={PrivateScreen} />
//           <Route exact path='/login' component={LoginScreen} />
//           <Route exact path='/register' component={RegisterScreen} />
//           <Route
//             exact
//             path='/forgotpassword'
//             component={ForgotPasswordScreen}
//           />
//           <Route
//             exact
//             path='/passwordreset/:resetToken'
//             component={ResetPasswordScreen}
//           />
//         </Switch>
//       </div>
//     </Router>
//   );
// };

// export default App;
