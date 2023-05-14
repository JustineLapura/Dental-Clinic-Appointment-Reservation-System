import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";

const Payment = () => {
  const darkMode = useOutletContext()
  return (
    <div className={`p-5 ${darkMode ? "bg-dark text-light" : null}`}>
      <h1 className="text-center mb-5">Payment</h1>
      <Row>
        <Col lg={6} className="mb-4">
          <h2 className="text-primary mb-3">Billing Information</h2>
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name on Card</Form.Label>
              <Form.Control type="text" placeholder="Enter name on card" />
            </Form.Group>

            <Form.Group controlId="formBasicNumber">
              <Form.Label>Card Number</Form.Label>
              <Form.Control type="text" placeholder="Enter card number" />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group controlId="formBasicExpiration">
                  <Form.Label>Expiration Date</Form.Label>
                  <Form.Control type="text" placeholder="MM / YY" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicCVV">
                  <Form.Label>CVV</Form.Label>
                  <Form.Control type="text" placeholder="Enter CVV" />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="formBasicZip">
              <Form.Label>Billing Zip Code</Form.Label>
              <Form.Control type="text" placeholder="Enter zip code" />
            </Form.Group>

            <Button className="mt-3 fw-bold" variant="primary" type="submit">
              Submit Payment
            </Button>
          </Form>
        </Col>
        <Col lg={6} className="mb-4">
          <h2 className="text-primary mb-3">Accepted Payment Methods</h2>
          <p className="lead mb-4">
            We accept a variety of payment methods to make it easy for you to
            pay for your dental treatment. These include:
          </p>
          <ul className="list-unstyled">
            <li>- Credit cards (Visa, Mastercard, American Express, Discover)</li>
            <li>- Debit cards (with the Visa or Mastercard logo)</li>
            <li>- Health savings accounts (HSAs)</li>
            <li>- Flexible spending accounts (FSAs)</li>
            <li>- Cash</li>
            <li>- Personal checks</li>
          </ul>
          <p className="mt-4">
            If you have any questions about payment options or billing, please
            don't hesitate to contact us.
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default Payment;
