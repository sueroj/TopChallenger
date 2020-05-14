import React from 'react';
import Image from 'react-bootstrap/Image';
import fakeBadge from './css/fakeBadge.png'; //dev only
import './css/BadgeList.css';

class BadgeTable extends React.Component {
    constructor(props) {
    super(props);
    this.state= {data: this.props.userData};

    }

    componentDidMount(props) {
    this.setState(state => ({
        data: this.props.userData
    }));
    }

    render(){
        return(
            <div className="badge-table">
                <div className="badge-wrapper">
                    <Image  className="img-badge" src={fakeBadge} alt="Badge" rounded/>
                </div>
                <div className="badge-wrapper">
                    <Image  className="img-badge" src={fakeBadge} alt="Badge" rounded/>
                </div>
                <div className="badge-wrapper">
                    <Image  className="img-badge" src={fakeBadge} alt="Badge" rounded/>
                </div>
                <div className="badge-wrapper">
                    <Image  className="img-badge" src={fakeBadge} alt="Badge" rounded/>
                </div>
                <div className="badge-wrapper">
                    <Image  className="img-badge" src={fakeBadge} alt="Badge" rounded/>
                </div>
                <div className="badge-wrapper">
                    <Image  className="img-badge" src={fakeBadge} alt="Badge" rounded/>
                </div>
                <div className="badge-wrapper">
                    <Image  className="img-badge" src={fakeBadge} alt="Badge" rounded/>
                </div>
                <div className="badge-wrapper">
                    <Image  className="img-badge" src={fakeBadge} alt="Badge" rounded/>
                </div>
                <div className="badge-wrapper">
                    <Image  className="img-badge" src={fakeBadge} alt="Badge" rounded/>
                </div>
                <div className="badge-wrapper">
                    <Image  className="img-badge" src={fakeBadge} alt="Badge" rounded/>
                </div>
                <div className="badge-wrapper">
                    <Image  className="img-badge" src={fakeBadge} alt="Badge" rounded/>
                </div>
            </div>
        );   
    }  
}

export default BadgeTable;