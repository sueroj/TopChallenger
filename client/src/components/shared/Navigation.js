// Navigation
// Purpose: Display top navigation bar.
// Export: App
// --TBD-- 
// Login logic and auth.
// Review state and sessions.
import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import Preferences from 'assets/navs/preferences.png';
import './css/Navigation.css';

function Navigation(props) {
    const [isLoggedIn, setLoggedIn] = useState(props.isLoggedIn);
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('sessionUser'))? JSON.parse(sessionStorage.getItem('sessionUser')): props.user);

    useEffect(() => {
        sessionTimer(sessionStorage.getItem('sessionExpire'));
    }, [isLoggedIn]
  );

  function sessionTimer(sessionExpire) {
    if (sessionExpire < Date.now())
        setLoggedIn(false);
   else
        setLoggedIn(true);
    }

    return(
        
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/dashboard">TopChallenger</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        { isLoggedIn ? <><Nav.Link href="/guide">User Guide</Nav.Link>
                                        <Link to="/dashboard">Dashboard</Link>
                                        <Link to="/leaderboard">Leaderboards</Link>
                                        <Link to="/explorer">Explorer</Link></> 
                                        : null }
                    </Nav>
                        { isLoggedIn ? <><Image className="nav-img" src={user.athlete.profile_medium} alt={user.athlete.firstname} roundedCircle />
                                        <Image className="nav-img" src={Preferences} alt="Preferences" />
                                        <Image  alt="Sign Out" /></>
                                        : null }
                </Navbar.Collapse>
        </Navbar>
    );   
}  

export default Navigation;
