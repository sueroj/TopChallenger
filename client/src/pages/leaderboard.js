import React from 'react';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import './css/dashboard.css';

class Leaderboard extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
        <h1>Leaderboard [{this.props.userData}]</h1>
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

export default Leaderboard;