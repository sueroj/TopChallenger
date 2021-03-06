// BadgeRow
// Purpose: Draws an individual type of badges (i.e. Milestone, Exploration, etc). 
// Export: BadgeWindow
// --TBD-- 
// Implementation of full header arrow functionality.
// Eval use of Bootstrap accordion.
// Straighten badge table margins.
import React, { useState, useEffect } from 'react';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import arrowUp from "assets/navs/arrowUp.png";
import './css/BadgeWindow.css';

import Badge from '../shared/Badge';

function BadgeRow(props) {
    const [typeCompleted, setTypeCompleted] = useState(0);
    const [totalChallenges, setTotalChallenges] = useState(0);
    const [toggleRow, rowIsToggled] = useState(true);

    useEffect(() => {

        if (props.challenges) {
            setTypeCompleted(calcTypeCompleted());
            setTotalChallenges(calcTotalChallenges());
        }

        function calcTypeCompleted() {
            let count = 0;
            for (let x = 0; x < props.profile.Completed.length; x++) {
                if (props.profile.Completed[x].Type === props.challengeType){
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

    function handleRowToggle() {
        rowIsToggled(!toggleRow);
    }

    function calcCompletedChallenge(challenge) {
        let completed = {
            status : false,
            tier : null
        }
        for (let x = 0; x < props.profile.Completed.length; x++) {
            if (props.profile.Completed[x].ChallengeId === challenge.ChallengeId) {
                completed.status = true;
                completed.tier = props.profile.Completed[x].Tier;
            }
        }
        return completed;
    }

    return (
        <>
            {/* Badge Row Header */}
            <Row>
                <div className="badge-list-header">
                    <Button className="header-arrow-wrapper" onClick={handleRowToggle}>
                        <Image className="header-arrow" src={arrowUp} alt="Header Arrow" />
                    </Button>
                    <div className="header-title-wrapper">
                        {props.header}
                    </div>
                    <div className="header-stats-wrapper">
                        {typeCompleted} / {totalChallenges}
                    </div>
                </div>
            </Row>

            {toggleRow // display badges
                ?
                <div className="badge-table">
                    {props.challenges ? (props.challenges.map(challenge => {
                        if (challenge.Type === props.challengeType) {
                            return <Badge completed={calcCompletedChallenge(challenge)} challenge={challenge} {...props} />
                        }
                        else return null;
                    })
                    ) : null}
                </div>
                : null}
        </>
    );
}

export default BadgeRow;