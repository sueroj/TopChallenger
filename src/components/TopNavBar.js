import React from 'react';
//import SyncButton from './SyncButton';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import './TopNavBar.css';
//import { Link } from 'react-router-dom';

class TopNavBar extends React.Component {



render(){
    return(
        <Navbar bg="dark" expand="lg">
            <Navbar.Brand href="/dashboard">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link class="nav_link" href="/guide">User Guide</Nav.Link>
                        <Nav.Link class="nav_link" href="/dashboard">Dashboard</Nav.Link>
                        <Nav.Link class="nav_link" href="/leaderboards">Leaderboards</Nav.Link>
                        <Nav.Link class="nav_link" href="/explorer">Explorer</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
        </Navbar>
        );
    }
}

export default TopNavBar;