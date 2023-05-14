import React, { useState } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';

const AdminScheduleForToday = () => {
  const [appointments, setAppointments] = useState([
    { id: 1, name: 'John Doe', time: '9:00 AM', service: 'Cleaning' },
    { id: 2, name: 'Jane Smith', time: '10:00 AM', service: 'Filling' },
    { id: 3, name: 'Bob Johnson', time: '11:00 AM', service: 'Extraction' },
  ]);

  const handleRemoveAppointment = (id) => {
    setAppointments((prevAppointments) => prevAppointments.filter((appointment) => appointment.id !== id));
  };

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
                <th>Time</th>
                <th>Service</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.id}</td>
                  <td>{appointment.name}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.service}</td>
                  <td>
                    <Button variant="danger" onClick={() => handleRemoveAppointment(appointment.id)}>
                      Remove
                    </Button>
                  </td>
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
