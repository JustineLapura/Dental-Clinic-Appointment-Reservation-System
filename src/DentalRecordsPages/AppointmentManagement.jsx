import React, { useContext } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import AppointmentContext from '../AppointmentContext';

const AppointmentManagement = () => {
    const { appointments } = useContext(AppointmentContext)
    return (
        <>
            <Container className="printable">
                <Row>
                    <Col>
                        <h3>Appointment Management</h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table striped bordered>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Service</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map((appointment, index) => (
                                    <tr key={appointment.id}>
                                        <td>{appointment.date}</td>
                                        <td>{appointment.time}</td>
                                        <td>{appointment.service}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
            <Row>
                <Col>
                    <Button variant="primary" onClick={() => window.print()}>
                        Print
                    </Button>
                </Col>
            </Row>
        </>
    );
};

export default AppointmentManagement;
