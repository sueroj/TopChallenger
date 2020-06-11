// TrackedModal
// Purpose: Display modal for tracked challenges on click. 
// Export: Challenges.
// --TBD-- 
// Eval merge with Badge or lift up.
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../shared/css/Badge.css';
import Map from '../shared/Map';

function TrackedModal(props) {
    const [profile, setProfile] = useState(props.profile);

    function UntrackChallenge(profile) {

        let isTracked = true;
        let newProfile = profile;
        for (let slot = 0; slot < profile.TrackedChallenges.length; slot++) {

            if (profile.TrackedChallenges[slot]) {
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
        for (let i = 0; i < difficulty; i++) {
            output.push(<span>&#x2605;</span>);
        }
        return output;
    }

    function importAsset(type, challengeId) {
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
                        {props.challenge.Type !== 0 ? <Map {...props} />
                            : <img className="badge-modal-map" src={importAsset("banners", props.challenge.ChallengeId)} alt={props.challenge.Name} />}
                    </div>

                    <div className="badge-modal-details">
                        {props.challenge.Description}
                        <span style={{ float: "right" }}>{props.challenge.Rp} Rank Points</span>
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