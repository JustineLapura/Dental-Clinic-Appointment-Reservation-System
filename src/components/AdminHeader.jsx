import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaCalendarAlt, FaClock } from "react-icons/fa";


const AdminHeader = () => {
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  const headerFont = {
    fontFamily: "Arial, sans-serif",
    fontWeight: "bold",
    color: "#fff"
  }

  return (
    <Container fluid className="bg-dark text-light">
      <Row className="align-items-center">
        <Col xs={2} style={{ height: '100px' }} className="d-none d-md-flex flex-column justify-content-evenly align-items-center">
          <div>
            <FaCalendarAlt size={25} />
            <span className="mx-2">{currentDate}</span>
          </div>
          <div>
            <FaClock />
            <span className="mx-2">{currentTime}</span>
          </div>
        </Col>

        <Col className="text-right">
          <h1 style={headerFont}>Smile Care Dental Clinic Admin</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminHeader;
