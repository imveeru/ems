import React from 'react';
import './App.css';
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from 'react-router-dom'
import { AuthProvider } from "./context/AuthContext"
import PrivateRoute from './routes/PrivateRoute'

function App() {

  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Switch>
            <PrivateRoute exact path="/" component={Home}/>
            <Route path="/login" component={Login}/>
          </Switch>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
