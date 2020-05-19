import React from 'react';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import './css/dashboard.css';

class Explorer extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
        <h1>Explorer {this.props.user}</h1>
      // <div className="home">
      //   <Container>
      //     <Row>
      //         <Col>
                
      //             <div className="login-content">
      //               <h1>Dashboard</h1>
      //             </div>
      //         </Col>
      //     </Row>
      //   </Container>
      // </div>
    )
  }
}

export default Explorer;