// Leaderboard
// Purpose: Page for displaying user profile leaderboards. 
// Export: App
// --TBD-- 
// AWM
import React, { useEffect, useState } from 'react';
import './css/dashboard.css';
import Filters from 'components/leaderboard/Filters';
import Header from 'components/leaderboard/Header';
import Profile from 'components/leaderboard/Profile';

function Leaderboard(props) {
  const user = JSON.parse(sessionStorage.getItem('sessionUser')) ? JSON.parse(sessionStorage.getItem('sessionUser')) : props.user;
  const [profile, setProfile] = useState(JSON.parse(sessionStorage.getItem('sessionProfile')) ? JSON.parse(sessionStorage.getItem('sessionProfile')) : props.profile);

  return (
    <div className="leaderboards">
      <Filters />
      <Header />
      <Profile user={user} profile={profile} />
    </div>
  )
}

export default Leaderboard;
