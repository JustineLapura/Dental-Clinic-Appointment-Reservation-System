import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import logo from ".././images/adminlogo.gif"


const AdminHeader = () => {
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  return (
    <Container fluid className="border ">
      <Row className="align-items-center">
        <Col xs={3} style={{ height: '150px' }} className="d-flex flex-column justify-content-evenly align-items-center">
          <div>
            <FaCalendarAlt size={25} />
            <span className="mx-2">{currentDate}</span>
          </div>
          <div>
            <FaClock />
            {currentTime}
          </div>
        </Col>
        <Col className="text-right">
          <img src={logo} alt="admin logo" />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminHeader;
