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
            <div className="footer">
            <Navbar.Brand className="footer-logo" href="/dashboard">React-Bootstrap</Navbar.Brand>
                <Nav className="footer-links">
                                    <><Nav.Link className="footer-links" href="/guide">User Guide</Nav.Link>
                                    <Link className="footer-links" to="/explorer">Explorer</Link></>
                </Nav>
            </div>
        </Navbar>
        );   
    }  
}

export default Footer;