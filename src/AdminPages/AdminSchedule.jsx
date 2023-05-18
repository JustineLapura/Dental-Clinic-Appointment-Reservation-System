import { Container, Row, Col, Table, Button } from 'react-bootstrap'; // Importing necessary components from React Bootstrap
import AppointmentContext from '../AppointmentContext';
import { useContext } from 'react';

const AdminSchedule = () => {
  const { appointments } = useContext(AppointmentContext)

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
    <Container fluid>
      <Row className="justify-content-center mt-4">
        <Col md={10} lg={12}>
          <h1 className="text-center mb-4">Admin Schedule</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Patient Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.filter(appointment => !appointment.isCompleted)
                .map(
                  (appointment, index) => (
                    <tr key={appointment.id}>
                      <td>{index + 1}</td>
                      <td>{appointment.name}</td>
                      <td>{new Date(appointment.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</td>
                      <td>{new Date(`2000-01-01T${appointment.time}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</td>
                      <td className={statusBackground(appointment)}>{appointment.status}</td>
                    </tr>
                  )
                )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminSchedule;
