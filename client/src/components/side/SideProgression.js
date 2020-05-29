import React, {useState, useEffect} from 'react';
import './css/SideView.css';

function SideProgression(props) {
    // const [user, setUser] = useState(props.user);
    // const [challenges, setChallenges] = useState(props.challenges);
    // const [profile, setProfile] = useState(props.profile);

    // useEffect(() => {
    //     setChallenges(props.challenges);

    //     },[props.challenges]
    // );

    return(
            <div className="side-view">
                <h1>Progression</h1>
                <span>Challenges complete: {props.profile.TotalCompleted}</span>

                
            </div>     
        ); 
    }  


export default SideProgression;