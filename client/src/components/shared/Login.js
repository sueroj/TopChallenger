// Login
// Purpose: App login. Syncs with Strava Oauth. 
// Export: App
// --TBD-- 
// Eval use of login username / password requirements.
// (Likely) Redesign for simple one button login.
// Buttons for other OAuth2 logins of other APIs
import React from 'react';
import Form from 'react-bootstrap/Form';
import SyncButton from './SyncButton';
import './css/Login.css';

function Login(props) {
    return (
        <Form className="login-form">
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control className="form-input" type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control className="form-input" type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="buttons">
                <SyncButton />
            </Form.Group>
        </Form>
    );
}

export default Login;
