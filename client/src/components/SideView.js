import React from 'react';
import SideRewards from './SideRewards';
import SideChallenges from './SideChallenges';
import SideProgression from './SideProgression';
import SideFriends from './SideFriends';
import './css/SideView.css';

class SideView extends React.Component {
    constructor(props) {
    super(props);
    this.state= {data: this.props.userData};

    }

    componentDidMount(props) {
    //console.log("property_id",this.props.location.state.property_id);
    this.setState(state => ({
        data: this.props.userData
    }));
    }



    render(){
        return( 
                <>
                <SideRewards className="side-view" userData={this.state.data} />
                <SideChallenges className="side-view" userData={this.state.data} />
                <SideProgression className="side-view" userData={this.state.data} />
                <SideFriends className="side-view" userData={this.state.data} />
                </>
            ); 
        }  
    }

export default SideView;