import React from 'react';
import Profile from './Profile';
import BadgeList from './BadgeList';

class FocusView extends React.Component {
    constructor(props) {
    super(props);
    this.state= {
        user: this.props.user,
        profile: this.props.profile,
        challenges: this.props.challenges
        };
    }

    componentDidMount(props) {
    // this.setState(state => ({
    //     data: this.props.userData
    // }));
    }



    render(){
        const { user } = this.state;
        const { profile } = this.state;
        const { challenges } = this.state;
        return(
                <><Profile user={user} profile={profile} />
                <BadgeList user={user} profile={profile} challenges={challenges}/></>
            ); 
        }  
    }

export default FocusView;