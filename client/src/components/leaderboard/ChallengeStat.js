// Export: FocusView
// --TBD-- 
// Implementation of profile background and title change, or omit.
// Implementation of progress bar and rank up logic.
import React, { useEffect, useState } from 'react';
import './css/Profile.css';

function ChallengeStat(props) {
    const [typeCompleted, setTypeCompleted] = useState(0);
    const [totalChallenges, setTotalChallenges] = useState(0);

    useEffect(() => {

        if (props.challenges) {
        setTypeCompleted(calcTypeCompleted());
        setTotalChallenges(calcTotalChallenges());
        }

        function calcTypeCompleted() {
            let count = 0;
            for (let x = 0; x < props.profile.Completed.length; x++) {
                if (props.profile.Completed[x].Type === props.challengeType) {
                    count++;
                }
            }
            return count;
        }

        function calcTotalChallenges() {
            let count = 0;
            props.challenges.forEach(element => {
                if (element.Type === props.challengeType)
                    count++;
            })
            return count;
        }
    }
        , [props.challenges, props.profile.Completed, props.challengeType]
    );

    return (
        <div className="stat-wrapper">
            {props.label}:{" "}
            {typeCompleted} / {totalChallenges}
        </div>
    );
}

export default ChallengeStat;