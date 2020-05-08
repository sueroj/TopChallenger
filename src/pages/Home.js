import React from 'react';
import { Link } from 'react-router-dom';
import Login from '../components/Login'

function Home() {
  return (
    <div className="Home">
      <h1>Home page</h1>
      <Login />
      <Link to="/about">Go to About page</Link>
      <Link to="/test">Go to Test page</Link>
    </div>
  )
}

export default Home;
