import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../shared/css/Badge.css';
import mapboxgl from 'mapbox-gl';
import Map from '../shared/Map';


function TrackedModal(props) {
    const [profile, setProfile] = useState(props.profile);

    // var map = new mapboxgl.Map({ 
    //     container: 'map',
    //     center: [52.18,0.17],
    //     zoom: 10
    // })

    function UntrackChallenge(profile) {

        let isTracked = true;
        let newProfile = profile;
        for (let slot=0; slot<profile.TrackedChallenges.length; slot++) {

            if (profile.TrackedChallenges[slot])
            {
                if (profile.TrackedChallenges[slot].ChallengeId === props.challenge.ChallengeId && isTracked === true) {
                    newProfile.TrackedChallenges[slot] = null;
                    setProfile(newProfile);
                    isTracked = false;

                    props.updateProfile(profile);
                    props.showMessageModal(props.challenge.Name + " untracked.");
                }
            }
        }
        props.toggleTrackerModal() //close modal
    }

    function convertDifficultly(difficulty) {
        let output = [];
        for (let i=0;i<difficulty;i++) {
            output.push(<span>&#x2605;</span>);
        }
        return output;
       
    }
        

    return(
        <>
        <Modal className="badge-modal" onHide={() => props.toggleTrackerModal()}
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                <div className="badge-modal-title">
                {props.challenge.Name}
                
                </div>
                
                </Modal.Title>
            </Modal.Header>
            <span className="badge-modal-difficulty">Difficulty: {convertDifficultly(props.challenge.Difficulty)}</span>
            <Modal.Body>
                
                <div id="map" className="badge-modal-map">
                    <Map long={5} lat={34} zoom={2} />
                {/* <Image className="badge-modal-map" src={First30} alt={props.challenge.Name} /> */}
                </div>

                <div className="badge-modal-details">
                {props.challenge.Description}
                <span style={{float: "right"}}>0 Rank Points</span>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => UntrackChallenge(profile)}>Untrack Challenge</Button>
                <Button onClick={() => props.toggleTrackerModal()}>Back</Button>
            </Modal.Footer>
        </Modal>    
   </>
    ); 
}

export default TrackedModal;