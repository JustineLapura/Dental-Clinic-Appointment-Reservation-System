import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import ServicesContext from "../ServicesContext";
import AppointmentContext from "../AppointmentContext";

const Services = () => {
  const { services } = useContext(ServicesContext)
  const { setDate, setTime, setService } = useContext(AppointmentContext)
  const isLoggedin = localStorage.getItem("isLoggedin")
  const navigate = useNavigate()
  const darkMode = useOutletContext()

  function bookServiceAppointment(service) {
    setDate("")
    setTime("")
    setService(service)
    return isLoggedin ? navigate("/appointments") : navigate("/login")
  }

  return (
    <div className={`p-5 ${darkMode ? "bg-dark text-light" : null}`}>
      <h1 className="text-center mb-5 fw-bold ">Our Dental Services</h1>
      <Row className="text-dark">
        {services.map(service => {
          return (
            <Col key={service.id} lg={4} md={6} className="mb-4">
              <Card className="h-100 bg-light">
                <Card.Body>
                  <h3 className="text-primary">{service.name}</h3>
                  <h6 className="my-4">{service.description}</h6>
                  <p className="">Price: <span className="fw-normal">P{service.price}</span></p>
                  <Button variant="primary" onClick={() => bookServiceAppointment(service.name)}>Book this service</Button>
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
