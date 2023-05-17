import React from 'react'
import { Modal, Form, Button, Alert } from "react-bootstrap"
import { useLocation } from 'react-router-dom'

function RescheduleModal(
    {
        showReschedModal,
        handleCloseModal,
        appointment,
        date,
        time,
        service,
        handleDateChange,
        handleTimeChange,
        isInvalidDate,
        isInvalidTime,
        services,
        errorMessage,
        handleEditAppointment,
        setService,
        currentAppointmentId
    }) {

    const pathname = useLocation().pathname
  return (
    <div>
      <Modal show={showReschedModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Appointment Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              <p><strong>Time:</strong> {new Date(`2000-01-01T${appointment.time}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</p>
              <p><strong>Service:</strong> {appointment.service}</p>
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
                {pathname !== "/admin" && <Form.Group controlId="service">
                  <Form.Label>Service</Form.Label>
                  <Form.Control as="select" value={service} onChange={(e) => setService(e.target.value)}>
                    <option value="">Select a service</option>
                    {services.map(service => {
                      return <option key={service.id} value={service.name}>{service.name}</option>
                    })}
                  </Form.Control>
                </Form.Group>}
              </Form>
            </Modal.Body>
            {errorMessage && <h6 className="text-danger mx-auto mb-2">{errorMessage}</h6>}
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="primary" onClick={() => handleEditAppointment(currentAppointmentId)}>
                Reschedule Appointment
              </Button>
            </Modal.Footer>
          </Modal>
    </div>
  )
}

export default RescheduleModal
