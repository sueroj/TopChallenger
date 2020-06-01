import React, {useState, useEffect}from 'react';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import arrowUp from "assets/nav/arrowUp.png";
import './css/BadgeWindow.css';

import Badge from '../shared/Badge';

function BadgeRow(props) {
    const [totalChallenges, setTotalChallenges] = useState(0);
    const [toggleRow, rowIsToggled] = useState(true);

    useEffect(() => {

        if (props.challenges) {
            setTotalChallenges(calcTotalChallenges());
        }

        function calcTotalChallenges() {
            let count = 0;
            props.challenges.forEach(element =>
                { if (element.Type === props.challengeType) 
                count++; })
            return count;
        }
    }
    ,[props.challenges, props.challengeType]
    );

    function handleRowToggle() {
        rowIsToggled(!toggleRow);
    }

    function calcCompletedChallenge(challenge) {
        let completedStatus = false;
        for (let x=0;x<props.profile.Completed.length;x++) {
            if (props.profile.Completed[x].ChallengeId === challenge.ChallengeId){
                completedStatus = true;
            } 
        }
        return completedStatus;
    }

    return(
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
                    {props.profile.TotalCompleted}/{totalChallenges}
                </div>
        </div>
        </Row>

        {toggleRow // display badges
        ? 
            <div className="badge-table">   
                { props.challenges ? (props.challenges.map(challenge => {
                    if (challenge.Type === props.challengeType) {
                    return <Badge focus={true} completed={calcCompletedChallenge(challenge)} challenge={challenge} {...props}/>
                        }
                    else return null;
                    })
                ): null }
            </div>
        : null }
        </>
    );
}

export default BadgeRow;