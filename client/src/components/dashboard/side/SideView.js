// SideView
// Purpose: Container for all side windows.
// Export: dashboard
import React from 'react';
import Challenges from './Challenges';
import Progression from './Progression';
import Friends from './Friends';
import './css/SideView.css';

function SideView(props) {

    return( 
            <>
            <Challenges className="side-view" {...props}/>
            <Progression className="side-view" {...props}/>
            <Friends className="side-view" user={props.user} profile={props.profile}/>
            </>
        ); 
    }  

export default SideView;