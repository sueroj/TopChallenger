import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import './css/SideView.css';
import Badge from '../focus/Badge';
import ActivitySyncModal from './ActivitySyncModal';

function SideChallenges(props) {
    const [viewModal, toggleModal] = useState(false);

    function handleModal() {
        toggleModal(!viewModal);
      }

    useEffect(() => {

    }, [props.profile]
    );

    return(
            <><ActivitySyncModal profile={props.profile} show={viewModal} onHide={handleModal}/>

            <div className="side-view">
                <h1>Challenges</h1>

                    <div className="side-complete-button">
                        <Button variant="success" onClick={handleModal}>Complete Challenges</Button>
                    </div> 

                    {props.profile.Tracked.map((trackedChallenge) => {
                        return <Tracked trackedChallenge={trackedChallenge} profile={props.profile}/>
                    })}
                    
            </div>     </>
        ); 
};

const Tracked = props => {
    return <><div className="side-challenges-list-row">
    { props.trackedChallenge ? <Badge className="side-badge" focus={false} challenge={props.trackedChallenge} profile={props.profile}/> : null }
    </div></>
}

export default SideChallenges;