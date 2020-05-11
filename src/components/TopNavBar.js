import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown'
import './css/TopNavBar.css';
//import { Link } from 'react-router-dom';

class TopNavBar extends React.Component {



render(){
    console.log("Debug: rendering TopNavBar");
    return(
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/dashboard">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/guide">User Guide</Nav.Link>
                        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                        <Nav.Link href="/leaderboards">Leaderboards</Nav.Link>
                        <Nav.Link href="/explorer">Explorer</Nav.Link>
                    </Nav>
                    <NavDropdown title="Strava Img Here" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Preferences</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Sign Out</NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
        </Navbar>
        );   
    }  
}

export default TopNavBar;