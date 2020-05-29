import React from 'react';
import './css/SideView.css';

class SideRewards extends React.Component {
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
                <div className="side-view">
                    <h1>Rewards</h1>
                    
                </div>     
            ); 
        }  
    }

export default SideRewards;