import React from 'react';
import Image from 'react-bootstrap/Image';
import arrowUp from './static/arrowUp.png';
import Row from 'react-bootstrap/Row';
import './css/BadgeList.css';

class BadgeListHeader extends React.Component {
    constructor(props) {
    super(props);
        this.state= {
            type: this.props.type,
            header: this.props.header,
            profile: this.props.profile,
            challenges: this.props.challenges,
            totalComplete: this.props.profile.TotalComplete,
            totalChallenges: 0
        };
    }

    componentDidMount() {
        var count = 0;
        this.state.challenges.forEach(element =>
            {if (element.Type === this.state.type) 
            count++; }
            )
        this.setState({ totalChallenges: count });          
    }

    componentDidUpdate(){
        // var count = 0;
        // this.state.challenges.forEach(element =>
        //     {if (element.Type === this.state.type) 
        //     count++; }
        //     )
        // this.setState({ totalChallenges: count });
    }

    render(){
        const { header } = this.state;
        return(
            <Row>
                <div className="badge-list-header">
                    <div className="header-arrow-wrapper">
                        <Image className="header-arrow" src={arrowUp} alt="Header Arrow" />
                    </div>
                    <div className="header-title-wrapper">
                        {header}
                    </div>

                    <div className="header-stats-wrapper">
                    {this.state.totalComplete}/{this.state.totalChallenges}
                    </div>
                </div>
            </Row>
        );   
    }  
}

export default BadgeListHeader;