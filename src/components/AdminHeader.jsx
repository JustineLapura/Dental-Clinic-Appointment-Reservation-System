import React from "react";
import {Link} from "react-router-dom"
import { Container, Row, Col, Button } from "react-bootstrap";
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
      <Row className="d-flex justify-content-between align-items-center">
        <Col md={3} xs={2} style={{ height: '100px' }} className="d-none d-md-flex flex-column justify-content-evenly align-items-center">
          <div>
            <FaCalendarAlt size={25} />
            <span className="mx-2">{currentDate}</span>
          </div>
          <div>
            <FaClock />
            <span className="mx-2">{currentTime}</span>
          </div>
        </Col>

        <Col md={6} className="d-none d-md-flex text-center me-auto">
          <h1 style={headerFont}>Smile Care Dental Clinic Admin</h1>
        </Col>

        <Col md={3}>
          <Link to="/">
            <Button variant="light" className="my-3 fw-bold">Logout</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminHeader;
