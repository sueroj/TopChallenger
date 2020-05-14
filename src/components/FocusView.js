import React from 'react';
import Profile from './Profile';
import BadgeList from './BadgeList';

class FocusView extends React.Component {
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

                <><Profile userData={this.state.data} />
                <BadgeList userData={this.state.data} /></>
 
            ); 
        }  
    }

export default FocusView;