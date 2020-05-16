import React from 'react';
import './css/BadgeList.css';

import BadgeListHeader from './BadgeListHeader';
import BadgeTable from './BadgeTable';

class BadgeList extends React.Component {
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
            <div className="badge-list-wrapper">
                <BadgeListHeader type="Milestone" />
                <BadgeTable type="Milestone"/>

                <BadgeListHeader type="Exploration" />
                <BadgeTable type="Exploration"/>

                <BadgeListHeader type="Time Trials" />
                <BadgeTable type="Time Trials"/>

                <BadgeListHeader type="Endurance" />
                <BadgeTable type="Endurance"/>
            </div>
        );   
    }  
}

export default BadgeList;