import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import './css/SideView.css';
import Image from 'react-bootstrap/Image';
import fakeBadge2 from 'assets/badges/fakeBadge2.png';
import emptySlot from 'assets/badges/emptySlot.png';
import ActivityModal from './ActivityModal';
import TrackedModal from './TrackedModal';

function SideChallenges(props) {
    const [viewModal, toggleModal] = useState(false);
    const [isSynced, setIsSynced] = useState(false);
    const [viewTrackerModal, toggleTrackerModal] = useState(false);
    const [tracked, setTracked] = useState([]);

    const setSync = (sync) =>
        setIsSynced(sync);

    const toggleActivityModal = () => {
        toggleModal(!viewModal);
    }

    useEffect(() => {

    }, [props.profile]
    );

    function handleTrackerModal(trackedChallenge) {
        setTracked(trackedChallenge);
        toggleTrackerModal(!viewTrackerModal);
    }

    return (
        <><ActivityModal user={props.user} profile={props.profile} updateProfile={props.updateProfile} showMessageModal={props.showMessageModal} setSync={setSync} isSynced={isSynced} show={viewModal} toggleActivityModal={toggleActivityModal} />
            <TrackedModal profile={props.profile} challenge={tracked} updateProfile={props.updateProfile} showMessageModal={props.showMessageModal} show={viewTrackerModal} toggleTrackerModal={toggleTrackerModal} />

            <div className="challenges-content">
                <h1>Tracker</h1>
                <div className="challenges-tracked">
                    {props.profile.TrackedChallenges.map((trackedChallenge) => {
                        return <>
                            <div className="side-challenges-list-row">
                                {trackedChallenge ?
                                    <button className="side-button-wrapper" onClick={() => handleTrackerModal(trackedChallenge)}>
                                        <Image className="side-img-badge" src={fakeBadge2} alt={"Badge"} rounded />
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

export default SideChallenges;