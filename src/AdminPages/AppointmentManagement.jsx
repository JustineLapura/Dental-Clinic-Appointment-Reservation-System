import React, { useContext, useRef, useState } from 'react';
import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AppointmentContext from '../AppointmentContext';
import { useReactToPrint } from 'react-to-print';

const AppointmentManagement = () => {
    const { appointments } = useContext(AppointmentContext);
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'dental-records',
    });

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filteredAppointments, setFilteredAppointments] = useState([]);

    const handleFilter = () => {
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);

        const filteredAppointments = appointments.filter((appointment) => {
            const appointmentDate = new Date(appointment.date);
            return appointmentDate >= startDateObj && appointmentDate <= endDateObj;
        });

        setFilteredAppointments(filteredAppointments);
    };

    const handleClearFilter = () => {
        setStartDate('');
        setEndDate('');
        setFilteredAppointments([]);
    };

    const completedAppointments = filteredAppointments.length > 0 ? filteredAppointments : appointments;
    const displayedCompletedAppointments = completedAppointments.filter(appointment => appointment.isCompleted)

    return (
        <>
            <Container className="printable" ref={componentRef} style={{ width: '100%', fontFamily: 'Courier New, monospace' }}>
                <Row>
                    <Col className='text-center'>
                        <h2 className='text-primary fw-bold mt-4 className="fw-bold"'>Smile Care Dental Clinic</h2>
                        <p className="fw-bold">San Bartolome St. Brgy. 4</p>
                        <p className="fw-bold">Catbalogan City, Samar</p>
                        <p className="fw-bold">Contact #: 09175025468</p>
                    </Col>
                </Row>
                <Row style={{ height: "500px", width: "100%", overflow: "scroll" }}>

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
                            {displayedCompletedAppointments.map((appointment, index) => (
                                <tr key={appointment.id}>
                                    <td>{appointment.name}</td>
                                    <td>{new Date(appointment.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</td>
                                    <td>{new Date(`2000-01-01T${appointment.time}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</td>
                                    <td>{appointment.service}</td>
                                    <td>P{Math.ceil(Math.random() * 1000)}</td>
                                    <td><Link to={`/admin/records/${appointment.id}`}><Button className='btn-sm btn-info'>View</Button></Link></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Row>
            </Container >
            <div className='d-flex justify-content-between align-items-center'>
                <div>
                    <h6>Filter records:</h6>
                    <Form>
                        <Row className="d-flex flex-column align-items-center">
                            <Row>
                                <Col className='d-flex align-items-center w-25'>
                                    <p className='me-2'>From:</p>
                                    <Form.Control
                                        className='my-1 border'
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </Col>
                                <Col className='d-flex align-items-center'>
                                    <p className='me-2'>To:</p>
                                    <Form.Control
                                        className='my-1'
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Row className='d-flex justify-content-center g-1 mb-2'>
                                <Col xs="auto">
                                    <Button className='btn-sm' variant="primary" onClick={handleFilter}>
                                        Filter
                                    </Button>
                                </Col>
                                <Col xs="auto">
                                    <Button className='btn-sm' variant="secondary" onClick={handleClearFilter}>
                                        Clear
                                    </Button>
                                </Col>
                            </Row>
                        </Row>
                    </Form>
                </div>
                <Button className='btn btn-sm me-5' variant="success" onClick={handlePrint}>Print Record</Button>
            </div>
        </>
    );
};

export default AppointmentManagement;
