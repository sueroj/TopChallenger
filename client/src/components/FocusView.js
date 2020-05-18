import React from 'react';
import Profile from './Profile';
import BadgeList from './BadgeList';

class FocusView extends React.Component {
    constructor(props) {
    super(props);
    this.state= {
        data: this.props.userData,
        profile: this.props.userProfile
        };
    }

    componentDidMount(props) {
    // this.setState(state => ({
    //     data: this.props.userData
    // }));
    }



    render(){
        const { data } = this.state;
        const { profile } = this.state;
        return(
                <><Profile userData={data} userProfile={profile}/>
                <BadgeList userData={data} userProfile={profile}/></>
            ); 
        }  
    }

export default FocusView;