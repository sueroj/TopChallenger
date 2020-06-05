import React from 'react';
import './css/BadgeWindow.css';

import BadgeRow from './BadgeRow';

function BadgeWindow(props) {

    const challengeType = {
        MILESTONE: 0,
        EXPLORATION: 1,
        TIMETRIAL: 2,
        ENDURANCE: 3,
    }

    return(
        <div className="badge-list-wrapper">
            <BadgeRow challengeType={challengeType.MILESTONE} header="Milestone" {...props}/>
            <BadgeRow challengeType={challengeType.EXPLORATION} header="Exploration" {...props}/>
            <BadgeRow challengeType={challengeType.TIMETRIAL} header="Time Trials / Sprints"  {...props}/>
            <BadgeRow challengeType={challengeType.ENDURANCE} header="Endurance" {...props}/>
        </div>
    );   
}  


export default BadgeWindow;