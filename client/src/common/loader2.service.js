// Time Trial Loader
// Purpose: Dev tool for loading Time Trial challenges. 
// Export: App
// --Usage Notes-- 
// Enter unique Challenge ID 2000 - 2999.
// Tier = 2 for Time Trial.
// Primary: MovingTime, AverageSpeed, Polyline, Lng, Lat.
// Mix of custom and generated badges/badgeCanvas. (custom for only most popular TTs i.e. Richmond Park)
import Polyline from '@mapbox/polyline';
import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../pages/css/dashboard.css';
import { SERVER_URL } from '../api/config.json';
import axios from 'axios';

class TimeTrialLoader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(sessionStorage.getItem('sessionUser')) ? JSON.parse(sessionStorage.getItem('sessionUser')) : this.props.user,
            SegmentId: 'SegmentId',
            ChallengeId: 'Challenge ID',
            Name: "Name",
            Type: "Type",
            Tier: "Tier",
            Difficulty: "Difficulty",
            BadgeId: "BadgeId",
            Description: "Description",
            MovingTime: 0,
            AverageSpeed: 0,
            MaxSpeed: 0,
            Distance: 0,
            Elevation: 0,
            Polyline: null,
            StartLng: 0,
            StartLat: 0,
            EndLng: 0,
            EndLat: 0,
            segmentData: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getSegment = this.getSegment.bind(this);
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

    getSegment(event) {

        axios.get((`https://www.strava.com/api/v3/segments/${this.state.SegmentId}`), {
            headers: { Authorization: `Bearer ${this.state.user.access_token}` },
        })
            .then((response) => {
                console.log(response.data);
                this.setState({
                    Distance: response.data.distance,
                    Polyline: response.data.map.polyline,
                    StartLng: response.data.start_longitude,
                    StartLat: response.data.start_latitude,
                    EndLng: response.data.end_longitude,
                    EndLat: response.data.end_latitude
                });
                console.log(Polyline.decode(response.data.map.polyline));
                console.log(Polyline.toGeoJSON(response.data.map.polyline));
            })
            .catch((e) => {
                console.log("Could not connect to server:", e);
            })
    }



    render() {
        return (
            <> <h2>Time Trial Loader</h2>
                <Row>
                    <Col>
                        <div className="loader-get-segment">
                            <Form className="loader">
                                <Form.Group controlId="formBasicText">
                                    <Form.Control className="form-input" type="text" placeholder="Strava Segment ID" name="SegmentId" value={this.state.SegmentId} onChange={this.handleChange} />
                                    <Form.Text className="text-muted">SegmentId: int (unique)</Form.Text>
                                </Form.Group>
                                <Form.Group controlId="buttons">
                                    <Button variant="primary" onClick={this.getSegment}>
                                        Submit
                    </Button>
                                </Form.Group>
                            </Form>
                        </div>
                    </Col>

                    <Col>
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
                            <Form.Group controlId="formBasicText">
                                <Form.Control className="form-input" type="text" placeholder="BadgeId" name="BadgeId" value={this.state.BadgeId} onChange={this.handleChange} />
                                <Form.Text className="text-muted">BadgeId: int (should be same as ChallengeId)</Form.Text>
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

                            <Form.Group controlId="formBasicText">
                                <Form.Control className="form-input" type="text" placeholder="Polyline" name="Polyline" value={this.state.Polyline} onChange={this.handleChange} />
                                <Form.Text className="text-muted">Polyline: string</Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicText">
                                <Form.Control className="form-input" type="text" placeholder="StartLng" name="StartLng" value={this.state.StartLng} onChange={this.handleChange} />
                                <Form.Text className="text-muted">StartLng: double</Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicText">
                                <Form.Control className="form-input" type="text" placeholder="StartLat" name="StartLat" value={this.state.StartLat} onChange={this.handleChange} />
                                <Form.Text className="text-muted">StartLat: double</Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicText">
                                <Form.Control className="form-input" type="text" placeholder="EndLng" name="EndLng" value={this.state.EndLng} onChange={this.handleChange} />
                                <Form.Text className="text-muted">EndLng: double</Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicText">
                                <Form.Control className="form-input" type="text" placeholder="EndLat" name="EndLat" value={this.state.EndLat} onChange={this.handleChange} />
                                <Form.Text className="text-muted">EndLat: double</Form.Text>
                            </Form.Group>

                            <Form.Group controlId="buttons">
                                <Button variant="primary" type="submit">
                                    Submit
                </Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </>
        );
    }
}

export default TimeTrialLoader;