// Leaderboard
// Purpose: Page for displaying user profile leaderboards. 
// Export: App
// --TBD-- 
// AWM
import React, { useEffect, useState } from 'react';
import './css/leaderboard.css';
import Filters from 'components/leaderboard/Filters';
import Header from 'components/leaderboard/Header';
import Profile from 'components/leaderboard/Profile';
import axios from 'axios';
import { SERVER_URL } from '../api/config.json';

function Leaderboard(props) {
  const user = JSON.parse(sessionStorage.getItem('sessionUser')) ? JSON.parse(sessionStorage.getItem('sessionUser')) : props.user;
  const profile = JSON.parse(sessionStorage.getItem('sessionProfile')) ? JSON.parse(sessionStorage.getItem('sessionProfile')) : props.profile;
  const [challenges, setChallenges] = useState(props.challenges);

  useEffect(() => {
    if (!props.challenges.length) {
      getChallenges();
    }
  }, [props.challenges]
  );

  function getChallenges() {
    // Gets Challenges as json list. Used if data is lost due to refresh.
    axios.get(`${SERVER_URL}/challenges`)
      .then((response) => {
        setChallenges(response.data);
      })
      .catch((e) => {
        console.log("Could not connect to server:", e);
        alert("A server error has occurred.");
      })
  }

  return (
    <div className="leaderboards">
      <Filters />
      <Header />
      <div className="leaderboard-profile">
        <Profile user={user} profile={profile} challenges={challenges}/>
      </div>
    </div>
  )
}

export default Leaderboard;
