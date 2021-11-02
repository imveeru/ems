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

function App() {

  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Switch>
            <PrivateRoute exact path="/" component={Home}/>
            <PrivateRoute path="/course/:courseId" component={Course}/>
            <Route path="/login" component={Login}/>
            <Route path="/forgot-password" component={ForgotPassword}/>
          </Switch>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
