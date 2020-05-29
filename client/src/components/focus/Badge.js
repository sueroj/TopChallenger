import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import fakeBadge2 from 'assets/badges/fakeBadge2.png';
import './css/BadgeWindow.css';
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
 function TrackActivity() {
    let isTracked = false;
    let newProfile = profile;
    for (let slot=0; slot<profile.Tracked.length; slot++) {
    //Check to see if challenge is already tracked
        if (profile.Tracked[slot] !== null) { 
            if (profile.Tracked[slot].ChallengeId === props.challenge.ChallengeId) {
                isTracked = true;
            }   
        }

        // Check for empty slot then track
        if (profile.Tracked[slot] === null && isTracked === false) {
            newProfile.Tracked[slot] = props.challenge;
            setProfile(newProfile);
            isTracked = true;

            fetch((`http://localhost:4000/api/topchallenger/track/${profile.Id}`), { 
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(profile)
              })
              .then(response => { if (!response.ok) {
                     throw new Error('Network response was not ok');}  
                     return response })
                .then(() => {
                    props.changeProfile(profile);
                    sessionStorage.setItem('sessionProfile', JSON.stringify(profile));
                }
                )
              .catch(error => {
                console.error('Server Error:', error);
                alert("Server Error.");
            });
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
                {props.challenge.Name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
                <div id="map" className="badge-modal-map"></div>

                <p>
                {props.challenge.Description}
                {props.challenge.MovingTime}
                {props.challenge.Distance}
                {/* Challenge map here. should be done async */}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={TrackActivity}>Accept Challenge</Button>
                <Button onClick={handleModal}>Back</Button>
            </Modal.Footer>
        </Modal>

        { props.focus ?
            <button className="badge-wrapper" onClick={handleModal}>
                <Image className="badge-img" src={fakeBadge2} alt={"Badge"}rounded/>
                <div className="badge-name-header">{props.challenge.Name}</div>
                {/* <div className="badge-description">
                    {props.challenge.Description}
                </div>  implement display in tooltip*/} 
            </button>
            :
            <button className="side-button-wrapper" onClick={handleModal}>
            <Image className="side-img-badge" src={fakeBadge2} alt={"Badge"}rounded/>
            <div className="side-description">
                {props.challenge.Description}
            </div>
            </button>
        }
            
   </>
    ); 
}

export default Badge;