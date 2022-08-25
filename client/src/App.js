// ORIGINAL CODE FROM TUTORIAL
import { Routes, Route } from 'react-router-dom';

// Routing
import PrivateRoute from './components/routing/PrivateRoute';

// Screens
import PrivateScreen from './components/screens/PrivateScreen';
import LoginScreen from './components/screens/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen.js';
import ForgotPasswordScreen from './components/screens/ForgotPasswordScreen';
import ResetPasswordScreen from './components/screens/ResetPasswordScreen';

const App = () => {
  return (
    <div className='App'>
      <Routes>
        {/* You need to be logged in before you can visit the home route ('/'): */}
        {/* <PrivateRoute exact path='/' element={<PrivateScreen />} /> */}
        <Route exact path='/' element={<PrivateRoute />}>
          <Route exact path='/' element={<PrivateScreen />} />
        </Route>
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

// STOPPED AT: 2:43:10

export default App;

// ALTERNATE CODE - TRY THIS:

// import { Routes, Route } from 'react-router-dom';

// import PrivateRoute from './components/routing/PrivateRoute';

// import PrivateScreen from './components/screens/PrivateScreen';
// import LoginScreen from './components/screens/LoginScreen';
// import RegisterScreen from './components/screens/RegisterScreen.js';
// import ForgotPasswordScreen from './components/screens/ForgotPasswordScreen';
// import ResetPasswordScreen from './components/screens/ResetPasswordScreen';

// const App = () => {
//   return (
//     <div className='App'>
//       <Routes>
//         <Route
//           path='/'
//           element={
//             <PrivateRoute>
//               <LoginScreen />
//             </PrivateRoute>
//           }
//         />
//         <Route exact path='/login' element={<LoginScreen />} />
//         <Route exact path='/register' element={<RegisterScreen />} />
//         <Route
//           exact
//           path='/forgotpassword'
//           element={<ForgotPasswordScreen />}
//         />
//         <Route
//           exact
//           path='/passwordreset/:resetToken'
//           element={<ResetPasswordScreen />}
//         />
//       </Routes>
//     </div>
//   );
// };

// export default App;

// ======================================

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
