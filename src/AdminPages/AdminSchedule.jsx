import { useContext } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap'; // Importing necessary components from React Bootstrap
import AppointmentContext from '../AppointmentContext';
import UsersContext from '../UsersContext';


const AdminSchedule = () => {
  const { appointments, setAppointments} = useContext(AppointmentContext)
  const {selectedUser} = useContext(UsersContext)

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

  const handleCancelAppointment = (id, appointmentToCancel) => {
    const updatedAppointments = appointments.map((appointment) => {
      if (appointment.id === id) {
        // Call the Send Message API to send an SMS confirmation to the recipient's phone number
        const apiKey = '344486aa522ca2bc4013ee2fdd24389606100a76';
        const message = `Hi ${appointmentToCancel.name}, Your appointment on ${new Date(appointmentToCancel.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}, ${new Date(`2000-01-01T${appointmentToCancel.time}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })} has been cancelled.

        - Smile Care Dental Clinic`;
        const device = 448; // ID of the device used for sending
        const sim = 1; // Sim slot number for sending message
        const priority = 1; // Send the message as priority
        const url = `https://sms.teamssprogram.com/api/send?key=${apiKey}&phone=${appointmentToCancel.phone}&message=${message}&device=${device}&sim=${sim}&priority=${priority}`;
  
        fetch(url)
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error(error));
  
        return { ...appointment, status: 'Cancelled' };
      }
      return appointment;
    });
    setAppointments(updatedAppointments);
  };
  

  // const handleCancelAppointment = (id, appointment) => {
  //   const updatedAppointments = appointments.map((appointment) => {
  //       // Call the Send Message API to send an SMS confirmation to the recipient's phone number
  //       const apiKey = '5d0c777c56b50a96a270e2ed009a65aa66327cc5';
  //       const message = `Hi ${appointment.name}, Your appointment has been cancelled.`;
  //       const device = 446; // ID of the device used for sending
  //       const sim = 1; // Sim slot number for sending message
  //       const priority = 1; // Send the message as priority
  //       const url = `https://sms.teamssprogram.com/api/send?key=${apiKey}&phone=+63${appointment.phone}&message=${message}&device=${device}&sim=${sim}&priority=${priority}`;

  //       fetch(url)
  //         .then(response => response.json())
  //         .then(data => console.log(data))
  //         .catch(error => console.error(error));

  //     if (appointment.id === id) {
  //       return { ...appointment, status: 'Cancelled' };
  //     }
  //     return appointment;
  //   });
  //   setAppointments(updatedAppointments);
  // };

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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments
                .filter(appointment => !appointment.isCompleted && (appointment.status.toLowerCase() === "confirmed" || appointment.status.toLowerCase() === "cancelled"))
                .map((appointment, index) => (
                  <tr key={appointment.id}>
                    <td>{index + 1}</td>
                    <td>{appointment.name}</td>
                    <td>{new Date(appointment.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</td>
                    <td>{new Date(`2000-01-01T${appointment.time}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</td>
                    <td className={statusBackground(appointment)}>{appointment.status}</td>
                    <td>
                      {appointment.status.toLowerCase() !== "cancelled" ? (
                        <>
                          <Button className="btn-sm mx-2" variant='danger' onClick={() => handleCancelAppointment(appointment.id, appointment)}>Cancel</Button>
                          <Button className='btn-sm btn-primary' onClick={() => handleCompleted(appointment.id)}>Done</Button>
                        </>
                      ) : (
                        <h6>Expired</h6>
                      )}
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

export default AdminSchedule;
