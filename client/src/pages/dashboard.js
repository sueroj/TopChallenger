import React, {useEffect, useState}from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FocusView from "../components/focus/FocusView";
import SideView from "../components/side/SideView";
import './css/dashboard.css';
import axios from 'axios';
import {SERVER_URL} from '../api/config.json';


function Dashboard(props) {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('sessionUser'))? JSON.parse(sessionStorage.getItem('sessionUser')): props.user);
  const [profile, setProfile] = useState(JSON.parse(sessionStorage.getItem('sessionProfile'))? JSON.parse(sessionStorage.getItem('sessionProfile')): props.profile);
  const [challenges, setChallenges] = useState(props.challenges);

  useEffect(() => {
      if (!props.challenges.length) {
        getChallenges();
      }
  }, [props.challenges]
  );

  function getChallenges() {
    //Gets Challenges as json list. Used if data is lost due to refresh.
    axios.get(`${SERVER_URL}/challenges`)
    .then((response) => { 
      setChallenges(response.data);
    })
    .catch ((e) => {
      console.log("Could not connect to server:", e);
    })
  }

  const changeProfile = (profile) => {
    console.log("profile state change"); //dev only
    setProfile(profile);
  }
    return (
      <div className="dashboard-content">
        
         <Row>
           <Col sm={9}>         
               <div className="dashboard-focus">
               <FocusView user={user} profile={profile} changeProfile={changeProfile} challenges={challenges}/>
               </div>
           </Col>
           <Col sm={3}>
             <div className="dashboard-side">
                <SideView user={user} profile={profile} challenges={challenges}/>
             </div>
           </Col>
         </Row>
       </div>
    )
  }

export default Dashboard;