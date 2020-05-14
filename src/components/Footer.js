import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import './css/Navigation.css';

class Footer extends React.Component {
    constructor(props){
        super(props)
        this.state = {};
    }

componentDidMount(props) {
}

render(){
    return(
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/dashboard">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                                        <><Nav.Link href="/guide">User Guide</Nav.Link>
                                        <Link to="/explorer">Explorer</Link></>
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
        );   
    }  
}

export default Footer;