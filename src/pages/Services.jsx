import React, { useContext } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";
import ServicesContext from "../ServicesContext";

const Services = () => {
  const { services } = useContext(ServicesContext)
  const darkMode = useOutletContext()
  return (
    <div className={`p-5 ${darkMode ? "bg-dark text-light" : null}`}>
      <h1 className="text-center mb-5">Our Dental Services</h1>
      <Row className="text-dark">
        {services.map(service => {
          return (
            <Col key={service.id} lg={4} md={6} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <h3 className="text-primary">{service.name}</h3>
                  <h6 className="my-4">{service.description}</h6>
                  <p className="">Price: <span className="fw-normal">P{service.price}</span></p>
                  <Button className="btn-sm" variant="primary">Learn More</Button>
                </Card.Body>
              </Card>
            </Col>
          )
        })}

      </Row>
    </div>
  );
};

export default Services;
