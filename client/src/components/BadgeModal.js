import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './css/BadgeList.css';

import BadgeListHeader from './BadgeListHeader';
import BadgeTable from './BadgeTable';

class BadgeModal extends React.Component {
    constructor(props) {
    super(props);
    this.state= {
        user: this.props.user,
        profile: this.props.profile,
        challenges: this.props.challenges,
        onHide: this.props.onHide
        };
    }

    componentDidMount() {
    }


    render(){
        const { user } = this.state;
        const { profile } = this.state;
        const { challenges } = this.state;
        return(
            <div className="badge-modal-wrapper">
                    <Modal
                        {...this.props}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                            Modal heading
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h4>Centered Modal</h4>
                            <p>
                            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                            consectetur ac, vestibulum at eros.
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.props.onHide}>Close</Button>
                        </Modal.Footer>
                    </Modal>
            </div>
        );   
    }  
}

export default BadgeModal;