import React from 'react';
import './css/BadgeList.css';

import BadgeListHeader from './BadgeListHeader';
import BadgeTable from './BadgeTable';

class BadgeList extends React.Component {
    constructor(props) {
    super(props);
    this.state= {
        user: this.props.user,
        profile: this.props.profile,
        challenges: this.props.challenges
    };

    }

    componentDidMount(props) {

    }


    render(){
        const { user } = this.state;
        const { profile } = this.state;
        const { challenges } = this.state;
        return(
            <div className="badge-list-wrapper">
                <BadgeListHeader type={0} header="Milestone" profile={profile} challenges={challenges}/>
                <BadgeTable type="Milestone" user={user} profile={profile} challenges={challenges}/>

                <BadgeListHeader type={1} header="Exploration" profile={profile} challenges={challenges}/>
                <BadgeTable type="Exploration" user={user} profile={profile} challenges={challenges}/>

                <BadgeListHeader type={2} header="Time Trials" profile={profile} challenges={challenges}/>
                <BadgeTable type="Time Trials"  user={user} profile={profile} challenges={challenges}/>

                <BadgeListHeader type={3} header="Endurance" profile={profile} challenges={challenges}/>
                <BadgeTable type="Endurance" user={user} profile={profile} challenges={challenges}/>
            </div>
        );   
    }  
}

export default BadgeList;