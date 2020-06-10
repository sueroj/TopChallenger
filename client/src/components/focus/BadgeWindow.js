import React from 'react';
import './css/BadgeWindow.css';
import * as challengeType from 'common/challengeType.json'

import BadgeRow from './BadgeRow';

function BadgeWindow(props) {

    return (
        <div className="badge-list-wrapper">
            <BadgeRow challengeType={challengeType.MILESTONE} header="Milestone" {...props} />
            <BadgeRow challengeType={challengeType.EXPLORATION} header="Exploration" {...props} />
            <BadgeRow challengeType={challengeType.TIMETRIAL} header="Time Trials / Sprints"  {...props} />
            <BadgeRow challengeType={challengeType.ROUTE} header="Timed Routes"  {...props} />
            <BadgeRow challengeType={challengeType.ENDURANCE} header="Endurance" {...props} />
        </div>
    );
}


export default BadgeWindow;