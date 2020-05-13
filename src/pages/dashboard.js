import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Focus from "../components/Focus";
import './css/dashboard.css';

class Dashboard extends React.Component{
  constructor(props) {
    super(props);
    this.state= {data: this.props.userData};
    console.log(this.props.userData); //dev only
    console.log(this.state.data); //dev only

  }

  componentDidMount(props) {
    //console.log("property_id",this.props.location.state.property_id);
    this.setState(state => ({
      data: this.props.userData
    }));
  }

  render () {
    return (
      <div className="dashboard-content">
         <Row>
           <Col sm={8}>         
               <div className="dashboard-focus">
               <Focus userData={this.state.data} />
               </div>
           </Col>
           <Col sm={4}>
             <div className="dashboard-side">
              <h1>Sidebar</h1>
             </div>
           </Col>
         </Row>
       </div>
    )
  }
}

export default Dashboard;