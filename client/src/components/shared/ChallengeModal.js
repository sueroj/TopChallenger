// Badge
// Purpose: Draws badge image as button that displays modal on click. 
// Export: BadgeRow
// --TBD-- 
// Add component BadgeCanvas to automate draw of badge image (similar to RankCanvas). Reference color scheme.
// Add tooltip to display challenge description.
// Increase image size to 60x60px.
// Eval move to /focus.
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import './css/Badge.css';
import Map from './Map';
import * as challengeType from 'common/challengeType.json';

function Badge(props) {
    const [profile, setProfile] = useState(props.profile);
    const [completed, setCompleted] = useState(false);
    const [tracked, setTracked] = useState(false);

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
        props.toggleChallengeModal(); //close modal
    }

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
        props.toggleChallengeModal() //close modal
    }

    function convertDifficulty(difficulty) {
        let output = [];
        for (let i = 0; i < difficulty; i++) {
            output.push(<span>&#x2605;</span>);
        }
        return output;
    }

    function formatTime(seconds) {
        return new Date(seconds * 1000).toISOString().substr(11, 8);
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
        <Modal className="badge-modal" onHide={() => props.toggleChallengeModal()} onShow={() => verifyState()}
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

            <span className="badge-modal-difficulty">Difficulty: {convertDifficulty(props.challenge.Difficulty)}</span>
            <Modal.Body>
                <div id="map" className="badge-modal-map">
                    {props.challenge.Type !== challengeType.MILESTONE
                        ? <Map {...props} />
                        : <Image className="badge-modal-map" src={importAsset("banners", props.challenge.ChallengeId)} alt={props.challenge.Name} />}
                </div>

                <div className="badge-modal-details">
                    {props.challenge.Description}
                    <span style={{ float: "right" }}>{props.challenge.Rp} Rank Points</span>
                </div>

                {props.challenge.isTimed ?
                    <div className="badge-modal-times">
                        <div className="badge-modal-medal"><Image src={importAsset("medals", "gold")} alt="gold" />{formatTime(props.challenge.TargetTime.Gold)}</div>
                        <div className="badge-modal-medal"><Image src={importAsset("medals", "silver")} alt="silver" />{formatTime(props.challenge.TargetTime.Silver)}</div>
                        <div className="badge-modal-medal"><Image src={importAsset("medals", "bronze")} alt="bronze" />{formatTime(props.challenge.TargetTime.Bronze)}</div>
                    </div>
                    : null}
            </Modal.Body>

            <Modal.Footer>
                {completed ? <Button variant="warning" >Challenge Completed</Button>
                    : (tracked ? <Button variant="danger" onClick={() => UntrackChallenge(profile)}>Untrack Challenge</Button>
                        : <Button variant="success" onClick={() => TrackChallenge(profile)}>Accept Challenge</Button>)}
                <Button onClick={() => props.toggleChallengeModal()}>Back</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Badge;