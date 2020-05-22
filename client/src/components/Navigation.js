import React from 'react';
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import Preferences from '../assets/nav/preferences.png';
import './css/Navigation.css';

class Navigation extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            // isLoggedIn: this.props.loggedInStatus dev only
            isLoggedIn: true //dev only
        };
    }

componentDidMount() {
    // this.setState((state) => ({
    //     isLoggedIn: this.state
    //   }));
}

componentDidUpdate(prevProps){
    if (this.props.loggedInStatus !== prevProps.loggedInStatus) {
        this.setState((state) => ({
            isLoggedIn: this.props
        }));
    }
}

render(){
    const { isLoggedIn } = this.state; //gets logged in status from App.js parent
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
                        { isLoggedIn ? <><Image className="nav-img" src={this.props.user.athlete.profile_medium} alt={this.props.user.athlete.firstname} roundedCircle />
                                        <Image className="nav-img" src={Preferences} alt="Preferences" />
                                        <Image  alt="Sign Out" /></>
                                        : null }
                </Navbar.Collapse>
        </Navbar>
        );   
    }  
}

export default Navigation;
