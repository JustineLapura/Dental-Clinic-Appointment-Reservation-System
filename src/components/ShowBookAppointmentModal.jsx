import React from 'react'
import { Modal, Alert, Button, Form } from "react-bootstrap"
import clickMe from ".././images/giphy.gif"

function ShowBookAppointmentModal(
  {
    showModal,
    handleCloseModal,
    handleDateChange,
    handleTimeChange,
    handleServiceChange,
    isInvalidDate,
    isInvalidTime,
    date,
    time,
    service,
    services,
    errorMessage,
    handleBookAppointment
  }) {
  return (
    <div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Book Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='position-relative pe-4' controlId="date">
              <img className='position-absolute end-0' width="50px" src={clickMe} alt="Click me GIF" />
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" value={date} onChange={handleDateChange} />
              {isInvalidDate &&
                <Alert variant="danger">
                  Please select a valid date excluding Sundays.
                </Alert>}
            </Form.Group>
            <Form.Group className='position-relative pe-4' controlId="time">
              <img className='position-absolute end-0' width="50px" src={clickMe} alt="Click me GIF" />
              <Form.Label>Time</Form.Label>
              <Form.Control type="time" value={time} onChange={handleTimeChange} />
              {isInvalidTime && (
                <Alert variant="danger">
                  Please select a time between 9:00 AM and 5:00 PM.
                </Alert>
              )}
            </Form.Group>
            <Form.Group className='pe-4' controlId="service">
              <Form.Label>Service</Form.Label>
              <Form.Control as="select" value={service} onChange={handleServiceChange} required>
                <option value="">Select a service</option>
                {services.map(service => {
                  return <option key={service.id} value={service.name}>{service.name}</option>
                })}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        {errorMessage && <h6 className="text-danger mx-auto mb-2">{errorMessage}</h6>}
        <Modal.Footer>
          <Button className='btn-sm' variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button className='btn-sm' variant="primary" onClick={handleBookAppointment}>
            Book Appointment
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ShowBookAppointmentModal
