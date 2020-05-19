import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FocusView from "../components/FocusView";
import SideView from "../components/SideView";
import './css/dashboard.css';
import {SERVER_LOCATION} from "../api/config.json";


class Dashboard extends React.Component{
  constructor(props) {
    super(props);
    this.state= {
      user: this.props.user,
      profile: this.props.profile,
      challenges: this.props.challenges,
      // challenges: JSON.parse(sessionStorage.getItem('sessionChallenges'))
      //   ? JSON.parse(sessionStorage.getItem('sessionChallenges'))
      //   : null
    };
  }

  componentDidMount() {
    // fetch((`${SERVER_LOCATION}/challenges`), { 
    //   method: 'GET' })
    // .then(response => { if (!response.ok) {
    //        throw new Error('Network response was not ok');}  
    //        return response.json(); })
    // .then(data => this.setState({ challenges: data }))
    // .then(() => {
    //   sessionStorage.setItem('sessionChallenges', JSON.stringify(this.state.challenges));
    // })
    // .catch(error => {
    //   console.error('Could not retrieve challenge list:', error);
    // });
  }

  componentDidUpdate(prevProps) {

  }

  render () {
    const { user } = this.state;
    const { profile } = this.state;
    const { challenges } = this.state;
    return (
      console.log(this.state.user),
      console.log(this.state.profile),
      <div className="dashboard-content">
         <Row>
           <Col sm={9}>         
               <div className="dashboard-focus">
               <FocusView user={user} profile={profile} challenges={challenges}/>
               </div>
           </Col>
           <Col sm={3}>
             <div className="dashboard-side">
                <SideView user={user} challenges={challenges}/>
             </div>
           </Col>
         </Row>
       </div>
    )
  }
}

export default Dashboard;