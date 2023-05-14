import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";

const Services = () => {
  const darkMode = useOutletContext()
  return (
    <div className={`p-5 ${darkMode ? "bg-dark text-light" : null }`}>
      <h1 className="text-center mb-5">Our Dental Services</h1>
      <Row className="text-dark">
        <Col lg={4} md={6} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <h3 className="text-primary">General Dentistry</h3>
              <ul className="list-unstyled">
                <li><FaCheck className="text-success me-2" />Regular Checkups and Cleanings</li>
                <li><FaCheck className="text-success me-2" />Fillings and Crowns</li>
                <li><FaCheck className="text-success me-2" />Root Canal Therapy</li>
                <li><FaCheck className="text-success me-2" />Tooth Extractions</li>
                <li><FaCheck className="text-success me-2" />Dental Implants</li>
              </ul>
              <Button variant="primary">Learn More</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4} md={6} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <h3 className="text-primary">Cosmetic Dentistry</h3>
              <ul className="list-unstyled">
                <li><FaCheck className="text-success me-2" />Teeth Whitening</li>
                <li><FaCheck className="text-success me-2" />Porcelain Veneers</li>
                <li><FaCheck className="text-success me-2" />Invisalign Clear Braces</li>
                <li><FaCheck className="text-success me-2" />Dental Bonding</li>
                <li><FaCheck className="text-success me-2" />Gum Contouring</li>
              </ul>
              <Button variant="primary">Learn More</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4} md={6} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <h3 className="text-primary">Emergency Dentistry</h3>
              <ul className="list-unstyled">
                <li><FaCheck className="text-success me-2" />Toothache Relief</li>
                <li><FaCheck className="text-success me-2" />Chipped or Broken Teeth</li>
                <li><FaCheck className="text-success me-2" />Lost or Knocked-out Teeth</li>
                <li><FaCheck className="text-success me-2" />Repair of Broken Dentures</li>
              </ul>
              <Button variant="primary">Learn More</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Services;
