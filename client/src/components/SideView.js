import React, {useState,useEffect} from 'react';
import SideRewards from './SideRewards';
import SideChallenges from './SideChallenges';
import SideProgression from './SideProgression';
import SideFriends from './SideFriends';
import './css/SideView.css';

function SideView(props) {
    // const [user, setUser] = useState(props.user);
    // const [profile, setProfile] = useState(props.profile);
    const [challenges, setChallenges] = useState(props.challenges);

    useEffect(() => {
        setChallenges(props.challenges);

        },[props.challenges]
    );



    return( 
            <>
            <SideRewards className="side-view" user={props.user} />
            <SideChallenges className="side-view" user={props.user} profile={props.profile} challenges={challenges}/>
            <SideProgression className="side-view" user={props.user} profile={props.profile}/>
            <SideFriends className="side-view" user={props.user} profile={props.profile}/>
            </>
        ); 
    }  

export default SideView;