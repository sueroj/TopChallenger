// About
// Purpose: Page for information about TC. 
// Export: App
// --TBD-- 
// AWM
import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="About">
      <h1>About TopChallenger</h1>
      <Link to="/">Go to Home page</Link>
    </div>
  )
}

export default About;
