import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import './css/SideView.css';
import Badge from '../shared/Badge';
import ActivityModal from './ActivityModal';

function SideChallenges(props) {
    const [viewModal, toggleModal] = useState(false);
    const [isSynced, setIsSynced] = useState(false);

    const setSync = (sync) =>
        setIsSynced(sync);

    const toggleActivityModal = () => {
        toggleModal(!viewModal);
      }

    useEffect(() => {

    }, [props.profile]
    );

    return(
            <><ActivityModal user={props.user} profile={props.profile} updateProfile={props.updateProfile} completeChallenge={props.completeChallenge} setSync={setSync} isSynced={isSynced} show={viewModal} toggleActivityModal={toggleActivityModal}/>

            <div className="side-view">
                <h1>Challenges</h1>

                    <div className="side-complete-button">
                        <Button variant="success" onClick={toggleActivityModal}>Complete Challenges</Button>
                    </div> 

                    {props.profile.TrackedChallenges.map((trackedChallenge) => {
                        return <TrackedChallenges trackedChallenge={trackedChallenge} profile={props.profile}/>
                    })}
                    
            </div></>
        ); 
};

const TrackedChallenges = props => {
    return <><div className="side-challenges-list-row">
    { props.trackedChallenge ? <Badge className="side-badge" focus={false} challenge={props.trackedChallenge} profile={props.profile}/> : null }
    </div></>
}

export default SideChallenges;