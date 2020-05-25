import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import Preferences from '../assets/nav/preferences.png';
import './css/Navigation.css';

function Navigation(props) {
    const [isLoggedIn, setLoggedIn] = useState(props.isLoggedIn)


    useEffect(() => {
        setLoggedIn(props.isLoggedIn)
    }, [props.isLoggedIn]
  );


    return(
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/dashboard">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        { isLoggedIn ? <><Nav.Link href="/guide">User Guide</Nav.Link>
                                        <Link to="/dashboard">Dashboard</Link>
                                        <Link to="/leaderboard">Leaderboards</Link>
                                        <Link to="/explorer">Explorer</Link></> 
                                        : null }
                    </Nav>
                        { isLoggedIn ? <><Image className="nav-img" src={props.user.athlete.profile_medium} alt={props.user.athlete.firstname} roundedCircle />
                                        <Image className="nav-img" src={Preferences} alt="Preferences" />
                                        <Image  alt="Sign Out" /></>
                                        : null }
                </Navbar.Collapse>
        </Navbar>
    );   
}  

export default Navigation;
