import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { FaCalendarAlt, FaClock } from "react-icons/fa";


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
        <Col xs={{ span: 6, offset: 3 }} className="text-right">
          <Image src="https://static.vecteezy.com/system/resources/previews/000/561/579/large_2x/logo-for-a-dental-clinic-vector-illustration.jpg" height={50} />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminHeader;
