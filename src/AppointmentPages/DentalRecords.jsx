import React, { useRef } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';

const DentalRecords = () => {
  const records = [
    {
      date: '2022-05-01',
      service: 'Teeth Cleaning',
      dentist: 'Dr. John Doe',
      cost: '$150.00',
    },
    {
      date: '2022-02-14',
      service: 'Root Canal',
      dentist: 'Dr. Jane Smith',
      cost: '$700.00',
    },
    {
      date: '2021-12-05',
      service: 'Dental Implants',
      dentist: 'Dr. Mark Johnson',
      cost: '$1500.00',
    },
  ];
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'dental-records',
  })

  return (
    <>
      <Container fluid ref={componentRef} style={{ width: '100%'}}>
      <Row>
        <Col>
          <h2>Invoice</h2>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Table striped bordered responsive>
            <thead>
              <tr>
                <th>Service</th>
                <th>Description</th>
                <th>Date</th>
                <th>Charge</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Dental Cleaning</td>
                <td>Regular dental cleaning</td>
                <td>May 16, 2023</td>
                <td>$100.00</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <h4>Total Amount Due:</h4>
          <p>$300.00</p>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <h4>Payment Method:</h4>
          <p>Credit Card</p>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <h4>Payment Details:</h4>
          <p>Payment received on May 17, 2023.</p>
        </Col>
      </Row>
      </Container>
      <Button className='mb-4' variant="success" onClick={handlePrint}>Print Record</Button>
    </>
  );
};

export default DentalRecords;
