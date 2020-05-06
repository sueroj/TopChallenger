import React from 'react';
import { Link } from 'react-router-dom';

function Test() {
  return (
    <div className="About">
      <h1>Test page</h1>
      <Link to="/">Go to Home page</Link>
    </div>
  )
}

export default Test;


//Notes:
//
// -The pages folder are where the different pages will be as advertised.
// -The pages can be in .tsx or .js.
// -React router seems to route to the different files where you can then chain more components using
// traditional ReactDOM render/component 
//
// -React only changes/reflects what is addressed. For instance when loading this test.tsx (when it worked)
// it loaded the <h1> but also the "Home"<div> (Which is the top react logo). Eventhough this page did not specifically
// call for that <div>





