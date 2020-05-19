import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './css/dashboard.css';
import {SERVER_LOCATION} from '../api/config.json';

class Loader extends React.Component{
  constructor(props) {
    super(props);
    this.state = { 
      ChallengeId: 'Challenge ID',
      Name: "Name",
      Type: "Type",
      Tier: "Tier",
      BadgeId: "BadgeId",
      Description: "Description",
      Time: "Time",
      Distance: "Distance"
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

    fetch((`${SERVER_LOCATION}/new-challenge/:challenge`), { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(response => { if (!response.ok) {
           throw new Error('Network response was not ok');}  
           return response.json(); })
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
            <Form.Control className="form-input" type="text" placeholder="ChallengeId" name="ChallengeId" value={this.state.ChallengeId} onChange={this.handleChange} />
            <Form.Text className="text-muted">ChallengeId: int</Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicText">
            <Form.Control className="form-input" type="text" placeholder="Name" name="Name" value={this.state.Name} onChange={this.handleChange}/>
            <Form.Text className="text-muted">Name: string</Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicText">
            <Form.Control className="form-input" type="text" placeholder="Type" name="Type" value={this.state.Type} onChange={this.handleChange}/>
            <Form.Text className="text-muted">Type: enum 0:Milestone 1:Exploration 2:TimeTrial 3:Endurance</Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicText">
            <Form.Control className="form-input" type="text" placeholder="Tier" name="Tier" value={this.state.Tier} onChange={this.handleChange}/>
            <Form.Text className="text-muted">Tier: enum 0:Basic 1:Gold 2:Silver 3:Bronze</Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicText">
            <Form.Control className="form-input" type="text" placeholder="BadgeId" name="BadgeId" value={this.state.BadgeId} onChange={this.handleChange}/>
            <Form.Text className="text-muted">BadgeId: int</Form.Text>
        </Form.Group>
        <Form.Group controlId="Form.ControlTextarea1">
          <Form.Control as="textarea" rows="3" placeholder="Description" name="Description" value={this.state.Description} onChange={this.handleChange}/>
          <Form.Text className="text-muted">Description: string</Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicText">
            <Form.Control className="form-input" type="text" placeholder="Time" name="Time" value={this.state.Time} onChange={this.handleChange}/>
            <Form.Text className="text-muted">Time: int (seconds)</Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicText">
            <Form.Control className="form-input" type="text" placeholder="Distance" name="Distance" value={this.state.Distance} onChange={this.handleChange}/>
            <Form.Text className="text-muted">Distance: int (miles)</Form.Text>
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

export default Loader;