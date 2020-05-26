import React, {useEffect, useState}from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FocusView from "../components/FocusView";
import SideView from "../components/SideView";
import './css/dashboard.css';
import axios from 'axios';
import SERVER_URL from '../api/config.json';
import ActivitySyncModal from '../components/ActivitySyncModal';
// import user from '../api/fakeAuthReturn.json';
// import Services from '../common/services';


function Dashboard(props) {
      const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('sessionUser'))? JSON.parse(sessionStorage.getItem('sessionUser')): props.user);
      const [profile, setProfile] = useState(JSON.parse(sessionStorage.getItem('sessionProfile'))? JSON.parse(sessionStorage.getItem('sessionProfile')): props.profile);
      const [challenges, setChallenges] = useState(props.challenges);
      const [viewModal, toggleModal] = useState(sessionStorage.getItem('activityModal')?sessionStorage.getItem('activityModal'):true);


      useEffect(() => {
        setChallenges(props.challenges);

        if (user.length === 0 || user === null) {
          setUser(JSON.parse(sessionStorage.getItem('sessionUser')));
        }

        if (profile.length === 0 || profile === null) {
          setProfile(JSON.parse(sessionStorage.getItem('sessionProfile')));
        }

        if (challenges.length === 0){
          getChallenges();
        }

      }, [props.challenges, user, profile]
      );

  function getChallenges() {
    //Gets Challenges as json list. Used if data is lost due to refresh.
    axios.get(`http://localhost:4000/api/topchallenger/challenges`)
    .then((response) => { 
      setChallenges(response.data);
    })
    .catch ((e) => {
      console.log("Could not connect to server:", e);
    })
  }

    function handleModal() {
    toggleModal(!viewModal);
    sessionStorage.setItem('activityModal', false);
  }

  // Dashboard should display a modal upon first login that checks for new activities
  // and looks for any complete challenges, use web hooks eventually to skip notify TC that
  // new activities were uploaded to strava and force getActivities() on next login.


    return (
      <div className="dashboard-content">

        <ActivitySyncModal user={user} profile={profile} show={viewModal} onHide={handleModal}/>

         <Row>
           <Col sm={9}>         
               <div className="dashboard-focus">
               <FocusView user={user} profile={profile} challenges={challenges}/>
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