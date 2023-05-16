import React, { useContext } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import AppointmentContext from '../AppointmentContext';

const AdminScheduleForToday = () => {
  const { appointments } = useContext(AppointmentContext);

  return (
    <Container>
      <Row>
        <Col>
          <h2>Admin Schedule for Today</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Date</th>
                <th>Time</th>
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
