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
                <Row>
                    {profile.Monitor[0] === 0 ? <Badge className="side-badge-shadow" challenges={challenges} profile={profile}/> : <Badge className="side-badge" challenges={props.challenges} profile={profile}/>}
                    {profile.Monitor[1] === 0 ? <Badge className="side-badge-shadow" challenges={challenges} profile={profile}/> : <Badge className="side-badge" challenges={props.challenges} profile={profile}/>}
                    {profile.Monitor[2] === 0 ? <Badge className="side-badge-shadow" challenges={challenges} profile={profile}/> : <Badge className="side-badge" challenges={props.challenges} profile={profile}/>}
                    {profile.Monitor[3] === 0 ? <Badge className="side-badge-shadow" challenges={challenges} profile={profile}/> : <Badge className="side-badge" challenges={props.challenges} profile={profile}/>}
                    {profile.Monitor[4] === 0 ? <Badge className="side-badge-shadow" challenges={challenges} profile={profile}/> : <Badge className="side-badge" challenges={props.challenges} profile={profile}/>}
                </Row>
                
            </div>     
        ); 
    }  

export default SideChallenges;