import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Modal, Alert, Button, Form } from "react-bootstrap"
import attention from ".././images/attention.gif";

function ShowBookAppointmentModal(
  {
    setDate,
    setTime,
    setService,
    setIsInvalidDate,
    setIsInvalidTime,
    setShowModal,
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

  const navigate = useNavigate()
  const viewSchedule = () => {
    navigate("/appointments")
    setShowModal(false)
    setIsInvalidDate(false)
    setIsInvalidTime(false)
    setDate("")
    setTime("")
    setService("")
    }

  return (
    <div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Book Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {(isInvalidDate || isInvalidTime) && <div className='d-flex justify-content-center'>
            <Button className='btn-sm btn-primary mx-auto text-white' onClick={viewSchedule}>view schedule</Button>
          </div>}
          <Form>
            <Form.Group className='position-relative px-4' controlId="date">
              <img className='position-absolute end-0 ' width="50px" src={attention} alt="Click me GIF" />
              <Form.Label>Date</Form.Label>
              <Form.Control className="form-control-lg text-center mx-auto mb-1" type="date" value={date} onChange={handleDateChange} />
              {isInvalidDate &&
                <Alert className="text-center" variant="danger">
                  Please select a date within the available schedule.
                </Alert>}
            </Form.Group>
            {(date && !isInvalidDate) && <Form.Group className='position-relative px-4' controlId="time">
              <img className='position-absolute end-0' width="50px" src={attention} alt="Click me GIF" />
              <Form.Label>Time</Form.Label>
              <Form.Control className="form-control-lg text-center mb-1" type="time" value={time} onChange={handleTimeChange} />
              {isInvalidTime && (
                <Alert className="text-center" variant="danger">
                  Please select a time within the available schedule.
                </Alert>
              )}
            </Form.Group>}
            <Form.Group className='px-4' controlId="service">
              <Form.Label>Service</Form.Label>
              <Form.Control className="form-control-lg text-center mb-1" as="select" value={service} onChange={handleServiceChange} required>
                <option value="">Select a service</option>
                {services.map(service => {
                  return <option key={service.id} value={service.name}>{service.name}</option>
                })}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        {errorMessage && <h6 className="text-danger mx-auto mb-2 px-3 text-center">{errorMessage}</h6>}
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
