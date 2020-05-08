import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TopNavBar from './components/TopNavBar';

import Home from './pages/Home';
import About from './pages/About';

function App() {
  return ( //HORIZONTAL NAIGATION BAR GOES HERE
    <div className="App">


      <Router>
        <Switch>
          <Route path="/">
        <header className="">
      <TopNavBar />
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
      </header>
      </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
