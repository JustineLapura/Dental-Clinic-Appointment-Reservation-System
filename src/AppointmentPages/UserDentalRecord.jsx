import React, { useContext, useRef } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AppointmentContext from '../AppointmentContext';
import { useReactToPrint } from 'react-to-print';

const UserDentalRecords = () => {
    const firstName = localStorage.getItem("firstName")
    const lastName = localStorage.getItem("lastName")
    const { appointments } = useContext(AppointmentContext)

    const componentRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'dental-records',
    })

    const completedAppointments = appointments.filter(appointment => appointment.name.toLowerCase() === `${firstName.toLowerCase()} ${lastName.toLowerCase()}` &&  appointment.isCompleted)
    return (
        <>
            <Container className="printable" ref={componentRef} style={{ width: '100%'}}>
                <Row>
                    <h2 className='my-3'>Dental Records</h2>
                    <Col style={{ height: '400px'}}>
                        <Table striped bordered>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Service</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {completedAppointments.map((appointment, index) => (
                                    <tr key={appointment.id}>
                                        <td>{appointment.name}</td>
                                        <td>{new Date(appointment.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</td>
                                        <td>{new Date(`2000-01-01T${appointment.time}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</td>
                                        <td>{appointment.service}</td>
                                        <td>P{Math.ceil(Math.random() * 1000)}</td>
                                        <td><Link to={`/appointments/records/${appointment.id}`}><Button className='btn-sm'>View</Button></Link></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
            {completedAppointments.length > 0 && <Button className='btn-sm mb-4' variant="success" onClick={handlePrint}>Print Record</Button>}
        </>
    );
};

export default UserDentalRecords;