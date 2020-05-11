import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import './css/TopNavBar.css';

//Bannner not used yet, keep for future use.
class Banner extends React.Component {
    constructor(props){
        super(props)
        this.state = {};
    }



render(){
    console.log("Debug: rendering Banner");
    return(
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="/dashboard">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    </Navbar.Collapse>
            </Navbar>
        );   
    }  
}

export default Banner;