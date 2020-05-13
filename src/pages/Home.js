import React from 'react';
import Login from '../components/Login';
import './css/home.css';

class Home extends React.Component{

  render () {
    return (
      <div className="home">
                  <div className="login-content">
                    <h1>Login</h1>
                    <Login />
                  </div>
      </div>
    )
  }
}

export default Home;
