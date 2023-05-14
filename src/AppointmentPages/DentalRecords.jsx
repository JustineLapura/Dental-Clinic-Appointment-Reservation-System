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
        <Row className="justify-content-center my-5">
          <Col xs={12} md={10} lg={8}>
            <h1 className="mb-4">Dental Records</h1>
            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Service</th>
                  <th>Dentist</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => (
                  <tr key={index}>
                    <td>{record.date}</td>
                    <td>{record.service}</td>
                    <td>{record.dentist}</td>
                    <td>{record.cost}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <Button className='mb-4' variant="success" onClick={handlePrint}>Print Record</Button>
    </>
  );
};

export default DentalRecords;
