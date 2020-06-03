import React, {useEffect, useState}from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FocusView from "../components/focus/FocusView";
import SideView from "../components/side/SideView";
import './css/dashboard.css';
import axios from 'axios';
import {SERVER_URL} from '../api/config.json';

import MessageModal from '../components/focus/MessageModal';


function Dashboard(props) {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('sessionUser'))? JSON.parse(sessionStorage.getItem('sessionUser')): props.user);
  const [profile, setProfile] = useState(JSON.parse(sessionStorage.getItem('sessionProfile'))? JSON.parse(sessionStorage.getItem('sessionProfile')): props.profile);
  const [challenges, setChallenges] = useState(props.challenges);
  const [messageModal, toggleMessageModal] = useState(false);
  const [modalMessage, setModalContent] = useState([]);

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
      alert("A server error has occurred.");
    })
  }

  const updateProfile = (profile) => {
    console.log("profile state change"); //dev only
    
    fetch((`${SERVER_URL}/profile/${profile.Id}`), { 
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profile)
    })
    .then(response => { if (!response.ok) {
           throw new Error('Network response was not ok');}  
           return response })
    .then(() => {
      setProfile(profile);
      sessionStorage.setItem('sessionProfile', JSON.stringify(profile));
    })
    .catch(error => {
      console.error('Server Error:', error);
      alert("A server error has occurred.");
    });
  }

  const showMessageModal = (message) => {
    setModalContent(message);
    toggleMessageModal(!messageModal)
  }

    return (
      <div className="dashboard-content">
        <MessageModal profile={props.profile} show={messageModal} toggleMessageModal={toggleMessageModal} modalMessage={modalMessage}/>
         <Row>
           <Col sm={9}>         
               <div className="dashboard-focus">
               <FocusView user={user} profile={profile} updateProfile={updateProfile} showMessageModal={showMessageModal} challenges={challenges}/>
               </div>
           </Col>
           <Col sm={3}>
             <div className="dashboard-side">
                <SideView user={user} profile={profile} updateProfile={updateProfile} showMessageModal={showMessageModal} challenges={challenges}/>
             </div>
           </Col>
         </Row>
       </div>
    )
  }

export default Dashboard;