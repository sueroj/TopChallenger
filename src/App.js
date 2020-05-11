import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TopNavBar from './components/TopNavBar';

import Home from './pages/home';
import Dashboard from './pages/dashboard';

//import About from './pages/about';


function App() {
  console.log("App Start");
  let auth = new URLSearchParams(document.location.href);
  let token = auth.get("code");
  let scope = auth.get("scope");

  console.log(token);
  console.log(scope);

  return ( //HORIZONTAL NAIGATION BAR GOES HERE - route is not working
    <div className="App">
      <header>
        <TopNavBar />
      </header>

      <Router>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
