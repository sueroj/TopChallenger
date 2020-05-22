import React, {useState, useEffect} from 'react';
import Profile from './Profile';
import BadgeList from './BadgeList';

function FocusView(props) {
    // const [user, setUser] = useState(props.user)
    // const [profile, setProfile] = useState(props.profile)
    const [challenges, setChallenges] = useState(props.challenges)

    useEffect(() => {
          setChallenges(props.challenges)
      }, [props.challenges]
    );


    return(
            <><Profile user={props.user} profile={props.profile} />
            <BadgeList user={props.user} profile={props.profile} challenges={challenges}/></>
        ); 
}  

export default FocusView;