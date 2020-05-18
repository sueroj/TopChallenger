import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
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
  console.log("App Start");
  let url = new URLSearchParams(document.location.search);
  let state = url.get("state");
  let isLoggedIn = false;
  let serverStatus = true;
  // let profile = null;
   const [profile, setProfile] = useState(null);

   //stopped here.

    fetch(`${SERVER_LOCATION}/api/topchallenger/login/${data.athlete.id}`, {
      method: 'POST' }).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if(profile === null) {
        setProfile(data);
      }
    })
    .catch(error => {
      console.error('Could not connect to server:', error);
      alert("Could not connect to server. Now entering offline mode.");
      serverStatus = false;
    });
    console.log(profile);



    if (url.get("error" === "access_denied")) {
      //Enter user resolution here
      console.log("API access denied. Possible user decline."); //dev only
    } else if (state === "newauth") {
        //let code = url.get("code"); *** Works, comment out save usage rate ***

        console.log("Access granted by user."); //dev only
        //Change this to correct JSON post https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        //
        // const response = await fetch(`https://www.strava.com/oauth/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}&grant_type=authorization_code`, {
        //    method: 'POST' });
        // const data = await response.json(); *** Works, comment out save usage rate ***
        
        //Top Challenger Server Connect here: Send logged in user ID to be checked with server for new profile creation
        //  also check if server is up before proceeding to dashboard page.
        //-------------------
        // TO ADD: limit client interaction to profile view only if server is down
       
        // profile = postLogin(SERVER_LOCATION, data.athlete.id);
        // console.log(profile);

        //kind of works
        //
        // fetch(`${SERVER_LOCATION}/api/topchallenger/login/${data.athlete.id}`, {
        //   method: 'POST' }).then(response => {
        //   if (!response.ok) {
        //     throw new Error('Network response was not ok');
        //   }
        //   return response.json();
        // })
        // .then(data => {
        //   if(profile === null) {
        //     setProfile(data);
        //   }
        // })
        // .catch(error => {
        //   console.error('Could not connect to server:', error);
        //   alert("Could not connect to server. Now entering offline mode.");
        //   serverStatus = false;
        // });
        // console.log(profile);

        isLoggedIn = true;
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
            <Navigation userData={data} isLoggedIn={isLoggedIn} serverStatus={serverStatus}/>
          </header>
          </Col>
        </Row>
        <Switch>
          <div className="content">
            <Route path="/dashboard">
                <Dashboard userData={data} userProfile={profile}/>
            </Route>
            <Route path="/leaderboard">
              <Leaderboard userData="data"/>
            </Route>
            <Route path="/explorer">
              <Explorer userData="data"/>
            </Route>
            <Route path="/login">
              <Redirect to="/dashboard" />
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
