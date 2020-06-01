import React from 'react';
import './css/SideView.css';

function SideProgression(props) {



    return(
            <div className="side-view">
                <h1>Progression</h1>
                <span>Challenges complete: {props.profile.TotalCompleted}</span>
                
            </div>     
        ); 
    }  


export default SideProgression;