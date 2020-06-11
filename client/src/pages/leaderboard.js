// Leaderboard
// Purpose: Page for displaying user profile leaderboards. 
// Export: App
// --TBD-- 
// AWM
import React from 'react';
import './css/dashboard.css';

class Leaderboard extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
        <h1>Leaderboard [{this.props.user}]</h1>
    )
  }
}

export default Leaderboard;