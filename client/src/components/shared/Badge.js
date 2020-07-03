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
import ModalCanvas from './ModalCanvas';
import ChallengeModal from './ChallengeModal';

function Badge(props) {
    const [viewModal, toggleModal] = useState(false);

    function toggleChallengeModal() {
        toggleModal(!viewModal);
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
            <ChallengeModal show={viewModal} toggleChallengeModal={toggleChallengeModal} {...props} />

            <button className="badge-wrapper" onClick={toggleChallengeModal}>
                {props.completed ? <Image className="badge-img" src={importAsset("badges/complete", props.challenge.ChallengeId)} alt={props.challenge.Name} rounded /> :
                    <Image className="badge-img" src={importAsset("scheme_geometric/badges", props.challenge.ChallengeId)} alt={props.challenge.Name} rounded />}
                <div className="badge-rp">{props.challenge.Rp} RP</div>
                <div className="badge-name-header">{props.challenge.Name}</div>
            </button>
        </>
    );
}

export default Badge;