import React from 'react';
import './App.css';
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from 'react-router-dom'
import { AuthProvider } from "./context/AuthContext"
import PrivateRoute from './routes/PrivateRoute'
import Course from './pages/Course/Course';
import Settings from './pages/Settings/Settings';

function App() {

  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Switch>
            <PrivateRoute exact path="/" component={Home}/>
            <PrivateRoute exact path="/course/:courseId" component={Course}/>
            <PrivateRoute path="/course/:courseId/:facultyName" component={Course}/>
            <PrivateRoute path="/settings/:userId" component={Settings}/>
            <Route path="/login" component={Login}/>
            <Route path="/forgot-password" component={ForgotPassword}/>
          </Switch>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
