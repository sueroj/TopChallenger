import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import fakeBadge2 from 'assets/badges/fakeBadge2.png';
import fakeBadge2Complete from 'assets/badges/fakeBadge2Complete.png';
import './css/Badge.css';
import mapboxgl from 'mapbox-gl';


function Badge(props) {
    const [profile, setProfile] = useState(props.profile);
    const [viewModal, toggleModal] = useState(false);
    // var map = new mapboxgl.Map({ 
    //     container: 'map',
    //     center: [52.18,0.17],
    //     zoom: 10
    // })
   

    function handleModal() {
        toggleModal(!viewModal);
    }


    // Algorithm for organizing accepted challenges here. Accepted challenges should be
    // checked to see if maximum limit has been reached.
    // If slot available: allow challenge to be accepted
    // If not slow available: has user replace with another slot. Max 5.
    // Should be done client-side and server-side for double-verify.
    function TrackActivity(profile) {
        let isTracked = false;
        let newProfile = profile;
        for (let slot=0; slot<profile.TrackedChallenges.length; slot++) {
        //Check to see if challenge is already tracked
            if (profile.TrackedChallenges[slot] !== null) { 
                if (profile.TrackedChallenges[slot].ChallengeId === props.challenge.ChallengeId) {
                    isTracked = true;
                }   
            }

        // Check for empty slot then track
            if (profile.TrackedChallenges[slot] === null && isTracked === false) {
                newProfile.TrackedChallenges[slot] = props.challenge;
                setProfile(newProfile);
                isTracked = true;

                props.updateProfile(profile);
            }
        }
        handleModal(); //close modal
    }

    return(
        <>
        <Modal className="badge-modal" show={viewModal} onHide={handleModal}
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
            <span className="badge-modal-difficulty">Difficulty: 3</span>
            <Modal.Body>
                
                <div id="map" className="badge-modal-map"></div>

                <div>
                {props.challenge.Description}
                <span style={{float: "right"}}>0 Rank Points</span>
                </div>

                <p>

                {props.challenge.MovingTime}<br></br>
                {props.challenge.Distance}
                {/* Challenge map here. should be done async */}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={() => TrackActivity(profile)}>Accept Challenge</Button>
                <Button onClick={handleModal}>Back</Button>
            </Modal.Footer>
        </Modal>

        { props.focus ?
            <button className="badge-wrapper" onClick={handleModal}> 
                { props.completed ? <Image className="badge-img" src={fakeBadge2Complete} alt={props.challenge.Name} rounded/> : 
                    <Image className="badge-img" src={fakeBadge2} alt={props.challenge.Name} rounded/> }
                <div className="badge-name-header">{props.challenge.Name}</div>
            </button>
            :
            <button className="side-button-wrapper" onClick={handleModal}>
            <Image className="side-img-badge" src={fakeBadge2} alt={"Badge"} rounded/>
            <div className="side-description">
                {props.challenge.Description}
            </div>
            </button>
        }     
   </>
    ); 
}

export default Badge;