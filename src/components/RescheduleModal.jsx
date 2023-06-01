import React from 'react'
import { Modal, Form, Button, Alert } from "react-bootstrap"
import { useLocation } from 'react-router-dom'
import attention from ".././images/attention.gif"

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
            <Form.Group className='position-relative px-4' controlId="date">
              <img className='position-absolute end-0' width="55px" src={attention} alt="Click me GIF" />
              <Form.Label>Date</Form.Label>
              <Form.Control className="form-control-lg text-center mb-1" type="date" value={date} onChange={handleDateChange} />
              {isInvalidDate &&
                <Alert className="text-center" variant="danger">
                  Please select a date within the available schedule.
                </Alert>}
            </Form.Group>
            {date && !isInvalidDate && <Form.Group className='position-relative px-4' controlId="time">
              <img className='position-absolute end-0' width="55px" src={attention} alt="Click me GIF" />
              <Form.Label>Time</Form.Label>
              <Form.Control className="form-control-lg text-center mb-1" type="time" value={time} onChange={handleTimeChange} />
              {isInvalidTime && (
                <Alert className="text-center" variant="danger">
                  Please select a time within the available schedule.
                </Alert>
              )}
            </Form.Group>}
            {pathname !== "/admin" &&
              <Form.Group className='px-4' controlId="service">
                <Form.Label>Service</Form.Label>
                <Form.Control className="form-control-lg text-center mb-1" as="select" value={service} onChange={(e) => setService(e.target.value)}>
                  <option value="">Select a service</option>
                  {services.map(service => {
                    return <option key={service.id} value={service.name}>{service.name}</option>
                  })}
                </Form.Control>
              </Form.Group>}
          </Form>
        </Modal.Body>
        {errorMessage && <h6 className="text-danger text-center mx-auto mb-2 px-3">{errorMessage}</h6>}
        <Modal.Footer>
          <Button className='btn-sm' variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button className='btn-sm' variant="primary" onClick={() => handleEditAppointment(currentAppointmentId)}>
            Reschedule Appointment
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default RescheduleModal
