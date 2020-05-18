import React from 'react';
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
import Loader from './pages/loader.dev'; // dev only

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      serverStatus: true,
      profile: JSON.parse(sessionStorage.getItem('localSessionProfile'))
            ? JSON.parse(sessionStorage.getItem('localSessionProfile'))
            : null,
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

        fetch((`${SERVER_LOCATION}/api/topchallenger/login/${data.athlete.id}`), { 
          method: 'POST' })
        .then(response => { if (!response.ok) {
               throw new Error('Network response was not ok');}  
               return response.json(); })
        .then(data => this.setState({ profile: data }))
        .then(() => this.setState({ isLoaded: true, isLoggedIn: true }))
        .then(() => {
          sessionStorage.setItem('localSessionData', JSON.stringify(this.state.data));
          sessionStorage.setItem('localSessionProfile', JSON.stringify(this.state.profile));
        })
        .catch(error => {
          console.error('Could not connect to server:', error);
          alert("Could not connect to server. Now entering offline mode.");
          this.setState({serverStatus: false});
        });
      }
    }

  render(){
    const { profile } = this.state;
    const { isLoggedIn } = this.state;
    const { serverStatus} = this.state;
    const { isLoaded } = this.state;
    return (
      <Router>
        <Container fluid>
        <div className="App">
          <Row>
            <Col>
            <header>
              {/*         isLoggedIn = temporary to verify log in, use session            */}
              <Navigation userData={data} loggedInStatus={isLoggedIn} serverStatus={serverStatus}/>
            </header>
            </Col>
          </Row>
          <Switch>
            <div className="content">
              <Route path="/dashboard">
                  <Dashboard userData={data} userProfile={profile} />
              </Route>
              <Route path="/leaderboard">
                <Leaderboard userData="data"/>
              </Route>
              <Route path="/explorer">
                <Explorer userData="data"/>
              </Route>
              {/* //dev only */}
              <Route path="/loader">
                <Loader />
              </Route>
              <Route exact path="/">
                { isLoaded ? <Redirect to="/dashboard" /> : <Home />}
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
}

export default App;
