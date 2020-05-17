import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import {CLIENT_ID, CLIENT_SECRET} from './api/config.json'; *** Works, comment out save usage rate ***
import {SERVER_LOCATION} from './api/config.json';
import data from './api/fakeAuthReturn.json'; //dev only - fake return from strava

import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Leaderboard from './pages/leaderboard';
import Explorer from './pages/explorer';

function App() {
  console.log("Sync Start");
  let url = new URLSearchParams(document.location.search);
  let state = url.get("state");
  let isLoggedIn = false;

    if (url.get("error" === "access_denied")) {
      //Enter user resolution here
      console.log("API access denied. Possible user decline."); //dev only
    } else if (state === "newauth") {
        //let code = url.get("code"); *** Works, comment out save usage rate ***

        console.log("Access granted by user."); //dev only

          // const response = await fetch(`https://www.strava.com/oauth/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}&grant_type=authorization_code`, {
          //    method: 'POST' });
          // const data = await response.json(); *** Works, comment out save usage rate ***
          
          //Top Challenger Server Connect here: Send logged in user ID to be checked with server for new profile creation
          //  also check if server is up before proceeding to dashboard page.
          //
          try {
            const response = fetch(`${SERVER_LOCATION}/api/topchallenger/athleteId/11112233`, {
              method: 'POST' });
            console.log(response);
          }
          catch (e) {
            console.log(e);
          } 
 
          console.log(data); //dev only
          isLoggedIn = true; //dev only; sessions will be used out of dev
          // sessionStorage.setItem('userData', data);
          // sessionStorage.setItem('isLoggedIn', true);
      }

  return (
    <Router>
      <Container fluid>
      <div className="App">
        <Row>
          <Col>
          <header>
            {/*         isLoggedIn = temporary to verify log in, use session            */}
            <Navigation userData={data} isLoggedIn={isLoggedIn}/>
          </header>
          </Col>
        </Row>
        <Switch>
          <div className="content">
            <Route path="/dashboard">
                <Dashboard userData={data} />
            </Route>
            <Route path="/leaderboard">
              <Leaderboard userData="data"/>
            </Route>
            <Route path="/explorer">
              <Explorer userData="data"/>
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </div>
        </Switch>
        <Row>
          <Col>
          <header>
            <Footer userData={data} isLoggedIn={isLoggedIn}/>
          </header>
          </Col>
        </Row>
     </div>
     </Container>
    </Router>
  );
}

export default App;
