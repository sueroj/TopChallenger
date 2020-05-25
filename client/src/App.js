import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {CLIENT_ID, CLIENT_SECRET} from './api/config.json'; //*** Works, comment out save usage rate ***
import {SERVER_URL} from './api/config.json';
// import user from './api/fakeAuthReturn.json'; //dev only - fake return from strava
import axios from 'axios';

import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Leaderboard from './pages/leaderboard';
import Explorer from './pages/explorer';
import Loader from './pages/loader.dev'; // dev only
import Webhook from './pages/webhook.dev'; //dev only
import ApiTest from './pages/ApiTest.dev'; //dev only
import Login from './components/Login';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [serverStatus, setServerStatus] = useState(true);
  const [isLoaded, setLoaded] = useState(false);
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const [challenges, setChallenges] = useState([]);
  console.log("App Render");

  let url = new URLSearchParams(document.location.search);
  let state = url.get("state");
  
  useEffect(() => {
    if (isLoaded === true) {
      sessionStorage.setItem('sessionUser', JSON.stringify(user));
      sessionStorage.setItem('sessionProfile', JSON.stringify(profile));
    }

    if (isLoggedIn === false) {
      getAthlete();
    }
    else {
      if (isLoaded === false) {
        getProfile();
        getChallenges();
        Login();
      }
    }

    }, [isLoggedIn, profile]
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
      })
      .then(() => {
        setLoggedIn(true);
      })
      .catch ((e) => {
        console.log("Could not connect to server:", e);
        setServerStatus(false);
      });
  }
}

  function getProfile() {
  if (user !== null) {
    // Get user profile from Top Challenger Web API
    axios.get(`${SERVER_URL}/login?athleteId=${user.athlete.id}`)
    .then((response) => { 
    setProfile(response.data);
    })
    .catch ((e) => {
    console.log("Could not connect to server:", e);
    setServerStatus(false);
    alert("Could not connect to server.");
    });
  }
  }

  function getChallenges(){
  //Gets Challenges as json list.
  axios.get(`${SERVER_URL}/challenges`)
  .then((response) => { 
    setChallenges(response.data);
  })
  .then(() => { 
    setLoaded(true);
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
              {/*         isLoggedIn dev only to verify log in, use session            */}
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
                <Explorer user="data"/>
              </Route>
              {/* //dev only */}
              <Route path="/loader">
                <Loader />
              </Route>
              {/* //dev only */}
              <Route path="/apitest">
                <ApiTest user={user} profile={profile} challenges={challenges} />
              </Route>
              {/* //dev only */}
              <Route path="/webhook">
                <Webhook />
              </Route>
              <Route exact path="/">           
                {/* { isLoaded ? ( serverStatus ? <Redirect to="/dashboard" /> : <Home />) : <Home />} */}
                { isLoaded ? <Redirect to="/dashboard" /> : <Home /> }
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
