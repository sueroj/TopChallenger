import React, {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import './css/ResultModal.css';

function ResultModal(props) {


    return(
            <Modal className="badge-modal" onHide={() => props.toggleResultModal()}
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h4>Your activities to be submitted:</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
         

                </Modal.Body>
                <Modal.Footer className="activity-sync-modal-footer">
                    
                </Modal.Footer>
            </Modal>
    );   
}  


export default ResultModal;
