import React from 'react';
import './css/SideView.css';

class SideChallenges extends React.Component {
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
                <div className="side-view">
                    
                    
                </div>     
            ); 
        }  
    }

export default SideChallenges;