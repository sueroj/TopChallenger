import React, {useEffect, useState}from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FocusView from "../components/FocusView";
import SideView from "../components/SideView";
import './css/dashboard.css';
import axios from 'axios';
import SERVER_URL from '../api/config.json';
// import user from '../api/fakeAuthReturn.json';
// import Services from '../common/services';


function Dashboard(props) {
      const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('sessionUser')));
      const [profile, setProfile] = useState(JSON.parse(sessionStorage.getItem('sessionProfile')));
      const [challenges, setChallenges] = useState(props.challenges);
      let checkActivities = true;

      // if (checkActivities)
      // {
      //   getActivities();
      //   checkActivities = false;
      // }

      useEffect(() => {
        setChallenges(props.challenges);

        if (challenges.length === 0){
          getChallenges();
        }

      }, [props.challenges]
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

  // function getProfile() {
  //   // Get Top Challenger profile.
  //   axios.get(`${SERVER_URL}/login?athleteId=${user.athlete.id}`)
  //   .then((response) => { 
  //     setProfile(response.data);
  //     sessionStorage.setItem('sessionUser', JSON.stringify(this.state.user)); //dev only - change user to strava creds.
  //     sessionStorage.setItem('sessionProfile', JSON.stringify(this.state.profile));
  //   })
  //   .catch ((e) => {
  //       console.log("Could not connect to server:", e);
  //   })
  // }

  // Dashboard should display a modal upon first login that checks for new activities
  // and looks for any complete challenges, use web hooks eventually to skip notify TC that
  // new activities were uploaded to strava and force getActivities() on next login.
  function getActivities() {
    let d = new Date();
    const beforeDate = d.valueOf();
    const afterDate = d.valueOf() - 604800;
    axios.get((`https://www.strava.com/api/v3/athlete/activities`), {
      headers: {Authorization: `Bearer ${user.access_token}`},
      params: {
        before: beforeDate,
        after: afterDate
      }
    })
    .then((response) => { 
      console.log(response.data);
    })
    .catch ((e) => {
      console.log("Could not connect to server:", e);
    })
  }

    return (
      <div className="dashboard-content">
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