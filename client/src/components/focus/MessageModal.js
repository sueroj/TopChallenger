// MessageModal
// Purpose: Display message to user on Dashboard after key events such as challenge add/remove.
// Export: dashboard
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './css/MessageModal.css';

function MessageModal(props) {

    function splitMessage(message) {
        message = message.split(".");
        return message.map((msg) => <p>{msg}</p>)
    }

    return (
        <Modal className="badge-modal" onHide={() => props.toggleMessageModal()}
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h4>Challenge Update</h4>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                {props.modalMessage.length !== 0 ?
                    <div>{splitMessage(props.modalMessage)}</div>
                    : "No changes made."
                }

            </Modal.Body>
            <Modal.Footer className="activity-sync-modal-footer">
                <Button variant="success" onClick={() => props.toggleMessageModal()}>OK</Button>
            </Modal.Footer>
        </Modal>
    );
}


export default MessageModal;
