import React, { useContext } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import AppointmentContext from '../AppointmentContext';

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

  const handleConfirmAppointment = (id) => {
    const updatedAppointments = appointments.map((appointment) => {
      if (appointment.id === id) {
        return { ...appointment, status: 'Confirmed' };
      }
      return appointment;
    });
    setAppointments(updatedAppointments);
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

  const actionBtnElements = (status, isComplete, id) => {
    let btnElements
    if (status.toLowerCase() === "confirmed" && !isComplete) {
      btnElements = <Button className='btn-sm' variant='primary' onClick={() => handleCompleted(id)}>Done</Button>
    } else if (status.toLowerCase() !== "confirmed" && !isComplete && status.toLowerCase() !== "cancelled") {
      btnElements =
        <>
          <Button className='btn-sm btn-primary'>Reschedule</Button> <Button className='btn-sm btn-success' onClick={() => handleConfirmAppointment(id)} >Confirm</Button>
        </>
    } else if (isComplete) {
      btnElements = <h6 className="text-primary">Completed</h6>
    } else {
      btnElements = <h6 className='text-secondary'>Expired</h6>
    }

    return btnElements
  }

  return (
    <Container>
      <Row>
      <h1 className="text-center my-4">Today's Schedule</h1>
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
                    <td>{actionBtnElements(appointment.status, appointment.isCompleted, appointment.id)}</td>
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


