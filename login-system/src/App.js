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

function App() {

  var isLoggedIn=false;

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            {isLoggedIn?<Home />:<Login/>}
          </Route>
          <Route path="/login">
            {isLoggedIn?<Home />:<Login/>}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
