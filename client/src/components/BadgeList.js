import React, {useState, useEffect} from 'react';
import './css/BadgeList.css';

import Badges from './Badges';

function BadgeList(props) {
    // const [user, setUser] = useState(props.user);
    // const [profile, setProfile] = useState(props.profile);
    const [challenges, setChallenges] = useState(props.challenges);
    
    useEffect(() => {
        setChallenges(props.challenges)
    }, [props.challenges]
  );

    return(
        <div className="badge-list-wrapper">
            <Badges type={0} header="Milestone" user={props.user} profile={props.profile} challenges={challenges}/>
            <Badges type={1} header="Exploration" user={props.user} profile={props.profile} challenges={challenges}/>
            <Badges type={2} header="Time Trials"  user={props.user} profile={props.profile} challenges={challenges}/>
            <Badges type={3} header="Endurance" user={props.user} profile={props.profile} challenges={challenges}/>
        </div>
    );   
}  


export default BadgeList;