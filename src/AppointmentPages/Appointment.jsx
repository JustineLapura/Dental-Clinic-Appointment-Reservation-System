import React, { useContext } from 'react';
import { Container, Row, Col, Form, Button, Table, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Appointment.css"
import { authRequired } from '../authRequired';
import { useOutletContext, useNavigate } from 'react-router-dom';
import ServicesContext from ".././ServicesContext"
import AppointmentContext from '../AppointmentContext';
export async function loader() {
  return await authRequired()

}

function Appontment() {
  const firstName = localStorage.getItem("firstName")
  const navigate = useNavigate()
  const darkMode = useOutletContext()
  const { services } = useContext(ServicesContext)
  const {
    date,
    setDate,
    time,
    setTime,
    service,
    setService,
    handleBookAppointment,
    errorMessage,
    handleCloseModal,
    showSuccessModal,
    setShowSuccessModal,
    handleReschedule,
    handleEditAppointment,
  } = useContext(AppointmentContext)

  const gotoMyAppointments = () => {
    navigate('/appointments/account')
    handleCloseModal()
  }


  return (
    <main className={`pb-5 ${darkMode ? "bg-dark text-light" : null}`}>
      <section className="appointment-section">
        <Container>
          <Row>
            <Col sm={12} md={6} className='text-center'>
              <h5 className='my-3'>Hi, {firstName}!..</h5>
              <h3 className='my-3 text-primary'>Book your appointment now.</h3>
              <Form>
                <Form.Group controlId="date">
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="time">
                  <Form.Label>Time</Form.Label>
                  <Form.Control type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="service">
                  <Form.Label>Service</Form.Label>
                  <Form.Control as="select" value={service} onChange={(e) => setService(e.target.value)}>
                    <option value="">Select a service</option>
                    <option value="Check-up">Check-up</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="Filling">Filling</option>
                    <option value="Other">Other</option>
                  </Form.Control>
                </Form.Group>
                {errorMessage && <h6 className="text-danger mx-auto mt-2">{errorMessage}</h6>}
                <div sm={12} className='py-3'>
                  <Button className='fw-bold' variant="primary" type="submit" onClick={handleBookAppointment}>Submit Appointment</Button>
                </div>
              </Form>
            </Col>
            <Col sm={12} md={6} className='justify-content-end h-100'>
              <div className='text-center mt-4'><h5>Services Offers:</h5></div>
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
          <p className="fw-bold text-success text-center">Booked Successfully!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={gotoMyAppointments}>
            Go to my Appointments
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </main>

  );
}

export default Appontment;
