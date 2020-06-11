// Explorer
// Purpose: Page for displaying badges in a map view for users to find challenges "nearby". 
// Export: App
// --TBD-- 
// AWM
import React from 'react';
import './css/dashboard.css';

class Explorer extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
        <h1>Explorer {this.props.user}</h1>

    )
  }
}

export default Explorer;