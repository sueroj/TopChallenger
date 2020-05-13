import React from 'react';
import Profile from './Profile';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import './css/Focus.css';

class Focus extends React.Component {
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
                <div className="focus-profile">
                    <Profile userData={this.state.data} />
                </div>     
            ); 
        }  
    }

export default Focus;