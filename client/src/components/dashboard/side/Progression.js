// Progression
// Purpose: Display key stats on user profiles. 
// Export: SideView
// --TBD-- 
// Font
// Eval stats to be added.
import React, {useState, useEffect} from 'react';
import './css/SideView.css';

function Progression(props) {
    const [percentCompleted , setPercentCompleted] = useState(0);

    useEffect(() => {
        setPercentCompleted(calcPercentage(props.profile.TotalCompleted, props.challenges.length))

        function calcPercentage(totalCompleted, totalChallenges) {
            return Math.round((totalCompleted / totalChallenges) * 100);
        }
    }, [props.profile.TotalCompleted, props.challenges.length]
    )

    return(
            <div className="side-view">
                <h1 className="headers">Progression</h1>
                <div className="progression-stats">
                    <p>Leaderboard Rank: 1</p>
                    <p>Challenges complete: {props.profile.TotalCompleted} / {props.challenges.length}</p>
                    <p>% complete: {percentCompleted} %</p>
                    <p>Total RP Earned: {props.profile.TotalRp}</p>
                </div>
            </div>     
        ); 
    }  

export default Progression;