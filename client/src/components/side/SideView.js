import React from 'react';
import SideRewards from './SideRewards';
import SideChallenges from './SideChallenges';
import SideProgression from './SideProgression';
import SideFriends from './SideFriends';
import './css/SideView.css';

function SideView(props) {

    return( 
            <>
            <SideRewards className="side-view" user={props.user} />
            <SideChallenges className="side-view" {...props} />
            <SideProgression className="side-view" user={props.user} profile={props.profile}/>
            <SideFriends className="side-view" user={props.user} profile={props.profile}/>
            </>
        ); 
    }  

export default SideView;