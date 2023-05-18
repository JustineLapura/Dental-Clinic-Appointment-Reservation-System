import React, { useState, useContext } from 'react';
import { Table, Button, Form, Row, Col, Modal, Alert } from 'react-bootstrap';
import AppointmentContext from ".././AppointmentContext"
import RescheduleModal from '../components/RescheduleModal';

const AdminDashboard = () => {
  const {
    appointments,
    setAppointments,
    currentAppointmentId,
    setCurrentAppointmentId,
    showReschedModal,
    setShowReschedModal,
    handleCloseModal,
    date,
    time,
    errorMessage,
    handleEditAppointment,
    handleDateChange,
    isInvalidDate,
    handleTimeChange,
    isInvalidTime
  } = useContext(AppointmentContext)
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
  const [name, setName] = useState('');
  const [status, setStatus] = useState('All');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const appointmentToReschedule = appointments.filter(appointment => appointment.id === currentAppointmentId)

  const handleViewAppointment = (id) => {
    const appointment = appointments.find((appointment) => appointment.id === id);
    setSelectedAppointment(appointment);
    setShowModal(true);
    setCurrentAppointmentId(id)
  };


  const handleFilter = () => {
    let filtered = appointments;
    // Filter by date range
    if (dateRange.startDate && dateRange.endDate) {
      filtered = filtered.filter(
        (appointment) =>
          appointment.date >= dateRange.startDate && appointment.date <= dateRange.endDate
      );
    }
    // Filter by patient name
    if (name) {
      filtered = filtered.filter((appointment) =>
        appointment.name.toLowerCase().includes(name.toLowerCase())
      );
    }
    // Filter by status
    if (status !== 'All') {
      filtered = filtered.filter((appointment) => appointment.status === status);
    }
    setFilteredAppointments(filtered);
  };

  const handleAdminReschedule = () => {
    handleModalClose()
    setShowReschedModal(true)
  }

  const handleConfirmAppointment = (id) => {
    const updatedAppointments = appointments.map((appointment) => {
      if (appointment.id === id) {
        return { ...appointment, status: 'Confirmed' };
      }
      return appointment;
    });
    setAppointments(updatedAppointments);
    handleModalClose()
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedAppointment(null);
  };

  const statusBackground = (appointment) => {
    let background
    if (appointment.status.toLowerCase() === "confirmed") {
      background = "fw-bold text-success"
    } else if (appointment.status.toLowerCase() === "cancelled") {
      background = "fw-bold text-danger"
    } else if (appointment.status.toLowerCase() === "rescheduled") {
      background = "fw-bold text-primary"
    } else {
      background = "fw-bold text-secondary"
    }

    return background
  }

  const appointmentModalBtns = (selected) => {
    let btnElements
    if (selected && selected.status.toLowerCase() === "pending") {
      btnElements =
        <>
          <Button className="btn-sm" variant="primary" onClick={handleAdminReschedule}>
            Reschedule
          </Button>
          <Button className="btn-sm" variant="success" onClick={() => handleConfirmAppointment(selected.id)}>
            Confirm
          </Button>
        </>
    } else if (selected && (selected.status.toLowerCase() === "confirmed" || selected.status.toLowerCase() === "rescheduled")) {
      btnElements =
        <>
          <Button className="btn-sm" variant="primary" onClick={handleAdminReschedule}>
            Reschedule
          </Button>
          <Button className="btn-sm" variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </>
    } else {
      btnElements =
        <Button variant="secondary" onClick={handleModalClose}>
          Close
        </Button>
    }

    return btnElements
  }

  return (
    <>
      <Row className='d-flex align-items-center py-3 px-2 g-3'>
        <Col md={3}>
          <div className="filters">
            <h5>Filters:</h5>
            <Form.Group controlId="formBasicDate">
              <Form.Label>Date Range:</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="date"
                  placeholder="Enter end date"
                  value={dateRange.endDate}
                  onChange={(e) =>
                    setDateRange((prev) => ({ ...prev, endDate: e.target.value }))
                  }
                />
              </div>
            </Form.Group>
            <Form.Group controlId="formBasicPatient">
              <Form.Label>Patient:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter patient name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicStatus">
              <Form.Label>Status:</Form.Label>
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Pending">Pending</option>
              </Form.Select>
            </Form.Group>
            <Button className='my-2' variant="primary" onClick={handleFilter}>
              Filter
            </Button>
          </div>
        </Col>
        <Col md={9} style={{ height: "450px", overflow: "scroll" }}>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Patient Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {(filteredAppointments.length > 0 ? filteredAppointments : appointments).map(
                (appointment, index) => (
                  <tr key={appointment.id}>
                    <td>{index + 1}</td>
                    <td>{appointment.name}</td>
                    <td>{new Date(appointment.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</td>
                    <td> className="btn-sm"</td>
                    <td className={statusBackground(appointment)}>{appointment.status}</td>
                    <td>
                      {appointment.isCompleted ? <h6 className='text-primary'>Completed</h6> :
                       <Button className='btn-sm' variant="info" onClick={() => handleViewAppointment(appointment.id)}>
                        View
                      </Button>}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Appointment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppointment && (
            <div>
              <p><strong>Patient Name:</strong> {selectedAppointment.name}</p>
              <p><strong>Date:</strong> {new Date(selectedAppointment.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              <p><strong>Time:</strong> {new Date(`2000-01-01T${selectedAppointment.time}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</p>
              <p><strong>Status:</strong> {selectedAppointment.status}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {appointmentModalBtns(selectedAppointment)}
        </Modal.Footer>
      </Modal>

      {/* open Reschedule modal */}
      {appointmentToReschedule.map(appointment => {
        return (
          <RescheduleModal
            showReschedModal={showReschedModal}
            handleCloseModal={handleCloseModal}
            appointment={appointment}
            date={date}
            time={time}
            handleDateChange={handleDateChange}
            handleTimeChange={handleTimeChange}
            isInvalidDate={isInvalidDate}
            isInvalidTime={isInvalidTime}
            errorMessage={errorMessage}
            handleEditAppointment={handleEditAppointment}
            currentAppointmentId={currentAppointmentId}
          />
        )
      })}
    </>
  );
};

export default AdminDashboard;
