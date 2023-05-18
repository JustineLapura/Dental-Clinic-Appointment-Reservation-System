import React from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';

const BillingInvoicing = () => {
  return (
    <Container className="printable">
      <Row>
        <Col>
          <h3>Billing and Invoicing</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Invoice Number</th>
                <th>Service</th>
                <th>Amount</th>
                <th>Payment Status</th>
              </tr>
            </thead>
            <tbody>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="primary" onClick={() => window.print()}>
            Print
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default BillingInvoicing;
