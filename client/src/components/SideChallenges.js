import React, {useState, useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import './css/SideView.css';
import Badge from './Badge';

function SideChallenges(props) {
    const [user, setUser] = useState(props.user);
    const [profile, setProfile] = useState(props.profile);
    const [challenges, setChallenges] = useState(props.challenges);

    useEffect(() => {
        setChallenges(props.challenges);

        },[props.challenges]
    );

    return(
            <div className="side-view">
                <h1>Challenges</h1>

                    <div className="side-challenges-list-row">
                    {profile.Tracked[0] !== null ? <Badge className="side-badge" focus={false} challenge={props.profile.Tracked[0]} profile={profile}/> : null }
                    </div>

                    <div className="side-challenges-list-row">
                    {profile.Tracked[1] !== null ? <Badge className="side-badge" focus={false} challenge={props.profile.Tracked[1]} profile={profile}/> : null }
                    </div>

                    <div className="side-challenges-list-row">
                    {profile.Tracked[2] !== null ? <Badge className="side-badge" focus={false} challenge={props.profile.Tracked[2]} profile={profile}/> : null }
                    </div>
                    
                    <div className="side-challenges-list-row">
                    {profile.Tracked[3] !== null ? <Badge className="side-badge" focus={false} challenge={props.profile.Tracked[3]} profile={profile}/> : null }
                    </div>
                    
                    <div className="side-challenges-list-row">
                    {profile.Tracked[4] !== null ? <Badge className="side-badge" focus={false} challenge={props.profile.Tracked[4]} profile={profile}/> : null }
                    </div>

            </div>     
        ); 
    }  

export default SideChallenges;