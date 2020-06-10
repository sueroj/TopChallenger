import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import './css/Badge.css';
import Map from './Map';

function Badge(props) {
    const [profile, setProfile] = useState(props.profile);
    const [viewModal, toggleModal] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [tracked, setTracked] = useState(false);

    function handleModal() {
        toggleModal(!viewModal);
    }

    function verifyState() {
        setCompleted(checkIfCompleted(props.profile));
        setTracked(checkIfTracked(props.profile));
    }

    function checkIfTracked(profile) {
        for (let challenge = 0; challenge < profile.TrackedChallenges.length; challenge++) {
            if (profile.TrackedChallenges[challenge]) {
                if (profile.TrackedChallenges[challenge].ChallengeId === props.challenge.ChallengeId) {
                    return true;
                }
            }
        }
        return false;
    }

    function checkIfCompleted(profile) {
        for (let challenge = 0; challenge < profile.Completed.length; challenge++) {
            if (profile.Completed[challenge].ChallengeId === props.challenge.ChallengeId) {
                return true;
            }
        }
        return false;
    }


    // Algorithm for organizing accepted challenges here. Accepted challenges should be
    // checked to see if maximum limit has been reached.
    function TrackChallenge(profile) {
        let isTracked = false;
        let newProfile = profile;
        for (let slot = 0; slot < profile.TrackedChallenges.length; slot++) {

            // Check for empty slot then track
            if (profile.TrackedChallenges[slot] === null && isTracked === false) {
                newProfile.TrackedChallenges[slot] = props.challenge;
                setProfile(newProfile);
                isTracked = true;

                props.updateProfile(profile);
                props.showMessageModal(props.challenge.Name + " added.");
            }
        }
        handleModal(); //close modal
    }

    function convertDifficultly(difficulty) {
        let output = [];
        for (let i = 0; i < difficulty; i++) {
            output.push(<span>&#x2605;</span>);
        }
        return output;
    }

    const importAsset = (type, challengeId) => {
        let banner = [];
        try {
            banner = require(`assets/${type}/${challengeId}.png`);
        } catch {
            banner = require(`assets/${type}/default.png`);
        }
        return banner;
    }

    return (
        <>
            <Modal className="badge-modal" show={viewModal} onHide={handleModal} onShow={() => verifyState()}
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
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
                        {props.challenge.Type !== 0 ? <Map {...props} />
                            : <Image className="badge-modal-map" src={importAsset("banners", props.challenge.ChallengeId)} alt={props.challenge.Name} />}
                    </div>

                    <div className="badge-modal-details">
                        {props.challenge.Description}
                        <span style={{ float: "right" }}>{props.challenge.Rp} Rank Points</span>
                    </div>
                </Modal.Body>
                
                <Modal.Footer>
                    {completed ? <Button variant="warning" >Challenge Completed</Button>
                        : (tracked ? <Button variant="warning" >Challenge Tracked</Button>
                            : <Button variant="success" onClick={() => TrackChallenge(profile)}>Accept Challenge</Button>)}
                    <Button onClick={handleModal}>Back</Button>
                </Modal.Footer>
            </Modal>

            {
                <button className="badge-wrapper" onClick={handleModal}>
                    {props.completed ? <Image className="badge-img" src={importAsset("badges/complete", props.challenge.ChallengeId)} alt={props.challenge.Name} rounded /> :
                        <Image className="badge-img" src={importAsset("scheme_geometric/badges", props.challenge.ChallengeId)} alt={props.challenge.Name} rounded />}
                    <div className="badge-rp">{props.challenge.Rp} RP</div>
                    <div className="badge-name-header">{props.challenge.Name}</div>
                </button>
            }
        </>
    );
}

export default Badge;