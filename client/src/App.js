import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import {CLIENT_ID, CLIENT_SECRET} from './api/config.json'; *** Works, comment out save usage rate ***
import {SERVER_URL} from './api/config.json';
import user from './api/fakeAuthReturn.json'; //dev only - fake return from strava
import axios from 'axios';

import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Leaderboard from './pages/leaderboard';
import Explorer from './pages/explorer';
import Loader from './pages/loader.dev'; // dev only

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      serverStatus: false,
      profile: null,
      challenges: null,
      // challenges: JSON.parse(sessionStorage.getItem('sessionChallenges'))
      //   ? JSON.parse(sessionStorage.getItem('sessionChallenges'))
      //   : null
      isLoaded: false
    }
  }

  componentDidMount(){
    console.log("App Start");
    let url = new URLSearchParams(document.location.search);
    let state = url.get("state");

    if (url.get("error" === "access_denied")) {
      //Enter user resolution here
      console.log("API access denied. Possible user decline."); //dev only
    } else if (state === "newauth") {
        //let code = url.get("code"); *** Works, comment out save usage rate ***

        console.log("Access granted by user."); //dev only
        
        //Top Challenger Server Connect here: Send logged in user ID to be checked with server for new profile creation
        //  also check if server is up before proceeding to dashboard page.
        //-------------------
        // TO ADD: limit client interaction to profile view only if server is down

        axios.get(`${SERVER_URL}/login?athleteId=${user.athlete.id}`)
        .then((response) => { 
          this.setState({profile: response.data });
          sessionStorage.setItem('sessionUser', JSON.stringify(user)); //dev only - change user to strava creds.
          sessionStorage.setItem('sessionProfile', JSON.stringify(this.state.profile));
        })
        .then(() => this.setState({isLoaded: true}))
        .catch ((e) => {
            console.log("Could not connect to server:", e);
            this.setState({serverStatus: false});
        })

        //Gets Challenges as json list.
        axios.get(`${SERVER_URL}/challenges`)
        .then((response) => { 
          this.setState({challenges: response.data })
        })
        .catch ((e) => {
          console.log("Could not connect to server:", e);
          this.setState({serverStatus: false});
        })
      }
    }

  render(){
    const { profile } = this.state;
    const { isLoggedIn } = this.state;
    const { serverStatus} = this.state;
    const { isLoaded } = this.state;
    const { challenges } = this.state;
    return (
      <Router>
        <Container fluid>
        <div className="App">
          <Row>
            <Col>
            <header>
              {/*         isLoggedIn = temporary to verify log in, use session            */}
              <Navigation user={user} loggedInStatus={isLoggedIn} serverStatus={serverStatus}/>
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
}

export default App;
