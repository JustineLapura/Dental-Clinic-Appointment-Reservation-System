import React, { useContext, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import AppointmentContext from '../AppointmentContext';
import { useReactToPrint } from 'react-to-print';
import { Link } from 'react-router-dom';

const UserRecordDetails = () => {
    const { appointments } = useContext(AppointmentContext)

    const { id } = useParams()

    const appointmentRecord = appointments.filter(appointment => appointment.id === id)

    const componentRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'dental-records',
    })

    return (
        <>
            <div className='d-flex ps-2 pt-2'>
                <Link to=".." relative='path'>
                    <Button variant='primary' className='mt-2 me-auto'>Go Back</Button>
                </Link>
            </div>
            <Container className="printable" ref={componentRef} style={{ width: '100%', fontFamily: 'Courier New, monospace' }}>
                <Row className="my-2">
                    <Col className="text-center">
                        <img src="logo.png" alt="Smile Dental Care Clinic Logo" style={{ width: '150px' }} />
                        <h2>Smile Dental Care Clinic</h2>
                    </Col>
                </Row>
                <hr />
                <Row className="my-4">
                    <Col>
                        <h4><strong>Name:</strong></h4>
                        <p className=''>{appointmentRecord[0].name}</p>
                    </Col>
                    <Col>
                        <h4><strong>Date:</strong></h4>
                        <p className=''>{new Date(appointmentRecord[0].date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    </Col>
                </Row>
                <Row className="my-4">
                    <Col>
                        <h4><strong>Time:</strong></h4>
                        <p className=''>{new Date(`2000-01-01T${appointmentRecord[0].time}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</p>
                    </Col>
                    <Col>
                        <h4><strong>Service:</strong></h4>
                        <p className=''>{appointmentRecord[0].service}</p>
                    </Col>
                </Row>
                <Row className="my-4">
                    <Col>
                        <h4><strong>Price:</strong></h4>
                        <p>P{Math.ceil(Math.random() * 1000)}</p>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col>
                        <h4>Dentist's Signature: _______________________</h4>
                    </Col>
                </Row>
            </Container>
            <Button className='btn btn-sm my-5' variant="success" onClick={handlePrint}>Print Record</Button>
        </>

    );
};

export default UserRecordDetails;
