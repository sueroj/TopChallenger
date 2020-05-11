import React from 'react';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
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

        
        <h1>Dashboard [{this.state.data}]</h1>


    //   <div className="home">
    //     {/* <Container>
    //       <Row>
    //           <Col>
                
    //               <div className="login-content">
    //                 <h1>Dashboard</h1>
    //               </div>
    //           </Col>
    //       </Row>
    //     </Container>
    //   </div> */}

    )
  }
}

export default Dashboard;