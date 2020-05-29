import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './css/dashboard.css';
import {CLIENT_ID, CLIENT_SECRET, WEBHOOK_CALLBACK} from '../api/config.json';

class Webhook extends React.Component{
  constructor(props) {
    super(props);
    this.state = { 
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        callback_url: WEBHOOK_CALLBACK,
        verify_token: "TopChallengerApp"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value    });
  }

  handleSubmit(event) {

    // Create strava webhook. Does not work.. HTTP 500 Internal server error.
    // Should work when using OAuth token. Web Hooks are not essential until
    // high levels of server requests are reached.
    // Not anticipating that anytime soon.

    fetch((`https://www.strava.com/api/v3/push_subscriptions`), { 
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: JSON.stringify(this.state)
    })
    .then(response => { if (!response.ok) {
           throw new Error('Network response was not ok');}  
           return response })
    .catch(error => {
      console.error('Server Error:', error);
      alert("Server Error.");
    });

    alert('Form submitted: ' + JSON.stringify(this.state));
    event.preventDefault();
  }

  render() {
    return (
      <Form className="loader" onSubmit={this.handleSubmit}>
        <Form.Group controlId="formBasicText">
            <Form.Control className="form-input" type="text" placeholder="client_id" name="client_id" value={this.state.client_id} onChange={this.handleChange} />
        </Form.Group>

        <Form.Group controlId="formBasicText">
            <Form.Control className="form-input" type="text" placeholder="client_secret " name="client_secret" value={this.state.client_secret} onChange={this.handleChange}/>
        </Form.Group>

        <Form.Group controlId="formBasicText">
            <Form.Control className="form-input" type="text" placeholder="callback_url " name="callback_url" value={this.state.callback_url} onChange={this.handleChange}/>
        </Form.Group>

        <Form.Group controlId="formBasicText">
            <Form.Control className="form-input" type="text" placeholder="verify_token" name="verify_token" value={this.state.verify_token} onChange={this.handleChange}/>
        </Form.Group>
        
        <Form.Group controlId="buttons">
            <Button variant="primary" type="submit">
            Submit
            </Button>
        </Form.Group>
      </Form>
    );
  }
}

export default Webhook;