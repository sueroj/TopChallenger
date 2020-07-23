// Leaderboard
// Purpose: Page for displaying user profile leaderboards. 
// Export: App
// --TBD-- 
// AWM
import React from 'react';
import Image from 'react-bootstrap/Image';
import leaderboardWireFrame from 'assets/backgrounds/leaderboardWireFrame.png';
import './css/dashboard.css';

function Leaderboard(props) {

  return (
    <div className="leaderboards">
      <h1 className="leaderboard-header">Leaderboard page TBD</h1>
      <Image className="temp wireframe" src={leaderboardWireFrame} alt={"wireframe"} />
    </div>
  )
}

export default Leaderboard;
