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

function Profile(props) {
    const profile = props.profile;

    return (
        <Row>
                <Col sm={2}>
                {/* <div className="leaderboard-profile-background-img"></div> */}
                    <div className="leaderboard-profile-main-wrapper">
                        <Image className="leaderboard-profile-img" src={props.user.athlete.profile} alt="Profile Image" roundedCircle />
                        <RankCanvas id={"currentRank"} rank={profile.Rank} {...props} />
                    </div>
                </Col>

                <Col sm={1}>
                    <div className="leaderboard-profile-rp">
                        {props.profile.TotalRp}
                    </div>
                </Col>

                <Col sm={1.5}>
                    <div className="leaderboard-profile-name">
                        <span className="leaderboard-profile-name">{props.user.athlete.firstname} {props.user.athlete.lastname}</span>
                        <span className="leaderboard-profile-title">{props.profile.Title}</span>
                    </div>
                </Col>

                <Col sm={4}>
                    <div className="leaderboard-profile-stats">
                        
                    </div>
                </Col>
        </Row>
    );
}

export default Profile;