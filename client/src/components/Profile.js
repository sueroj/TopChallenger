import React from 'react';
import Image from 'react-bootstrap/Image';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './css/Profile.css';
import fakeRank1 from './static/fakeRank1.png'; //dev only
import fakeRank2 from './static/fakeRank2.png'; //dev only

class Profile extends React.Component {
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
            <div className="profile-background-img">

                <div className="profile-main-wrapper">
                    <div className="profile-name">
                    <h1>{this.state.data.athlete.firstname} {this.state.data.athlete.lastname}</h1>
                    Title Here
                    </div>
                    <Image className="profile-img" src={this.state.data.athlete.profile} alt="Profile Image" roundedCircle />
                </div>

                    <div className="profile-rank-wrapper">
                        
                            <Image className="rank-img" src={fakeRank1} alt="Current Rank" roundedCircle/>
                            <div className="profile-rank-bar">
                                {/* progress color changed via varient prop */}
                            <ProgressBar className="profile-rank-bar" variant="warning" animated now={50} label={"50"} />
                            </div>
                            <Image className="rank-img" src={fakeRank2} alt="Next Rank" roundedCircle/>
 
                    </div>
            </div>

        );   
    }  
}

export default Profile;