import React, { useContext } from "react";
import { Row, Col, Button, Table, Modal, Form, Alert } from "react-bootstrap";
import { useOutletContext } from 'react-router-dom';
import AppointmentContext from "../AppointmentContext";
import ServicesContext from "../ServicesContext";

const AccountPage = () => {
  const firstName = localStorage.getItem("firstName").toLowerCase()
  const lastName = localStorage.getItem("lastName").toLowerCase()
  const { services } = useContext(ServicesContext)
  const {
    showModal,
    setShowModal,
    showReschedModal,
    date,
    time,
    setTime,
    service,
    setService,
    appointments,
    setAppointments,
    currentAppointmentId,
    handleCloseModal,
    handleBookAppointment,
    handleCancelAppointment,
    handleReschedule,
    handleEditAppointment,
    errorMessage,
    showSuccessModal,
    handleDeleteAppointment,
    handleDateChange,
    isInvalidDate,
    handleChangeTime,
    isInvalidTime,
    setIsInvalidDate,
    setIsInvalidTime
  } = useContext(AppointmentContext)

  const darkMode = useOutletContext();

  const handleConfirmAppointment = (id) => {
    const updatedAppointments = appointments.map((appointment) => {
      if (appointment.id === id) {
        return { ...appointment, status: 'Confirmed' };
      }
      return appointment;
    });
    setAppointments(updatedAppointments);
  };

  const statusBackground = (obj) => {
    let background
    if (obj.status.toLowerCase() === "confirmed") {
      background = "text-success"
    } else if (obj.status.toLowerCase() === "cancelled") {
      background = "text-danger"
    } else if (obj.status.toLowerCase() === "rescheduled") {
      background = "fw-bold text-primary"
    } else {
      background = "text-secondary"
    }

    return background
  }

  const appointmentBtns = (id, status) => {
    if (status.toLowerCase() === "rescheduled") {
      return (
        <>
          <Button className="m-1" variant="danger" onClick={() => handleCancelAppointment(id)}>Cancel</Button>
          <Button className="m-1" variant="primary" onClick={() => handleReschedule(id)}>Reschedule</Button>
          <Button className="m-1" variant="success" onClick={() => handleConfirmAppointment(id)}>Confirm</Button>
        </>
      )
    } else if (status.toLowerCase() === "pending" || status.toLowerCase() === "confirmed") {
      return (
        <>
          <Button className="m-1" variant="danger" onClick={() => handleCancelAppointment(id)}>Cancel</Button>
          <Button className="m-1" variant="primary" onClick={() => handleReschedule(id)}>Reschedule</Button>
        </>
      )
    } else {
      return <Button className="m-1" variant="secondary" onClick={() => handleDeleteAppointment(id)}>Remove</Button>
    }
  }

  const displayedUserAppointments = appointments.filter(appointment => appointment.name.toLowerCase() === `${firstName} ${lastName}`)

  return (
    <div className={`h-100 p-2 ${darkMode ? "bg-dark text-light" : null}`}>
      <h1 className="py-1">My Appointments</h1>
      <Row>
        <Col className="my-3">
          <Button className="fw-bold" onClick={() => {
            setShowModal(true)
            setIsInvalidDate(false)
            setIsInvalidTime(false)
          }}>New Appointment</Button>
        </Col>
      </Row>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Service</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedUserAppointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.date}</td>
              <td>{appointment.time}</td>
              <td>{appointment.service}</td>
              <td className={`fw-bold ${statusBackground(appointment)}`}>{appointment.status}</td>
              <td>
                {appointmentBtns(appointment.id, appointment.status)}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
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
              <Form.Control type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="service">
              <Form.Label>Service</Form.Label>
              <Form.Control as="select" value={service} onChange={(e) => setService(e.target.value)} required>
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

      <Modal show={showReschedModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Reschedule Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
              <Form.Control type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="service">
              <Form.Label>Service</Form.Label>
              <Form.Control as="select" value={service} onChange={(e) => setService(e.target.value)}>
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
          <Button variant="primary" onClick={() => handleEditAppointment(currentAppointmentId)}>
            Reschedule Appointment
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Show Booked Success Modal */}
      <Modal show={showSuccessModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Appointment:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="fw-bold text-success text-center">Booked Successfully!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AccountPage;


