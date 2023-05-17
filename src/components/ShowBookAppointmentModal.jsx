import React from 'react'
import {Modal, Alert, Button, Form} from "react-bootstrap"

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
            <Form.Group controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" value={date} onChange={handleDateChange} required />
              {isInvalidDate &&
                <Alert variant="danger">
                  Please select a valid date excluding Sundays.
                </Alert>}
            </Form.Group>
            <Form.Group controlId="time">
              <Form.Label>Time</Form.Label>
              <Form.Control type="time" value={time} onChange={handleTimeChange} required />
              {isInvalidTime && (
                <Alert variant="danger">
                  Please select a time between 9:00 AM and 5:00 PM.
                </Alert>
              )}
            </Form.Group>
            <Form.Group controlId="service">
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
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleBookAppointment}>
            Book Appointment
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ShowBookAppointmentModal
