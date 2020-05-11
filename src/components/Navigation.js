import React from 'react';
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown'
import './css/Navigation.css';

class TopNavBar extends React.Component {
    constructor(props){
        super(props)
        this.state = {};
    }

componentDidMount(props) {
}

render(){
    const isLoggedIn = this.props.isLoggedIn; //gets logged in status from App.js parent
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
                        { isLoggedIn ? <><NavDropdown title="Strava Img Here" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.1">Preferences</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action/3.4">Sign Out</NavDropdown.Item>
                                        </NavDropdown></> 
                                        : null }
                </Navbar.Collapse>
        </Navbar>
        );   
    }  
}

export default TopNavBar;