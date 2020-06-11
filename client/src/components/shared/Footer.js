// Footer
// Purpose: Display app footer. 
// Export: App
// --TBD-- 
// Should be merged with Navigation.
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import './css/Navigation.css';

class Footer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {};
    }

    componentDidMount(props) {
    }

    render() {
        return (
            <Row>
                <Col>

                    <Navbar bg="dark" variant="dark" expand="lg">
                        <div className="footer">
                            <Navbar.Brand className="footer-logo" href="/dashboard">React-Bootstrap</Navbar.Brand>
                            <Nav className="footer-links">
                                <><Nav.Link className="footer-links" href="/guide">User Guide</Nav.Link>
                                    <Link className="footer-links" to="/explorer">Explorer</Link></>
                            </Nav>
                        </div>
                    </Navbar>

                </Col>
            </Row>
        );
    }
}

export default Footer;