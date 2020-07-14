// Friends
// Purpose: Display Strava friends rank on TC and allows user interaction. 
// Export: SideView
// --TBD-- 
// Full Implementation due.
import React from 'react';
import './css/Nearby.css';

class Nearby extends React.Component {
    constructor(props) {
    super(props);
    this.state= {user: this.props.user};
    }

    componentDidMount(props) {
    this.setState(state => ({
        user: this.props.user
    }));
    }

    render(){
        return(
                <div className="nearby-view">
                    <h1>Nearby</h1>
                </div>     
            ); 
        }  
    }

export default Nearby;