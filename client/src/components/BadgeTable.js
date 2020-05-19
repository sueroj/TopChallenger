import React from 'react';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import fakeBadge2 from './static/fakeBadge2.png'; //dev only
import './css/BadgeList.css';

import BadgeModal from './BadgeModal';

class BadgeTable extends React.Component {
    constructor(props) {
    super(props);
    this.state= {
        user: this.props.user,
        profile: this.props.profile,
        challenges: this.props.challenges,
        viewBadge: false
        };
    this.handleClick = this.handleClick.bind(this);
    // this.hideBadge = this.hideBadge.bind(this);
    }

    componentDidMount() {
    }

    handleClick() {
        this.setState(state => ({
            viewBadge: !state.viewBadge
        }));
    }

    // hideBadge(event) {
    //     this.setState({viewBadge: false})
    // }

    render(){
        const {viewBadge} = this.state;
        return(
            <div className="badge-table">
                <BadgeModal show={viewBadge} onHide={this.handleClick} />


                    <button className="button-wrapper" onClick={this.handleClick}>
                        <Image className="img-badge" src={fakeBadge2} alt="Badge" rounded/>
                    </button>                 

                <div className="badge-wrapper">
                    <Button className="button-wrapper" onClick={this.handleClick}>
                        <Image className="img-badge" src={fakeBadge2} alt="Badge" rounded/>
                    </Button>                 
                </div>
                <div className="badge-wrapper">
                    <Button className="button-wrapper" onClick={this.handleClick}>
                        <Image className="img-badge" src={fakeBadge2} alt="Badge" rounded/>
                    </Button>                 
                </div>
                <div className="badge-wrapper">
                    <Button className="button-wrapper" onClick={this.handleClick}>
                        <Image className="img-badge" src={fakeBadge2} alt="Badge" rounded/>
                    </Button>                 
                </div>
                <div className="badge-wrapper">
                    <Image  className="img-badge" src={fakeBadge2} alt="Badge" rounded/>
                </div>
                <div className="badge-wrapper">
                    <Image  className="img-badge" src={fakeBadge2} alt="Badge" rounded/>
                </div>
                <div className="badge-wrapper">
                    <Image  className="img-badge" src={fakeBadge2} alt="Badge" rounded/>
                </div>
                <div className="badge-wrapper">
                    <Image  className="img-badge" src={fakeBadge2} alt="Badge" rounded/>
                </div>
                <div className="badge-wrapper">
                    <Image  className="img-badge" src={fakeBadge2} alt="Badge" rounded/>
                </div>
                <div className="badge-wrapper">
                    <Image  className="img-badge" src={fakeBadge2} alt="Badge" rounded/>
                </div>
                <div className="badge-wrapper">
                    <Image  className="img-badge" src={fakeBadge2} alt="Badge" rounded/>
                </div>
            </div>

        );   
    }  
}

export default BadgeTable;