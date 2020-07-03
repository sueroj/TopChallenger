// Milestone Loader
// Purpose: Dev tool for loading Milestone challenges. 
// Export: App
// --Usage Notes-- 
// Enter unique Challenge ID 0 - 999.
// Tier = 0 for Milestone.
// Primary: Could be mix/match of any metric.
// 0 in any metric = N/A (skipped on verification).
// Displays the badge that equals this challenge ID in assets/badges.
// --TBD--
// More automation.
import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../pages/css/dashboard.css';
import { SERVER_URL } from '../api/config.json';

class MilestoneLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ChallengeId: 'Challenge ID',
      Name: "Name",
      Type: "Type",
      Tier: "Tier",
      Difficulty: "Difficulty",
      Description: "Description",
      MovingTime: null,
      AverageSpeed: null,
      MaxSpeed: null,
      Distance: null,
      Elevation: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {

    fetch((`${SERVER_URL}/new-challenge/:challenge`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Server Error:', error);
        alert("Server Error.");
      });

    alert('Form submitted: ' + JSON.stringify(this.state));
    event.preventDefault();
  }

  handleSubscription() {
    console.log("hello");
  }

  render() {
    return (
      <Form className="loader" onSubmit={this.handleSubmit}>
        <Form.Group controlId="formBasicText">
          <Form.Control className="form-input" type="text" placeholder="ChallengeId" name="ChallengeId" value={this.state.ChallengeId} onChange={this.handleChange} />
          <Form.Text className="text-muted">ChallengeId: int (unique)</Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicText">
          <Form.Control className="form-input" type="text" placeholder="Name" name="Name" value={this.state.Name} onChange={this.handleChange} />
          <Form.Text className="text-muted">Name: string</Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicText">
          <Form.Control className="form-input" type="text" placeholder="Type" name="Type" value={this.state.Type} onChange={this.handleChange} />
          <Form.Text className="text-muted">Type: enum 0:Milestone 1:Exploration 2:TimeTrial 3:Endurance</Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicText">
          <Form.Control className="form-input" type="text" placeholder="Tier" name="Tier" value={this.state.Tier} onChange={this.handleChange} />
          <Form.Text className="text-muted">Tier: enum 0:Basic 1:Gold 2:Silver 3:Bronze</Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicText">
          <Form.Control className="form-input" type="text" placeholder="Difficulty" name="Difficulty" value={this.state.Difficulty} onChange={this.handleChange} />
          <Form.Text className="text-muted">Difficulty: int 1 - 5</Form.Text>
        </Form.Group>
        <Form.Group controlId="Form.ControlTextarea1">
          <Form.Control as="textarea" rows="3" placeholder="Description" name="Description" value={this.state.Description} onChange={this.handleChange} />
          <Form.Text className="text-muted">Description: string</Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicText">
          <Form.Control className="form-input" type="text" placeholder="MovingTime" name="MovingTime" value={this.state.MovingTime} onChange={this.handleChange} />
          <Form.Text className="text-muted">MovingTime: int (in seconds)</Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicText">
          <Form.Control className="form-input" type="text" placeholder="AverageSpeed" name="AverageSpeed" value={this.state.AverageSpeed} onChange={this.handleChange} />
          <Form.Text className="text-muted">AverageSpeed: float (in meters per second)</Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicText">
          <Form.Control className="form-input" type="text" placeholder="MaxSpeed" name="MaxSpeed" value={this.state.MaxSpeed} onChange={this.handleChange} />
          <Form.Text className="text-muted">MaxSpeed: float (in meters per second)</Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicText">
          <Form.Control className="form-input" type="text" placeholder="Distance" name="Distance" value={this.state.Distance} onChange={this.handleChange} />
          <Form.Text className="text-muted">Distance: float (in meters)</Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicText">
          <Form.Control className="form-input" type="text" placeholder="Elevation" name="Elevation" value={this.state.Elevation} onChange={this.handleChange} />
          <Form.Text className="text-muted">Elevation: float (in meters)</Form.Text>
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

export default MilestoneLoader;