import React, { useState, useContext } from 'react';
import { Container, Row, Col, Table, Button, Modal } from 'react-bootstrap';
import AppointmentContext from '../AppointmentContext';
import RescheduleModal from '../components/RescheduleModal';

const AdminScheduleForToday = () => {
  const {
    appointments,
    setAppointments
  } = useContext(AppointmentContext)
  const handleCompleted = (id) => {
    setAppointments(prevAppointments => prevAppointments.map(prevAppointment => {
      return prevAppointment.id === id
        ? {
          ...prevAppointment,
          isCompleted: !prevAppointment.isCompleted
        }
        : prevAppointment
    }))
  }

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

  return (
    <Container>
      <Row>
        <Col>
          <h2>Admin Schedule for Today</h2>
        </Col>
      </Row>
      <Row>
        <Col style={{ height: "400px", overflow: "scroll" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Service</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.filter(appointment => {
                const currentDate = new Date().toISOString().split('T')[0];
                return appointment.date === currentDate;
              })
                .map((appointment, index) => (
                  <tr key={appointment.id}>
                    <td>{index + 1}</td>
                    <td>{appointment.name}</td>
                    <td>{new Date(appointment.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</td>
                    <td>{new Date(`2000-01-01T${appointment.time}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</td>
                    <td>{appointment.service}</td>
                    <td className={statusBackground(appointment)}>{appointment.status}</td>
                    {appointment.status.toLowerCase() === "confirmed" && <td>{appointment.isCompleted ?
                      <>
                        <h6 className="text-primary">Completed</h6>
                      </> : <Button variant='primary' onClick={() => handleCompleted(appointment.id)}>Done</Button>}</td>}
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
      </Row>

    </Container>
  );
};

export default AdminScheduleForToday;
