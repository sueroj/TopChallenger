import React from 'react';
import Image from 'react-bootstrap/Image';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './css/Profile.css';
import RankCanvas from './RankCanvas';

function Profile(props) {

    return(
        <div className="profile-background-img">

            <div className="profile-main-wrapper">
                <div className="profile-name">
                <h1>{props.user.athlete.firstname} {props.user.athlete.lastname}</h1>
                    <span>{props.profile.Title}</span>
                </div>
                <Image className="profile-img" src={props.user.athlete.profile} alt="Profile Image" roundedCircle />
            </div>

                <div className="profile-rank-wrapper">
                    
                        <RankCanvas id={"currentRank"} rank={props.profile.Rank} {...props}/>
                        <div className="profile-rank-bar">
                        <ProgressBar className="profile-rank-bar" variant="warning" animated now={50} label={props.profile.CurrentRp} />
                        </div>
                        <RankCanvas id={"nextRank"} rank={props.profile.Rank+1} {...props}/>

                </div>
        </div>

    );
}

export default Profile;