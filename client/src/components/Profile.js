import React, {useState, useEffect} from 'react';
import Image from 'react-bootstrap/Image';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './css/Profile.css';
import fakeRank1 from '../assets/ranks/fakeRank1.png'; //dev only
import fakeRank2 from '../assets/ranks/fakeRank2.png'; //dev only

function Profile(props) {
    const [user, setUser] = useState(props.user);
    const [profile, setProfile] = useState(props.profile);


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
                    
                        <Image className="rank-img" src={fakeRank1} alt="Current Rank" roundedCircle/>
                        <div className="profile-rank-bar">
                            {/* progress color changed via varient prop */}
                        <ProgressBar className="profile-rank-bar" variant="warning" animated now={50} label={"50"} />
                        </div>
                        <Image className="rank-img" src={fakeRank2} alt="Next Rank" roundedCircle/>

                </div>
        </div>

    );
}

export default Profile;