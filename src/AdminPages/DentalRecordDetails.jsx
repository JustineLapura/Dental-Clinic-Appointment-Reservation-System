import React, { useContext, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import AppointmentContext from '../AppointmentContext';
import Appontment from '../AppointmentPages/Appointment';
import { useReactToPrint } from 'react-to-print';

const DentalRecordDetails = () => {
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
            <Button variant='danger' className='mt-2 ms-auto'>Back</Button>
            <Container className="printable" ref={componentRef} style={{ width: '100%'}}>
                <Row className="my-2">
                    <Col>
                        <h2>Smile Dental Care Clinic</h2>
                    </Col>
                </Row>
                <Row className="my-5">
                    <Col>
                        <h4><strong>Name:</strong></h4>
                        <p className=''>{appointmentRecord[0].name}</p>
                    </Col>
                    <Col>
                        <h4><strong>Date:</strong></h4>
                        <p className=''>{appointmentRecord[0].date}</p>
                    </Col>
                </Row>
                <Row className="my-5">
                    <Col>
                        <h4><strong>Time:</strong></h4>
                        <p className=''>{appointmentRecord[0].time}</p>
                    </Col>
                    <Col>
                        <h4><strong>Service:</strong></h4>
                        <p className=''>{appointmentRecord[0].service}</p>
                    </Col>
                </Row>
                <Row className="my-5">
                    <Col>
                        <h4><strong>Price:</strong></h4>
                        <p>P{Math.ceil(Math.random() * 1000)}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h4>Dentist's Signature: _______________________</h4>
                    </Col>
                </Row>
            </Container>
            <Button className='my-5' variant="success" onClick={handlePrint}>Print Record</Button>
        </>

    );
};

export default DentalRecordDetails;
