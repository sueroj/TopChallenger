import React from 'react';
import Image from 'react-bootstrap/Image';
import arrowUp from './css/arrowUp.png';
import Row from 'react-bootstrap/Row';
import './css/BadgeList.css';

class BadgeListHeader extends React.Component {
    constructor(props) {
    super(props);
    this.state= {type: this.props.type};

    }

    componentDidMount(props) {
    //console.log("property_id",this.props.location.state.property_id);
    this.setState(state => ({
        type: this.props.type
    }));
    }

    render(){
        return(
            <Row>
                <div className="badge-list-header">
                    <div className="header-arrow-wrapper">
                        <Image className="header-arrow" src={arrowUp} Alt="Header Arrow" />
                    </div>
                    <div className="header-title-wrapper">
                        {this.state.type}
                    </div>

                    <div className="header-stats-wrapper">
                        02/80
                    </div>
                </div>
            </Row>
        );   
    }  
}

export default BadgeListHeader;