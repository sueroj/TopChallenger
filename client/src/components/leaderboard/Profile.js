// Export: FocusView
// --TBD-- 
// Implementation of profile background and title change, or omit.
// Implementation of progress bar and rank up logic.
import React from 'react';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './css/Profile.css';
import RankCanvas from 'components/dashboard/focus/RankCanvas';
import ChallengeStat from 'components/leaderboard/ChallengeStat';
import * as challengeType from 'common/challengeType.json'

function Profile(props) {
    const profile = props.profile;
    const challenges = props.challenges;

    return (
        <Row>
            <Col sm={1}>
                <div className="leaderboard-rank">
                    1
                </div>
            </Col>

            <Col sm={3}>
                {/* <div className="leaderboard-profile-background-img"></div> */}
                <div className="leaderboard-profile-main-wrapper">
                    <Image className="leaderboard-profile-img" src={props.user.athlete.profile} alt="Profile Image" roundedCircle />
                    <RankCanvas id={"currentRank"} rank={profile.Rank} {...props} />
                    <div className="leaderboard-profile-name">
                    <span className="leaderboard-profile-name">{props.user.athlete.firstname} {props.user.athlete.lastname}</span>
                    <span className="leaderboard-profile-title">{props.profile.Title}</span>
                </div>
                </div>
            </Col>

            <Col sm={1}>
                <div className="leaderboard-profile-rp">
                    {props.profile.TotalRp}
                </div>
            </Col>

            <Col sm={1.5}>
                
            </Col>

            <Col sm={7}>
                <div className="leaderboard-profile-stats">
                    <ChallengeStat label={"M"} challengeType={challengeType.MILESTONE} {...props}/>
                    <ChallengeStat label={"E"}challengeType={challengeType.EXPLORATION} {...props}/>
                    <ChallengeStat label={"TT"}challengeType={challengeType.TIMETRIAL} {...props}/>
                    <ChallengeStat label={"R"}challengeType={challengeType.ROUTE} {...props}/>
                    <ChallengeStat label={"EN"}challengeType={challengeType.ENDURANCE} {...props}/>
                </div>
            </Col>
        </Row>
    );
}

export default Profile;