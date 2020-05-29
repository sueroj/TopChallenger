import React from 'react';
import './css/BadgeWindow.css';

import BadgeRow from './BadgeRow';

function BadgeWindow(props) {

    return(
        <div className="badge-list-wrapper">
            <BadgeRow type={0} header="Milestone" {...props}/>
            <BadgeRow type={1} header="Exploration" {...props}/>
            <BadgeRow type={2} header="Time Trials"  {...props}/>
            <BadgeRow type={3} header="Endurance" {...props}/>
        </div>
    );   
}  


export default BadgeWindow;