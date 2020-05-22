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
      const [user, setUser] = useState(props.user);
      const [profile, setProfile] = useState(JSON.parse(sessionStorage.getItem('sessionProfile')));
      const [challenges, setChallenges] = useState(props.challenges);

      useEffect(() => {
        if (props.challenges === null){
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


    return (
      console.log(user),
      console.log(profile),
      console.log(challenges),
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