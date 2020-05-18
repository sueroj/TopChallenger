import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FocusView from "../components/FocusView";
import SideView from "../components/SideView";
import './css/dashboard.css';

class Dashboard extends React.Component{
  constructor(props) {
    super(props);
    this.state= {
      data: this.props.userData,
      profile: this.props.userProfile
    };
    // if (this.state.profile === null) {
    //   this.state.profile = JSON.parse(sessionStorage.getItem('localSessionProfile'));
    // }
  }

  componentDidMount() {
    // sessionStorage.setItem('localSessionData', JSON.stringify(this.state.data));
    // sessionStorage.setItem('localSessionProfile', JSON.stringify(this.state.profile));
  }

  componentDidUpdate(prevProps) {

  }

  render () {
    const { data } = this.state;
    const { profile } = this.state;
    return (
      console.log(this.state.data),
      console.log(this.state.profile),
      <div className="dashboard-content">
         <Row>
           <Col sm={9}>         
               <div className="dashboard-focus">
               <FocusView userData={data} userProfile={profile}/>
               </div>
           </Col>
           <Col sm={3}>
             <div className="dashboard-side">
                <SideView userData={data} />
             </div>
           </Col>
         </Row>
       </div>
    )
  }
}

export default Dashboard;