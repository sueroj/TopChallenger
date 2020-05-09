import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SyncButton from './SyncButton';
import './Login.css';

class Login extends React.Component{

    test(){
        //let auth = new URL("http://www.strava.com/oauth/authorize");
        //new URL("client_id", auth);
        // .buildUpon()
        // .appendQueryParameter("client_id", "1234321")
        // .appendQueryParameter("redirect_uri", "https://www.yourapp.com")
        // .appendQueryParameter("response_type", "code")
        // .appendQueryParameter("approval_prompt", "auto")
        // .appendQueryParameter("scope", "activity:write,read")
        // .build()

        // var intent = Intent(Intent.ACTION_VIEW, intentUri)
        // startActivity(intent)
    }

    // stravaAuth(){
    //     var StravaApiV3 = require('strava_api_v3');
    //     var defaultClient = StravaApiV3.ApiClient.instance;
    
    //     // Configure OAuth2 access token for authorization: strava_oauth
    //     var strava_oauth = defaultClient.authentications['strava_oauth'];
    //     strava_oauth.accessToken = "YOUR ACCESS TOKEN"
    
    //     var api = new StravaApiV3.AthletesApi()
    
    //     var callback = function(error, data, response) {
    //     if (error) {
    //         console.error(error);
    //     } else {
    //         console.log('API called successfully. Returned data: ' + data);
    //     }
    //     };
    //     api.getLoggedInAthlete(callback);
    // }
 
    render() {
        return (
                <Form className="login-form">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control className="form-input" type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control className="form-input" type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Form.Group controlId="buttons">
                        <Button variant="primary" type="submit">
                        Submit
                        </Button>
                        <SyncButton />
                    </Form.Group>
                </Form>
        );
    }
}

export default Login;
