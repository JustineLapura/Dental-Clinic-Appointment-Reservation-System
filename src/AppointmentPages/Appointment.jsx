import React, { useContext } from 'react';
import { Container, Row, Col, Form, Button, Table, Modal, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Appointment.css"
import { authRequired } from '../authRequired';
import { useOutletContext, useNavigate } from 'react-router-dom';
import ServicesContext from ".././ServicesContext"
import AppointmentContext from '../AppointmentContext';
import TimeScheduleContext from '../TimeScheduleContext';

export async function loader() {
  return await authRequired()

}

function Appontment() {
  const firstName = localStorage.getItem("firstName")
  const navigate = useNavigate()
  const darkMode = useOutletContext()
  const { availability } = useContext(TimeScheduleContext)
  const { services } = useContext(ServicesContext)
  const {
    date,
    time,
    service,
    handleBookAppointment,
    errorMessage,
    handleCloseModal,
    showSuccessModal,
    handleDateChange,
    isInvalidDate,
    handleTimeChange,
    isInvalidTime,
    handleServiceChange
  } = useContext(AppointmentContext)

  const gotoMyAppointments = () => {
    navigate('/appointments/account')
    handleCloseModal()
  }


  return (
    <main className={`pb-5 ${darkMode ? "bg-dark text-light" : null}`}>
      <section className="appointment-section">
        <Container fluid>
          <Row className='d-flex justify-content-between align-items-center'>
            <Col xs={12} md={4} lg={3} className='mt-5 pe-5'>
              <Table bordered hover>
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Schedule</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(availability).map((day) => (
                    <tr key={day}>
                      <td>{day}</td>
                      <td>{availability[day]}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
            <Col xs={12} md={4} lg={6} className='text-center px-5'>
              <h5 className='my-3'>Hi, {firstName}!..</h5>
              <h3 className='my-3 text-primary'>Book your appointment now.</h3>
              <Form>
                <Form.Group controlId="date">
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" value={date} onChange={handleDateChange} />
                  {isInvalidDate &&
                    <Alert variant="danger">
                      Please select a valid date excluding Sundays.
                    </Alert>}
                </Form.Group>
                <Form.Group controlId="time">
                  <Form.Label>Time</Form.Label>
                  <Form.Control type="time" value={time} onChange={handleTimeChange} />
                  {isInvalidTime && (
                    <Alert variant="danger">
                      Please select a time between 9:00 AM and 5:00 PM.
                    </Alert>
                  )}
                </Form.Group>
                <Form.Group controlId="service">
                  <Form.Label>Service</Form.Label>
                  <Form.Control as="select" value={service} onChange={handleServiceChange}>
                    <option value="">Select a service</option>
                    {services.map(service => {
                      return <option key={service.id} value={service.name}>{service.name}</option>
                    })}
                  </Form.Control>
                </Form.Group>
                {errorMessage && <h6 className="text-danger mx-auto mt-2">{errorMessage}</h6>}
                <div xs={12} className='py-3'>
                  <Button className='fw-bold' variant="primary" type="submit" onClick={handleBookAppointment}>Submit Appointment</Button>
                </div>
              </Form>
            </Col>
            <Col xs={12} md={4} lg={3} className='justify-content-end ps-5'>
              <div style={{ height: '300px', overflow: 'scroll' }} className='mt-4'>
                <Table bordered>
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((service) => (
                      <tr key={service.id}>
                        <td>{service.name}</td>
                        <td>P{service.price.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </Container>

      </section>
      <Modal show={showSuccessModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Appointment:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 className="fw-bold text-success text-center my-5">Booked Successfully!</h5>
          <div className='d-flex justify-content-end gap-2'>
            <Button variant="secondary" onClick={gotoMyAppointments}>
              Go to my Appointments
            </Button>
            <Button variant="primary" onClick={handleCloseModal}>
              Done
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </main>

  );
}

export default Appontment;
