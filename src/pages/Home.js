import React from 'react';
import Login from '../components/Login';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './css/home.css';

class Home extends React.Component{

  render () {
    return (
      <div className="home">
        <Container>
          <Row>
              <Col>
                  <div className="login-content">
                    <h1>Login</h1>
                    <Login />
                  </div>
              </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Home;
