// Challenges
// Purpose: Display tracked challenges and complete button on side. 
// Export: SideView
// --TBD-- 
// Font
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import './css/SideView.css';
import Image from 'react-bootstrap/Image';
import emptySlot from 'assets/badges/emptySlot.png';
import ActivityModal from './ActivityModal';
import ChallengeModal from '../shared/ChallengeModal';

function Challenges(props) {
    const [viewModal, toggleModal] = useState(false);
    const [isSynced, setIsSynced] = useState(false);
    const [viewChallengeModal, toggleChallengeModal] = useState(false);
    const [tracked, setTracked] = useState([]);

    const setSync = (sync) =>
        setIsSynced(sync);

    const toggleActivityModal = () => {
        toggleModal(!viewModal);
    }

    useEffect(() => {

    }, [props.profile]
    );

    function handleChallengeModal(trackedChallenge) {
        setTracked(trackedChallenge);
        toggleChallengeModal(!viewChallengeModal);
    }

    return (
        <><ActivityModal user={props.user} profile={props.profile} updateProfile={props.updateProfile} showMessageModal={props.showMessageModal} setSync={setSync} isSynced={isSynced} show={viewModal} toggleActivityModal={toggleActivityModal} />
            <ChallengeModal profile={props.profile} challenge={tracked} show={viewChallengeModal} toggleChallengeModal={toggleChallengeModal} updateProfile={props.updateProfile} showMessageModal={props.showMessageModal}/>

            <div className="challenges-content">
                <h1>Tracker</h1>
                <div className="challenges-tracked">
                    {props.profile.TrackedChallenges.map((trackedChallenge) => {
                        return <>
                            <div className="side-challenges-list-row">
                                {trackedChallenge ?
                                    <button className="side-button-wrapper" onClick={() => handleChallengeModal(trackedChallenge)}>
                                        <Image className="side-img-badge" src={props.importAsset("scheme_geometric/badges", trackedChallenge.ChallengeId)} alt={"Badge"} rounded />
                                        <div className="side-description">
                                            {trackedChallenge.Description}
                                        </div>
                                    </button>
                                    : <><Image className="side-img-badge-empty" src={emptySlot} alt={"empty slot"} rounded /><span className="challenge-slot-text">-- Empty Slot --</span></> }
                                </div>
                        </>
                    })}
                </div>

                <div className="side-complete-button">
                    <Button variant="success" onClick={toggleActivityModal}>Complete Challenges</Button>
                </div>

            </div></>
    );
};

export default Challenges;