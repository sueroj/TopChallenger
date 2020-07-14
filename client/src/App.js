import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {SERVER_URL, CLIENT_ID, CLIENT_SECRET} from './api/config.json';
import axios from 'axios';

import Navigation from './components/shared/Navigation';
import Footer from './components/shared/Footer';

import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Leaderboard from './pages/leaderboard';
import Explorer from './pages/explorer';
// dev tools
import MilestoneLoader from './common/loader0.service';
import ExplorationLoader from './common/loader1.service';
import TTLoader from './common/loader2.service';
import RouteLoader from './common/loader3.service';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [serverStatus, setServerStatus] = useState(true);
  const [userLoaded, setUserLoaded] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [challengesLoaded, setChallengesLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [challenges, setChallenges] = useState([]);
  console.log("App Render");

  let url = new URLSearchParams(document.location.search);
  let state = url.get("state");
  
  useEffect(() => {
    if (isLoggedIn === true) {
      sessionStorage.setItem('sessionUser', JSON.stringify(user));
      sessionStorage.setItem('sessionProfile', JSON.stringify(profile));
    }

    if (userLoaded === false) {
      getAthlete();
    }
    else {
      setTimeout(getProfile(), 750); //Only way to log is with a delay???
      getChallenges();
    }

    }, [isLoggedIn, userLoaded]
  );

function getAthlete() {
  if (url.get("error" === "access_denied")) {
    //Enter user resolution here
    console.log("API access denied. Possible user decline."); //dev only
    //New Auth dev only. Must be replaced with security challenge random string.
  } else if (state === "newauth" && isLoggedIn === false) {
      let code = url.get("code"); //*** Works, comment out save usage rate ***

      console.log("Access granted by user."); //dev only
      
      //Top Challenger Server Connect here: Send logged in user ID to be checked with server for new profile creation
      //  also check if server is up before proceeding to dashboard page.
      //-------------------
      // TO ADD: limit client interaction to profile view only if server is down
      // *** Works, comment out save usage rate ***

     axios.post(`https://www.strava.com/oauth/token`, {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
        grant_type: "authorization_code"
      })
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
      })
      .then(() => {  
        setUserLoaded(true);
      })
      .catch ((e) => {
        console.log("Could not connect to server:", e);
        setServerStatus(false);
      });
  }
}

  function getProfile() {
    // Get user profile from Top Challenger Web API
    axios.get(`${SERVER_URL}/login?athleteId=${user.athlete.id}`)
    .then((response) => { 
    setProfile(response.data);
    })
    .then(() => {
      setProfileLoaded(true);
      setLoggedIn(true);
      sessionStorage.setItem("sessionExpire", Date.now() + 3.6e+6);
    })
    .catch ((e) => {
    console.log("Could not connect to server. Reattempting...", e);
    setServerStatus(false);
    alert("Could not connect to server:"+e);
    });
  }
  

  function getChallenges(){
  //Gets Challenges as json list.
  axios.get(`${SERVER_URL}/challenges`)
  .then((response) => { 
    setChallenges(response.data);
  })
  .then(() => {
    setChallengesLoaded(true);
  })
  .catch ((e) => {
    console.log("Could not connect to server:", e);
    setServerStatus(false);
  })
  }

    return (
      <Router>
        <Container fluid>
        <div className="App">
          <Row>
            <Col>
            <header>
              <Navigation user={user} isLoggedIn={isLoggedIn} serverStatus={serverStatus}/>
            </header>
            </Col>
          </Row>
          <Switch>
            <div className="content">
              <Route path="/dashboard">
                  <Dashboard user={user} profile={profile} challenges={challenges} />
              </Route>
              <Route path="/leaderboard">
                <Leaderboard user="data"/>
              </Route>
              <Route path="/explorer">
                <Explorer user={user} profile={profile} challenges={challenges}/>
              </Route>
              {/* //dev only */}
              <Route path="/loader0">
                <MilestoneLoader user={user}/>
              </Route>
              <Route path="/loader1">
                <ExplorationLoader user={user}/>
              </Route>
              <Route path="/loader2">
                <TTLoader user={user}/>
              </Route>
              <Route path="/loader3">
                <RouteLoader user={user}/>
              </Route>
              <Route exact path="/">           
                { userLoaded && profileLoaded && challengesLoaded && serverStatus ? <Redirect to="/dashboard" /> : <Home /> }
              </Route>
            </div>
          </Switch>
          <Row>
            <Col>
            <header>
              <Footer user={user} isLoggedIn={isLoggedIn}/>
            </header>
            </Col>
          </Row>
      </div>
      </Container>
      </Router>
    );
}

export default App;
