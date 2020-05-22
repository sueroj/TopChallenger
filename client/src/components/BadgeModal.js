import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './css/BadgeList.css';

import Badges from './Badges';

function BadgeModal(props) {
    const [user, setUser] = useState(props.user);
    const [profile, setProfile] = useState(props.profile);
    const [challenges, setChallenges] = useState(props.challenges);

    useEffect(() => {
        setChallenges(props.challenges)
    }, [props.challenges]
  );

    return(
        <Modal className="badge-modal"
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                props.challenges.Type[TBD]
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>props.challenges.Name</h4>
                <p>
                props.challenges.Description[TBD]
                props.challenges.Time[TBD]
                props.challenges.Distance[TBD]
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    ); 
}

export default BadgeModal;