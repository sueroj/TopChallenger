import React from 'react';
import SideRewards from './SideRewards';
import SideChallenges from './SideChallenges';
import SideProgression from './SideProgression';
import SideFriends from './SideFriends';
import './css/SideView.css';

class SideView extends React.Component {
    constructor(props) {
    super(props);
    this.state= {user: this.props.user};

    }

    componentDidMount(props) {
    //console.log("property_id",this.props.location.state.property_id);
    this.setState(state => ({
        user: this.props.user
    }));
    }



    render(){
        return( 
                <>
                <SideRewards className="side-view" user={this.state.user} />
                <SideChallenges className="side-view" user={this.state.user} />
                <SideProgression className="side-view" user={this.state.user} />
                <SideFriends className="side-view" user={this.state.user} />
                </>
            ); 
        }  
    }

export default SideView;